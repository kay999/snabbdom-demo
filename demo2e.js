const { patch, h, thunk } = window.snabbdom;

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
		console.log("incr");
		update();
	}

	const view = () => {
		console.log("build", num);
		return h('span', { class:{ red: num < 0 }}, [
			button('-', [incr, -1]),
			" ",
			button('+', [incr, 1]),
			` Count: ${num} `,
		])
	};
	//return () => view();
	return () => thunk('span', view, [num]);
}

function test(update) {
	return () => h('span', 'Test!')
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
						h('li', {
							key: c,
							style: {
								opacity: 0,
								transition: 'opacity 0.5s, transform 0.5s, max-height 0.5s',
								transform: 'translateX(200px)',
								maxHeight: '0',
								delayed: { opacity: 1, transform: 'translateX(0px)', maxHeight: '50px', },
								remove: { opacity: 0, transform: 'translateX(-200px)', maxHeight:0, },
							}
						}, [
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
