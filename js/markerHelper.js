function markerHelper(affectedCountries, currentTrip, journeyIndex) {
    for (var i in airportCodes) {
        var country = airportData[airportCodes[i]].country.toUpperCase();
        var isSelected = (selectedAirport.airportCode == airportCodes[i])
        if (isSelected)
        {
            attachMarkerToAirport(airportData[airportCodes[i]], currentTrip, journeyIndex , isSelected);
            break;            
        }
        
    }
    // for (var i in mesh.affectedCountries) {
    //     var countryName = mesh.affectedCountries[i];
    //     var country = countryData[countryName];
    //     var isSelected = (selectedCountry.countryName == country.countryName)
    //     attachMarkerToCountry(countryName, country.mapColor, isSelected);
    // }
}