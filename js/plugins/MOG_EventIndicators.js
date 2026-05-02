//=============================================================================
// MOG_EventIndicators.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.0) Apresenta indicadores animados acima do evento.
 * @author Moghunter
 * @url https://mogplugins.com
 * 
 * @param Default Font Size
 * @desc Definição do tamanho da fonte.
 * @default 16
 * 
 * @param Default X - Axis
 * @desc Posição X-Axis do indicador.
 * @default 0
 * 
 * @param Default Y - Axis
 * @desc Posição Y-Axis do indicador.
 * @default 0
 *
 * @command Text_Indicator
 * @desc Apresentar um Indicador em cima do Evento.
 * @text Set Indicator
 *
 * @arg evenID
 * @desc Define a ID do evento.
 * @text Event ID
 * @default 1
 * @type number
 * @min 1
 * 
 * @arg image
 * @text File Image
 * @desc Definição do nome de arquivo.
 * @type file
 * @dir img/eventindicators/
 * @default 
 *
 * @arg text
 * @desc Define o text a ser apresentado.
 * @text Text
 * @default 
 * @type string
 *
 * @arg variable_id
 * @desc Define a variável a ser apresentada.
 * Não pode ser usada quando o texto estiver ativado
 * @text Variable ID
 * @default 0
 * @type number
 * 
 * @arg x_offset
 * @desc Define a posição X do indicador.
 * @text X Offset
 * @default 0
 * @type number
 *
 * @arg y_offset
 * @desc Define a posição Y do indicador.
 * @text Y Offset
 * @default 0
 * @type number
 * 
 * @arg vis_range
 * @desc Alcance da visibilidade.
 * 0 = Sempre Visível
 * @text Visibility Range
 * @default 0
 * @type number
 * @min 0
 *
 * @arg zoom
 * @desc Define o poder do zoom do Indicador.
 * @text Zoom Power (Effect)
 * @default 0
 * @type number
 * @min 0
 * @max 300 
 * 
 * @arg rot_speed
 * @desc Define a velocidade de rotação
 * @text Rotation (Effect)
 * @default 0
 * @type number
 * @min 0
 * @max 10 
 *
 * @arg shake_power
 * @desc Define a força do tremor.
 * @text Shake (Effect)
 * @default 0
 * @type number
 * @min 0
 * @max 30  
 *
 * @arg slide_animation
 * @desc Define o Efeito de deslizar
 * @text Slide Animation (Effect)
 * @default No Effect
 * @type select
 * @option No Effect
 * @value No Effect
 * @option Slide
 * @value Slide
 * @option Float
 * @value Float
 * 
 * @arg frames
 * @desc Imagem animada por frames. FileName + index.png
 * (Image_0.png,Image_1.png,Image_2.png...)
 * @text Frame Animation
 * @default 0
 * @type number
 *
 * @arg frameSpeed
 * @desc Define a velocidade da animação.
 * @text Frame Speed
 * @default 10
 * @type number 
 * @min 1
 * @max 120
 *
 * @command Remove_Indicator
 * @desc Remove o indicador do evento.
 * @text Remove Indicator
 *
 * @arg evenID
 * @desc Define a ID do evento.
 * @text Event ID
 * @default 1
 * @type number
 * @min 1
 *  
 * @help  
 * =============================================================================
 * ♦♦♦ MOG - Event Indicators (v1.0) ♦♦♦
 * Author   -   Moghunter
 * Version  -   1.0
 * Updated  -   2025/10/16
 * https://mogplugins.com
 * =============================================================================
 * Apresenta indicadores animados acima do evento.
 *
 * =============================================================================
 * IMAGES
 * =============================================================================
 * Grave as imagens dos indicadores na pasta /img/eventidicators/
 *
 * -----------------------------------------------------------------------------
 * ANIMATED (Frames)
 * -----------------------------------------------------------------------------
 * Se a função "Animated" estiver ativada nomeie as imagens da seguinte forma.
 *
 * FILENAME + _INDEX.png
 *
 * EG
 * Flower_0.png
 * Flower_1.png
 * Flower_2.png
 * ...
 *
 * =============================================================================
 * COMMENT (EVENT)
 * =============================================================================
 * Para ativar o indicador coloque os comentário abaixo no evento.
 *
 * ------------------------------------------------------------------------------
 *
 * indicator : FILENAME : X : Y
 *
 * FILENAME - Definição do nome de arquivo. 
 * X - Definição X-Axis da imagem.
 * Y - Definição Y-Axis da imagem.
 *
 * =============================================================================
 * EXTRA COMMENT (OPTIONAL)
 * =============================================================================
 *
 * TEXT - Para adicionar um texto no indicador coloque o comentário abaixo.
 *
 * text_indicator : TEXT
 *
 * ------------------------------------------------------------------------------
 * VARIABLE - Para apresentar um valor de variável use o comentário abaixo.
 *
 * variable_indicator : VARIABLE_ID
 *  
 * ------------------------------------------------------------------------------
 * RANGE VISIBILITY - Para ativar a visibilidade por distância, coloque este
 * comentário.
 *
 * range_indicator : RANGE
 *
 * ------------------------------------------------------------------------------
 * ANIMATED - Para ativar a animaçãp por frames coloque este comentário.
 *
 * animated_indicator : FRAMES : ANIMATION_SPEED
 *
 * ------------------------------------------------------------------------------
 * FONT_SIZE - Para ajustar o tamanho da fonte coloque o comentário abaixo.
 *
 * fontsize_indicator : FontSize
 *  
 * ------------------------------------------------------------------------------
 * BLEND MODE - Para ajustar o tipo de blend coloque o comentário abaixo.
 *
 * blendmode_indicator : BLEND_MODE
 *
 * ------------------------------------------------------------------------------
 * ROTATION - Para ativar a animação de rotação coloque o comentário abaixo.
 *
 * rotation_indicator : ROTATION_SPEED
 * 
 * ------------------------------------------------------------------------------
 * SHAKE - Para ativar a animação de tremer coloque o comentário abaixo.
 *
 * shake_indicator : SHAKE_POWER
 * ------------------------------------------------------------------------------
 * PULSE - Para ativar a animação de pulse coloque o comentário abaixo.
 *
 * pulse_indicator : PULSE_POWER
 *
 * ------------------------------------------------------------------------------
 * FLOAT - Para ativar a animação de levitação coloque o comentário abaixo.
 *
 * float_indicator
 *
 * ------------------------------------------------------------------------------
 * SLIDE - Para ativar a animação de deslize coloque o comentário abaixo.
 *
 * slide_indicator
 *
 * ------------------------------------------------------------------------------
 * CLEAR - Para apagar o indicador use o comentário abaixo.
 *
 * clear_indicator
 * 
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_EventIndicators = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_EventIndicators');
    Moghunter.eventInd_FontSize = Number(Moghunter.parameters['Default Font Size'] || 16);
    Moghunter.eventInd_X = Number(Moghunter.parameters['Default X - Axis'] || 0);
    Moghunter.eventInd_Y = Number(Moghunter.parameters['Default Y - Axis'] || 0);

   PluginManager.registerCommand('MOG_EventIndicators', "Text_Indicator", data => {
   	     var event_id = Number(data.evenID);	 
		 var image = String(data.image);
		 var frames = Number(data.frames);
		 var frameSpeed = Number(data.frameSpeed);
	     var text = String(data.text);
		 var variable_id = Number(data.variable_id);
		 var x = Number(data.x_offset);
		 var y = Number(data.y_offset);
		 var vis_range = Math.abs(Number(data.vis_range));
		 var zoom = Number(data.zoom * 0.001);
		 var rot_speed = Number(data.rot_speed * 0.01);
		 var shake_power = Number(data.shake_power * 2);
		 var slide_animation = String(data.slide_animation);		 
         $gameMap.setIndText(event_id,image,frames,frameSpeed,text,variable_id,x,y,vis_range,zoom,rot_speed,shake_power,slide_animation);
   });	

   PluginManager.registerCommand('MOG_EventIndicators', "Remove_Indicator", data => {
   	     var event_id = Number(data.evenID);	 
         $gameMap.removeInd(event_id);
   });	

