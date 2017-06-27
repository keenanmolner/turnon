/**
 * TURNON.STUDIO
 * Based on starter code from Stanford EE267: Virtual Reality
 * 
 * Instructor: Gordon Wetzstein <gordon.wetzstein@stanford.edu>,
 * 			   Robert Konrad <rkkonrad@stanford.edu>,
 * 			   Hayato Ikoma <hikoma@stanford.edu>,
 * 			   Keenan Molner <kmolner@stanford.edu>
 *
 * @author Hayato Ikoma <hikoma@stanford.edu>
 * @copyright The Board of Trustees of the Leland
Stanford Junior University
 * @version 2017/03/28
 * This version uses Three.js (r84) and jQuery (3.2.1).
 *
 */


/***
 * Create a THREE's WebGLRenderer instance.
 * Since we are not going to use stencil and depth buffers in this
 * homework, those buffers are turned off. These two buffers are commonly
 * used for more advanced rendering.
 */
var webglRenderer = new THREE.WebGLRenderer( {
	antialias: true,
	stencil: false,
	depth: true,
} );

/* Add a DOM element of the renderer to HTML. */
$( ".renderCanvas" ).prepend( webglRenderer.domElement );


/* Set the size of the renderer based on the current window size. */
webglRenderer.setSize(window.innerWidth, window.innerHeight);


/***
 * Create a THREE's Scene and camera.
 */
var scene = new THREE.Scene();
var camera = new THREE.Camera();
var size = webglRenderer.getSize();

// ELLIOTT AUDIO STUFF
// create AudioListener object
var listener = new THREE.AudioListener();
// add it to the camera
camera.add( listener );
// create Audio object and add it to the listener
var track = new THREE.Audio( listener );
// create AudioLoader object
var audioLoader = new THREE.AudioLoader();
// load song into AudioLoader object
audioLoader.load( 'assets/audio/idea.wav', function( buffer ) {
	track.setBuffer( buffer );
	track.setLoop(true);
	track.setVolume(0.5);
	track.play();
});

/* AXIS HELPER */
/* add an axis object in the scene */
var axisObject = new THREE.AxisHelper( 1 );
axisObject.position.set( 0, 0, 0 );
scene.add( axisObject );
/* END AXIS HELPER */


/* Canvas for drawing with the shader */
this.renderTarget = new THREE.WebGLRenderTarget( size.width, size.height );

var material = new THREE.RawShaderMaterial( {

	uniforms: {

		map: { value: this.renderTarget.texture },

		// centerCoordinate: { value: new THREE.Vector2() },

		// K: { value: sc.state.lensDistortion },

		// viewportSize: { value: new THREE.Vector2() },

	},

	vertexShader: $( "#vShader" ).text(),

	fragmentShader: $( "#fShader" ).text()

} );

var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), material );

scene.add( mesh );


/* Add any updates to the uniforms in this function. This info gets passed to the shaders */
function updateUniforms() {

		// materialL.uniforms.centerCoordinate.value.set(
		// 	1.0 - halfIpd / ( size.width / 2 ), 1 / 2 );
		// console.log("left: " + (1.0 - halfIpd / ( size.width / 2 )));

		// materialR.uniforms.centerCoordinate.value.set(
		// 	halfIpd / ( size.width / 2 ), 1 / 2 );
		// console.log("right: " + halfIpd / ( size.width / 2 ));

		// materialL.uniforms.viewportSize.value.set(
		// 	p * size.width / 2, p * size.height );

		// materialR.uniforms.viewportSize.value.set(
		// 	p * size.width / 2, p * size.height );

}

/* Start rendering! */
animate();

/**
 * animate
 * This function is the main function to render the scene repeatedly.
 *
 * Note:
 * This function uses some global variables.
 *
 * Advanced note:
 * requestAnimationFrame() is a WebAPI which is often used to perform animation.
 * Importantly, requestAnimationFrame() is asynchrous, which makes this
 * rendering loop not recursive. requestAnimationFrame immediately returns, and
 * the following codes are executed continuously. After a certain amount of
 * time, which is determined by a refresh rate of a monitor, the passed callback
 * function is executed. In addition, when the window is not displayed (i.e.
 * another tab of your browser is displayed), requestAnimationFrame
 * significantly reduces its refresh rate to save computational resource and
 * battery.
 *
 * If you are interested, plase check out the documentation of
 * requestAnimationFrame().
 * https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 */
function animate() {

	requestAnimationFrame( animate );

	/* Update uniforms */
	updateUniforms();

	webglRenderer.render(scene, camera);

}
