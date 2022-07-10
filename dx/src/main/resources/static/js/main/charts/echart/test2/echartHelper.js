function autoFontSize() {
    let width = document.getElementById('chart').offsetWidth;
    let newFontSize = Math.round(width / 11);
    return newFontSize;
  };

// ============================== echart ===================================
function createEChart(chartType, divId, echart, echartOption, tableName, isAddLiveData, dataPer, xAxisCategories, XAxisVal, shiftCnt, data) {
    let dataSeries = [];  // vo key 값.
    let chartTitle;

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
                // x축의 데이터를 dataPer씩 증가
                dataSeries[j].data.push([XAxisVal, data[i][dataKeys[j]]]);
            }
            XAxisVal += dataPer;
        }
    } 

    echart = echarts.init(document.getElementById(divId));

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
            data: xAxisCategories,
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
        callRealTimeDataAndDrawChart(chartType, tableName, echart, echartOption, isAddLiveData, dataPer, XAxisVal, shiftCnt);
    }
}