var apiKey = "dbf364bc39a4580a03a0dd92d999aa37";
var $cityOneName = $("#city-1-name");
var $cityOneIcon = $("#city-1-wx-icon");
var $cityOneTemp = $("#city-1-temp");
var $cityOneHumidity = $("#city-1-humidity");
var $cityTwoName = $("#city-2-name");
var $cityTwoIcon = $("#city-2-wx-icon");
var $cityTwoTemp = $("#city-2-temp");
var $cityTwoHumidity = $("#city-2-humidity");
var $scoreContainer = $('.score-container');
var $container = $('#container');
var $cityOneTeleOverall = $('#city-1-teleport-overall');
var $cityTwoTeleOverall = $('#city-2-teleport-overall');
var $cityOneTeleSum = $('#city-1-teleport-summary');
var $cityTwoTeleSum = $('#city-2-teleport-summary');
var $cityOneImage = $('#city-1-image');
var $cityTwoImage = $('#city-2-image');
var $cityOneBox = $('#box1');
var $cityTwoBox = $('#box2');
var $cityOneBoxResults = $('#box1Results');
var $cityTwoBoxResults = $('#box2Results');
var $cityOverallScore1 = $('#overall-1');
var $cityOverallScore2 = $('#overall-2');
var $mainBodyArea = $('#main-body-area');
var cityOneHasData = false;
var cityTwoHasData = false;
var cityOneDataArray = [];
var cityTwoDataArray = [];
var currentCityNameOne = "";
var currentCityNameTwo = "";
var dataArray = [
    ['Housing', 0, 0],
    ['Cost of Living', 0, 0],
    ['Startups', 0, 0],
    ['Venture Capital', 0, 0],
    ['Travel Connectivity', 0, 0],
    ['Commute', 0, 0],
    ['Business Freedom', 0, 0],
    ['Safety', 0, 0],
    ['Healthcare', 0, 0],
    ['Education', 0, 0],
    ['Environmental Quality', 0, 0],
    ['Economy', 0, 0],
    ['Taxation', 0, 0],
    ['Internet Access', 0, 0],
    ['Leisure and Culture', 0, 0],
    ['Tolerance', 0, 0],
    ['Outdoors', 0, 0],
];

function getCityData(uaSlug, uaId, whichCity) {
    $.ajax({
        url: "https://api.teleport.org/api/urban_areas/slug:" + uaSlug + "/scores/",
        method: "GET"
    }).then(function (response) {
        //STORE THE DATA TO COMPARE LATER
        if (whichCity == 1) {
            cityOneDataArray = response.categories;
            $cityOverallScore1.removeClass("hide-div");
        }
        else {
            cityTwoDataArray = response.categories;
            $cityOverallScore2.removeClass("hide-div");
        }

        //lOOPING THROUGH THE CATECORIES AND DISPLAYING THEM TO SEE WHAT WE HAVE
        for (i = 0; i < response.categories.length; i++) {
            //DETERMINING WHICH DIV TO POPULATE
            if (whichCity == 1) {
                dataArray[i][2] = "-" + response.categories[i].score_out_of_10.toFixed(1);
                //OVERALL SCORE CALCULATED BY TELEPORT
                $cityOneTeleOverall.text(response.teleport_city_score.toFixed(2));
                $cityOneTeleSum.text(response.summary);
            }
            else {
                dataArray[i][1] = response.categories[i].score_out_of_10.toFixed(1);
                //OVERALL SCORE CALCULATED BY TELEPORT
                $cityTwoTeleOverall.text(response.teleport_city_score.toFixed(2));
                $cityTwoTeleSum.text(response.summary);
            }
        }
        refreshChart();
    })

    $.ajax({
        url: "https://api.teleport.org/api/urban_areas/slug:" + uaSlug + "/images/",
        method: "GET"
    }).then(function (response) {
        if (whichCity == 1) {
            // $cityOneImage.attr("src", response.photos[0].image.web);
            $cityOneBox.css("background-image", "url(" + response.photos[0].image.web + ")");
        }
        else {
            // $cityTwoImage.attr("src", response.photos[0].image.web);
            $cityTwoBox.css("background-image", "url(" + response.photos[0].image.web + ")");
        }
    })
}

function getCityWx(lat, lon, whichCity) {
    if($mainBodyArea){$mainBodyArea.removeClass("hide-div")}
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey,
        method: "GET"
    }).then(function (response) {
        //PUTTING THE RESULTS IN THE RIGHT PLACE
        if (whichCity == 1) {
            $cityOneTemp.text(response.main.temp.toFixed(1));
            $cityOneHumidity.text(response.main.humidity);
            $cityOneIcon.attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
            $cityOneBoxResults.removeClass("hide-div");
        }
        else {
            $cityTwoTemp.text(response.main.temp.toFixed(1));
            $cityTwoHumidity.text(response.main.humidity);
            $cityTwoIcon.attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
            $cityTwoBoxResults.removeClass("hide-div");
        }
    })
}

