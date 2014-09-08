(function() {

    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);

    var checkReady = function(callback) {
        if (window.jQuery) {
            callback(jQuery);
        }
        else {
            window.setTimeout(function() { checkReady(callback); }, 100);
        }
    };

    checkReady(function($) {
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
				console.log('Resolving...');
				deferred.resolve(intervalId);
			}
		}, 1000);

		return deferred.promise();
	};

	$.when(wait(queryElement('a[href="/app/nexus/medical/index"]')))
		.then(function() {
			$('a[href="/app/nexus/medical/index"]')[0].click();
		});
})();

    });
})();