//=============================================================================
// ** ImageManager
//=============================================================================	

//=============================
// ** Load Event Indicator
//=============================
ImageManager.loadPEventIndicator = function(filename) {
    return this.loadBitmap('img/eventindicators/', filename, 0, true);
};	
	
//=============================================================================
// ■■■ Game System ■■■
//=============================================================================	

//==============================
// * Initialize
//==============================
var _mog_eventInd_gsys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_mog_eventInd_gsys_initialize.call(this);
	this._eventIndVis = true;
};

//=============================================================================
// ■■■ Game Map ■■■
//=============================================================================	

//==============================
// * set Ind Text
//==============================
Game_Map.prototype.setIndText = function(event_id,image,frames,frameSpeed,text,variable_id,x,y,vis_range,zoom,rot_speed,shake_power,slide_animation) {
     var char = this.findTargetEvent(event_id);
	 if (!char) {return};
	 if (frames > 1) {var image = (image).slice(0,image.length - 2)};
     char.clearIndicators();
	 char.setIndicators(image,0,false,0,0,"",0,false,false,0,true,x,y);
	 char._indData.ref = true;
	 if (variable_id == 0) {
	     char._indData.text = String(text);
		 char._indData.mode = 1
	 } else {
	     char._indData.mode = 2
	 };
     this.setIndEffects(char,frames,frameSpeed,vis_range,zoom,rot_speed,shake_power,slide_animation);
}

