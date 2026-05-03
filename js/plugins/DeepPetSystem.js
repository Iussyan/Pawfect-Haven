/*:
 * @target MZ
 * @plugindesc (v1.3) A 10/10 Pet System with Smart Feeding UI and Infinite Slots.
 * @author Deep-RPG Labs
 *
 * @param menuCommandName
 * @text Menu Command Name
 * @desc The text displayed in the main pause menu.
 * @default Pets
 * 
 * @param --- Stat Tiers ---
 * @desc Define the words used for values (0-20, 21-40, 41-60, 61-80, 81-100).
 * * @param hungerTiers
 * @parent --- Stat Tiers ---
 * @text Hunger Levels
 * @desc Comma separated. Default: Very Low, Low, Normal, High, Full
 * @default Very Low, Low, Normal, High, Full
 *
 * @param healthTiers
 * @parent --- Stat Tiers ---
 * @text Health Levels
 * @desc Comma separated. Default: Critical, Weak, Fair, Good, Excellent
 * @default Critical, Weak, Fair, Good, Excellent
 *
 * @param happinessTiers
 * @parent --- Stat Tiers ---
 * @text Happiness Levels
 * @desc Comma separated. Default: Very Low, Low, Normal, High, Max
 * @default Very Low, Low, Normal, High, Max
 *
 * @param trustTiers
 * @parent --- Stat Tiers ---
 * @text Trust Levels
 * @desc Comma separated. Default: Very Low, Low, Normal, High, Unbreakable
 * @default Very Low, Low, Normal, High, Unbreakable
 *
 * @command registerPet
 * @text Register Pet
 * @desc Adds a new pet to the tracking system using a Number Slot.
 * @arg slotId
 * @text Pet Slot
 * @desc Assign a number to this pet (e.g., 1). This is how you will target them.
 * @type number
 * @default 1
 * @min 1
 * @arg petName
 * @text Pet Name
 * @desc Display name (e.g., Lola)
 * @type string
 * @arg startHunger
 * @text Starting Hunger
 * @desc Baseline value from 0 to 100.
 * @type number
 * @default 50
 * @arg startHealth
 * @text Starting Health
 * @desc Baseline value from 0 to 100.
 * @type number
 * @default 50
 * @arg startHappiness
 * @text Starting Happiness
 * @desc Baseline value from 0 to 100.
 * @type number
 * @default 50
 * @arg startTrust
 * @text Starting Trust
 * @desc Baseline value from 0 to 100.
 * @type number
 * @default 50
 *
 * @command updateStat
 * @text Update Pet Stat
 * @desc Adds, subtracts, or sets a pet's stat.
 * @arg slotId
 * @text Pet Slot
 * @type number
 * @default 1
 * @arg stat
 * @text Stat to Update
 * @type select
 * @option hunger
 * @option health
 * @option happiness
 * @option trust
 * @arg operation
 * @text Operation
 * @type select
 * @option Add
 * @option Subtract
 * @option Set
 * @default Add
 * @arg value
 * @text Value
 * @type number
 * @default 10
 *
 * @command openFeedUI
 * @text Open Feed UI
 * @desc Opens the custom feeding interface.
 * @arg mode
 * @text Mode
 * @type select
 * @option Select Pet
 * @option Specific Pet
 * @default Select Pet
 * @desc "Select Pet" opens a list. "Specific Pet" skips the list and targets a slot directly.
 * @arg slotId
 * @text Target Slot (If Specific)
 * @desc Only used if Mode is "Specific Pet".
 * @type number
 * @default 1
 *
 * @command pinHud
 * @text Pin/Unpin Pet to HUD
 * @desc Shows a specific pet's status on the map screen.
 * @arg slotId
 * @text Pet Slot
 * @desc The Slot Number to show. Set to 0 to hide the HUD.
 * @type number
 * @default 0
 *
 * @command openMenu
 * @text Open Pet Menu
 * @desc Instantly opens the Pet Status UI.
 * @help
 * ============================================================================
 * Deep Pet System Help (v1.3)
 * ============================================================================
 * ITEM NOTETAGS:
 * Put these in an item's note box to make it usable in the Feed UI!
 * <PetHunger: 20>
 * <PetHealth: 10>
 * <PetHappiness: -5>
 * <PetTrust: 5>
 *
 * WORKFLOW:
 * 1. Run the "Register Pet" command in an event. Assign them a Slot Number 
 * (like 1 for your first dog, 2 for your cat, etc.).
 * 2. Run "Open Feed UI" to let the player feed them using your notetagged items.
 * 3. Run "Update Pet Stat" if you want to change stats via story events instead.
 * 4. Pin them to the HUD or view them in the main menu.
 *
 * DYNAMIC TEXT CODES:
 * You can type these directly into Show Text boxes to print their status!
 * Format: \PET[slotId, stat]
 * * Examples:
 * "Lola is looking \PET[1, health] today." -> "Lola is looking Weak today."
 * "Hunger level: \PET[1, hunger]" -> "Hunger level: Low"
 */


