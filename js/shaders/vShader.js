/**
 * @file vertex shader
 *
 * @author Hayato Ikoma <hikoma@stanford.edu>
 * @author Robert Konrad <rkkonrad@stanford.edu>
 * @author Nitish Padmanaban <nit@stanford.edu>
 * @copyright The Board of Trustees of the Leland
Stanford Junior University
 * @version 2017/03/28
 */


var shaderID = "vShader";
console.log(shaderID);
var shader = document.createTextNode( `
/**
 * varying qualifier is used for passing variables from a vertex shader
 * to a fragment shader. In the fragment shader, these variables are
 * linearly interpolated between neighboring vertexes.
 */

// uniform float amplitude;
// attribute vec3 displacement;
// attribute vec3 customColor;
// varying vec3 vColor;
void main() {
	  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position,1.0);
}
` );


var shaderNode = document.createElement( "script" );

shaderNode.id = shaderID;

shaderNode.setAttribute( "type", "x-shader/x-vertex" );

shaderNode.appendChild( shader );

document.body.appendChild( shaderNode );
