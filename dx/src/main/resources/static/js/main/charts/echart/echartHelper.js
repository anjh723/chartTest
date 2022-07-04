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
            position: function(point, params, dom, rect, size){
                //Where point is the current mouse position, and there are two attributes in size: viewSize and contentSize, which are the size of the outer div and tooltip prompt box respectively
                var x = point[0];//
                var y = point[1];
                var viewWidth = size.viewSize[0];
                var viewHeight = size.viewSize[1];
                var boxWidth = size.contentSize[0];
                var boxHeight = size.contentSize[1];
                var posX = 0;//x coordinate position
                var posY = 0;//y coordinate position
                
                if(x<boxWidth){//The left side cannot be released
                    posX = 5;    
                }else{//Left down
                    posX = x-boxWidth; 
                }
                
                if(y<boxHeight){//Can't let go of the top
                    posY = 5; 
                }else{//The upper side can be put down
                    posY = y-boxHeight;
                }
                
                return [posX,posY];
            },
            axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
            },
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