//==============================
// * remove Ind
//==============================
Game_Map.prototype.removeInd = function(event_id) {
	var char = this.findTargetEvent(event_id);
	if (!char) {return};
	char.clearIndicators();
	char._indData.ref = true;
};

//==============================
// * set Ind Effects
//==============================
Game_Map.prototype.setIndEffects = function(char,frames,frameSpeed,vis_range,zoom,rot_speed,shake_power,slide_animation) {
	 if (zoom != 0) {
	     char._indData.zoomE = [true,zoom,0];
	 };
  	 if (vis_range != 0) {
		 char._indData.range = true;
		 char._indData.rangeD = vis_range;
	 };
	 char._indData.fontSize = 24;
	 if (rot_speed != 0) {
	     char._indData.rotation = [true,rot_speed];
	 };
	 if (shake_power != 0) {
	     char._indData.shake = [true,shake_power,0,0,0];
	 };
     char._indData.aniMode = this.checkSlideAnimation(slide_animation);
	 if (frames > 1) {
	     char._indData.animated = true;
		 char._indData.frames = [0,frames,0,frameSpeed]; 	 
	 };	 	 
};
//==============================
// * check Slide Animation
//==============================
Game_Map.prototype.checkSlideAnimation = function(slide_animation) {
    if (String(slide_animation) === "Float") {	 
	    return 1;
	} else if (String(slide_animation) === "Slide") {
		return 2;
	};
	return 0
};

//==============================
// * findTargetEvent
//==============================
Game_Map.prototype.findTargetEvent = function(event_id) {
	var target_event = null;
	this.events().forEach(function(event) {
        if (event.eventId() === (event_id) && !event._erased) {
	        target_event = event;
		};
    }, this);
	return target_event;
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _mog_eventInd_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_mog_eventInd_pluginCommand.call(this,command, args)
    this.setIndInterpreter(command, args);
	return true;
};

