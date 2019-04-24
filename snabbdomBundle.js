const snabbdom = require('snabbdom');

const patch = snabbdom.init([
	require('snabbdom/modules/class').default,
	require('snabbdom/modules/props').default,
	require('snabbdom/modules/attributes').default,
	require('snabbdom/modules/style').default,
	require('snabbdom/modules/dataset').default,
	require('snabbdom/modules/eventlisteners').default,
]);

module.exports = {
	h: require('snabbdom/h').default,
	thunk: require('snabbdom/thunk').default,
	patch: patch
};
