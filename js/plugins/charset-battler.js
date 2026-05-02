/*:
 * @target MZ
 * @plugindesc (v1.8) Perfect Map Sprites as SV Battlers (Fixed Tints & Flashes).
 * @author Deep-RPG Labs
 *
 * @help
 * Required Notetag (In Actor or Enemy Note Box):
 * <CharsetBattler: Filename, Index>
 * * Customization Notetags:
 * <CharsetScale: 1.5>      (Size modifier. 1.0 is default)
 * <CharsetOffsetX: -20>    (Moves sprite left/right)
 * <CharsetOffsetY: 10>     (Moves sprite up/down)
 * <CharsetShadow: true>    (Forces shadow ON/OFF)
 * * Animations:
 * <CharsetFlying: true>    (Character swoops forward when attacking)
 * <CharsetBreathing: 1.0>  (Idle breathing animation. Set to 0 to disable)
 */

(() => {
    'use strict';

    function getCharsetMeta(battler, tag) {
        if (!battler) return null;
        if (battler.isActor() && battler.actor().meta[tag]) return battler.actor().meta[tag];
        if (battler.isEnemy() && battler.enemy().meta[tag]) return battler.enemy().meta[tag];
        return null;
    }

    // ====================================
    // THE BULLETPROOF FRAME LOCK
    // ====================================
    const _Sprite_setFrame = Sprite.prototype.setFrame;
    Sprite.prototype.setFrame = function(x, y, width, height) {
        if (this._isCharsetLocked && !this._allowSetFrame) return; 
        _Sprite_setFrame.call(this, x, y, width, height);
    };

    // ====================================
    // BATTLE SPRITE OVERRIDES
    // ====================================
    const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
    Sprite_Enemy.prototype.update = function() {
        _Sprite_Enemy_update.call(this);
        if (this._characterName && this._renderTarget && this._renderTarget.bitmap && this._renderTarget.bitmap.isReady()) {
            updateCharsetFrame.call(this);
            updateCharsetMotion.call(this);
            applyCharsetScale.call(this);
        }
    };

    const _Sprite_Actor_update = Sprite_Actor.prototype.update;
    Sprite_Actor.prototype.update = function() {
        _Sprite_Actor_update.call(this);
        if (this._characterName && this._renderTarget && this._renderTarget.bitmap && this._renderTarget.bitmap.isReady()) {
            updateCharsetFrame.call(this);
            updateCharsetMotion.call(this);
            applyCharsetScale.call(this);
        }
    };

    const _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
    Sprite_Enemy.prototype.updateBitmap = function() {
        if (setupCharsetBitmap.call(this, this._enemy)) return;
        clearCharsetSettings.call(this);
        _Sprite_Enemy_updateBitmap.call(this);
    };

    const _Sprite_Actor_updateBitmap = Sprite_Actor.prototype.updateBitmap;
    Sprite_Actor.prototype.updateBitmap = function() {
        if (setupCharsetBitmap.call(this, this._actor)) return;
        clearCharsetSettings.call(this);
        _Sprite_Actor_updateBitmap.call(this);
    };

    const _Sprite_Battler_requestMotion = Sprite_Battler.prototype.requestMotion;
    Sprite_Battler.prototype.requestMotion = function(motionType) {
        _Sprite_Battler_requestMotion.call(this, motionType);
        if (this._charFlying && motionType) {
            if (['thrust', 'swing', 'missile', 'skill', 'spell'].includes(motionType)) {
                this._swoopTimer = 20; 
                this._swoopMax = 20;
            }
        }
    };

    const _Sprite_Battler_updatePosition = Sprite_Battler.prototype.updatePosition;
    Sprite_Battler.prototype.updatePosition = function() {
        _Sprite_Battler_updatePosition.call(this);
        if (this._characterName) {
            let swoopX = 0;
            let swoopY = 0;

            if (this._swoopTimer > 0) {
                const progress = this._swoopTimer / this._swoopMax; 
                const arc = Math.sin(progress * Math.PI); 

                swoopY = -arc * 40; 
                // Fix: Enemies move Right (+1), Actors move Left (-1)
                const swoopDirection = this instanceof Sprite_Enemy ? 1 : -1;
                swoopX = arc * 60 * swoopDirection; 
                
                this._swoopTimer--;
            }

            if (this._charOffsetX || swoopX !== 0) this.x += this._charOffsetX + swoopX;
            if (this._charOffsetY || swoopY !== 0) this.y += this._charOffsetY + swoopY;
        }
    };

    const _Sprite_Battler_updateShadow = Sprite_Battler.prototype.updateShadow;
    Sprite_Battler.prototype.updateShadow = function() {
        _Sprite_Battler_updateShadow.call(this);
        if (this._characterName && this._charShadow !== null && this._shadowSprite) {
            this._shadowSprite.visible = this._charShadow;
            this._shadowSprite.opacity = this._charShadow ? 255 : 0;
        }
    };

    const _Sprite_Enemy_updateStateSprite = Sprite_Enemy.prototype.updateStateSprite;
    if (_Sprite_Enemy_updateStateSprite) {
        Sprite_Enemy.prototype.updateStateSprite = function() {
            if (this._characterName && (!this._renderTarget || !this._renderTarget.bitmap || !this._renderTarget.bitmap.isReady())) return;
            try { _Sprite_Enemy_updateStateSprite.call(this); } 
            catch (e) { if (this._stateIconSprite) this._stateIconSprite.y = -30; }
        };
    }

    // ====================================
    // SHARED LOGIC
    // ====================================
    function setupCharsetBitmap(battler) {
        const metaTag = getCharsetMeta(battler, 'CharsetBattler');
        if (!metaTag) return false;

        const params = metaTag.split(',').map(s => s.trim());
        const characterName = params[0];
        const characterIndex = params.length > 1 ? parseInt(params[1], 10) : 0;

        if (this._characterName !== characterName || this._characterIndex !== characterIndex) {
            this._characterName = characterName;
            this._characterIndex = characterIndex;
            
            this._charScale = Number(getCharsetMeta(battler, 'CharsetScale')) || 1.0;
            this._charOffsetX = Number(getCharsetMeta(battler, 'CharsetOffsetX')) || 0;
            this._charOffsetY = Number(getCharsetMeta(battler, 'CharsetOffsetY')) || 0;
            this._charBreathing = Number(getCharsetMeta(battler, 'CharsetBreathing')) || 0;
            
            const flyMeta = getCharsetMeta(battler, 'CharsetFlying');
            this._charFlying = flyMeta ? flyMeta.trim().toLowerCase() === 'true' : false;

            const shadowMeta = getCharsetMeta(battler, 'CharsetShadow');
            this._charShadow = shadowMeta ? shadowMeta.trim().toLowerCase() === 'true' : null;

            const charBmp = ImageManager.loadCharacter(characterName);

            // Determine Target to fix VisuStella Tints
            if (this instanceof Sprite_Enemy) {
                if (this._mainSprite) { 
                    // VisuStella SV Target
                    this._renderTarget = this._mainSprite;
                    this._mainSprite.visible = true; 
                    this.bitmap = null; // Hide parent to prevent ghosting
                    this.setFrame(0, 0, 0, 0); 
                    
                    if (this._svBattlerSprite) this._svBattlerSprite.visible = false;
                } else { 
                    // Vanilla Target
                    this._renderTarget = this;
                }
            } else { 
                // Actor Target
                this._renderTarget = this._mainSprite;
            }

            this._renderTarget.bitmap = charBmp;
            this._renderTarget._isCharsetLocked = true;

            this._pattern = 0;
            this._animCount = 0;
            this._breathTick = Math.random() * 1000; 
            this._swoopTimer = 0;
            this._isCharsetAnimRunning = true;
            this._battlerName = ""; 
        }
        return true;
    }

    function clearCharsetSettings() {
        this._characterName = null;
        this._characterIndex = 0;
        this._isCharsetAnimRunning = false;
        
        if (this._renderTarget) {
            this._renderTarget._isCharsetLocked = false;
            this._renderTarget = null;
        }
    }

    function updateCharsetFrame() {
        if (!this._renderTarget || !this._renderTarget.bitmap) return;

        const bitmap = this._renderTarget.bitmap;
        const isBigCharacter = ImageManager.isBigCharacter(this._characterName);
        const blocksX = isBigCharacter ? 3 : 12;
        const blocksY = isBigCharacter ? 4 : 8;

        const pw = Math.floor(bitmap.width / blocksX);
        const ph = Math.floor(bitmap.height / blocksY);

        this._pattern = (this._pattern || 0) % 3;
        
        let bx = 0;
        let by = 0;

        if (!isBigCharacter) {
            const index = this._characterIndex || 0;
            bx = (index % 4) * 3 * pw;
            by = Math.floor(index / 4) * 4 * ph;
        }

        const sx = bx + (this._pattern * pw);
        const facingRow = this instanceof Sprite_Enemy ? 2 : 1; 
        const sy = by + (facingRow * ph);

        this._renderTarget._allowSetFrame = true;
        this._renderTarget.setFrame(sx, sy, pw, ph);
        this._renderTarget._allowSetFrame = false;
    }

    function updateCharsetMotion() {
        if (!this._isCharsetAnimRunning) {
            this._isCharsetAnimRunning = true;
            this._pattern = 0;
            this._animCount = 0;
        }
        this._animCount++;
        
        if (this._animCount >= 10) { 
            this._pattern = (this._pattern + 1) % 3;
            this._animCount = 0;
        }
    }

    function applyCharsetScale() {
        if (this._charScale !== undefined && this._renderTarget) {
            let breathEffect = 0;
            
            if (this._charBreathing > 0) {
                this._breathTick++;
                breathEffect = Math.sin(this._breathTick * 0.05 * this._charBreathing) * 0.04; 
            }

            const signX = this._renderTarget.scale.x >= 0 ? 1 : -1;
            this._renderTarget.scale.x = this._charScale * signX;
            this._renderTarget.scale.y = this._charScale * (1 + breathEffect);
        }
    }

})();