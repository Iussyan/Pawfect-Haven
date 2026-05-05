/*:
 * @target MZ
 * @plugindesc (v2.3) Reflex map fishing minigame with dynamic names and jump alerts.
 * @author Deep-RPG Labs
 *
 * @command startFishing
 * @text Start Fishing Minigame
 * @desc Initiates the fishing sequence and stores the result in a variable.
 *
 * @arg resultVar
 * @type variable
 * @text Result Variable
 * @desc Variable to store outcome: >0 = Caught Item ID, 0 = Escaped, -1 = Too Early.
 * @default 1
 *
 * @arg nameVar
 * @type variable
 * @text Item Name Variable (New)
 * @desc Saves the caught item's Icon and Name as text here. Use \V[x] in messages!
 * @default 0
 *
 * @arg difficulty
 * @type number
 * @text Reaction Time (Frames)
 * @desc How many frames the player has to react (60 = 1 sec. Normal is ~30).
 * @default 30
 *
 * @arg maxFakeBites
 * @type number
 * @text Max Fake Bites
 * @desc Maximum number of "fake" bobber sounds before the real bite (0-5).
 * @default 2
 *
 * @arg successAnim
 * @type animation
 * @text Success Animation
 * @desc The animation ID played when the fish is caught. Set to 0 for no animation.
 * @default 52
 *
 * @arg earlyAnim
 * @type animation
 * @text Early/Fail Animation
 * @desc The animation ID played when you pull too early. Set to 0 for no animation.
 * @default 66
 *
 * @arg fishes
 * @type struct<FishItem>[]
 * @text Available Fish (Pool)
 * @desc Add the items that can be caught here, along with their weights.
 * @default []
 */

/*~struct~FishItem:
 * @param itemId
 * @type item
 * @text Fish Item
 * @desc The item to give the player if caught.
 * @default 1
 *
 * @param weight
 * @type number
 * @text Catch Chance (Weight)
 * @desc Higher numbers mean a higher chance relative to other fish in this list.
 * @default 10
 */

