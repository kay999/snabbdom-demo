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
		h('input', { on:{ input:setValue }, props:{ value:text } }),
		h('input', { on:{ input:setColor }, props:{ value:color } }),
	])
}

update();