//==============================
// * set Ind Interpreter
//==============================
Game_Interpreter.prototype.setIndInterpreter = function(command, args) {
	var event_id = 0 ; var indV = false; var indE = false; var indF = false;
	var indR = false; var indA = false; var indO = false; var indB = false;
	var indRot = false ; var indShake = false; var indZoom = false; 
	var x = 0; var y = 0 ; var indFloat = false; var indSlide = false;
	var indText = false; 
	var indClear = false ; var char = null;
	if (command === "hide_all_indicators") {
        $gameSystem._eventIndVis = false;
    } else if (command === "show_all_indicators") {
        $gameSystem._eventIndVis = true;
	};
	if (command === "hide_indicator")  {
		var event_id = Number(args[1]);
		var enable = false;
		var indV = true;
	} else if (command === "show_indicator")  { 
		var event_id = Number(args[1]);
		var enable = true;	
		var indV = true;
	};	
	if (command === "indicator")  { 
	    var event_id = Number(args[1]);
	    var fileName = String(args[3]);
		var x = Number(args[5]);
		var y = Number(args[7]);
		var mode = 0;
		var id = 0;
		var indE = true;
	};
	if (command === "text_indicator")  {
		var event_id = Number(args[1]);
		var text = ""
		for (var i = 3; i < args.length; i++) {
			  text += args[i] + " ";
		};
		var indText = true;
		var id = 0
	}
	if (command === "variable_indicator")  { 	
		var event_id = Number(args[1]);
		var text = "VariableMode"
		var id = Number(args[3]);
		var indText = true;
	};	
	if (command === "range_indicator")  {
		var event_id = Number(args[1]);
		var indR = true;
		var range = true
		var d = Number(args[3]); 
	};
	if (command === "animated_indicator")  {
		var event_id = Number(args[1]);
		var indA = true;
		var animated = true		
		var frames = Number(args[3]);
		var frameSpeed = Number(args[5]);		
	};	
	if (command === "fontsize_indicator")  {
		var event_id = Number(args[1]);
		var indF = true;
		var fs = Number(args[3]);
	};
	if (command === "blendmode_indicator")  {
		var event_id = Number(args[1]);
		var indB = true;
		var blendMode = Number(args[3]);
	};		
	if (command === "rotation_indicator")  {
		var event_id = Number(args[1]);
		var indRot = true;
		var rots = Number(args[3]);
	};
	if (command === "shake_indicator")  {
		var event_id = Number(args[1]);
		var indShake = true;
		var shake = Number(args[3]);
	};
	if (command === "pulse_indicator")  {
		var event_id = Number(args[1]);
		var indZoom = true;
		var zoom = Number(args[3]);
	};
	if (command === "float_indicator")  {
		var event_id = Number(args[1]);
		var indFloat = true;
	};	
	if (command === "slide_indicator")  {
		var event_id = Number(args[1]);
		var indSlide = true;
	};		
	if (command === "clear_indicator")  {
		var event_id = Number(args[1]);
		var indClear = true;
	};						
	if (event_id > 0) {
		$gameMap.events().forEach(function(event) {
		if (event.eventId() === event_id) {char = event};
		}, this);
	};
	if (char) {
			if (indV) {char._indData.visible = enable};
			if (indE) {
				char.setIndicators(fileName,0,false,0,0,"",0,false,false,0,true,x,y);
			};
			if (indR) {
				char._indData.ref = true;
				char._indData.range = true;
				char._indData.rangeD = d;
			};
			if (indA) {
				char._indData.ref = true;
				char._indData.animated = true;
				char._indData.frames = [0,frames,0,frameSpeed]; 
			};			
			if (indO) {
				char._indData.ref = true;
				char._indData.x = xi;
				char._indData.x = yi;
			};
			if (indF) {
				char._indData.ref = true;
				char._indData.fontSize = fs;
			};
			if (indB) {
				char._indData.ref = true;
				char._indData.blendMode = blendMode;
			};
			if (indRot) {
				char._indData.rotation = [true,rots];
			};
			if (indShake) {
				char._indData.shake = [true,shake,0,0,0];	
			};
			if (indZoom) {
				char._indData.zoomE = [true,zoom,0];	
			};
			if (indFloat) {
				char._indData.aniMode = 1;	
			};			
			if (indSlide) {
				char._indData.aniMode = 2;	
			};				
			if (indText) {
				char._indData.ref = true;
				char._indData.text = String(text);
				char._indData.mode = String(text) === "VariableMode" ? 2 : 1;
				char._indData.id = id;
			};			
			if (indClear) {
			    char.clearIndicators();
				char._indData.ref = true;
			};		
	};
};

//=============================================================================
// ** Character Base
//=============================================================================

//==============================
// * Init Members
//==============================
var _mog_evenInd_cbase_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
    _mog_evenInd_cbase_initMembers.call(this);
	this.clearIndicators();
};

