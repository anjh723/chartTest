let echartOption;

// ============================== highcharts ===================================
function createEChart(tableName, isAddLiveData, liveStartTime, shiftCnt, data) {
    let dataSeries = [];  // vo key 값.
    let chartTitle;
    let chartEvent;
    livePointTime = liveStartTime;

    if (isAddLiveData) {
        chartTitle = tableName + ' live data graph';
        chartEvent = {
                    load: callRealTimeDataAndDrawChart(tableName, isAddLiveData, shiftCnt)
                }
    } else {
        chartTitle = tableName + ' static data graph';
    }

    // series 데이터 셋팅
    for (let i = 0; i < dataKeys.length; i++) {
        dataSeries[i] = {
            id: dataTitles[i],
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

    chart = echarts.init(document.getElementById('chart'),
        null,
        {
            renderer: 'canvas',
            useDirtyRect: false
        }
    );

    echartOption = {
        title: {
            text: chartTitle
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                },
                dataView: {
                    readOnly: false
                },
                restore: {},
                saveAsImage: {}
            }
        },
        tooltip: {
            trigger: 'axis',
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
        dataZoom: [
            {
                type: 'slider',
                start: 0,
                end: dataSeries.length
            }
        ],
        xAxis: [
            {
                type: 'time',
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value} $'
                }
            }
        ],
        plotOptions: {
            series: {
                boostThreshold: 1
            }
        },
        boost: {
            enabled: true,
            useGPUTranslations: true
        },
        series: dataSeries
    };


    chart.setOption(echartOption);
    
    // 데이터 초기화
    dataSeries = [];
}

window.addEventListener('resize', chart.resize);