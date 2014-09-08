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
			return $(selector).length === 1;
		}
	};

	function wait(queryFn) {
		var intervalId;
		var deferred = new $.Deferred();

		intervalId = setInterval(function() {
			if(queryFn()) {
				clearInterval(intervalId);
				deferred.resolve();
			}
		}, 1000);

		return deferred.promise();
	};

	$.when(wait(querySelect('.medical-plan-elect-button')))
		.then(function() {
			var $button = $('.medical-plan-elect-button').get(1);
			if ($button.text !== 'Deselect') {
				$button.click();
			}
			return wait(queryElement('#Next-button'))
		})
		.then(function() {
			$('#Next-button').click();
		});
})();