(() => {
    'use strict';

    const pluginName = "DeepPetSystem";
    const parameters = PluginManager.parameters(pluginName);
    const menuName = String(parameters['menuCommandName'] || "Pets");

    const parseTiers = (paramString) => paramString.split(',').map(s => s.trim());
    const tiers = {
        hunger: parseTiers(parameters['hungerTiers'] || "Very Low, Low, Normal, High, Full"),
        health: parseTiers(parameters['healthTiers'] || "Critical, Weak, Fair, Good, Excellent"),
        happiness: parseTiers(parameters['happinessTiers'] || "Very Low, Low, Normal, High, Max"),
        trust: parseTiers(parameters['trustTiers'] || "Very Low, Low, Normal, High, Unbreakable")
    };

    function isPetItem(item) {
        return item && item.meta && (item.meta.PetHunger || item.meta.PetHealth || item.meta.PetHappiness || item.meta.PetTrust);
    }

    // ==========================================
    // BACKEND LOGIC & REGISTRY
    // ==========================================
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._deepPets = {};
        this._pinnedPetSlot = 0;
    };

    Game_System.prototype.registerPet = function(slotId, name, hunger, health, happiness, trust) {
        if (!this._deepPets) this._deepPets = {};
        if (!this._deepPets[slotId]) {
            const clamp = (val) => Math.max(0, Math.min(100, val));
            this._deepPets[slotId] = { 
                name: name, 
                hunger: clamp(hunger), 
                health: clamp(health), 
                happiness: clamp(happiness), 
                trust: clamp(trust) 
            };
        }
    };

    Game_System.prototype.updatePetStat = function(slotId, stat, operation, value) {
        if (!this._deepPets || !this._deepPets[slotId]) return;
        let current = this._deepPets[slotId][stat];
        
        if (operation === 'Add') current += value;
        else if (operation === 'Subtract') current -= value;
        else if (operation === 'Set') current = value;

        this._deepPets[slotId][stat] = Math.max(0, Math.min(100, current));
    };

    Game_System.prototype.getPetTier = function(stat, value) {
        let index = Math.floor(value / 20);
        if (index >= 5) index = 4; 
        return tiers[stat][index];
    };

    // ==========================================
    // PLUGIN COMMANDS
    // ==========================================
    PluginManager.registerCommand(pluginName, "registerPet", args => {
        $gameSystem.registerPet(
            Number(args.slotId), 
            args.petName,
            Number(args.startHunger || 50),
            Number(args.startHealth || 50),
            Number(args.startHappiness || 50),
            Number(args.startTrust || 50)
        );
    });

    PluginManager.registerCommand(pluginName, "updateStat", args => {
        $gameSystem.updatePetStat(Number(args.slotId), args.stat.toLowerCase(), args.operation, Number(args.value));
    });

    PluginManager.registerCommand(pluginName, "pinHud", args => {
        $gameSystem._pinnedPetSlot = Number(args.slotId);
    });

    PluginManager.registerCommand(pluginName, "openMenu", args => {
        SceneManager.push(Scene_Pet);
    });

    PluginManager.registerCommand(pluginName, "openFeedUI", args => {
        $gameTemp._feedMode = args.mode;
        $gameTemp._feedSlot = Number(args.slotId || 1);
        SceneManager.push(Scene_PetFeed);
    });

    // ==========================================
    // ESCAPE CODES \PET[slotId, stat]
    // ==========================================
    const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        text = _Window_Base_convertEscapeCharacters.call(this, text);
        text = text.replace(/\x1bPET\[(.*?)\]/gi, (_, p1) => {
            const args = p1.split(',').map(s => s.trim());
            if (args.length >= 2 && $gameSystem._deepPets && $gameSystem._deepPets[Number(args[0])]) {
                const statName = args[1].toLowerCase();
                const rawValue = $gameSystem._deepPets[Number(args[0])][statName];
                return "\\C[6]" + $gameSystem.getPetTier(statName, rawValue) + "\\C[0]"; 
            }
            return "???";
        });
        return text;
    };

    // ==========================================
    // UI COMPONENTS (HUD & DETAIL)
    // ==========================================
    class Window_PetHUD extends Window_Base {
        initialize() {
            const width = 240;
            const height = this.fittingHeight(5);
            super.initialize(new Rectangle(10, 10, width, height));
            this.opacity = 0; 
            this._lastPetSlot = 0;
            this._lastStats = "";
        }

        update() {
            super.update();
            const pinnedSlot = $gameSystem ? $gameSystem._pinnedPetSlot : 0;
            
            if (pinnedSlot === 0 || !$gameSystem._deepPets || !$gameSystem._deepPets[pinnedSlot]) {
                this.visible = false;
                return;
            }

            this.visible = true;
            const pet = $gameSystem._deepPets[pinnedSlot];
            const statHash = `${pet.hunger}${pet.health}${pet.happiness}${pet.trust}`;
            
            if (this._lastPetSlot !== pinnedSlot || this._lastStats !== statHash) {
                this._lastPetSlot = pinnedSlot;
                this._lastStats = statHash;
                this.refresh(pet);
            }
        }

        refresh(pet) {
            this.contents.clear();
            this.changeTextColor(ColorManager.systemColor()); 
            this.drawText(pet.name + " Status:", 0, 0, this.innerWidth);
            
            this.contents.fontSize = 20;
            let y = this.lineHeight();
            const stats = ['hunger', 'health', 'happiness', 'trust'];
            
            stats.forEach(stat => {
                this.resetTextColor();
                this.drawText(stat.charAt(0).toUpperCase() + stat.slice(1) + ":", 10, y, 100);
                this.changeTextColor(ColorManager.textColor(6)); 
                
                const tierWord = $gameSystem.getPetTier(stat, pet[stat]);
                const percentage = Math.round(pet[stat]);
                this.drawText(`${tierWord} (${percentage}%)`, 110, y, this.innerWidth - 110);
                y += 24;
            });
            this.contents.fontSize = $gameSystem.mainFontSize();
        }
    }

    const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.call(this);
        this._petHudWindow = new Window_PetHUD();
        this.addWindow(this._petHudWindow);
    };

    // ==========================================
    // MAIN MENU UI
    // ==========================================
    const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        _Window_MenuCommand_addOriginalCommands.call(this);
        this.addCommand(menuName, 'pet', true);
    };

    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.setHandler('pet', this.commandPet.bind(this));
    };

    Scene_Menu.prototype.commandPet = function() {
        SceneManager.push(Scene_Pet);
    };

    class Window_PetList extends Window_Selectable {
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
            this._data = $gameSystem._deepPets ? Object.keys($gameSystem._deepPets).map(Number) : [];
            super.refresh();
        }

        item() {
            return this._data && this.index() >= 0 ? this._data[this.index()] : null;
        }

        maxItems() {
            return this._data ? this._data.length : 0;
        }

        select(index) {
            super.select(index);
            this.updateDetail();
        }

        drawItem(index) {
            const slotId = this._data[index];
	    if (!slotId) return;
            const pet = $gameSystem._deepPets[slotId];
	    if (!pet) return;
            const rect = this.itemLineRect(index);
            const isPinned = $gameSystem._pinnedPetSlot === slotId;
            
            this.resetTextColor();
            const prefix = isPinned ? "★ " : "  ";
            this.drawText(prefix + pet.name, rect.x, rect.y, rect.width);
        }

        updateDetail() {
            if (this._detailWindow && this._data && this._data.length > 0) {
                this._detailWindow.setPet(this._data[this.index()]);
            } else if (this._detailWindow) {
                this._detailWindow.setPet(null);
            }
        }
    }

    class Window_PetDetail extends Window_Base {
        initialize(rect) {
            super.initialize(rect);
            this._petSlot = null;
            this._previewItem = null;
            this._previewAmount = 0;
        }

        setPet(slotId) {
            if (this._petSlot !== slotId) {
                this._petSlot = slotId;
                this.refresh();
            }
        }

        setPreview(item, amount) {
            this._previewItem = item;
            this._previewAmount = amount;
            this.refresh();
        }

        refresh() {
            this.contents.clear();
            if (!this._petSlot || !$gameSystem._deepPets[this._petSlot]) return;

            const pet = $gameSystem._deepPets[this._petSlot];
            let y = 0;

            this.resetTextColor();
            this.drawTextEx("\\C[6]\\FS[36]" + pet.name, 0, y);
            y += this.lineHeight() * 2;

            const stats = ['hunger', 'health', 'happiness', 'trust'];
            
            stats.forEach(stat => {
                this.changeTextColor(ColorManager.systemColor());
                this.drawText(stat.charAt(0).toUpperCase() + stat.slice(1) + ":", 20, y, 150);
                
                this.resetTextColor();
                const tierWord = $gameSystem.getPetTier(stat, pet[stat]);
                const percentage = Math.round(pet[stat]);
                let displayText = `${tierWord} (${percentage}%)`;
                
                // Live Preview Logic
                if (this._previewItem && this._previewAmount > 0) {
                    const metaKey = 'Pet' + stat.charAt(0).toUpperCase() + stat.slice(1);
                    const bonus = Number(this._previewItem.meta[metaKey] || 0);
                    if (bonus !== 0) {
                        const newRaw = Math.max(0, Math.min(100, pet[stat] + (bonus * this._previewAmount)));
                        const newTier = $gameSystem.getPetTier(stat, newRaw);
                        const newPct = Math.round(newRaw);
                        // Using standard text arrow -> to prevent font rendering bugs
                        displayText += ` -> \\C[3]${newTier} (${newPct}%)\\C[0]`; 
                    }
                }
                
                this.drawTextEx(displayText, 180, y);
                y += this.lineHeight();
            });
        }
    }

    class Scene_Pet extends Scene_MenuBase {
        create() {
            super.create();
            const ww = 250;
            const wh = Graphics.boxHeight - this.buttonAreaHeight();
            
            this._listWindow = new Window_PetList(new Rectangle(0, this.buttonAreaHeight(), ww, wh));
            this._listWindow.setHandler('cancel', this.popScene.bind(this));
            this._listWindow.setHandler('ok', this.onPetOk.bind(this));
            this.addWindow(this._listWindow);

            this._detailWindow = new Window_PetDetail(new Rectangle(250, this.buttonAreaHeight(), Graphics.boxWidth - 250, wh));
            this.addWindow(this._detailWindow);
            
            this._listWindow.setDetailWindow(this._detailWindow);
            this._listWindow.activate();
        }

        onPetOk() {
            const slotId = this._listWindow.item();
            if (slotId) {
                if ($gameSystem._pinnedPetSlot === slotId) {
                    $gameSystem._pinnedPetSlot = 0;
                    AudioManager.playSe({ name: 'Cancel2', volume: 80, pitch: 100, pan: 0 });
                } else {
                    $gameSystem._pinnedPetSlot = slotId;
                    AudioManager.playSe({ name: 'Equip1', volume: 90, pitch: 100, pan: 0 });
                }
                this._listWindow.refresh();
            }
            this._listWindow.activate();
        }
    }

    // ==========================================
    // THE SMART FEEDING SCENE (V1.3 FEATURE)
    // ==========================================
    class Window_PetFoodList extends Window_ItemList {
        includes(item) {
            return isPetItem(item);
        }
        isEnabled(item) {
            return true; 
        }
    }

    class Window_PetFeedNumber extends Window_Selectable {
        initialize(rect) {
            super.initialize(rect);
            this._number = 1;
            this._max = 1;
            this._item = null;
            this.hide();
        }

        setup(item, max) {
            this._item = item;
            this._max = Math.max(1, max);
            this._number = 1;
            this.refresh();
            this.show();
            this.activate();
        }

        number() {
            return this._number;
        }

        refresh() {
            this.contents.clear();
            if (!this._item) return;
            this.drawItemName(this._item, 10, 0);
            this.drawText(`x ${this._number}`, 0, 0, this.innerWidth - 20, 'right');
            this.changeTextColor(ColorManager.systemColor());
            this.drawText("Use Left/Right to adjust", 0, this.lineHeight(), this.innerWidth, 'center');
        }

        update() {
            super.update();
            this.processNumberChange();
        }

        processNumberChange() {
            if (this.isOpenAndActive()) {
                let lastNumber = this._number;
                if (Input.isRepeated('right')) this._number++;
                if (Input.isRepeated('left')) this._number--;
                if (Input.isRepeated('up')) this._number += 10;
                if (Input.isRepeated('down')) this._number -= 10;
                
                this._number = Math.max(1, Math.min(this._max, this._number));
                
                if (this._number !== lastNumber) {
                    SoundManager.playCursor();
                    this.refresh();
                    if (this._statusWindow) this._statusWindow.setPreview(this._item, this._number);
                }
            }
        }

        setStatusWindow(window) {
            this._statusWindow = window;
        }
    }

    class Scene_PetFeed extends Scene_MenuBase {
        create() {
            super.create();
            this.createStatusWindow();
            this.createPetListWindow();
            this.createFoodListWindow();
            this.createNumberWindow();

            if ($gameTemp._feedMode === "Specific Pet") {
                this._petListWindow.hide();
                this._petListWindow.deactivate();
                this._statusWindow.setPet($gameTemp._feedSlot);
                this._foodListWindow.activate();
            } else {
                this._foodListWindow.deactivate();
                this._petListWindow.activate();
            }
        }

        createStatusWindow() {
            const rect = new Rectangle(0, this.buttonAreaHeight(), Graphics.boxWidth, 250);
            this._statusWindow = new Window_PetDetail(rect);
            this.addWindow(this._statusWindow);
        }

        createPetListWindow() {
            const rect = new Rectangle(0, 250 + this.buttonAreaHeight(), Graphics.boxWidth, Graphics.boxHeight - 250 - this.buttonAreaHeight());
            this._petListWindow = new Window_PetList(rect);
            this._petListWindow.setHandler('cancel', this.popScene.bind(this));
            this._petListWindow.setHandler('ok', this.onPetSelectOk.bind(this));
            this._petListWindow.setDetailWindow(this._statusWindow);
            this.addWindow(this._petListWindow);
        }

        createFoodListWindow() {
            const rect = new Rectangle(0, 250 + this.buttonAreaHeight(), Graphics.boxWidth, Graphics.boxHeight - 250 - this.buttonAreaHeight());
            this._foodListWindow = new Window_PetFoodList(rect);
            this._foodListWindow.setCategory('item');
            this._foodListWindow.setHandler('cancel', this.onFoodCancel.bind(this));
            this._foodListWindow.setHandler('ok', this.onFoodOk.bind(this));
            this.addWindow(this._foodListWindow);
        }

        createNumberWindow() {
            const width = 400;
            const height = this.calcWindowHeight(2, true);
            const x = (Graphics.boxWidth - width) / 2;
            const y = (Graphics.boxHeight - height) / 2;
            this._numberWindow = new Window_PetFeedNumber(new Rectangle(x, y, width, height));
            this._numberWindow.setHandler('cancel', this.onNumberCancel.bind(this));
            this._numberWindow.setHandler('ok', this.onNumberOk.bind(this));
            this._numberWindow.setStatusWindow(this._statusWindow);
            this.addWindow(this._numberWindow);
        }

        onPetSelectOk() {
            $gameTemp._feedSlot = this._petListWindow.item();
            this._petListWindow.hide();
            this._foodListWindow.activate();
        }

        onFoodCancel() {
            if ($gameTemp._feedMode === "Specific Pet") {
                this.popScene();
            } else {
                this._foodListWindow.deactivate();
                this._petListWindow.show();
                this._petListWindow.activate();
            }
        }

        onFoodOk() {
            const item = this._foodListWindow.item();
            const pet = $gameSystem._deepPets[$gameTemp._feedSlot];

	    if (!pet || !item) {
                SoundManager.playBuzzer();
                this._foodListWindow.activate();
                return;
            }
            
            // Smart Overfeed Protection Math
            let maxOwned = $gameParty.numItems(item);
            let needed = [];
            
            if (Number(item.meta.PetHunger) > 0) needed.push(Math.ceil((100 - pet.hunger) / Number(item.meta.PetHunger)));
            if (Number(item.meta.PetHealth) > 0) needed.push(Math.ceil((100 - pet.health) / Number(item.meta.PetHealth)));
            if (Number(item.meta.PetHappiness) > 0) needed.push(Math.ceil((100 - pet.happiness) / Number(item.meta.PetHappiness)));
            if (Number(item.meta.PetTrust) > 0) needed.push(Math.ceil((100 - pet.trust) / Number(item.meta.PetTrust)));

            let maxUsable = maxOwned;
            if (needed.length > 0) {
                const maxNeeded = Math.max(...needed);
                maxUsable = Math.min(maxOwned, maxNeeded);
            }

            if (maxUsable <= 0) {
                SoundManager.playBuzzer();
                this._foodListWindow.activate();
            } else {
                this._foodListWindow.deactivate();
                this._numberWindow.setup(item, maxUsable);
                this._statusWindow.setPreview(item, 1);
            }
        }

        onNumberCancel() {
            this._numberWindow.hide();
            this._numberWindow.deactivate();
            this._statusWindow.setPreview(null, 0);
            this._foodListWindow.activate();
        }

        onNumberOk() {
            const item = this._foodListWindow.item();
            const amount = this._numberWindow.number();
            const slotId = $gameTemp._feedSlot;

            if (item.meta.PetHunger) $gameSystem.updatePetStat(slotId, 'hunger', 'Add', Number(item.meta.PetHunger) * amount);
            if (item.meta.PetHealth) $gameSystem.updatePetStat(slotId, 'health', 'Add', Number(item.meta.PetHealth) * amount);
            if (item.meta.PetHappiness) $gameSystem.updatePetStat(slotId, 'happiness', 'Add', Number(item.meta.PetHappiness) * amount);
            if (item.meta.PetTrust) $gameSystem.updatePetStat(slotId, 'trust', 'Add', Number(item.meta.PetTrust) * amount);

            SoundManager.playUseItem();
            $gameParty.loseItem(item, amount);
            
            this._statusWindow.setPreview(null, 0);
            this._numberWindow.hide();
            this._numberWindow.deactivate();
            this._foodListWindow.refresh();
            this._foodListWindow.activate();
        }
    }

    window.Scene_Pet = Scene_Pet;
    window.Scene_PetFeed = Scene_PetFeed;

})();