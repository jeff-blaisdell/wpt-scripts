(function($, tools) {

	var onReady = tools.onReady;
	var wait = tools.wait;
	var querySelect = tools.querySelect;
	var queryElement = tools.queryElement;
	var setValue = tools.setValue;
	var findOptionValueByText = tools.findOptionValueByText;

	onReady(function() {

		$.when(wait(querySelect('#sponsor_select option')))
			.then(function() {
				var value = findOptionValueByText($('#sponsor_select option'), 'Bloom Health');
				setValue('#sponsor_select', value);
				return wait(querySelect('#nexus_employer_select option'));
			})
			.then(function() {
				var value = findOptionValueByText($('#nexus_employer_select option'), 'NO_RESTRICTIONS - DB');
				setValue('#nexus_employer_select', value);
				return wait(querySelect('#network_select option'));
			})
			.then(function() {
				var value = findOptionValueByText($('#network_select option'), 'Bloom');
				setValue('#network_select', value);
				return wait(querySelect('#client_select option'));
			})
			.then(function() {
				var value = findOptionValueByText($('#client_select option'), 'Developer Employer DO NOT TOUCH');
				setValue('#client_select', value);
				return wait(querySelect('#employee_select option'));
			})
			.then(function() {
				var value = findOptionValueByText($('#employee_select option'), 'Bruce Banner');
				setValue('#employee_select', value);
				return wait(queryElement('#create_session_button'));
			})
			.then(function() {
				$('#create_session_button').click();
			});

	});

})($, wpt.tools);
