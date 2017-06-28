/**
 * @file fragment shader
 *
 * @author Hayato Ikoma <hikoma@stanford.edu>
 * @author Robert Konrad <rkkonrad@stanford.edu>
 * @author Nitish Padmanaban <nit@stanford.edu>
 * @copyright The Board of Trustees of the Leland
Stanford Junior University
 * @version 2017/03/28
 */


var shaderID = "fShader";
console.log(shaderID);
var shader = document.createTextNode( `
/**
 * WebGL doesn't set any default precision for fragment shaders.
 * Precision for vertex shader is set to "highp" as default.
 * Do not use "lowp". Some mobile browsers don't support it.
 */
precision mediump float;

// uniform vec3 color;
// uniform float opacity;
// varying vec3 vColor;
void main() {
	gl_FragColor = vec4(1.0,  // R
                      0.0,  // G
                      1.0,  // B
                      1.0); // A
	//gl_FragColor = vec4( vColor * color, opacity );
}
` );


var shaderNode = document.createElement( "script" );

shaderNode.id = shaderID;

shaderNode.setAttribute( "type", "x-shader/x-fragment" );

shaderNode.appendChild( shader );

document.body.appendChild( shaderNode );
