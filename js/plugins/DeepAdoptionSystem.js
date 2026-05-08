/*:
 * @target MZ
 * @plugindesc (v1.1) Adoption Expansion for the Deep Pet System.
 * @author Deep-RPG Labs
 * @base DeepPetSystem
 * @orderAfter DeepPetSystem
 *
 * @command checkReady
 * @text Check Ready Pets
 * @desc Scans pets to see if they have perfect stats (0 Hunger, 100 Health/Happy/Trust).
 * @arg targetSlot
 * @text Target Slot (0 for Any)
 * @desc Type 0 to find the FIRST ready pet. Type a specific Slot ID (e.g., 2) to check ONLY that pet.
 * @type number
 * @default 0
 * @arg variableId
 * @text Store Result In Variable
 * @desc Saves the ready Slot ID here (or 0 if not ready).
 * @type variable
 * @default 1
 *
 * @command adoptOut
 * @text Adopt Out Pet
 * @desc Archives a pet, removing them from active care and adding them to the Scrapbook.
 * @arg slotId
 * @text Pet Slot to Adopt
 * @desc The Slot ID of the pet being adopted.
 * @type number
 * @default 1
 *
 * @command openScrapbook
 * @text Open Forever Homes Scrapbook
 * @desc Opens the UI showing all previously adopted pets.
 *
 * @help
 * ============================================================================
 * Deep Adoption System Help
 * ============================================================================
 * This is an expansion for the Deep Pet System.
 * * EVENT WORKFLOW FOR ADOPTION:
 * 1. Talk to an NPC.
 * 2. Run Plugin Command: "Check Ready Pets" (Save to Variable #5).
 * -> Use Target Slot 0 to check all pets, or a specific number to check one.
 * 3. Add a Conditional Branch: If Variable #5 is greater than 0:
 * Show Text: "Wow! [Pet Name] is ready for adoption!"
 * Reward the player (Change Gold: +500).
 * Run Plugin Command: "Adopt Out Pet" -> Target Slot: \V[5]
 * 4. Else:
 * Show Text: "No pets are fully healed yet!"
 */

