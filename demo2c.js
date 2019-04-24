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

function test(update) {
	return () => h('span', 'Test!' )
}

function button(title, op) {
	return h('button', { on:{ click:op }}, title)
}

function genericList(create) {
	return update => {
		const components = [];

		function addItem() {
			components.push(create(update));
			update();
		}
		function delItem(i) {
			components.splice(i, 1);
			update();
		}

		return () =>
			h('div', [
				button('Add', addItem),
				h('ul', components.map((c, i) =>
						h('li', [
							button('Del', [delItem, i]),
							' ',
							c(),
						])
					)
				),
			])
	}
}

mount('cnt1', genericList(counter));
mount('cnt2', genericList(test));
