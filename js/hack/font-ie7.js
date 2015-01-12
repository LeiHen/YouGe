/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon_logo': '&#xe604;',
		'icon_logo_long': '&#xe603;',
		'icon_postcode': '&#xe600;',
		'icon_loading': '&#xe97b;',
		'icon_mobile': '&#xe601;',
		'icon_address': '&#xe602;',
		'icon_phone': '&#xf095;',
		'icon_caret_down': '&#xf0d7;',
		'icon_caret_up': '&#xf0d8;',
		'icon_caret_left': '&#xf0d9;',
		'icon_caret_right': '&#xf0da;',
		'icon_email': '&#xf0e0;',
		'icon_angle_left': '&#xf104;',
		'icon_angle_right': '&#xf105;',
		'icon_angle_up': '&#xf106;',
		'icon_angle_down': '&#xf107;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon_[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
