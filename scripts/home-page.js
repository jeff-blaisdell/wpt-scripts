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

	$.when(wait(queryElement('form[action="/app/nexus/home/chooseEvent"]')))
		.then(function() {
			$('form[action="/app/nexus/home/chooseEvent"]').submit();
		});
})();
