(function($, tools) {

	var onReady = tools.onReady;
	var wait = tools.wait;
	var querySelect = tools.querySelect;
	var queryElement = tools.queryElement;
	var setValue = tools.setValue;

	onReady(function() {

		$.when(wait(queryElement('#Next-button')))
			.then(function() {
				$('#Next-button').click();
			});

	});

})($, wpt.tools);
