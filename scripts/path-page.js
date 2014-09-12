(function($, tools) {

	var onReady = tools.onReady;
	var wait = tools.wait;
	var querySelect = tools.querySelect;
	var queryElement = tools.queryElement;
	var setValue = tools.setValue;

	onReady(function() {

		$.when(wait(queryElement('a[href="/app/nexus/medical/index"]')))
			.then(function() {
				$('a[href="/app/nexus/medical/index"]')[0].click();
			});

	});

})($, wpt.tools);
