(function() {

	function setValue(selector, value) {
		$(selector).val(value);
		$(selector).trigger('change');
		console.log('Setting [' + selector + '] to [' + value + ']');
	};

	function querySelect(selector) {
		return function() {
			console.log('Querying for [' + selector + ']...');
			var $options = $(selector);
			if ($options && $options.length > 1) {
				return true;
			}
			return false;
		}
	};

	function queryElement(selector) {
		return function() {
			console.log('Querying for [' + selector + ']...');
			var $el = $(selector);
			if ($el) {
				return true;
			}
			return false;
		}
	};

	function wait(queryFn) {
		var intervalId;
		var deferred = new $.Deferred();

		intervalId = setInterval(function() {
			if(queryFn()) {
				deferred.resolve(intervalId);
			}
		}, 1000);

		return deferred.promise();
	};

	$.when(wait(querySelect('#sponsor_select option')))
		.then(function(intervalId) {
			clearInterval(intervalId);
			setValue('#sponsor_select', '0');
			return wait(querySelect('#nexus_employer_select option'))
		})
		.then(function(intervalId) {
			clearInterval(intervalId);
			setValue('#nexus_employer_select', '4');
			return wait(querySelect('#network_select option'))
		})
		.then(function(intervalId) {
			clearInterval(intervalId);
			setValue('#network_select', '0');
			return wait(querySelect('#client_select option'))
		})
		.then(function(intervalId) {
			clearInterval(intervalId);
			setValue('#client_select', '4');
			return wait(querySelect('#employee_select option'))
		})
		.then(function(intervalId) {
			clearInterval(intervalId);
			setValue('#employee_select', '6');
			return wait(queryElement('#create_session_button'))
		})
		.then(function(intervalId) {
			clearInterval(intervalId);
			$('#create_session_button').click();
		});
})();
