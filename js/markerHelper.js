function markerHelper(affectedCountries) {
    for (var i in airportCodes) {
        var country = airportData[airportCodes[i]].country.toUpperCase();
        var isSelected = (selectedCountry.countryName == country)
        if (isSelected)
            attachMarkerToAirport(airportData[airportCodes[i]], country, 12, isSelected);
        
    }
    // for (var i in mesh.affectedCountries) {
    //     var countryName = mesh.affectedCountries[i];
    //     var country = countryData[countryName];
    //     var isSelected = (selectedCountry.countryName == country.countryName)
    //     attachMarkerToCountry(countryName, country.mapColor, isSelected);
    // }
}