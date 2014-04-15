var initialLocation;
var singapore = new google.maps.LatLng(1.328, 103.826);
var browserSupportFlag = new Boolean();

function initialize() {
	var mapOptions = {
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map-canvas"),
		mapOptions);
	// Try W3C Geolocation (Preferred)
	if(navigator.geolocation) {
	browserSupportFlag = true;
	navigator.geolocation.getCurrentPosition(function(position) {
	  initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	  map.setCenter(initialLocation);
	}, function() {
	  handleNoGeolocation(browserSupportFlag);
	});
	}
	// Browser doesn't support Geolocation
	else {
	browserSupportFlag = false;
	handleNoGeolocation(browserSupportFlag);
	}

	function handleNoGeolocation(errorFlag) {
	if (errorFlag == true) {
	  alert("Geolocation service failed.");
	  initialLocation = singapore;
	} else {
	  alert("Your browser doesn't support geolocation.");
	  initialLocation = singapore;
	}
	map.setCenter(initialLocation);
	}
}

google.maps.event.addDomListener(window, 'load', initialize);