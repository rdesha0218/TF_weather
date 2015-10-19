$(document).ready(function() {
	$('#search-term').submit(function(event) {
		$('#search-results').empty();
		$('.footer').show();

	// get the value of the tags the user submitted
	var user_input = $(this).find("input[name='location']").val();
	input_split = user_input.split(',');
	console.log(input_split);
	console.log(input_split[0]);
	console.log(input_split[1]);
	var user_city = input_split[0];
	var user_state_abr = input_split[1];
	var temp_f, full_loc, city, state_abr, icon, humidity, pressure_trend, pressure_in, rise_hour, rise_minute, set_hour, set_minute, fore_icon, fore_title, fore_text, fore_day, fore_month, fore_high, fore_low, fore_condit, radar;

	$.ajax({
			url : "http://api.wunderground.com/api/4d218aa09b58e993/geolookup/conditions/q/" +
			user_state_abr + "/" + user_city + ".json",
			dataType: "jsonp",

		success : function(parsed_json) {
		city = parsed_json['location']['city'];
		state_abr = parsed_json['location']['state'];
		temp_f = parsed_json['current_observation']['temp_f'];
		icon = parsed_json['current_observation']['icon_url'];
		humidity = parsed_json['current_observation']['relative_humidity'];
		pressure_in = parsed_json['current_observation']['pressure_in'];
		//radar = "http://api.wunderground.com/api/4d218aa09b58e993/radar/q/" +  user_state_abr +  "/" + user_city + ".gif?width=280&height=280&newmaps=1";

	function settime(city, state) {
		$.ajax({
			url: "http://api.wunderground.com/api/4d218aa09b58e993/astronomy/q/" + 
			user_state_abr + "/" + user_city + ".json", 
			dataType : "jsonp",

		success : function(parsed_json) {
		rise_hour = parsed_json['sun_phase']['sunrise']['hour'];
		rise_minute = parsed_json['sun_phase']['sunrise']['minute'];
		set_hour = parsed_json['sun_phase']['sunset']['minute'];
		set_minute = parsed_json['sun_phase']['sunset']['minute'];

		//$('#search-results').append('<h2 class="suntime">Sunrise: ' + rise_hour + ":" + rise_minute + "AM").text();
		//$('#search-results').append('<h2 class="suntime">Sunrise: ' + (set_hour - 12) + ":" + set_minute + "PM").text();

		$('#search-results').append('<table class="suntime"><tr><td width="40%"><h2>Sunrise: ' + rise_hour + ':' + rise_minute + 'AM</td><td width="40%"><h2>Sunrise: ' + (set_hour - 12) + ':' + set_minute + 'PM</td></tr></table>').text();

		}
  });

}

	 function forecast(city,state){
	 	$('#forecast').empty();
	 	$.ajax({
	 		url: "http://api.wunderground.com/api/4d218aa09b58e993/forecast/q/" +
	 		user_state_abr + "/" + user_city + ".json",
	 		dataType: "jsonp", 


	 		success : function(data) {
	 			console.log(data);
	 		//fore_icon = data['forecast']['txt_forecast']['forecastday'][0]['icon_url'];
	 		//fore_title = data['forecast']['txt_forecast']['forecastday'][0]['title'];
	 		//fore_text = data['forecast']['txt_forecast']['forecastday'][0]['fcttext'];
	 		//$('#forecast').append('<img id="icon" src="' + fore_icon + '">').text();
	 		//$('#forecast').append('<h1>Forecast</h1>').text();
	 		//for (var i = 0; i < 8; i++) {
	 		//fore_title = data['forecast']['txt_forecast']['forecastday'][i]['title'];
	 		//fore_text = data['forecast']['txt_forecast']['forecastday'][i]['fcttext'];
	 		//$('#forecast').append('<h2>Forecast for  ' + fore_title + ' is ' + fore_text + '</h2>').text();
	 		//}
	 		
	 		$('#forecast').append('<h1>Forecast</h1>').text();
	 		for (var i = 0; i < 4; i++) {
	 		fore_icon = data['forecast']['simpleforecast']['forecastday'][i]['icon_url'];
	 		fore_month = data['forecast']['simpleforecast']['forecastday'][i]['date']['monthname'];
	 		fore_day = data['forecast']['simpleforecast']['forecastday'][i]['date']['day'];
	 		fore_high = data['forecast']['simpleforecast']['forecastday'][i]['high']['fahrenheit'];
	 		fore_low = data['forecast']['simpleforecast']['forecastday'][i]['low']['fahrenheit'];
	 		fore_condit = data['forecast']['simpleforecast']['forecastday'][i]['conditions'];

	 		$('#forecast').append('<table class="forecast" style="width:40%"><tr><td width="20%">' + fore_month + ' ' + fore_day + '</td><td width="20%"><img id="fore_icon" src="' + fore_icon + '"></td><td width="20%">High: ' + fore_high + '&deg;F<br>Low: ' + fore_low + '&deg;F</td><td width="20%">' + fore_condit + '</td>	</tr></table>').text();
	 		}	
	 		}

	 	});
	 } 
	
	$('#search-results').append('<h1 class="location">' + city + ", " + state_abr + '</h1><br>').text();
	//$('#search-results').append('<img id="icon" src="' + icon + '"><br><h1 class="temp_f">' + temp_f + '<span id="degree">&degF</span></h1>').text();
	//$('#search-results').append('<h2 class="humidity">Relative Humidity: ' + humidity + '</h2><br>').text();
	//$('#search-results').append('<h2 class="pressure">Barometric Pressure: ' + pressure_in + ' in </h2>').text();
	
	$('#search-results').append('<table style="width:80%" class="info"><td width="30%"><img id="icon" src="' + icon + '"><br><h1 class="temp_f">' + temp_f + '<span id="degree">&degF</span></h1></td><td width="30%"><h2 class="humidity">Relative Humidity: ' + humidity + '</h2><br><h2 class="pressure">Barometric Pressure: ' + pressure_in + ' in </h2></td></table>').text();

	settime(user_city, user_state_abr);
	forecast(user_city, user_state_abr);
	}
});
});
});

	