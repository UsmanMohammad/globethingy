function countryCycle() {
    var countries = [];
    var first = true;
    for (var i in flights) {
        var c = flights[i];
        if (first) {
            countries.push(airportData[c.departure.toUpperCase()].country.toUpperCase());
            first = false;
        }

        var country = airportData[c.arrival.toUpperCase()].country.toUpperCase();
        if (countries[countries.length - 1] != country) {
            countries.push(country);
        }

    }
    if (countries[countries.length -1] == countries[0]){
        countries.pop();
    }
    visualisePaths(countries, airportCodes, 0)
}

function visualisePaths(countries, trip, journeyIndex) {
    
    if (journeyIndex > flights.length)
        journeyIndex = 0;
    selectVisualization(flights, trip[0], journeyIndex);
    countries = nextItem(countries)
    trip = nextItem(trip);
    setTimeout(function () {
        visualisePaths(countries, trip, journeyIndex + 1);
    }, 5000)
}


function nextItem(countries) {
    var temp = countries.shift();
    countries.push(temp);
    return countries;
}