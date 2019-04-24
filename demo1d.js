const { patch, h } = window.snabbdom;

let el = document.getElementById('main');

function update() {
	el = patch(el, render());
}

let text = 'Welt';
let color = '#f00';

function setter(setValue) {
	return (_, vn) => {
		setValue(vn.elm.value);
		update()
	}
}

function render() {
	return h('div', [
		h('p', h('b', { style:{ color:color }}, `Hallo, ${text}!`)),
		input(text,  v => { text = v }),
		input(color, v => { color = v }),
	])
}

function input(value, setValue) {
	return h('input', { on:{ input:setter(setValue) }, props:{ value } });
}

update();
