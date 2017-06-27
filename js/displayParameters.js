/**
 * @file Class for display parameters
 *
 * @author Hayato Ikoma <hikoma@stanford.edu>
 * @copyright The Board of Trustees of the Leland
 Stanford Junior University
 * @version 2017/03/28
 */


/**
 * DisplayParameters
 *
 * @class DisplayParameters
 * @classdesc A class to hold display parameters.
 * 		The height and width holds the size fo a window in pixel.
 * 		These values are automatically updated when the window is resized.
 *
 * @param  {Number} d distance to a screen from a viewer in mm
 * @param  {Number} p pixel pitch of a screen in mm
 */
var DisplayParameters = function ( d, p ) {

	this.distanceScreenViewer = d;

	this.pixelPitch = p;

	this.canvasHeight = window.innerHeight;

	this.canvasWidth = window.innerWidth;

	var _this = this;

	$( window ).resize( function () {

		_this.update();

	} );

};


DisplayParameters.prototype.update = function () {

	this.canvasHeight = window.innerHeight;

	this.canvasWidth = window.innerWidth;

};
