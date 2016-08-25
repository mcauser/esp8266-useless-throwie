var offMp3 = new Audio("data:audio/mp3;base64,<!-- @import build/web/off.mp3.base64 -->");
var onMp3 = new Audio("data:audio/mp3;base64,<!-- @import build/web/on.mp3.base64 -->");


var sw = (function() {

	var el = document.querySelector('.switch');
	el.addEventListener('mouseup', mouseUp);
	el.addEventListener('mousedown', mouseDown);

	function mouseDown(e) {
		fngr.end();
		click(!el.classList.contains('on'));
	}

	function mouseUp(e) {
		el.classList.contains('on') ? fngr.begin() : fngr.end();
	}

	function click(on) {
		if (on) {
			el.classList.add('on');
			onMp3.play();

			var xhr = new XMLHttpRequest();
			xhr.open('GET', '/on');
			xhr.send(null);
		}
		else {
			el.classList.remove('on');
			offMp3.play();

			var xhr = new XMLHttpRequest();
			xhr.open('GET', '/off');
			xhr.send(null);
		}
	}

	return {
		click: click
	};
})();


var fngr = (function() {

	var el = document.querySelector('.finger'),
		timers = [],
		on = {},
		off = {},
		out = {};

	el.style.transitionProperty = 'all';
	el.style.transitionTimingFunction = 'cubic-bezier(0.785, 0.135, 0.15, 0.86)';

	function begin() {
		halt();
		reset();
		timers.push(setTimeout(playOn, on.delay));
	}

	function end() {
		halt();
		timers.push(setTimeout(playOut, out.delay));
	}

	function reset() {
		on =  build({ top: [47,53],   left: [52,58], delay: [0,500],   speed: [100,400] });
		off = build({ top: [47,53],   left: [42,48], delay: [0,500],   speed: [100,600] });
		out = build({ top: [100,100], left: [40,60], delay: [100,500], speed: [100,400] });
	}

	function build(recipe) {
		return {
			top:   rand(recipe.top[0],   recipe.top[1]),
			left:  rand(recipe.left[0],  recipe.left[1]),
			delay: rand(recipe.delay[0], recipe.delay[1]),
			speed: rand(recipe.speed[0], recipe.speed[1])
		};
	}

	function halt() {
		var rect = el.getBoundingClientRect();
		el.style.top = rect.top + 'px';
		el.style.left = rect.left + 'px';

		while (timers.length) {
			clearTimeout(timers.shift());
		}
	}

	function playOn() {
		set(on);
		timers.push(setTimeout(playOff, (on.speed + off.delay)));
	}

	function playOff() {
		set(off);
		timers.push(setTimeout(sw.click, (off.speed / 2)));
		timers.push(setTimeout(playOut, off.speed + out.delay));
	}

	function playOut() {
		set(out);
	}

	function set(pos) {
		el.style.transitionDuration = pos.speed + 'ms';
		//el.style.top = (pos.top / 100 * window.innerHeight) + 'px';
		//el.style.left = (pos.left / 100 * window.innerWidth) + 'px';
		el.style.top = pos.top + '%';
		el.style.left = pos.left + '%';
	}

	function rand(min, max) {
		return min === max ? min : Math.floor(Math.random() * (max - min + 1)) + min;
	}

	return {
		begin: begin,
		end: end
	};
})();
