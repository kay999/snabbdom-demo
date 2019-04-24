const { patch, h } = window.snabbdom;

let el = document.getElementById('main');

function update() {
	el = patch(el, render());
}

let text = 'Welt';
let color = '#f00';

function setValue(ev, vn) {
	text = vn.elm.value;
	update();
}

function setColor(ev, vn) {
	color = vn.elm.value;
	update();
}

function render() {
	return h('div', [
		h('p', h('b', { style:{ color:color }}, `Hallo, ${text}!`)),
		input(text, setValue),
		input(color, setColor),
	])
}

function input(value, setValue) {
	return h('input', { on:{ input:setValue }, props:{ value } });
}


update();
