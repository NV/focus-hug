var DURATION = 100;

var focusHug = document.createElement('focus-hug'); // use uniq element name to decrease the chances of a conflict with website styles
focusHug.id = 'focus-hug';
document.body.appendChild(focusHug);

function offsetOf(elem) {
	var rect = elem.getBoundingClientRect();
	var docElem = document.documentElement;
	var win = document.defaultView;
	var body = document.body;

	var clientTop  = docElem.clientTop  || body.clientTop  || 0,
		clientLeft = docElem.clientLeft || body.clientLeft || 0,
		scrollTop  = win.pageYOffset || docElem.scrollTop  || body.scrollTop,
		scrollLeft = win.pageXOffset || docElem.scrollLeft || body.scrollLeft,
		top  = rect.top  + scrollTop  - clientTop,
		left = rect.left + scrollLeft - clientLeft;

	return {top: top, left: left};
}

var movingId = 0;
var prevFocused = null;
var keyDownTime = 0;

document.documentElement.addEventListener('keydown', function(event) {
	var code = event.which;
	// Show animation only upon Tab or Arrow keys press.
	if (code === 9 || (code > 36 && code < 41)) {
		keyDownTime = Date.now();
	}
}, false);

document.documentElement.addEventListener('focus', function(event) {
	var target = event.target;
	if (target.id === 'focus-hug') {
		return;
	}
	var offset = offsetOf(target);

	focusHug.style.left = offset.left + 1 + 'px';
	focusHug.style.top = offset.top + 1 + 'px';
	focusHug.style.width = target.offsetWidth - 2 + 'px';
	focusHug.style.height = target.offsetHeight - 2 + 'px';

	// Would be nice to use:
	//
	//   focusHug.style['outline-offset'] = getComputedStyle(target, null)['outline-offset']
	//
	// but it is always '0px' in WebKit and Blink for some reason :(

	if (Date.now() - keyDownTime > 42) {
		return;
	}

	onEnd();
	target.classList.add('focus-hug_target');
	focusHug.classList.add('focus-hug_visible');
	prevFocused = target;

	requestAnimationFrame(function() {
		focusHug.classList.add('focus-hug_hiding');
		movingId = setTimeout(onEnd, DURATION);
	});
}, true);

document.documentElement.addEventListener('blur', function() {
	onEnd();
}, true);


function onEnd() {
	if (!movingId) {
		return;
	}
	clearTimeout(movingId);
	movingId = 0;
	focusHug.classList.remove('focus-hug_visible');
	focusHug.classList.remove('focus-hug_hiding');
	prevFocused.classList.remove('focus-hug_target');
	prevFocused = null;
}
