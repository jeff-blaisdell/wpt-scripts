(function() {

	function setValue(selector, value) {
		$(selector).val(value);
		$(selector).trigger('change');
		console.log('Setting [' + selector + '] to [' + value + ']');
	}

	function querySelect(selector) {
		return function() {
			console.log('Querying for [' + selector + ']...');
			var $options = $(selector);
			if ($options && $options.length > 1) {
				return true;
			}
			return false;
		};
	}

	function queryElement(selector) {
		return function() {
			console.log('Querying for [' + selector + ']...');
			return $(selector).length === 1;
		};
	}

	function wait(queryFn) {
		var intervalId;
		var deferred = new $.Deferred();

		intervalId = setInterval(function() {
			if(queryFn()) {
				clearInterval(intervalId);
				deferred.resolve(intervalId);
			}
		}, 1000);

		return deferred.promise();
	}

	$.when(wait(querySelect('#sponsor_select option')))
		.then(function() {
			setValue('#sponsor_select', '0');
			return wait(querySelect('#nexus_employer_select option'));
		})
		.then(function() {
			setValue('#nexus_employer_select', '4');
			return wait(querySelect('#network_select option'));
		})
		.then(function() {
			setValue('#network_select', '0');
			return wait(querySelect('#client_select option'));
		})
		.then(function() {
			setValue('#client_select', '4');
			return wait(querySelect('#employee_select option'));
		})
		.then(function() {
			setValue('#employee_select', '6');
			return wait(queryElement('#create_session_button'));
		})
		.then(function() {
			$('#create_session_button').click();
		});
})();