//==============================
// * clear Indicators
//==============================
Game_CharacterBase.prototype.clearIndicators = function() {
	this._indData = {};
	this._indData.enable = false;
	this._indData.mode = 0;
	this._indData.ref = false;
	this._indData.fileName = "";
	this._indData.text = ""
	this._indData.aniMode = 0; 
	this._indData.range = false;
	this._indData.rangeD = 4;
	this._indData.sprite = {};
	this._indData.ani = [0,0,0,0,0];
	this._indData.Id = 0;
	this._indData.animated = false;
	this._indData.frames = [0,0,0,20];
	this._indData.x = 0;
	this._indData.y = 0;
	this._indData.visible = true;
	this._indData.force = false;
	this._indData.fontSize = Number(Moghunter.eventInd_FontSize);
	this._indData.blendMode = 0;
	this._indData.rotation = [false,0.01];
	this._indData.shake = [false, 10,0,0,0];
	this._indData.zoomE = [false, 0.01,0,0,0];
	this._indData.text = null;
};

//==============================
// * set Indicators
//==============================
Game_CharacterBase.prototype.setIndicators = function(fileName,animode,range,d,mode,text,id,animated,frames,frameSpeed,force,x,y) {
	this._indData.enable = true;
	this._indData.ref = true;
	this._indData.fileName = fileName ? String(fileName) : "";
	this._indData.mode = 0;
	this._indData.text = "";
	this._indData.aniMode = 0; 
	this._indData.id = 0;
	this._indData.sprite = {};
	this._indData.ani = [0,0,0,0,0];
	this._indData.id = 0;
	this._indData.visible = true;
	this._indData.force = String(force) === "true" ? true : false;
	this._indData.x = x ? Number(x) : 0;
	this._indData.y = y ? Number(y) : 0;	
	this._indData.animated = false;
	this._indData.frames = [0,0,0,20];
	this._indData.blendMode = 0;
	this._indData.rotation = [false,0.01];
	this._indData.shake = [false, 10,0,0,0];
	this._indData.zoomE = [false, 0.01,0,0,0];
	this._indData.text = null;	
};

//=============================================================================
// ** Game Event
//=============================================================================

//==============================
// * Setup Page
//==============================
var _mog_evenInd_gevent_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_mog_evenInd_gevent_setupPage.call(this);
    this.checkIndicatorComments();
};

//==============================
// * check Indicator Comments
//==============================
Game_Event.prototype.checkIndicatorComments = function() {
 	var needClear = true;
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
	       if (l.code === 108) {var comment = l.parameters[0].split(' : ')
		           if (!this._indData.force) {
					   if (comment[0].toLowerCase() == "indicator"){
						   this.setIndicators(comment[1],0,false,0,0,"",0,false,0,0,false,comment[2],comment[3]);
						   needClear = false;
					   };
					   if (comment[0].toLowerCase() == "text_indicator"){
						   this._indData.ref = true;
						   this._indData.text = String(comment[1]);
						   this._indData.mode = 1;
						   this._indData.id = 0;
					   };					   
					   if (comment[0].toLowerCase() == "variable_indicator"){
						   this._indData.ref = true;
						   this._indData.text = "";
						   this._indData.mode = 2;
						   this._indData.id = Number(comment[1]);
					   };							   
					   if (comment[0].toLowerCase() == "range_indicator"){
						   this._indData.ref = true;
						   this._indData.range = true;
						   this._indData.rangeD = Number(comment[1]);	   
					   };
					   if (comment[0].toLowerCase() == "animated_indicator"){
						   this._indData.ref = true;
						   this._indData.animated = true;
						   this._indData.frames = [0,Number(comment[1]),0,Number(comment[2])];   
					   };
					   if (comment[0].toLowerCase() == "xyoffset_indicator"){
						   this._indData.x = Number(comment[1]);
						   this._indData.y = Number(comment[2]);
					   };				   		   
					   if (comment[0].toLowerCase() == "fontsize_indicator"){
						   this._indData.ref = true;
						   this._indData.fontSize = Number(comment[1]);
					   };
					   if (comment[0].toLowerCase() == "blendmode_indicator"){
						   this._indData.ref = true;
						   this._indData.blendMode = Number(comment[1]);
					   };	
					   if (comment[0].toLowerCase() == "rotation_indicator"){
						   this._indData.rotation = [true,Number(comment[1])]
					   };
					   if (comment[0].toLowerCase() == "shake_indicator"){
						   this._indData.shake = [true,Number(comment[1]),0,0,0];
					   };
					   if (comment[0].toLowerCase() == "pulse_indicator"){
						   this._indData.zoomE = [true,Number(comment[1]),0];
					   };
					   if (comment[0].toLowerCase() == "float_indicator"){
						   this._indData.aniMode = 1;
					   };
					   if (comment[0].toLowerCase() == "slide_indicator"){
						   this._indData.aniMode = 2;
					   };					   					   
					   if (comment[0].toLowerCase() == "clear_indicator"){
						   this.clearIndicators();
						   this._indData.ref = true;
					   };
		           };
			   };
	}, this);};
	if (needClear) {this.clearIndicators();this._indData.ref = true};
};