(() => {
    'use strict';

    const pluginName = "ReflexFishing";

    // --- Plugin Command Registration ---
    PluginManager.registerCommand(pluginName, "startFishing", args => {
        const resultVar = Number(args.resultVar);
        const nameVar = Number(args.nameVar || 0);
        const difficulty = Number(args.difficulty);
        const fakeBites = Number(args.maxFakeBites);
        const successAnim = Number(args.successAnim || 0);
        const earlyAnim = Number(args.earlyAnim || 0);
        
        let parsedFishes = [];
        try {
            if (args.fishes) {
                const rawList = JSON.parse(args.fishes);
                for (let i = 0; i < rawList.length; i++) {
                    parsedFishes.push(JSON.parse(rawList[i]));
                }
            }
        } catch (e) {
            console.warn("Fishing Plugin: Error parsing fish list.", e);
        }

        $gameSystem.startFishing(resultVar, nameVar, difficulty, fakeBites, successAnim, earlyAnim, parsedFishes);
        
        const interpreter = $gameMap._interpreter;
        if (interpreter) interpreter.setWaitMode('fishing');
    });

    // --- Game System: Fishing Logic Manager ---
    Game_System.prototype.startFishing = function(resultVar, nameVar, difficulty, fakeBites, successAnim, earlyAnim, fishes) {
        this._fishingActive = true;
        this._fishResultVar = resultVar;
        this._fishNameVar = nameVar;
        this._fishDifficulty = difficulty;
        this._fishFakeBites = Math.floor(Math.random() * (fakeBites + 1));
        this._fishSuccessAnim = successAnim;
        this._fishEarlyAnim = earlyAnim;
        this._fishList = fishes;
        
        this._fishState = 'WAITING';
        this._fishTimer = this.generateWaitTime();
        this._fishInputLocked = true; 
    };

    Game_System.prototype.generateWaitTime = function() {
        return 60 + Math.floor(Math.random() * 120); 
    };

    Game_System.prototype.endFishing = function(resultCode) {
        $gameVariables.setValue(this._fishResultVar, resultCode);
        this._fishingActive = false;
        this._fishState = 'OFF';
    };

    Game_System.prototype.updateFishing = function() {
        if (!this._fishingActive) return;

        if (this._fishInputLocked) {
            this._fishTimer--;
            if (this._fishTimer <= this.generateWaitTime() - 10) {
                this._fishInputLocked = false;
            }
            return;
        }

        const isPressed = Input.isTriggered('ok') || TouchInput.isTriggered();

        switch (this._fishState) {
            case 'WAITING':
                if (isPressed) {
                    // Pressed too early!
                    AudioManager.playSe({ name: 'Cancel2', volume: 90, pitch: 100, pan: 0 });
                    if (this._fishEarlyAnim > 0 && $gameTemp.requestAnimation) {
                        $gameTemp.requestAnimation([$gamePlayer], this._fishEarlyAnim);
                    }
                    this.endFishing(-1); 
                    return;
                }

                this._fishTimer--;
                if (this._fishTimer <= 0) {
                    if (this._fishFakeBites > 0) {
                        AudioManager.playSe({ name: 'Water1', volume: 50, pitch: 120, pan: 0 });
                        this._fishFakeBites--;
                        this._fishTimer = this.generateWaitTime();
                    } else {
                        // The REAL bite
                        this._fishState = 'BITING';
                        this._fishTimer = this._fishDifficulty;
                        AudioManager.playSe({ name: 'Water2', volume: 100, pitch: 90, pan: 0 });
                        
                        if ($gameTemp.requestBalloon) {
                            $gameTemp.requestBalloon($gamePlayer, 1); 
                        }
                        
                        // NEW: Make the player do a startled jump in place
                        $gamePlayer.jump(0, 0);
                    }
                }
                break;

            case 'BITING':
                if (isPressed) {
                    // Success!
                    AudioManager.playSe({ name: 'Item3', volume: 90, pitch: 100, pan: 0 });
                    if (this._fishSuccessAnim > 0 && $gameTemp.requestAnimation) {
                        $gameTemp.requestAnimation([$gamePlayer], this._fishSuccessAnim);
                    }
                    
                    let caughtItemId = 0;
                    if (this._fishList && this._fishList.length > 0) {
                        let totalWeight = 0;
                        for (let f of this._fishList) totalWeight += Number(f.weight);
                        
                        let roll = Math.random() * totalWeight;
                        for (let f of this._fishList) {
                            roll -= Number(f.weight);
                            if (roll <= 0) {
                                caughtItemId = Number(f.itemId);
                                break;
                            }
                        }
                    }

                    // Auto-Add the item and store its name/icon
                    if (caughtItemId > 0) {
                        const caughtItem = $dataItems[caughtItemId];
                        $gameParty.gainItem(caughtItem, 1);
                        
                        if (this._fishNameVar > 0) {
                            // Creates a text string like: "\I[123] Bass"
                            const nameString = "\\I[" + caughtItem.iconIndex + "] " + caughtItem.name;
                            $gameVariables.setValue(this._fishNameVar, nameString);
                        }
                    }

                    this.endFishing(caughtItemId); 
                    return;
                }

                this._fishTimer--;
                if (this._fishTimer <= 0) {
                    // Missed it!
                    AudioManager.playSe({ name: 'Equip2', volume: 90, pitch: 100, pan: 0 });
                    this.endFishing(0);
                }
                break;
        }
    };

    // --- Hooks ---
    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        if ($gameSystem && $gameSystem._fishingActive) {
            $gameSystem.updateFishing();
        }
    };

    const _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        if (this._waitMode === 'fishing') {
            return $gameSystem._fishingActive; 
        }
        return _Game_Interpreter_updateWaitMode.call(this);
    };

    const _Game_Player_canMove = Game_Player.prototype.canMove;
    Game_Player.prototype.canMove = function() {
        if ($gameSystem && $gameSystem._fishingActive) return false;
        return _Game_Player_canMove.call(this);
    };

})();