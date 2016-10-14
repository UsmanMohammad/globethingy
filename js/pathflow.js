function countryCycle() {
    var countries = [];
    var first = true;
    for (var i in timeBins[0].data) {
        var c = timeBins[0].data[i];
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
    visualisePaths(countries, airportCodes)
}

function visualisePaths(countries, trip) {
    
    selectVisualization(timeBins[0].data, trip[0]);
    countries = nextItem(countries)
    trip = nextItem(trip);
    setTimeout(function () {
        visualisePaths(countries, trip);
    }, 5000)
}


function nextItem(countries) {
    var temp = countries.shift();
    countries.push(temp);
    return countries;
}