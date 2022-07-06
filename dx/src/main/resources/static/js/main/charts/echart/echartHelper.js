let echartOption;
let echart;

function autoFontSize() {
    let width = document.getElementById('chart').offsetWidth;
    let newFontSize = Math.round(width / 11);
    return newFontSize;
  };

// ============================== echart ===================================
function createEChart(chartType, tableName, isAddLiveData, liveStartTime, shiftCnt, data) {
    let dataSeries = [];  // vo key 값.
    let chartTitle;
        
    livePointTime = liveStartTime;

    if (isAddLiveData) {
        chartTitle = tableName + ' live data graph';
    } else {
        chartTitle = tableName + ' static data graph';
    }

    // series 데이터 셋팅
    for (let i = 0; i < dataKeys.length; i++) {
        dataSeries[i] = {
            name: dataTitles[i],
            type: 'line',
            showSymbol: false,
            zlevel: i + 1,
            data: []
        }                
    }

    if (data != null && data.length > 0) {
        for(let i = 0 ; i < data.length ; i++) {
            for (let j = 0; j < dataKeys.length; j++) {
                // x축의 데이터를 time 기준
                // dataSeries[j].data.push([data[i].time, data[i][dataKeys[j]]]);

                
                // x축의 데이터를 uid기준
                dataSeries[j].data.push([data[i].uid, data[i][dataKeys[j]]]);
            }
        }
    } 

    echart = echarts.init(document.getElementById('chart'));

    echartOption = {
        title: {
            text: chartTitle,
            padding: [0, 0, 0, 30],
        },
        legend: {
            orient: 'horizontal',
            padding: [50, 0, 0, 50],
            data: dataTitles
        },
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
            //trigger: 'axis'
        },
        dataZoom: [
            {
                type: 'slider',
                filterMode: "filter",
                realtime : true,
            }
        ], 
        grid: {
            left: '3%',
            right: '3%',
            top: '30%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'time',
            onZero: false,
            splitLine: {
                show: false
            }
        },
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value} db'
                }
            }
        ],
        series: dataSeries
    };

    echart.setOption(echartOption);
    
    // 데이터 초기화
    dataSeries = [];

    if (isAddLiveData) {
        callRealTimeDataAndDrawChart(chartType, tableName, isAddLiveData, shiftCnt);
    }
}