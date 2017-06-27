/**
 * @file Phong fragment shader
 *
 * @author Hayato Ikoma <hikoma@stanford.edu>
 * @author Robert Konrad <rkkonrad@stanford.edu>
 * @author Nitish Padmanaban <nit@stanford.edu>
 * @copyright The Board of Trustees of the Leland
Stanford Junior University
 * @version 2017/03/28
 */


var shaderID = "fShader";

var shader = document.createTextNode( `
/**
 * WebGL doesn't set any default precision for fragment shaders.
 * Precision for vertex shader is set to "highp" as default.
 * Do not use "lowp". Some mobile browsers don't support it.
 */
precision mediump float;

varying vec3 normalCam;
varying vec3 fragPosCam;

uniform mat4 viewMat;

uniform vec3 attenuation;
uniform vec3 ambient;
uniform vec3 diffuse;
uniform vec3 specular;
uniform float shininess;

uniform vec3 ambientLightColor;


void main() {

	// /***
	//  * Compute ambient reflection
	//  */
	// vec3 ambientReflection = ambient * ambientLightColor;

	// vec3 fColor = ambientReflection;

	// #if NUM_POINT_LIGHTS > 0

	// 	for ( int p_idx = 0; p_idx < NUM_POINT_LIGHTS; p_idx++ ) {

	// 		vec3 lightPosCam = vec3( viewMat *
	// 			vec4( pointLights[p_idx].position, 1.0 ) );

	// 		/* normalized vector pointing from a fragment to a light source */
	// 		vec3 pLightDir = normalize( lightPosCam - fragPosCam );

	// 		vec3 pLightRefl = computeReflection(
	// 			pointLights[p_idx].color, pLightDir, normalize( normalCam ) );

	// 		float d = distance( lightPosCam, fragPosCam );

	// 		float attenuationFactor =
	// 			1.0 / ( attenuation[0] + attenuation[1] * d
	// 								   + attenuation[2] * ( d * d ) );

	// 		fColor += attenuationFactor * pLightRefl;

	// 	}

	// #endif

	// gl_FragColor = vec4( fColor, 1.0 );
	gl_FragColor = vec4(1.0,0.0,1.0,1.0);

}
` );


var shaderNode = document.createElement( "script" );

shaderNode.id = shaderID;

shaderNode.setAttribute( "type", "x-shader/x-fragment" );

shaderNode.appendChild( shader );

document.body.appendChild( shaderNode );
