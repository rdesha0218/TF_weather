<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
$(document).ready(function() {
	$('#search-term').submit(function(event) {
	// get the value of the tags the user submitted
	var user_input = $(this).find("input[name='location']").val();
	input_split = user_input.split(',');
	console.log(input_split);
	console.log(input_split[0]);
	console.log(input_split[1]);
	var user_city = input_split[0];
	var user_state_abr = input_split[1];
	var temp_f, full_loc, city, state_abr, icon, humidity, pressure_trend, pressure_in;

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
	pressure_trend = parsed_json['current_observation']['pressure_trend'];

	
	$('#search-results').append('<h1 class="location">' + city + ", " + state_abr + '</h1>').text();
	$('#search-results').append('<img id="icon" src="' + icon + '">').text();
	$('#search-results').append('<h1 class="temp_f">' + temp_f + '<span id="degree">&degF</span></h1>').text();
	$('#search-results').append('<h2 class="humidity">Relative Humidity: ' + humidity + '</h2>').text();
	$('#search-results').append('<h2 class="pressure">Pressure: ' + pressure_in + 'in' + pressure_trend + '</h2>').text();

	sunset(user_city, user_state_abr);
	}
});
});
});

function sunset(city, state) {
	var rise_hour, rise_minute, set_hour, set_minute;
	$.ajax({

			url: "http://api.wunderground.com/api/4d218aa09b58e993/astronomy/q/" + city + "/" + state + ".json", 
			dataType : "jsonp",
			success : function(parsed_json) {
			var rise_hour = parsed_json['sunrise']['hour'];
			var  rise_minute = parsed_json['sunrise']['minute'];

			console.log(rise_hour);
			console.log(rise_minute);
			}
  });
});
}