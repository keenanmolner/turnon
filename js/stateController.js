/**
 * @file Class for handling mouse movement
 *
 * @author Hayato Ikoma <hikoma@stanford.edu>
 * @copyright The Board of Trustees of the Leland
 Stanford Junior University
 * @version 2017/03/28
 */


/**
 * State_controller
 *
 * @class StateController
 * @classdesc Class holding the state of a model and a viewer.
 *		This class accumulates the total mouse movement.
 *
 * @param  {DisplayParameters} dispParams display parameters
 */
var StateController = function ( dispParams ) {

	/**
	 * Varibles required for the computation of movel/view/projection matrices.
	 *
	 * @memberof StateController
	 * @type {Object}
	 * @property {Number} clipNear z position of near clipping plane
	 * @property {Number} clipFar z position of far clipping plane
	 * @property {THREE.Vector3} modelTranslation (x,y,z) translations
	 * 		for models
	 * @property {THREE.Vector3} modelRotation rotations for models
	 * @property {THREE.Vector3} viewerPosition (x,y,z) positions of a viewer
	 * @property {THREE.Vector3} viewerTarget the position where a viewer
	 * 		is looking
	 * @property {Object} position and color of light sources
	 */
	this.state = {

		clipNear: 1.0,

		clipFar: 10000.0,

		modelTranslation: new THREE.Vector3(),

		modelRotation: new THREE.Vector3(),

		viewerPosition:
			new THREE.Vector3( 0, 0, dispParams.distanceScreenViewer ),

		viewerTarget: new THREE.Vector3(),

		lights: {

			pointLights: [],

			directionalLights: [],

		},

	};

	var pointLightIdx = - 1;

	var directionalLightIdx = - 1;


	const MODEL_TRANSFORM = 0;

	const VIEWER_POSITION = 1;

	const VIEWER_TARGET = 2;

	const POINT_LIGHT_CTRL = 3;

	const DIRECTIONAL_LIGHT_CTRL = 4;

	this._controller = NaN;


	/**
	 * A variable to store mouse movement.
	 *
	 * @memberof StateController
	 * @property {THREE.Vector2} movement
	 */
	var movement = new THREE.Vector2();


	/**
	 * A variable to store the mouse position on the previous call.
	 *
	 * @memberof StateController
	 * @property {THREE.Vector2} movement
	 */
	var previousPosition = new THREE.Vector2();


	/**
	 * A variable to check the click status.
	 *
	 * @memberof StateController
	 * @property {Boolean} clickHold
	 */
	var clickHold = false;



	/**
	 * _onClick - called when the mouse is clicked.
	 *
	 * @memberof StateController
	 * @param  {Number} x the x position of the mouse cursor
	 * @param  {Number} y the x position of the mouse cursor
	 */
	this._onClick = function ( x, y ) {

		clickHold = true;

		previousPosition.set( x, y );

	};


	/**
	 * _releaseClick - called when the mouse click is released or the mouse
	 *  	cursor goes to the outside of the window.
	 *
	 * @memberof StateController
	 */
	this._releaseClick = function () {

		clickHold = false;

	};


	/**
	 * _onMove - called when the mouse cursor is moved.
	 *
	 * @memberof StateController
	 * @param  {Event} e event
	 * @param  {Number} x the x position of the mouse cursor
	 * @param  {Number} y the x position of the mouse cursor
	 */
	this._onMove = function ( e, x, y ) {

		/* Check the mouse is clicked. If not, do nothing. */
		if ( ! clickHold ) return;

		/***
 		 * In jQuery, the origin is at top-left.
 		 * Three.js/WebGL has its origin at bottom-left.
 		 * Store the mouse movement between frames
 		 */
		movement.set( x - previousPosition.x, previousPosition.y - y );

		previousPosition.set( x, y );


		/* Check if the model control button is clicked. */
		if ( this._controller === MODEL_TRANSFORM ) {

			var ctrlKey = e.metaKey // for Mac's command key
				|| ( navigator.platform.toUpperCase().indexOf( "MAC" ) == - 1
				&& e.ctrlKey );

			/* Shift-key pressed */
			if ( e.shiftKey && ! ctrlKey ) {

				/* XY translation */
				this.state.modelTranslation.x += movement.x;

				this.state.modelTranslation.y += movement.y;

			} else if ( ! e.shiftKey && ctrlKey ) {

				/* Z translation */
				this.state.modelTranslation.z += movement.y;

			} else if ( e.shiftKey && ctrlKey ) {

				this.state.modelRotation.z += movement.y;

			} else {

				/* Rotation */
				this.state.modelRotation.x -= movement.y;

				this.state.modelRotation.y += movement.x;

			}

		}


		/* Check if the viewer position control button is clicked. */
		if ( this._controller === VIEWER_POSITION ) {

			/* Shift-key NOT pressed */
			if ( ! e.shiftKey ) {

				/* XY translation */
				this.state.viewerPosition.x += movement.x;

				this.state.viewerPosition.y += movement.y;

			} else {

				/* Z translation */
				this.state.viewerPosition.z += movement.y;

			}

		}


		/* Check if the viewer target control button is clicked. */
		if ( this._controller === VIEWER_TARGET ) {

			/* Shift-key pressed */
			if ( ! e.shiftKey ) {

				/* XY translation */
				this.state.viewerTarget.x += movement.x;

				this.state.viewerTarget.y += movement.y;

			} else {

				/* Z translation */
				this.state.viewerTarget.z += movement.y;

			}

		}


		/* Check if the point light control button is clicked. */
		if ( this._controller === POINT_LIGHT_CTRL ) {

			var idx = pointLightIdx % this.state.lights.pointLights.length;

			if ( ! isNaN( idx ) ) {

				var pointLight = this.state.lights.pointLights[ idx ];

				if ( ! e.shiftKey ) {

					/* XY translation */
					pointLight.position.x += movement.x * 0.1;

					pointLight.position.y += movement.y * 0.1;

				} else {

					/* Z translation */
					pointLight.position.z += movement.y * 0.1;

				}

			}

		}

		/* Check if the directional light control button is clicked. */
		if ( this._controller === DIRECTIONAL_LIGHT_CTRL ) {

			var idx = directionalLightIdx % this.state.lights.directionalLights.length;

			if ( ! isNaN( idx ) ) {

				var directionalLight = this.state.lights.directionalLights[ idx ];

				if ( ! e.shiftKey ) {

					/* XY translation */
					directionalLight.direction.x -= movement.x * 0.1;

					directionalLight.direction.y -= movement.y * 0.1;

				} else {

					/* Z translation */
					directionalLight.direction.z -= movement.y * 0.1;

				}

			}

		}


	};


	/**
	 * display- display the scene parameters
	 *
	 * @memberof StateController
	 */
	this.display = function () {

		$( "#positionVal" ).html(

			"<p>Translation: " +
				vector3ToString( this.state.modelTranslation ) + "</p>" +
			"<p>Rotation: " +
				vector3ToString( this.state.modelRotation ) + "</p>" +
			"<p>Viewer position: " +
				vector3ToString( this.state.viewerPosition ) + "</p>" +
			"<p>Viewer target: " +
				vector3ToString( this.state.viewerTarget ) + "</p>"

		);

	};


	/* Attach the functiones defined above to the buttons with jQuery. */
	var _this = this;

	$( ".renderCanvas" ).on( {

		"mousedown": function ( e ) {

			_this._onClick( e.pageX, e.pageY );

			e.preventDefault();

		},

		"mousemove": function ( e ) {

			_this._onMove( e, e.pageX, e.pageY );

			e.preventDefault();

		},

		"mouseout": function ( ) {

			_this._releaseClick();

		},

		"mouseup": function ( ) {

			_this._releaseClick();

		},

	} );


	$( "#modelBtn" ).click( function () {

		_this._controller = MODEL_TRANSFORM;

		$( "#modelBtn" ).css( "background-color", "teal" );

		$( "#viewerPositionBtn" ).css( "background-color", cardinalColor );

		$( "#viewerTargetBtn" ).css( "background-color", cardinalColor );

		$( "#pointLightCtrlBtn" ).css( "background-color", cardinalColor );

		$( "#directionalLightCtrlBtn" ).css( "background-color", cardinalColor );

	} );


	$( "#viewerPositionBtn" ).click( function () {

		_this._controller = VIEWER_POSITION;

		$( "#modelBtn" ).css( "background-color", cardinalColor );

		$( "#viewerPositionBtn" ).css( "background-color", "teal" );

		$( "#viewerTargetBtn" ).css( "background-color", cardinalColor );

		$( "#pointLightCtrlBtn" ).css( "background-color", cardinalColor );

		$( "#directionalLightCtrlBtn" ).css( "background-color", cardinalColor );

	} );


	$( "#viewerTargetBtn" ).click( function () {

		_this._controller = VIEWER_TARGET;

		$( "#modelBtn" ).css( "background-color", cardinalColor );

		$( "#viewerPositionBtn" ).css( "background-color", cardinalColor );

		$( "#viewerTargetBtn" ).css( "background-color", "teal" );

		$( "#pointLightCtrlBtn" ).css( "background-color", cardinalColor );

		$( "#directionalLightCtrlBtn" ).css( "background-color", cardinalColor );

	} );


	$( "#pointLightCtrlBtn" ).click( function ( ) {

		_this._controller = POINT_LIGHT_CTRL;

		pointLightIdx += 1;

		$( "#modelBtn" ).css( "background-color", cardinalColor );

		$( "#viewerPositionBtn" ).css( "background-color", cardinalColor );

		$( "#viewerTargetBtn" ).css( "background-color", cardinalColor );

		$( "#pointLightCtrlBtn" ).css( "background-color", "teal" );

		$( "#directionalLightCtrlBtn" ).css( "background-color", cardinalColor );

	} );


	$( "#directionalLightCtrlBtn" ).click( function ( ) {

		_this._controller = DIRECTIONAL_LIGHT_CTRL;

		directionalLightIdx += 1;

		$( "#modelBtn" ).css( "background-color", cardinalColor );

		$( "#viewerPositionBtn" ).css( "background-color", cardinalColor );

		$( "#viewerTargetBtn" ).css( "background-color", cardinalColor );

		$( "#pointLightCtrlBtn" ).css( "background-color", cardinalColor );

		$( "#directionalLightCtrlBtn" ).css( "background-color", "teal" );

	} );


	/***
	 * By clicking the point light botton, a point light source is added to the
	 * scene at the position specified. You can manipulate the position later
	 * on based on the mouse movement.
	 *
	 * The color of the added point light is randomly chosen.
	 */
	$( "#addPointLightBtn" ).click( function ( ) {

		var _color = Math.random() * 0xffffff;

		var pointLight = {

			position: new THREE.Vector3( 50, 50, 50 ),

			color: new THREE.Color( _color ),

		};

		_this.state.lights.pointLights.push( pointLight );

	} );


	/***
	 * By clicking the directional light botton, a directional light source is
	 * added to the scene at the position specified. Here, we define the
	 * direction as the direction to which the light propagates.
	 *
	 * The color of the added directional light is randomly chosen.
	 */
	$( "#addDirectionalLightBtn" ).click( function ( ) {

		var _color = Math.random() * 0xffffff;

		var directionalLight = {

			direction: new THREE.Vector3( - 1, - 1, - 1 ),

			color: new THREE.Color( _color ).multiplyScalar( .3 ),

		};

		_this.state.lights.directionalLights.push( directionalLight );

	} );

};
