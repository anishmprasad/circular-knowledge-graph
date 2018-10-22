/* eslint-disable */

'use strict'

// export const utilsService = {
//   "config_service": {
//     "API_BASE_URL": "https://opensourceprojects-pa.googleapis.com/v1/projects/",
//     "API_KEY": "AIzaSyC-j2zg47MN_K041U-KQwiQIIdPUZtvIkg",
//     "PROJECT_ID": "opensource-projectdb-prod",
//     "ENABLE_ERROR_REPORTING": true,
//     "LIST_PAGE_SIZE": 48,
//     "EXPLORE_PAGE_SIZE": 80,
//     "MOBILE_WIDTH": 720,
//     "COLORS": {
//       "GREEN": "#34A853",
//       "RED": "#EA4335",
//       "BLUE": "#4285F4",
//       "YELLOW": "#FBBC05"
//     },
//     "SORT_PARAMS": [
//       "Relevance",
//       "Name"
//     ],
//     "LANGUAGES": [
//       "c",
//       "c#",
//       "c++",
//       "css",
//       "dart",
//       "go",
//       "haskell",
//       "java",
//       "javascript",
//       "lua",
//       "objective-c",
//       "perl",
//       "php",
//       "python",
//       "r",
//       "ruby",
//       "rust",
//       "shell",
//       "swift",
//       "typescript"
//     ],
//     "CATEGORIES": [
//       {
//         "slug": "featured",
//         "cat": "Featured"
//       },
//       {
//         "slug": "cloud",
//         "cat": "Cloud"
//       },
//       {
//         "slug": "analytics-visualization",
//         "cat": "Data Analytics & Visualization"
//       },
//       {
//         "slug": "databases",
//         "cat": "Databases"
//       },
//       {
//         "slug": "developer-tools",
//         "cat": "Developer Tools"
//       },
//       {
//         "slug": "education",
//         "cat": "Education & Science"
//       },
//       {
//         "slug": "enterprise",
//         "cat": "Enterprise"
//       },
//       {
//         "slug": "games",
//         "cat": "Games & Entertainment"
//       },
//       {
//         "slug": "graphics-video-audio",
//         "cat": "Graphics, Video, & Audio"
//       },
//       {
//         "slug": "i18n",
//         "cat": "Internationalization & Localization"
//       },
//       {
//         "slug": "iot",
//         "cat": "Internet of Things"
//       },
//       {
//         "slug": "geo",
//         "cat": "Location & Maps"
//       },
//       {
//         "slug": "machine-learning",
//         "cat": "Machine Learning, Neural Networks, & AI"
//       },
//       {
//         "slug": "mobile",
//         "cat": "Mobile"
//       },
//       {
//         "slug": "networking",
//         "cat": "Networking"
//       },
//       {
//         "slug": "programming",
//         "cat": "Programming"
//       },
//       {
//         "slug": "samples",
//         "cat": "Samples & Examples"
//       },
//       {
//         "slug": "security",
//         "cat": "Security"
//       },
//       {
//         "slug": "testing",
//         "cat": "Testing"
//       },
//       {
//         "slug": "utilities",
//         "cat": "Utilities"
//       },
//       {
//         "slug": "web",
//         "cat": "Web"
//       }
//     ]
//   },
//   "selectedCategory": {},
//   "allCategories": [
//     {
//       "slug": "featured",
//       "cat": "Featured"
//     },
//     {
//       "slug": "cloud",
//       "cat": "Cloud"
//     },
//     {
//       "slug": "analytics-visualization",
//       "cat": "Data Analytics & Visualization"
//     },
//     {
//       "slug": "databases",
//       "cat": "Databases"
//     },
//     {
//       "slug": "developer-tools",
//       "cat": "Developer Tools"
//     },
//     {
//       "slug": "education",
//       "cat": "Education & Science"
//     },
//     {
//       "slug": "enterprise",
//       "cat": "Enterprise"
//     },
//     {
//       "slug": "games",
//       "cat": "Games & Entertainment"
//     },
//     {
//       "slug": "graphics-video-audio",
//       "cat": "Graphics, Video, & Audio"
//     },
//     {
//       "slug": "i18n",
//       "cat": "Internationalization & Localization"
//     },
//     {
//       "slug": "iot",
//       "cat": "Internet of Things"
//     },
//     {
//       "slug": "geo",
//       "cat": "Location & Maps"
//     },
//     {
//       "slug": "machine-learning",
//       "cat": "Machine Learning, Neural Networks, & AI"
//     },
//     {
//       "slug": "mobile",
//       "cat": "Mobile"
//     },
//     {
//       "slug": "networking",
//       "cat": "Networking"
//     },
//     {
//       "slug": "programming",
//       "cat": "Programming"
//     },
//     {
//       "slug": "samples",
//       "cat": "Samples & Examples"
//     },
//     {
//       "slug": "security",
//       "cat": "Security"
//     },
//     {
//       "slug": "testing",
//       "cat": "Testing"
//     },
//     {
//       "slug": "utilities",
//       "cat": "Utilities"
//     },
//     {
//       "slug": "web",
//       "cat": "Web"
//     }
//   ],
//   "dirty": false
// }


export class UtilsService {

  /**
   * Reads user agent string and returns one of 6 possible vendors.
   * @returns A string containg the browser; `Opera`, `Chrome`, `Safari`,
   * `Firefox`, `IE`, or `Unknown`.
   */
  getBrowserVendor() {
    const UA = navigator.userAgent;
    let vendor

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
  supportsExploreView(){
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
  modulo(a, b){
    return (+a % (b = +b) + b) % b;
  }

  /**
   * Extracts RGB values from hex color.
   * @param hex  hexadecimal string to be examined.
   * @returns  Object containing R, G, G values on scale of 250.
   */
  hexToRgb(hex){
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } :
      null;
  }
}
