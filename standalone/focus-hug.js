var focusHug = (function() {
	'use strict';

var DURATION = 100;
var OFFSET_PX = -1;
var MIN_WIDTH = 12;
var MIN_HEIGHT = 8;

var focusHug = {
	enabled: true,
	trigger: trigger
};


/**
 * @param {Element} target
 */
function trigger(target) {
	if (!ringElem) {
		initialize();
	}

	var current = dimensionsOf(target);
	ringElem.style.left = current.left + 'px';
	ringElem.style.top = current.top + 'px';
	ringElem.style.width = current.width + 'px';
	ringElem.style.height = current.height + 'px';

	onEnd();
	target.classList.add('focus-hug_target');
	ringElem.classList.add('focus-hug_visible');
	prevFocused = target;

	requestAnimationFrame(function() {
		ringElem.classList.add('focus-hug_hiding');
		movingId = setTimeout(onEnd, DURATION);
	});
}

var win = window;
var doc = document;
var docElement = doc.documentElement;
var body = doc.body;

var movingId = 0;
var prevFocused = null;
var keyDownTime = 0;


docElement.addEventListener('keydown', function(event) {
	if (!focusHug.enabled) {
		return;
	}
	var code = event.which;
	// Show animation only upon Tab or Arrow keys press.
	if (code === 9 || (code > 36 && code < 41)) {
		keyDownTime = Date.now();
	}
}, false);


docElement.addEventListener('focus', function(event) {
	if (!isJustPressed()) {
		return;
	}
	var target = event.target;
	if (target.id === 'focus-hug') {
		return;
	}
	trigger(target);
}, true);


docElement.addEventListener('blur', function() {
	onEnd();
}, true);


var ringElem = null;
function initialize() {
	ringElem = doc.createElement('focus-hug');
	ringElem.id = 'focus-hug';
	body.appendChild(ringElem);
}


function onEnd() {
	if (!movingId) {
		return;
	}
	clearTimeout(movingId);
	movingId = 0;
	ringElem.classList.remove('focus-hug_visible');
	ringElem.classList.remove('focus-hug_hiding');
	prevFocused.classList.remove('focus-hug_target');
	prevFocused = null;
}


function isJustPressed() {
	return Date.now() - keyDownTime < 42
}


function dimensionsOf(element) {
	var offset = offsetOf(element);
	return {
		left: offset.left - OFFSET_PX,
		top: offset.top - OFFSET_PX,
		width: Math.max(MIN_WIDTH, element.offsetWidth) + 2*OFFSET_PX,
		height: Math.max(MIN_HEIGHT, element.offsetHeight) + 2*OFFSET_PX
	};
}

function offsetOf(elem) {
	var rect = elem.getBoundingClientRect();
	var scroll = scrollOffset();

	var clientTop  = docElement.clientTop  || body.clientTop,
	clientLeft = docElement.clientLeft || body.clientLeft,
	top  = rect.top  + scroll.top  - clientTop,
	left = rect.left + scroll.left - clientLeft;

	return {
		top: top || 0,
		left: left || 0
	};
}

function scrollOffset() {
	var top = win.pageYOffset || docElement.scrollTop;
	var left = win.pageXOffset || docElement.scrollLeft;
	return {
		top: top || 0,
		left: left || 0
	};
}


	var style = doc.createElement('style');
	style.textContent = "#focus-hug {\
	position: absolute;\
	margin: 0;\
	background: transparent;\
	visibility: hidden;\
	pointer-events: none;\
	box-shadow: 0 0 2px 3px #78aeda, 0 0 2px #78aeda inset; border-radius: 2px;\
	-webkit-transform: scale(1.4);\
	transform: scale(1.4);\
	opacity: 1;\
}\
#focus-hug.focus-hug_visible {\
	transition-property: -webkit-transform;\
	transition-property: transform;\
	transition-timing-function: ease-in;\
	transition-duration: .1s;\
	visibility: visible;\
	z-index: 9999;\
}\
#focus-hug.focus-hug_hiding {\
	-webkit-transform: scale(1) !important;\
	transform: scale(1) !important;\
}\
.focus-hug_target {\
	outline: none !important;\
}\
/* http://stackoverflow.com/questions/71074/how-to-remove-firefoxs-dotted-outline-on-buttons-as-well-as-links/199319 */\
.focus-hug_target::-moz-focus-inner {\
	border: 0 !important;\
}\
/* Replace it with @supports rule when browsers catch up */\
@media screen and (-webkit-min-device-pixel-ratio: 0) {\
	#focus-hug {\
		box-shadow: none;\
		outline: 5px auto -webkit-focus-ring-color;\
		outline-offset: 0;\
	}\
}\
";
	body.appendChild(style);

	return focusHug;
})();