//==============================
// * Setup Page
//==============================
var _mog_eventInd_gevent_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	this.clearIndicators();
	_mog_eventInd_gevent_setupPage.call(this);
};

//=============================================================================
// ** Spriteset Map
//=============================================================================

//==============================
// * create Lower Layer
//==============================
var _mog_eventIndicators_srmap_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function() {
	_mog_eventIndicators_srmap_createLowerLayer.call(this);
	this.createEventIndicators();
};

//==============================
// * create Event Indicators
//==============================
Spriteset_Map.prototype.createEventIndicators = function() {
	this._indicatorsField = new Sprite();
	this._baseSprite.addChild(this._indicatorsField);
	this._eventIndicators = [];
	for (var i = 0; i < this._characterSprites.length; i++) {
	     this._eventIndicators[i] = new EventIndicators(this._characterSprites[i]);
		 this._indicatorsField.addChild(this._eventIndicators[i]);
    };
};

//=============================================================================
// ** Event Indicators
//=============================================================================
function EventIndicators() {
    this.initialize.apply(this, arguments);
};

EventIndicators.prototype = Object.create(Sprite.prototype);
EventIndicators.prototype.constructor = EventIndicators;

//==============================
// * Initialize
//==============================
EventIndicators.prototype.initialize = function(sprite) {
    Sprite.prototype.initialize.call(this);
	this._spriteChar = sprite;
	this._varValue = 0;
	this._pos = [Number(Moghunter.eventInd_X),Number(Moghunter.eventInd_Y)];
	this.opacity = 0;
	if (this.character()) {this.data().ref = true};
};

//==============================
// * Sprite
//==============================
EventIndicators.prototype.sprite = function() {
    return this._spriteChar;
};

//==============================
// * Character
//==============================
EventIndicators.prototype.character = function() {
    return this._spriteChar._character;
};

//==============================
// * Data
//==============================
EventIndicators.prototype.data = function() {
    return this.character()._indData;
};

//==============================
// * posXS
//==============================
EventIndicators.prototype.posXS = function() {
    return this._spriteChar.x + this.data().ani[0] + this._pos[0] + this.data().x + this.data().shake[2];
};

//==============================
// * posYS
//==============================
EventIndicators.prototype.posYS = function() {
    return this._spriteChar.y + this.data().ani[1] + this._pos[1] + this.data().y + this.data().shake[3];
};

//==============================
// * remove Sprites 
//==============================
EventIndicators.prototype.removeSprites = function() {
    this.removeChild(this._indicator);
	this.removeChild(this._text);
};

//==============================
// * refresh Sprites 
//==============================
EventIndicators.prototype.refreshSprites = function() {
	this.data().ref = false;
	this.removeSprites();
	if (this.data().enable) {this.createSprites()
	} else {this.character().clearIndicators()};
};

//==============================
// * need refresh Sprites 
//==============================
EventIndicators.prototype.needRefreshSprites = function() {
    if (this.data().ref) {return true};
	return false
};

//==============================
// * create Sprites 
//==============================
EventIndicators.prototype.createSprites = function() {
	this.loadBitmaps();
	this.opacity = 0;
	this.scale.x = 1.00;
	this.scale.y = this.scale.x;
	this.rotation = 0;
	this.createSpriteIndicator();
	if (this.data().mode > 0){this.createText()};
	if (this.data().sprite.x) {
		this.loadDataSprite()
	} else {
	    this.data().ani = [0,0,0,0,0];
	};
};

