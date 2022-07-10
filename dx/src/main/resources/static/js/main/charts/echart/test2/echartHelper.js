// chart Options
function createChartOptions(mainTitle, dataTitles, seriesType) {
    let dataSeries = [];  // vo key 값.
    let chartTitle = mainTitle + ' (live data graph)';
    let xAxis;

    // series 데이터 셋팅
    if (seriesType === 'line') {
        for (let i = 0; i < dataTitles.length; i++) {
            dataSeries[i] = {
                name: dataTitles[i],
                type: seriesType,
                data: []
            }                
        }
        
        xAxis =  {
            type: 'category',
            boundaryGap: false,
            data: [],
            splitLine: {
                show: false
            }
        }

    } else if (seriesType === 'bar') {
        dataSeries = {
            name: 'db',
            type: seriesType,
            barWidth: '60%',
            data: []
        }   

        xAxis =  {
            type: 'category',
            scale : true,
            boundaryGap: [0.5, 0.5],
            splitNumber : 15,
            data: []
        }
    }

    let echartOption = {
        title: {
            text: chartTitle,
            padding: [10, 10, 0, 0],
        },
        /* legend: {
            orient: 'horizontal',
            padding: [50, 0, 0, 50],
            data: dataTitles
        }, */
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['bar','line']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        dataZoom: [
            {
                type: 'slider',
                filterMode: "filter",
                realTime: true
            }
        ], 
        grid: {
            left: '3%',
            right: '3%',
            top: '0%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: xAxis,
        yAxis : [
            {
                type: 'value',
                min: -30,
                max: 100,
                axisLabel : {
                    formatter: '{value} db'
                }
            }
        ],
        series: dataSeries
    };

    return echartOption;
}

// ============================== create echart ===================================
function createEChart(divId, echartOption) {
    let echart = echarts.init(
        document.getElementById(divId),
        null,
        {
            renderer: 'canvas'
        }
    );

    echart.setOption(echartOption);

    return echart;
}