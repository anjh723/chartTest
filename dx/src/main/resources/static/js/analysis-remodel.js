
chart = new Highcharts.Chart({
    chart: {
        renderTo: 'container-remodel1',
        defaultSeriesType: 'spline',
        events: {
            load: requestLiveData
        }
    },
    title: {
        text: 'Live random data'
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 100,
        maxZoom: 30000 * 1000
    },
    yAxis: {
        minPadding: 0.1,
        maxPadding: 0.1,
        title: {
            text: 'Value',
            margin: 80
        }
    },
    series: [{
        name: 'Random data',
        data: []
    }]
});
    

function requestLiveData() {
    fetch("/graphData/" + 0, {cache: "no-cache"})
        .then((res) => {
            return res.json();
        })
        .then((point) => {
            var series = chart.series[0];

            // shift if the series is longer than 30000
            var shift = series.data.length > 30000; 

            // add the point
            chart.series[0].addPoint(point[0].spl_CH1_1KHz, true, shift);

            // call it again after one second
            setTimeout(requestLiveData, 1000);
        });
}

requestLiveData();