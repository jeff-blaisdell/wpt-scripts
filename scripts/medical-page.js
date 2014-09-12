(function($, tools) {

	var onReady = tools.onReady;
	var wait = tools.wait;
	var querySelect = tools.querySelect;
	var queryElement = tools.queryElement;
	var setValue = tools.setValue;

	onReady(function() {

		$.when(wait(querySelect('.medical-plan-elect-button')))
			.then(function() {
				var $button = $('.medical-plan-elect-button').get(1);
				if ($button.text !== 'Deselect') {
					$button.click();
				}
				return wait(queryElement('#Next-button'));
			})
			.then(function() {
				$('#Next-button').click();
			});

	});

})($, wpt.tools);
