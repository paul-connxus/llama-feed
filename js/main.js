$(function() {

	var $nextBtn = $('.btn-group .next'),
		$prevBtn = $('.btn-group .prev'),
		$items = $('.streams-list ul li'),
		counter = 0,
		amount = $items.length,
		current = $items[0];

	function navigate(direction) {
		current.classList.remove('active');
		counter = counter + direction;

		if ( direction = -1 && counter < 0 ) {
			counter = amount - 1;
		}

		if ( direction = 1 && !$items[counter] ) {
			counter = 0;
		}

		current = $items[counter];
		current.classList.add('active');
	}

	function requestWeatherFromZipCode(zip, error, success) {
		var apiKey = 'a98701796e6ec7f3a17c2c15a64658b2';
		var apiBaseUrl = '//api.openweathermap.org/data/2.5/weather';

		return $.ajax({
			url: (apiBaseUrl + '?zip=' + zip + ',us&units=imperial&APPID=' + apiKey),
			success: success, // data
			error: error // xhr, type
		});
	};

	function weatherHTML(data) {
		var markup = '<h1 class="title">' + data.name + '</h1><h1>' + data.main.temp + '&deg;</h1>'
		var details = '<ul class="details">'
		function iconURL(icn) { return 'http://openweathermap.org/img/w/' + icn + '.png'; };

		details += '<li> <strong>Humidity</strong> <span>' + data.main.humidity + '</span></li>';

		if ( data.weather.length ) {

			data.weather.forEach(function(obj) {
				details += '<li> <img class="icon" src="' + iconURL(obj.icon) + '"> <strong>' + obj.main + '</strong> <span>' + obj.description + '</span></li>';
			});

			details += '</ul>';
		}

		return markup + details;
	}

	$nextBtn.on('click', function() {
		navigate(1);
	});

	$prevBtn.on('click', function() {
		navigate(-1);
	});
	
	requestWeatherFromZipCode('02568', function(xhr, type) {
		console.error(xhr, type);
	}, function(data) {
		if ( data ) {
			$('.marthas-vineyard-weather').html(weatherHTML(data));
		}
	});

	requestWeatherFromZipCode('80537', function(xhr, type) {
		console.error(xhr, type);
	}, function(data) {
		if( data ) {
			$('.loveland-weather').html(weatherHTML(data));
		}
	});

	requestWeatherFromZipCode('84036', function(xhr, type) {
		console.error(xhr, type);
	}, function(data) {
		if( data ) {
			$('.salt-lake-city-weather').html(weatherHTML(data));
		}
	});

	navigate(0);

	setInterval(function() {
		navigate(1);
	}, (1 * 60 * 1000));

});