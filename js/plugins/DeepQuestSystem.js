/*:
 * @target MZ
 * @plugindesc (v1.2) A 10/10 custom quest journal with HUD, Toasts, and Commands.
 * @author Deep-RPG Labs
 *
 * @param menuCommandName
 * @text Menu Command Name
 * @desc The text displayed in the main pause menu.
 * @default Quests
 *
 * @param questList
 * @text Quest Database
 * @type struct<QuestData>[]
 * @desc Define all your game's quests here.
 * @default []
 *
 * @command openJournal
 * @text Open Quest Journal
 * @desc Instantly opens the quest menu.
 *
 * @command showToast
 * @text Show Custom Toast
 * @desc Triggers the sliding map notification.
 * @arg title
 * @text Title Text
 * @type string
 * @arg subtitle
 * @text Subtitle Text
 * @type string
 *
 * @command pinQuest
 * @text Pin/Unpin Quest to HUD
 * @desc Displays the current objective on the map.
 * @arg questId
 * @text Quest ID
 * @desc The ID of the quest to pin. Leave blank to unpin.
 * @type string
 *
 * @command silentUpdate
 * @text Silent Quest Update
 * @desc Updates a quest variable without showing a toast.
 * @arg varId
 * @text Tracker Variable
 * @type variable
 * @arg val
 * @text New Value
 * @type number
 *
 * @command advanceQuest
 * @text Activate / Advance Quest
 * @desc Progresses a quest to a specific phase (1=Start, 100=Complete).
 * @arg questId
 * @text Quest ID
 * @type string
 * @arg phase
 * @text Phase Number
 * @type number
 *
 * @command giveRewards
 * @text Give Quest Rewards
 * @desc Automatically gives Gold and Item rewards.
 * @arg questId
 * @text Quest ID
 * @type string
 * @arg gold
 * @text Gold Amount
 * @type number
 * @default 0
 * @arg itemId
 * @text Item ID
 * @type item
 * @default 0
 *
 * @help
 * ============================================================================
 * Deep Quest System Help (v1.2)
 * ============================================================================
 * This plugin provides a complete custom quest journal for your game.
 *
 * Setting Up Quests:
 * 1. Open the Plugin Manager and double-click "Quest Database".
 * 2. Add a new quest. Give it a unique ID (like "puppy_quest").
 * 3. Assign a Variable to track it (e.g., Variable 10).
 *
 * How Tracking Works:
 * - If the variable is 0, the quest is hidden.
 * - If the variable is 1, Objective 1 is shown.
 * - If the variable is 2, Objective 2 is shown.
 * - If the variable is 100 or higher, the quest is marked "Completed".
 *
 * Key Features:
 * - Pinning: Players can press OK on a quest in the menu to pin it to their HUD.
 * - Map Toasts: Updating a quest variable automatically pops up a notification.
 *
 * Plugin Commands:
 * - Open Quest Journal: Instantly opens the quest menu on screen.
 * - Show Custom Toast: Triggers a sliding notification on the map.
 * - Pin/Unpin Quest: Shows the current objective directly on the map screen.
 * - Silent Quest Update: Changes a quest variable without showing a popup.
 * - Activate / Advance Quest: Moves a quest to a specific phase safely.
 * - Give Quest Rewards: Automatically gives gold and items to the player.
 */

/*~struct~QuestData:
 * @param id
 * @text Quest ID
 * @desc A unique shortcode for this quest (e.g., lost_dog)
 * @type string
 *
 * @param title
 * @text Quest Title
 * @desc The display name in the menu.
 * @type string
 *
 * @param variableId
 * @text Tracker Variable
 * @desc The Variable ID used to track this quest. (0=Hidden, 1=Phase 1)
 * @type variable
 *
 * @param description
 * @text Description
 * @desc The story text for the quest.
 * @type note
 *
 * @param objectives
 * @text Objectives (By Phase)
 * @desc Text for each phase. Line 1 = Variable 1, Line 2 = Variable 2, etc.
 * @type string[]
 *
 * @param rewards
 * @text Rewards Text
 * @desc What to show in the rewards box (e.g., \I[314] 500G)
 * @type string
 */

