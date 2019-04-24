const { patch, h } = window.snabbdom;

function render() {
	return h('b', `Hallo, Welt!`)
}

patch(document.getElementById('main'), render());
