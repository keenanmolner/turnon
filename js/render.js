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
console.log("canvas created");


const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// Set some camera attributes.
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

/***
 * Create a THREE's Scene and camera.
 */
var scene = new THREE.Scene();
<<<<<<< HEAD
//var camera = new THREE.Camera();
const camera =
    new THREE.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR
    );
scene.add(camera);
console.log("camera created");

/* Set the size of the renderer based on the current window size. */
webglRenderer.setSize(window.innerWidth, window.innerHeight);
// window.addEventListener( 'resize', onWindowResize, false );
// function onWindowResize() {
// 	camera.aspect = window.innerWidth / window.innerHeight;
// 	camera.updateProjectionMatrix();
// 	webglRenderer.setSize( window.innerWidth, window.innerHeight );
// }

/*commented out to remove server dependancy
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
*/

// visual init
var material = new THREE.ShaderMaterial( {

	// uniforms: {

	// 	// amplitude: { value: 5.0 },
	// 	// opacity:   { value: 0.3 },
	// 	// color:     { value: new THREE.Color( 0xff0000 ) }

	// },
	vertexShader: $( "vShader" ).text(),

	fragmentShader: $( "fShader" ).text()
=======
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

// set up audio analyzer
var analyser = new THREE.AudioAnalyser( track, 128 );
// set the bin count of the analyzer (even though this turns into 64 for some reason in the animate loop)
analyser.fftSize = 128;
analyser.frequencyBinCount = 128;

/* AXIS HELPER */
/* add an axis object in the scene */
var axisObject = new THREE.AxisHelper( 1 );
axisObject.position.set( 0, 0, 0 );
scene.add( axisObject );
/* END AXIS HELPER */

// ELLIOTT's TEST GEOMETRY CODE
var testGeometry = new THREE.SphereGeometry( 0.1, 5, 5 );
var testMaterial = new THREE.MeshBasicMaterial( {color: 0xff00ff} )
var testSphere = new THREE.Mesh( testGeometry, testMaterial );
testSphere.position.set( 0,0,0);
scene.add( testSphere );


>>>>>>> 01dbef6adc5679429ba1363e39be00237c4c2970

} );

<<<<<<< HEAD
// create the sphere's material
const sphereMaterial =
  new THREE.MeshLambertMaterial(
    {
      color: 0xCC0000
    });

// Set up the sphere vars
const RADIUS = 50;
const SEGMENTS = 16;
const RINGS = 16;

// Create a new mesh with
// sphere geometry - we will cover
// the sphereMaterial next!
const sphere = new THREE.Mesh(
=======
//var material = new THREE.RawShaderMaterial( {

	//uniforms: {

		//map: { value: this.renderTarget.texture },
>>>>>>> 01dbef6adc5679429ba1363e39be00237c4c2970

  new THREE.SphereGeometry(
    RADIUS,
    SEGMENTS,
    RINGS),

  material);

// Move the Sphere back in Z so we
// can see it.
sphere.position.z = -300;

<<<<<<< HEAD
// Finally, add the sphere to the scene.
scene.add(sphere);

const pointLight =
  new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);

//var geometry = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), sphereMaterial );

///scene.add( geometry );
//console.log("added gemometry");
=======
	//},

	//vertexShader: $( "#vShader" ).text(),

	//fragmentShader: $( "#fShader" ).text()

//} );

//var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), material );

//scene.add( mesh );
>>>>>>> 01dbef6adc5679429ba1363e39be00237c4c2970


/* Add any updates to the uniforms in this function. This info gets passed to the shaders */
function updateUniforms() {

			// var time = Date.now() * 0.001;
			// object.rotation.y = 0.25 * time;
			// uniforms.amplitude.value = Math.sin( 0.5 * time );
			// uniforms.color.value.offsetHSL( 0.0005, 0, 0 );
			// var attributes = object.geometry.attributes;
			// var array = attributes.displacement.array;
			// for ( var i = 0, l = array.length; i < l; i += 3 ) {
			// 	array[ i     ] += 0.3 * ( 0.5 - Math.random() );
			// 	array[ i + 1 ] += 0.3 * ( 0.5 - Math.random() );
			// 	array[ i + 2 ] += 0.3 * ( 0.5 - Math.random() );
			// }
			// attributes.displacement.needsUpdate = true;
}

/* Start rendering! */
console.log("about to animate");
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
	//var bufferLength = analyser.frequencyBinCount;
	//var freq = analyser.getAverageFrequency();
	//console.log(freq);
	var data = analyser.getFrequencyData();
	var length = data.length;

	//console.log(data);

	//var testGeometry = new THREE.SphereGeometry( 5, 32, 32 );
	//var testMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} )
	//var testSphere = new THREE.Mesh( testGeometry, testMaterial );
	//testSphere.position.set( 0,-10,-10);
	//scene.add( testSphere );

	/* Update uniforms */
	updateUniforms();

	webglRenderer.render(scene, camera);

}
