function visualisePaths(countries)
{
        selectVisualization( timeBins, '2009', countries);
        countries = nextItem(countries)
        setTimeout(function(){
            visualisePaths(countries);
        }, 5000)
}

function secondsAgo(unixTime) {
    return Math.round((new Date().getTime() / 1000)) - unixTime;
}

function nextItem(countries)
{
    var  temp =  countries.shift();
    countries.push(temp);
    return countries;
}