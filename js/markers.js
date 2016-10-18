var markers = [];

function onMarkerHover(event) {
	var hx = event.clientX - window.innerWidth * 0.5;
	var hy = event.clientY - window.innerHeight * 0.5;
	var dx = mouseX - hx;
	var dy = mouseY - hy;
	var d = Math.sqrt(dx * dx + dy * dy);
	// if( event.target.style.visibility == 'visible' )
	// 	console.log('clicked on something!!');				
}

function attachMarkerToCountry(countryName, importance, isSelected) {
	//	look up the name to mesh
	countryName = countryName.toUpperCase();
	var country = countryData[countryName];
	if (country === undefined)
		return;

	var container = document.getElementById('visualization');
	var template = document.getElementById('marker_template');
	var marker = template.cloneNode(true);

	country.marker = marker;
	container.appendChild(marker);

	marker.countryName = countryName;

	marker.importance = importance;
	marker.selected = isSelected;
	marker.hover = false;

	marker.setPosition = function (x, y, z) {
		this.style.left = x + 'px';
		this.style.top = y + 'px';
		this.style.zIndex = z;
	}

	marker.setVisible = function (vis) {
		if (!vis)
			this.style.display = 'none';
		else {
			this.style.display = 'inline';
		}
	}
	var countryLayer = marker.querySelector('#countryText');
	marker.countryLayer = countryLayer;
	var detailLayer = marker.querySelector('#detailText');
	marker.detailLayer = detailLayer;
	marker.jquery = $(marker);
	marker.setSize = function (s) {
		var detailSize = Math.floor(2 + s * 0.5);
		this.detailLayer.style.fontSize = detailSize + 'pt';
		var totalHeight = detailSize * 2;
		this.style.fontSize = totalHeight * 1.125 + 'pt';
		if (detailSize <= 8) {
			this.countryLayer.style.marginTop = "0px";
		} else {
			this.countryLayer.style.marginTop = "-1px";
		}
	}

	marker.update = function () {
		var matrix = rotating.matrixWorld;
		var abspos = matrix.multiplyVector3(country.center.clone());
		var screenPos = screenXY(abspos);

		var s = 0.3 + camera.scale.z * 1;
		var importanceScale = this.importance / 5000000;
		importanceScale = constrain(importanceScale, 0, 18);
		s += importanceScale;

		if (this.tiny)
			s *= 0.75;

		if (this.selected)
			s = 15;

		if (!this.selected)
			s = 6;


		if (this.hover)
			s = 15;

		this.setSize(s);

		// if( this.selected )
		// this.setVisible( true )
		// else
		this.setVisible((abspos.z > 60) && s > 3);

		var zIndex = Math.floor(1000 - abspos.z + s);
		if (this.selected || this.hover)
			zIndex = 10000;

		this.setPosition(screenPos.x, screenPos.y, zIndex);
	}

	var nameLayer = marker.querySelector('#countryText');

	//	right now, something arbitrary like 10 mil dollars or more to be highlighted
	// var tiny =  (!marker.selected); // && (importance < 20000000) ;	
	marker.tiny = false;

	// if( tiny )
	// 	nameLayer.innerHTML = country.countryCode;	
	// else
	nameLayer.innerHTML = countryName.replace(' ', '&nbsp;');
	var detailLayer = marker.querySelector('#detailText');
	detailLayer.innerHTML = "2Pac is still alive";
	// marker.nameLayer = nameLayer;
	// marker.nameLayerText = countryName;
	// marker.nameLayerShorten = country.countryCode;;	




	var markerOver = function (e) {
		this.hover = true;
	}

	var markerOut = function (e) {
		this.detailLayer.innerHTML = "";
		this.hover = false;
	}

	if (!marker.tiny) {} else {
		marker.addEventListener('mouseover', markerOver, false);
		marker.addEventListener('mouseout', markerOut, false);
	}


	// var markerSelect = function(e){
	// 	var selection = selectionData;
	// 	selectVisualization( timeBins, selection.selectedYear, [this.countryName]);	
	// };
	// marker.addEventListener('click', markerSelect, true);

	markers.push(marker);
}