//==============================
// * Img File
//==============================
EventIndicators.prototype.imgFile = function() {
	if (this._img[this.data().frames[0]]) {
        return this._img[this.data().frames[0]];
	} else {
		return new Bitmap(32,32);
	};
};

//==============================
// * load Bitmaps
//==============================
EventIndicators.prototype.loadBitmaps = function() {
    this._img = []
	if (!this.data().animated) {
		if (this.data().fileName) {
		    this._img[0] = ImageManager.loadPEventIndicator(this.data().fileName);
		} else {
		    this._img[0] = new Bitmap(32,32);
		};
	} else {
		    this.data().frames[2] = this.data().frames[3];
			for (var i = 0; i < this.data().frames[1]; i++) {
			var fileName = String(this.data().fileName + "_" + i);
			this._img[i] = ImageManager.loadPEventIndicator(fileName);
		};
	};
};

//==============================
// * create Sprites Indicator
//==============================
EventIndicators.prototype.createSpriteIndicator = function() {
	this._indicator = new Sprite(this.imgFile());
	this._indicator.anchor.x = 0.5;
	this._indicator.anchor.y = 1;
	this._indicator.blendMode = this.data().blendMode;
	this.addChild(this._indicator);
};

//==============================
// * refresh Bitmap
//==============================
EventIndicators.prototype.refreshBitmap = function() {
	this._indicator.bitmap = this.imgFile();
};

//==============================
// * create Text
//==============================
EventIndicators.prototype.createText = function() {
	this._text = new Sprite(new Bitmap(200,40));
	this._text.anchor.x = 0.5;
	this._text.anchor.y = 1;
	this._text.bitmap.fontSize = this.data().fontSize;
	this._text.blendMode = this.data().blendMode;
	this.addChild(this._text);
	this.refreshText();
};

//==============================
// * refresh Text
//==============================
EventIndicators.prototype.refreshText = function() {
	 this._text.bitmap.clear();
     var text = this.data().mode === 1 ? String(this.data().text) : Number($gameVariables.value(this.data().id));
	 this._text.bitmap.drawText(text,0,0,200,40,"center");
	 if (this.data().mode === 2) {this._varValue = $gameVariables.value(this.data().id)};
};

//==============================
// * need Refresh Text
//==============================
EventIndicators.prototype.needRefreshText = function() {
	if (this.data().mode != 2) {return false};
	if (this._varValue != $gameVariables.value(this.data().id)) {return true};
	return false
};

//==============================
// * update Main Sprite
//==============================
EventIndicators.prototype.updateMainSprite = function() {
	this.x = this.posXS();
	this.y = this.posYS() - this.sprite().height;	
	this.visible = this.isVisible();
};

//==============================
// * is Visible
//==============================
EventIndicators.prototype.isVisible = function() {
	if (!$gameSystem._eventIndVis) {return false};
    return true;
};

//==============================
// * update Data Sprite
//==============================
EventIndicators.prototype.loadDataSprite = function() {
	this.x = this.data().sprite.x;
	this.y = this.data().sprite.y;
	this.scale.x = this.data().sprite.scale;
	this.scale.y = this.data().sprite.scale;
	this.opacity = this.data().sprite.opacity;	
	this.rotation = this.data().sprite.rotation;	
};

//==============================
// * update Data
//==============================
EventIndicators.prototype.updateData = function() {
	this.data().sprite.x = this.x;
	this.data().sprite.y = this.y;
	this.data().sprite.scale = this.scale.x;
	this.data().sprite.opacity = this.opacity;
	this.data().sprite.rotation = this.rotation;
};

//==============================
// * update Fade
//==============================
EventIndicators.prototype.updateFade = function() {
	if (this.data().visible) {
		if (this.data().range) {
			this.updateVisibleRange();
		} else {
			this.opacity += 7;
		};
	} else {
		this.opacity -= 7;
	};
};

//==============================
// * Sensor D
//==============================
EventIndicators.prototype.sensorD = function() {
    return Math.abs($gamePlayer.x - this.character().x) + Math.abs($gamePlayer.y - this.character().y);
};

//==============================
// * update Visible Range
//==============================
EventIndicators.prototype.updateVisibleRange = function() {
     if (this.sensorD() <= this.data().rangeD) {
		 this.opacity += 7; 
	 } else {
		 this.opacity -= 7;
	 };
};