(() => {
    'use strict';

    const pluginName = "DeepQuestSystem";
    const parameters = PluginManager.parameters(pluginName);
    const menuName = String(parameters['menuCommandName'] || "Quests");
    
    let rawQuests = [];
    try {
        if (parameters['questList']) {
            rawQuests = JSON.parse(parameters['questList']).map(q => JSON.parse(q));
            rawQuests.forEach(q => {
                if (q.objectives) q.objectives = JSON.parse(q.objectives);
                if (q.description) q.description = JSON.parse(q.description); 
            });
        }
    } catch (e) {
        console.warn("Quest System: Database parsing error.", e);
    }

    // ==========================================
    // PLUGIN COMMANDS & VARIABLE HOOKS
    // ==========================================
    PluginManager.registerCommand(pluginName, "openJournal", args => {
        SceneManager.push(Scene_Quest);
    });

    PluginManager.registerCommand(pluginName, "showToast", args => {
        $gameTemp._pendingQuestToast = { status: args.subtitle, title: args.title };
    });

    PluginManager.registerCommand(pluginName, "pinQuest", args => {
        $gameSystem._pinnedQuestId = args.questId || null;
    });

    PluginManager.registerCommand(pluginName, "silentUpdate", args => {
        $gameTemp._suppressQuestToast = true;
        $gameVariables.setValue(Number(args.varId), Number(args.val));
        $gameTemp._suppressQuestToast = false;
    });

    PluginManager.registerCommand(pluginName, "advanceQuest", args => {
        const quest = rawQuests.find(q => q.id === args.questId);
        if (quest) {
            $gameVariables.setValue(Number(quest.variableId), Number(args.phase));
        }
    });

    PluginManager.registerCommand(pluginName, "giveRewards", args => {
        const gold = Number(args.gold);
        const itemId = Number(args.itemId);
        if (gold > 0) $gameParty.gainGold(gold);
        if (itemId > 0) $gameParty.gainItem($dataItems[itemId], 1);
    });

    const _Game_Variables_setValue = Game_Variables.prototype.setValue;
    Game_Variables.prototype.setValue = function(variableId, value) {
        const oldValue = this.value(variableId);
        _Game_Variables_setValue.call(this, variableId, value);
        
        if (value > oldValue && !$gameTemp._suppressQuestToast) {
            const quest = rawQuests.find(q => Number(q.variableId) === variableId);
            if (quest) {
                let status = "Quest Updated";
                if (value === 1) status = "New Quest";
                if (value >= 100) status = "Quest Complete";
                $gameTemp._pendingQuestToast = { status: status, title: quest.title };
            }
        }
    };

    // ==========================================
    // MAP OVERLAYS (TOAST & HUD)
    // ==========================================
    class Window_QuestToast extends Window_Base {
        initialize() {
            const width = 300;
            const height = this.fittingHeight(2);
            const hiddenY = -height - 20; 
            
            super.initialize(new Rectangle(Graphics.boxWidth - width - 10, hiddenY, width, height));
            this.opacity = 220;
            this._showCount = 0;
            this._targetY = hiddenY;
        }

        showToast(data) {
            this.contents.clear();
            this.changeTextColor(ColorManager.textColor(6)); 
            this.drawText(data.status, 0, 0, this.innerWidth, 'center');
            this.resetTextColor();
            this.drawText(data.title, 0, this.lineHeight(), this.innerWidth, 'center');
            this._showCount = 180; 
            this._targetY = 10;    
        }

        update() {
            super.update();
            if (this._showCount > 0) {
                this._showCount--;
                if (this._showCount === 0) {
                    this._targetY = -this.height - 20; 
                }
            }
            this.y += (this._targetY - this.y) * 0.1;
        }
    }

    class Window_QuestHUD extends Window_Base {
        initialize() {
            const width = 300;
            const height = this.fittingHeight(2);
            super.initialize(new Rectangle(Graphics.boxWidth - width - 10, 80, width, height));
            this.opacity = 0; 
            this._lastQuestId = null;
            this._lastPhase = -1;
        }

        update() {
            super.update();
            const pinnedId = $gameSystem ? $gameSystem._pinnedQuestId : null;
            
            if (!pinnedId) {
                this.visible = false;
                return;
            }

            this.visible = true;
            const quest = rawQuests.find(q => q.id === pinnedId);
            
            if (quest) {
                const currentPhase = $gameVariables.value(Number(quest.variableId));
                if (this._lastQuestId !== pinnedId || this._lastPhase !== currentPhase) {
                    this._lastQuestId = pinnedId;
                    this._lastPhase = currentPhase;
                    this.refresh(quest, currentPhase);
                }
            } else {
                this.visible = false;
            }
        }

        refresh(quest, phase) {
            this.contents.clear();
            
            this.changeTextColor(ColorManager.textColor(6)); 
            this.drawText(quest.title, 0, 0, this.innerWidth, 'right');
            
            this.resetTextColor();
            this.contents.fontSize = 20;
            let activeObjective = "Completed!";
            
            if (phase < 100 && quest.objectives && quest.objectives.length > 0) {
                const objIndex = phase - 1;
                if (objIndex >= 0 && objIndex < quest.objectives.length) {
                    activeObjective = quest.objectives[objIndex];
                }
            }
            
            this.drawText(activeObjective, 0, 28, this.innerWidth, 'right');
            this.contents.fontSize = $gameSystem.mainFontSize();
        }
    }

    const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.call(this);
        this._questToastWindow = new Window_QuestToast();
        this.addWindow(this._questToastWindow);
        
        this._questHudWindow = new Window_QuestHUD();
        this.addWindow(this._questHudWindow);
    };

    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        if ($gameTemp._pendingQuestToast) {
            if (this._questToastWindow) {
                AudioManager.playSe({ name: 'Saint5', volume: 60, pitch: 120, pan: 0 });
                this._questToastWindow.showToast($gameTemp._pendingQuestToast);
            }
            $gameTemp._pendingQuestToast = null;
        }
    };

    // ==========================================
    // MAIN MENU INTEGRATION
    // ==========================================
    const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        _Window_MenuCommand_addOriginalCommands.call(this);
        this.addCommand(menuName, 'quest', true);
    };

    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.setHandler('quest', this.commandQuest.bind(this));
    };

    Scene_Menu.prototype.commandQuest = function() {
        SceneManager.push(Scene_Quest);
    };

    // ==========================================
    // QUEST SCENE (THE UI)
    // ==========================================
    class Scene_Quest extends Scene_MenuBase {
        create() {
            super.create();
            this.createQuestListWindow();
            this.createQuestDetailWindow();
            this._listWindow.setDetailWindow(this._detailWindow);
            this._listWindow.activate();
        }

        createQuestListWindow() {
            const rect = this.listWindowRect();
            this._listWindow = new Window_QuestList(rect);
            this._listWindow.setHandler('cancel', this.popScene.bind(this));
            this._listWindow.setHandler('ok', this.onQuestOk.bind(this));
            this.addWindow(this._listWindow);
        }

        createQuestDetailWindow() {
            const rect = this.detailWindowRect();
            this._detailWindow = new Window_QuestDetail(rect);
            this.addWindow(this._detailWindow);
        }

        listWindowRect() {
            const ww = 300;
            const wh = Graphics.boxHeight - this.buttonAreaHeight();
            const wx = 0;
            const wy = this.buttonAreaHeight();
            return new Rectangle(wx, wy, ww, wh);
        }

        detailWindowRect() {
            const ww = Graphics.boxWidth - 300;
            const wh = Graphics.boxHeight - this.buttonAreaHeight();
            const wx = 300;
            const wy = this.buttonAreaHeight();
            return new Rectangle(wx, wy, ww, wh);
        }

        onQuestOk() {
            const quest = this._listWindow.item();
            if (quest) {
                if ($gameSystem._pinnedQuestId === quest.id) {
                    $gameSystem._pinnedQuestId = null;
                    AudioManager.playSe({ name: 'Cancel2', volume: 80, pitch: 100, pan: 0 });
                } else {
                    $gameSystem._pinnedQuestId = quest.id;
                    AudioManager.playSe({ name: 'Equip1', volume: 90, pitch: 100, pan: 0 });
                }
                this._listWindow.refresh();
                this._detailWindow.refresh();
                this._listWindow.activate();
            }
        }
    }

    // ==========================================
    // QUEST LIST WINDOW (LEFT SIDE)
    // ==========================================
    class Window_QuestList extends Window_Selectable {
        initialize(rect) {
            super.initialize(rect);
            this.refresh();
            this.select(0);
        }

        setDetailWindow(window) {
            this._detailWindow = window;
            this.updateDetail();
        }

        refresh() {
            this.makeItemList();
            super.refresh();
        }

        makeItemList() {
            this._data = rawQuests.filter(quest => {
                const phase = $gameVariables.value(Number(quest.variableId));
                return phase > 0; 
            });
        }

        item() {
            return this._data && this.index() >= 0 ? this._data[this.index()] : null;
        }

        maxItems() {
            return this._data ? this._data.length : 0;
        }

        // FIX 1: Force the detail window to update when the cursor moves
        select(index) {
            super.select(index);
            this.updateDetail();
        }

        drawItem(index) {
            const quest = this._data[index];
            const rect = this.itemLineRect(index);
            const phase = $gameVariables.value(Number(quest.variableId));
            const isPinned = $gameSystem._pinnedQuestId === quest.id;
            
            this.resetTextColor();
            if (phase >= 100) {
                this.changeTextColor(ColorManager.textColor(7)); 
            } else {
                this.changeTextColor(ColorManager.textColor(6)); 
            }
            
            const prefix = isPinned ? "★ " : "  ";
            this.drawText(prefix + quest.title, rect.x, rect.y, rect.width);
        }

        updateHelp() {
            this.updateDetail();
        }

        updateDetail() {
            if (this._detailWindow && this._data && this._data.length > 0) {
                this._detailWindow.setQuest(this._data[this.index()]);
            } else if (this._detailWindow) {
                this._detailWindow.setQuest(null);
            }
        }
    }

    // ==========================================
    // QUEST DETAIL WINDOW (RIGHT SIDE)
    // ==========================================
    class Window_QuestDetail extends Window_Base {
        initialize(rect) {
            super.initialize(rect);
            this._quest = null;
        }

        setQuest(quest) {
            if (this._quest !== quest) {
                this._quest = quest;
                this.refresh();
            }
        }

        refresh() {
            this.contents.clear();
            if (!this._quest) return;

            const phase = $gameVariables.value(Number(this._quest.variableId));
            let y = 0;

            this.resetTextColor();
            this.drawTextEx("\\C[6]\\FS[28]" + this._quest.title, 0, y);
            y += this.lineHeight() + 10;

            this.drawTextEx(this._quest.description, 0, y);
            y += this.lineHeight() * 3;

            this.changeTextColor(ColorManager.systemColor());
            this.drawText("Objectives:", 0, y, this.innerWidth);
            y += this.lineHeight();

            if (this._quest.objectives) {
                for (let i = 0; i < this._quest.objectives.length; i++) {
                    const objPhase = i + 1;
                    if (phase >= objPhase) {
                        let prefix = (phase > objPhase || phase >= 100) ? "\\C[7]✓ " : "\\C[0]○ ";
                        this.drawTextEx(prefix + this._quest.objectives[i], 20, y);
                        y += this.lineHeight();
                    }
                }
            }

            if (this._quest.rewards) {
                y = this.innerHeight - this.lineHeight() * 3; 
                this.changeTextColor(ColorManager.systemColor());
                this.drawText("Rewards:", 0, y, this.innerWidth);
                y += this.lineHeight();
                this.resetTextColor();
                this.drawTextEx(this._quest.rewards, 20, y);
            }

            const isPinned = $gameSystem._pinnedQuestId === this._quest.id;
            this.changeTextColor(ColorManager.textColor(8)); 
            this.contents.fontSize = 18;
            const pinInstruction = isPinned ? "Press [OK] to Unpin" : "Press [OK] to Pin to HUD";
            
            // FIX 2: Replaced the static -24 with the dynamic lineHeight function to stop clipping
            this.drawText(pinInstruction, 0, this.innerHeight - this.lineHeight(), this.innerWidth, 'right');
            this.contents.fontSize = $gameSystem.mainFontSize();
        }
    }

    window.Scene_Quest = Scene_Quest;

})();