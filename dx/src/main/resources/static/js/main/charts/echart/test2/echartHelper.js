// chart Options
function createChartOptions(mainTitle, dataTitles, seriesType) {
    let dataSeries = [];  // vo key 값.
    let chartTitle = mainTitle + ' (live)';
    let xAxis;

    // series 데이터 셋팅
    if (seriesType === 'line') {
        for (let i = 0; i < dataTitles.length; i++) {
            dataSeries[i] = {
                type: seriesType,
                name: dataTitles[i],
                showSymbol: false,
                hoverAnimation: false,
                animation: true,
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'linear',
                pointWidth: 0.5,
                data: []
            }                
        }
        
        xAxis =  {
            type: 'category',
            boundaryGap: true,
            axisLine: { onZero: false },
            data: [],
            splitLine: {
                show: false
            }
        }

    } else if (seriesType === 'bar') {
        dataSeries = {
            type: seriesType,
            name: 'db',
            axisLine: { onZero: false },
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
            top: '20%',
            bottom: '13%',
            containLabel: true
        },
        xAxis: xAxis,
        yAxis : [
            {
                type: 'value',
                min: -30,
                axisLine: { onZero: false },
                axisLabel : {
                    formatter: '{value} db',
                    inside: false
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