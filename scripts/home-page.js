(function($, tools) {

	var onReady = tools.onReady;
	var wait = tools.wait;
	var querySelect = tools.querySelect;
	var queryElement = tools.queryElement;
	var setValue = tools.setValue;

	onReady(function() {

		$.when(wait(queryElement('form[action="/app/nexus/home/chooseEvent"]')))
			.then(function() {
				$('form[action="/app/nexus/home/chooseEvent"]').submit();
			});

	});

})($, wpt.tools);
