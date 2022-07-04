let highchart; // chart

// ============================== highcharts ===================================
function createHighChart(chartType, tableName, isAddLiveData, liveStartTime, shiftCnt, data) {
    let dataSeries = [];  // vo key 값.
    let chartTitle;
    let chartEvent;
    livePointTime = liveStartTime;

    if (isAddLiveData) {
        chartTitle = tableName + ' live data graph';
        chartEvent = {
                    load: callRealTimeDataAndDrawChart(chartType, tableName, isAddLiveData, shiftCnt)
                }
    } else {
        chartTitle = tableName + ' static data graph';
    }

    // series 데이터 셋팅
    for (let i = 0; i < dataKeys.length; i++) {
        dataSeries[i] = {
            name: dataTitles[i],
            boostThreshold: 1,
            turboThreshold: 0,
            animation: false,
            data: []
        }                
    }

    if (data != null && data.length > 0) {
        for(let i = 0 ; i < data.length ; i++) {
            for (let j = 0; j < dataKeys.length; j++) {
                dataSeries[j].data.push(data[i][dataKeys[j]]);
            }
        }
    } 

    highchart = new Highcharts.chart({
        chart: {
            renderTo: 'chart',
            type: 'spline',
            events: chartEvent,
            redraw: true,
            animation: false,
            zoomType: "xy",
            panning: true,
            panKey: "shift"
        },
        title: {
            text: chartTitle
        },
        legend: {
            enabled: true
            , itemStyle: {
                color: '#000000'
            }
        },
        Axis: {
            enabled: false
        },
        plotOptions: {
            series: {
                boostThreshold: 1
            }
        },
        boost: {
            enabled: true,
            useGPUTranslations: true
        },
        tooltip: {
            formatter: function () {
                let s = '<b>' + this.x + '</b>';
                $.each(this.points, function (i, point) {
                    s += '<br/>' + point.series.name + ': ' +
                        point.y;
                });
                return s;
            },
            shared: true
        },
        series: dataSeries  
    });

    // 데이터 초기화
    dataSeries = [];
}