//TELEPORTS AUTO COMPLETE FOR CITY 1
TeleportAutocomplete.init('#city-choice-1').on('change', function (value) {
    if (!value) return;
    $cityOneTeleOverall.text("");
    $cityOneTeleSum.text("");
    $cityOneImage.attr("src", "#")
    //USING THE LAT LON FROM THE RESULTS TO GET THE PROPER WX
    currentCityNameOne = value.name + ", " + value.country
    $cityOneName.html(value.name + "<br>" + value.country);
    getCityWx(value.latitude, value.longitude, 1)
    //CHECKING TO MAKE SURE WE CAN GET URBAN DATA
    if (value.uaSlug) {
        console.log(value.uaSlug)
        cityOneHasData = true;
        getCityData(value.uaSlug, value.uaId, 1);
    }
    else {
        for (i = 0; i < dataArray.length; i++) {
            dataArray[i][2] = 0;
        }
        refreshChart();
    }
});

//TELEPORTS AUTO COMPLETE FOR CITY 2
TeleportAutocomplete.init('#city-choice-2').on('change', function (value) {
    if (!value) return;
    $cityTwoTeleOverall.text("");
    $cityTwoTeleSum.text("");
    $cityTwoImage.attr("src", "#");
    //USING THE LAT LON FROM THE RESULTS TO GET THE PROPER WX
    currentCityNameTwo = value.name + ", " + value.country;
    $cityTwoName.html(value.name + "<br>" + value.country);
    getCityWx(value.latitude, value.longitude, 2)
    //CHECKING TO MAKE SURE WE CAN GET URBAN DATA
    if (value.uaSlug) {
        console.log(value.uaSlug)
        cityTwoHasData = true;
        getCityData(value.uaSlug, value.uaId, 2);
    }
    else {
        for (i = 0; i < dataArray.length; i++) {
            dataArray[i][1] = 0;
        }
        refreshChart();
    }
});

function refreshChart() {
    $scoreContainer.removeClass("hide-div");
    $container.empty();
    // create data set
    var dataSet = anychart.data.set(dataArray);

    // map data for the first series, take x from the zero column and value from the first column of data set
    var firstSeriesData = dataSet.mapAs({ x: 0, value: 1 });

    // map data for the second series, take x from the zero column and value from the second column of data set
    var secondSeriesData = dataSet.mapAs({ x: 0, value: 2 });

    // create bar chart
    var chart = anychart.bar();

    // turn on chart animation
    chart.animation(true);

    // set padding
    chart.padding([10, 20, 5, 20]);

    // force chart to stack values by Y scale.
    chart.yScale().stackMode('value');

    // format y axis labels so they are always positive
    chart.yAxis().labels().format(function () {
        return Math.abs(this.value).toLocaleString();
    });

    // set title for Y-axis
    chart.yAxis(0).title('Score');

    // allow labels to overlap
    chart.xAxis(0).overlapMode('allow-overlap');

    // turn on extra axis for the symmetry
    chart.xAxis(1)
        .enabled(true)
        .orientation('right')
        .overlapMode('allow-overlap');

    // set chart title text
    chart.title('City Comparison: Teleport Data Scores');

    chart.interactivity().hoverMode('by-x');

    chart.tooltip()
        .title(false)
        .separator(false)
        .displayMode('separated')
        .positionMode('point')
        .useHtml(true)
        .fontSize(12)
        .offsetX(5)
        .offsetY(0)
        .format(function () {
            return '<span style="color: #D9D9D9"></span>' + Math.abs(this.value).toLocaleString();
        });

    // temp variable to store series instance
    var series;

    // create first series with mapped data
    series = chart.bar(firstSeriesData);
    series.name(currentCityNameTwo)
    // .color('Red');
    series.tooltip()
        .position('right')
        .anchor('left-center');

    // create second series with mapped data
    series = chart.bar(secondSeriesData);
    series.name(currentCityNameOne)
    // .color('Purple');
    series.tooltip()
        .position('left')
        .anchor('right-center');

    // turn on legend
    chart.legend()
        .enabled(true)
        .inverted(true)
        .fontSize(13)
        .padding([0, 0, 20, 0]);

    // set container id for the chart
    chart.container('container');

    // initiate chart drawing
    chart.draw();
};