function attachMarkerToAirport(airport, currentTrip, journeyIndex, isSelected) {
	//	look up the name to mesh

	var container = document.getElementById('visualization');
	var template = document.getElementById('marker_template');
	var marker = template.cloneNode(true);

	airport.marker = marker;
	container.appendChild(marker);

	marker.countryName = airport.country;

	marker.importance = 12;
	marker.selected = isSelected;
	marker.hover = false;

	marker.setPosition = function (x, y, z) {
		this.style.left = x + 15 + 'px';
		this.style.top = y - 200 + 'px';
		this.style.zIndex = z;
	}

	marker.setVisible = function (vis) {
		if (!vis)
			this.style.display = 'none';
		else {
			this.style.display = 'inline';
		}
	}
	var countryLayer = marker.querySelector('#cityText');
	marker.countryLayer = countryLayer;
	var detailLayer = marker.querySelector('#countryText');
	marker.detailLayer = detailLayer;

	var flightDetailsLayer = marker.querySelector('#flightDetails');
	marker.flightDetailsLayer = flightDetailsLayer;

	var nextFlightLayer = marker.querySelector('#nextFlight')
	marker.nextFlightLayer = nextFlightLayer;

	var hotelNameLayer = marker.querySelector('#hotelNameText');
	marker.hotelNameLayer = hotelNameLayer;

	var hotelDescriptorLayer = marker.querySelector('#hotelDescriptor');
	marker.hotelDescriptorLayer = hotelDescriptorLayer;

	var hotelImageLayer = marker.querySelector('#hotelImage');
	marker.hotelImageLayer = hotelImageLayer;

	var nightStayLayer = marker.querySelector('#nightStayText');
	marker.nightStayLayer = nightStayLayer;

	var itinerarySectionLayer = marker.querySelector('#itinerarySection');
	marker.itinerarySectionLayer = itinerarySectionLayer;

	marker.jquery = $(marker);
	marker.setSize = function (s) {
		// var detailSize = Math.floor(2 + s * 0.5);	
		// this.detailLayer.style.fontSize = detailSize + 'pt';
		// var totalHeight = detailSize * 2;
		// this.style.fontSize = totalHeight * 1.125 + 'pt';
		// if(detailSize <= 8) {
		//     this.countryLayer.style.marginTop = "0px";  
		// } else {
		//     this.countryLayer.style.marginTop = "-1px";
		// }
		this.countryLayer.style.marginTop = "-1px";


	}

	marker.update = function () {
		var matrix = rotating.matrixWorld;
		var abspos = matrix.multiplyVector3(airport.center.clone());
		var screenPos = screenXY(abspos);

		var s = 0.3 + camera.scale.z * 1;
		var importanceScale = this.importance / 5000000;
		importanceScale = constrain(importanceScale, 0, 18);
		s += importanceScale;

		if (this.tiny)
			s *= 0.75;

		if (this.selected)
			s = 15;

		if (!this.selected)
			s = 6;


		if (this.hover)
			s = 15;

		this.setSize(s);

		// if( this.selected )
		// this.setVisible( true )
		// else
		this.setVisible((abspos.z > 60) && s > 3);

		var zIndex = Math.floor(1000 - abspos.z + s);
		if (this.selected || this.hover)
			zIndex = 10000;

		this.setPosition(screenPos.x, screenPos.y, zIndex);
	}

	var nameLayer = marker.querySelector('#cityText');

	//	right now, something arbitrary like 10 mil dollars or more to be highlighted
	// var tiny =  (!marker.selected); // && (importance < 20000000) ;	
	marker.tiny = false;

	// if( tiny )
	// 	nameLayer.innerHTML = country.countryCode;	
	// else
	nameLayer.innerHTML = airport.city.replace(' ', '&nbsp;');
	var detailLayer = marker.querySelector('#countryText');
	detailLayer.innerHTML = airport.country.toUpperCase();
	marker.itinerarySectionLayer.innerHTML = "Your Itinerary";

	if (journeyIndex <= flights.length) {
		if (journeyIndex < flights.length) {
			marker.nextFlightLayer.innerHTML = "Next Flight";
			marker.flightDetailsLayer.innerHTML = currentTrip + " ✈️ " + flights[journeyIndex].arrival;
		}
		else{
			marker.nextFlightLayer.innerHTML = "End of trip";
			marker.nextFlightLayer.style = "color:#CF000F"
		}

		if (journeyIndex != 0) {
			if (flights[journeyIndex - 1].hotels != null && flights[journeyIndex - 1].hotels.length > 0 ) {
				var hotel = flights[journeyIndex - 1].hotels[0];
				marker.hotelNameLayer.innerHTML = hotel.name;
				marker.hotelDescriptorLayer.innerHTML = "Hotel"
				marker.hotelImageLayer.src = hotel.imageUrl;
				marker.nightStayLayer.innerHTML = hotel.nightStay + ((hotel.nightStay > 1) ? " Nights Stay" : " Night Stay");
			}

		}
		else{
				marker.hotelNameLayer.innerHTML = "Start of trip";
				marker.hotelNameLayer.style = "color:#CF000F";
		}
	}


	// marker.nameLayer = nameLayer;
	// marker.nameLayerText = countryName;
	// marker.nameLayerShorten = country.countryCode;;	




	var markerOver = function (e) {
		this.hover = true;
	}

	var markerOut = function (e) {
		this.detailLayer.innerHTML = "";
		this.hover = false;
	}

	if (!marker.tiny) {} else {
		marker.addEventListener('mouseover', markerOver, false);
		marker.addEventListener('mouseout', markerOut, false);
	}


	// var markerSelect = function(e){
	// 	var selection = selectionData;
	// 	selectVisualization( timeBins, selection.selectedYear, [this.countryName]);	
	// };
	// marker.addEventListener('click', markerSelect, true);

	markers.push(marker);
}

function removeMarkerFromCountry(countryName) {
	countryName = countryName.toUpperCase();
	var country = countryData[countryName];
	if (country === undefined)
		return;
	if (country.marker === undefined)
		return;

	var index = markers.indexOf(country.marker);
	if (index >= 0)
		markers.splice(index, 1);
	var container = document.getElementById('visualization');
	container.removeChild(country.marker);
	country.marker = undefined;
}

function removeMarkerFromAirport(airportCode) {
	airportCode = airportCode.toUpperCase();
	var airport = airportData[airportCode];
	if (airport === undefined)
		return;
	if (airport.marker === undefined)
		return;

	var index = markers.indexOf(airport.marker);
	if (index >= 0)
		markers.splice(index, 1);
	var container = document.getElementById('visualization');
	container.removeChild(airport.marker);
	airport.marker = undefined;
}