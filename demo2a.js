const { patch, h } = window.snabbdom;

function mount(id, component) {
	let el = document.getElementById(id);
	const render = component(update);

	function update() {
		el = patch(el, render());
	}
	update();
}

function counter(update) {
	let num = 0;

	function incr(d) {
		num += d;
		update();
	}

	return () =>
		h('div', { class:{ red: num < 0 }}, [
			h('button', {on: {click: [incr, -1]}}, "-"),
			" ",
			h('button', {on: {click: [incr, 1]}}, "+"),
			` Count: ${num} `,
		])
}

mount('cnt1', counter);
mount('cnt2', counter);