//==============================
// * update Float
//==============================
EventIndicators.prototype.updateFloat = function() {
      if (this.data().ani[2] < 5) {return};
	  this.data().ani[2] = 0;
	  this.data().ani[3]++;
	  if (this.data().ani[3] < 10) {
		  this.data().ani[1]--;
	  } else if (this.data().ani[3] < 20) {
		  this.data().ani[1]++;
	  } else {
		  this.data().ani[1] = 0;
		  this.data().ani[3] = 0;
	  };
};

//==============================
// * side Wave
//==============================
EventIndicators.prototype.updateSideWave = function() {
      if (this.data().ani[2] < 4) {return};
	  this.data().ani[2] = 0;
	  this.data().ani[3]++;
	  if (this.data().ani[3] < 5) {
		  this.data().ani[0]--;
	  } else if (this.data().ani[3] < 15) {
		  this.data().ani[0]++;
	  } else if (this.data().ani[3] < 20) {
		  this.data().ani[0]--;
	  } else {
		  this.data().ani[0] = 0;
		  this.data().ani[3] = 0;
	  };
};

//==============================
// * update Zoom
//==============================
EventIndicators.prototype.updateZoom = function() {
	  this.data().zoomE[2]++;
	  if (this.data().zoomE[2] < 30) {
		  this.scale.x += this.data().zoomE[1];
	  } else if (this.data().zoomE[2] < 60) {
		  this.scale.x -= this.data().zoomE[1];
	  } else {
		  this.scale.x = 1.00;
		  this.data().zoomE[2] = 0;
	  };
	  this.scale.y = this.scale.x;
	  this._indicator.anchor.y = 0.5;
	  if (this._text) {this._text.anchor.y = 0.5};
	  this.data().ani[1] = -(this._indicator.height / 2);
};

//==============================
// * update Rotation
//==============================
EventIndicators.prototype.updateRotation = function() {
	  this.data().ani[2] = 0;
	  this.rotation += this.data().rotation[1];
	  this._indicator.anchor.y = 0.5;
	  if (this._text) {this._text.anchor.y = 0.5};
	  this.data().ani[1] = - (this._indicator.height / 2);
};

//==============================
// * update Shake
//==============================
EventIndicators.prototype.updateShake = function() {
	  this.data().shake[4]++;
      if (this.data().shake[4] < 4) {return};
	  this.data().shake[4] = 0;
	  this.data().shake[2] = -this.data().shake[1] / 2 + Math.randomInt(this.data().shake[1]);
	  this.data().shake[3] = -this.data().shake[1] / 2 + Math.randomInt(this.data().shake[1]);
};

//==============================
// * update Frames
//==============================
EventIndicators.prototype.updateFrames = function() {
    this.data().frames[2]++;
	if (this.data().frames[2] < this.data().frames[3]) {return};
	this.refreshBitmap();
	this.data().frames[2] = 0;
	this.data().frames[0]++;
	if (this.data().frames[0] >= this.data().frames[1]) {this.data().frames[0] = 0}
};

//==============================
// * update Animation
//==============================
EventIndicators.prototype.updateAnimation = function() {
	this.data().ani[2]++;
    if (this.data().aniMode === 1) {
		this.updateFloat();
	} else if (this.data().aniMode === 2) {
		this.updateSideWave();
	};
	if (this.data().zoomE[0]) {this.updateZoom()};
	if (this.data().shake[0]) {this.updateShake()};
	if (this.data().rotation[0]) {this.updateRotation()};
};

//==============================
// * update Sprites
//==============================
EventIndicators.prototype.updateSprites = function() {
    if (this.needRefreshSprites()) {this.refreshSprites()};
	if (this.data().enable) {
		 if (this.needRefreshText()) {this.refreshText()};
		 this.updateAnimation();
		 if (this.data().animated) {this.updateFrames()};
         this.updateMainSprite();
		 this.updateData();
         this.updateFade();
	};
};

//==============================
// * Update
//==============================
EventIndicators.prototype.update = function() {
    Sprite.prototype.update.call(this);
	if (this.character()) {this.updateSprites()};
};