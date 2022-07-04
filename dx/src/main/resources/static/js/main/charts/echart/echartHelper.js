let echartOption;
let echart;

function autoFontSize() {
    let width = document.getElementById('chart').offsetWidth;
    let newFontSize = Math.round(width / 11);
    return newFontSize;
  };

// ============================== echart ===================================
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
                dataSeries[j].data.push([data[i].time, data[i][dataKeys[j]]]);
            }
        }
    } 

    echart = echarts.init(document.getElementById('chart'));

    echartOption = {
        title: {
            text: chartTitle
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
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
            },
            formatter: function (params) {
                return `${params.seriesName}<br />`;
            }
        },
        dataZoom: [
            {
                type: 'slider',
                start: 0,
                end: dataSeries.length
            }
        ],
        grid: {
            left: '5%',
            right: '10%',
            bottom: '10%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'value',
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value} db'
                }
            }
        ],
        plotOptions: {
            series: {
                boostThreshold: 1
            }
        },
        series: dataSeries
    };


    echart.setOption(echartOption);
    
    // 데이터 초기화
    dataSeries = [];
}