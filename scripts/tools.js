
var wpt = {};
wpt.tools = (function() {

    function checkReady(callback) {
        if (window.jQuery) {
            callback(jQuery);
        }
        else {
            window.setTimeout(function() { checkReady(callback); }, 100);
        }
    }

	function loadJQuery() {
	    var script = document.createElement("SCRIPT");
	    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
	    script.type = 'text/javascript';
	    document.getElementsByTagName("head")[0].appendChild(script);
	}

	function onReady(callback) {
		if (!window.jQuery) {
			loadJQuery();
		}
		checkReady(callback);
	}

	function setValue(selector, value) {
		$(selector).val(value);
		$(selector).trigger('change');
		console.log('Setting [' + selector + '] to [' + value + ']');
	}

	function findOptionValueByText($options, text) {
		var value;
		if ($options) {
			for (var i = 0; i < $options.length; i++) {
				var option = $options.get(i);
				console.log('comparing [', option.text, '] to [', text, ']');
				if (option.text === text) {
					value = option.value;
					break;
				}
			}
		}
		console.log('found value [', value, '] for text [', text, ']');
		return value;
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

	return {
		wait: wait,
		queryElement: queryElement,
		querySelect: querySelect,
		setValue: setValue,
		findOptionValueByText: findOptionValueByText,
		onReady: onReady
	};

})();
