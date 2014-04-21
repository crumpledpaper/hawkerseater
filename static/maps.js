var initialLocation;
var singapore = new google.maps.LatLng(1.297553,103.849495);
var browserSupportFlag = new Boolean();
var places = [
	['Old Airport Road Food Centre',1.307233,103.884117],
	['Tekka Centre',1.30619,103.850551],
	['China Square Food Centre',1.282847,103.849253],
	['Maxwell Road Hawker Centre',1.280525,103.844484],
	['Zion Riverside Food Centre',1.292479,103.831239],
	['Adam Food Centre',1.324164,103.814019],
	['Bedok South 16 Hawker Centre',1.320737,103.935776],
	['Bedok Food Centre',1.320345,103.955435],
	['The Centrepoint',1.301972,103.839832],
	['Juz Food Court',1.300518,103.841845],
	['67 Killiney Kopitiam',1.298883,103.839457],
	['3 Rochor Road Kopitiam',1.301926,103.854722],
	['Food Court @ Sim Lim Square',1.30309,103.853097],
	['200 Middle Road',1.300491,103.851514],
	['Stadium Koufu',1.300915,103.876627],
	['Kopitiam Food Court @ Plaza By The Park', 1.2959716,103.8494935],
	['Koufu Food Court @ SMU', 1.2968834,103.8491503],
	['Bras Basah Complex Food Court', 1.2964436,103.8521866],
	['Sophia Food Mall', 1.2982027,103.8441829],
	['Juz Food Court', 1.2982027,103.8441829],
	['67 Killiney Kopitiam', 1.2982027,103.8441829],
	['Food Court Pte Ltd', 1.2968726,103.8416509],
	['Koufu @ Cathay Cineleisure', 1.3023724,103.8361336],
	['Food Village @ Ngee Ann City', 1.3023724,103.8361336],
	['Food Republic @ Wisma Atria', 1.3038419,103.8340629],
	['Food Opera ION Orchard', 1.3038419,103.8340629],
	['Asia Foodmall Lucky Plaza', 1.3038419,103.8340629],
	['Lucky Food Centre', 1.3038419,103.8340629]
];

function initialize() {
	var mapOptions = {
		zoom: 15,
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
	
	setMarkers(map, places);
	function setMarkers(map, places) {
		for (var i = 0; i < places.length; i++) {
			var place = places[i];
			var myLatLng = new google.maps.LatLng(place[1], place[2]);
			var marker = new google.maps.Marker({
				position: myLatLng,
				icon: ['/static/img/marker-green.png','/static/img/marker-yellow.png','/static/img/marker-red.png'][Math.floor(Math.random() * 3)],
				map: map,
				title: place[0],
				url: '/#tablesPage?place=' + encodeURIComponent(place[0])
			});
			google.maps.event.addListener(marker, 'click', function() {
				window.location.href = this.url;
			});
		}
	}
}

google.maps.event.addDomListener(window, 'load', initialize);