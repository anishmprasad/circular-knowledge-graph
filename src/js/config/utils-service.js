/* eslint-disable */

'use strict';

export class UtilsService {
	/**
	 * Reads user agent string and returns one of 6 possible vendors.
	 * @returns A string containg the browser; `Opera`, `Chrome`, `Safari`,
	 * `Firefox`, `IE`, or `Unknown`.
	 */
	getBrowserVendor() {
		const UA = navigator.userAgent;
		let vendor;

		if ((UA.indexOf('Opera') || UA.indexOf('OPR')) != -1) {
			vendor = 'Opera';
		} else if (UA.indexOf('Chrome') != -1) {
			vendor = 'Chrome';
		} else if (UA.indexOf('Safari') != -1) {
			vendor = 'Safari';
		} else if (UA.indexOf('Firefox') != -1) {
			vendor = 'Firefox';
		} else if (UA.indexOf('MSIE') != -1) {
			vendor = 'IE';
		} else {
			vendor = 'Unknown';
		}

		return vendor;
	}

	/*
	 * Some browsers don't support the fancy features needed by the project
	 * explore view well.  Detect them here.
	 */
	supportsExploreView() {
		const UA = navigator.userAgent;

		// IE11 has issues with transparency on the circle viz.
		if (UA.indexOf('Trident') != -1 && UA.indexOf('rv:11') != -1) {
			return false;
		}

		return true;
	}

	/**
	 * Modulo function
	 * @param a  dividend
	 * @param b  divisor
	 * @returns Remainder of quotient a / b.
	 */
	modulo(a, b) {
		return ((+a % (b = +b)) + b) % b;
	}

	/**
	 * Extracts RGB values from hex color.
	 * @param hex  hexadecimal string to be examined.
	 * @returns  Object containing R, G, G values on scale of 250.
	 */
	hexToRgb(hex) {
		const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b;
		});
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16)
			  }
			: null;
	}
}
