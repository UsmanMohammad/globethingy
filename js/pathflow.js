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
    visualisePaths(countries)
}

function visualisePaths(countries) {
    selectVisualization(timeBins, '2009', countries);
    countries = nextItem(countries)
    setTimeout(function () {
        visualisePaths(countries);
    }, 5000)
}


function nextItem(countries) {
    var temp = countries.shift();
    countries.push(temp);
    return countries;
}