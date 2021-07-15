console.log('loading helpers.js');

import { bpDoc  } from '/client/lib/bp-doc.js';
import utils from '/client/lib/utils.js';

Helpers = { ...utils, bpDoc };

/* Register all Helpers */

_.each(Helpers, function (helper, key) {
	Handlebars.registerHelper(key, helper);
});




