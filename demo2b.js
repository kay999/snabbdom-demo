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
		h('span', { class:{ red: num < 0 }}, [
			button('-', [incr, -1]),
			" ",
			button('+', [incr, 1]),
			` Count: ${num} `,
		])
}

function button(title, op) {
	return h('button', { on:{ click:op }}, title)
}

function counterList(update) {
	const counters = [];

	function addCounter() {
		counters.push(counter(update));
		update();
	}

	function delCounter(i) {
		counters.splice(i, 1);
		update();
	}

	return () =>
		h('div', [
			button('Add', addCounter),
			h('ul', counters.map((c, i) =>
					h('li', [
						button('Del', [delCounter, i]),
						' ',
						c(),
					])
				)
			),
		])
}

mount('cnt1', counterList);