(() => {
    'use strict';

    const pluginName = "DeepAdoptionSystem";

    // ==========================================
    // BACKEND ARCHIVE LOGIC
    // ==========================================
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._adoptedPets = []; // The Scrapbook Array
    };

    // ==========================================
    // PLUGIN COMMANDS
    // ==========================================
    PluginManager.registerCommand(pluginName, "checkReady", args => {
        const varId = Number(args.variableId);
        const targetSlot = Number(args.targetSlot || 0);
        let readySlot = 0;

        if ($gameSystem._deepPets) {
            if (targetSlot > 0) {
                // Check a SPECIFIC pet
                const pet = $gameSystem._deepPets[targetSlot];
                if (pet && pet.hunger === 0 && pet.health === 100 && pet.happiness === 100 && pet.trust === 100) {
                    readySlot = targetSlot;
                }
            } else {
                // Check ALL pets, stop at the first one
                for (const slot in $gameSystem._deepPets) {
                    const pet = $gameSystem._deepPets[slot];
                    // The Perfect Condition Check
                    if (pet.hunger === 0 && pet.health === 100 && pet.happiness === 100 && pet.trust === 100) {
                        readySlot = Number(slot);
                        break; // Stop scanning once we find one
                    }
                }
            }
        }
        $gameVariables.setValue(varId, readySlot);
    });

    PluginManager.registerCommand(pluginName, "adoptOut", args => {
        // If the argument is coming from a variable (e.g. they typed \V[5] in the command or we pass the raw number)
        // MZ handles plugin command args as strings. If you want to allow variables in the number box, we parse it.
        let slotId = Number(args.slotId);
        
        // Safety fallback if they put a variable in an older MZ build
        if (String(args.slotId).includes("\\V[")) {
            const vId = Number(String(args.slotId).replace(/\D/g, ""));
            slotId = $gameVariables.value(vId);
        }

        if ($gameSystem._deepPets && $gameSystem._deepPets[slotId]) {
            const pet = $gameSystem._deepPets[slotId];
            
            // Record the date of adoption (Uses the real-world date of the player's PC)
            pet.adoptionDate = new Date().toLocaleDateString();
            
            // Move to Archive
            if (!$gameSystem._adoptedPets) $gameSystem._adoptedPets = [];
            $gameSystem._adoptedPets.push(pet);
            
            // Delete from active roster
            delete $gameSystem._deepPets[slotId];
            
            // Safety: Unpin from HUD if the adopted pet was currently pinned
            if ($gameSystem._pinnedPetSlot === slotId) {
                $gameSystem._pinnedPetSlot = 0;
            }
        }
    });

    PluginManager.registerCommand(pluginName, "openScrapbook", args => {
        SceneManager.push(Scene_Scrapbook);
    });

    // ==========================================
    // SCRAPBOOK UI (THE FOREVER HOMES MENU)
    // ==========================================
    class Window_ScrapbookList extends Window_Selectable {
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
            this._data = $gameSystem._adoptedPets || [];
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
            const pet = this._data[index];
            if (!pet) return;
            const rect = this.itemLineRect(index);
            this.resetTextColor();
            // Draw a little heart icon (using standard text colors to simulate it)
            this.drawTextEx("\\C[10]♥ \\C[0]" + pet.name, rect.x, rect.y);
        }

        updateDetail() {
            if (this._detailWindow && this._data && this._data.length > 0) {
                this._detailWindow.setPet(this._data[this.index()]);
            } else if (this._detailWindow) {
                this._detailWindow.setPet(null);
            }
        }
    }

    class Window_ScrapbookDetail extends Window_Base {
        initialize(rect) {
            super.initialize(rect);
            this._pet = null;
        }

        setPet(pet) {
            if (this._pet !== pet) {
                this._pet = pet;
                this.refresh();
            }
        }

        refresh() {
            this.contents.clear();
            if (!this._pet) {
                this.drawText("No pets have been adopted yet.", 0, this.innerHeight / 2 - this.lineHeight(), this.innerWidth, 'center');
                this.drawText("Keep rehabilitating them!", 0, this.innerHeight / 2, this.innerWidth, 'center');
                return;
            }

            let y = 0;

            // Certificate Header
            this.changeTextColor(ColorManager.textColor(14)); // Yellow/Gold
            this.contents.fontSize = 40;
            this.drawText("Certificate of Adoption", 0, y, this.innerWidth, 'center');
            this.contents.fontSize = $gameSystem.mainFontSize();
            y += this.lineHeight() * 2;

            // Pet Name
            this.resetTextColor();
            this.drawText("This certifies that", 0, y, this.innerWidth, 'center');
            y += this.lineHeight();
            this.changeTextColor(ColorManager.textColor(6)); 
            this.contents.fontSize = 36;
            this.drawText(this._pet.name, 0, y, this.innerWidth, 'center');
            this.contents.fontSize = $gameSystem.mainFontSize();
            y += this.lineHeight() * 2;

            // Condition Message
            this.resetTextColor();
            this.drawText("was successfully rehabilitated with perfect health,", 0, y, this.innerWidth, 'center');
            y += this.lineHeight();
            this.drawText("trust, and happiness, and has found a Forever Home.", 0, y, this.innerWidth, 'center');
            y += this.lineHeight() * 2;

            // Date
            this.changeTextColor(ColorManager.systemColor());
            this.drawText("Adoption Date: ", 20, y, 200);
            this.resetTextColor();
            this.drawText(this._pet.adoptionDate || "Unknown", 180, y, 200);
        }
    }

    class Scene_Scrapbook extends Scene_MenuBase {
        create() {
            super.create();
            const ww = 250;
            const wh = Graphics.boxHeight - this.buttonAreaHeight();
            
            this._listWindow = new Window_ScrapbookList(new Rectangle(0, this.buttonAreaHeight(), ww, wh));
            this._listWindow.setHandler('cancel', this.popScene.bind(this));
            this.addWindow(this._listWindow);

            this._detailWindow = new Window_ScrapbookDetail(new Rectangle(250, this.buttonAreaHeight(), Graphics.boxWidth - 250, wh));
            this.addWindow(this._detailWindow);
            
            this._listWindow.setDetailWindow(this._detailWindow);
            this._listWindow.activate();
        }
    }

    window.Scene_Scrapbook = Scene_Scrapbook;

})();