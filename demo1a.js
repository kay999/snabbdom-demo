const { patch, h } = window.snabbdom;

let el = document.getElementById('main');

function update() {
	el = patch(el, render());
}

let text = 'Welt';


function setValue(ev, vn) {
	text = vn.elm.value;
	update();
}

function render() {
	return h('div', [
		h('p', h('b', `Hallo, ${text}!`)),
		h('input', { on:{ input:setValue }, props:{ value:text }, }),
	])
}

update();
