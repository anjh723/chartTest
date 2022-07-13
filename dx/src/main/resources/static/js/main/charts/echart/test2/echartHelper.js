// chart Options
function createChartOptions(mainTitle, dataTitles, seriesType, isUseZoom, isUseToolTip) {
    let dataSeries = [];  // vo key 값.
    let chartTitle = mainTitle + ' (live)';
    let xAxis;
    let zoomset;
    let tooltipset;
    let legendset;

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

    if (isUseZoom) {
        zoomset = {
                type: 'slider',
                filterMode: "filter",
                realTime: true
        };
    }

    if (isUseToolTip) {
        tooltipset = {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            },
            position: function(point, params, dom, rect, size){
                //Where point is the current mouse position, and there are two attributes in size: viewSize and contentSize, which are the size of the outer div and tooltip prompt box respectively
                 var x = point[0];//
                 var y = point[1];
                 var boxWidth = size.contentSize[0];
                 var boxHeight = size.contentSize[1];
                 var posX = -100;//x coordinate position
                 var posY = -100;//y coordinate position
                 
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
            }
        };
    } else {
        tooltipset = {
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            }
        };
    }

    let echartOption = {
        title: {
            text: chartTitle,
            padding: [10, 10, 0, 0],
        },
        legend: legendset,
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
        tooltip: tooltipset,
        dataZoom: zoomset, 
        grid: {
            left: '3%',
            right: '5%',
            top: '20%',
            bottom: '13%',
            containLabel: true
        },
        xAxis: xAxis,
        yAxis : [
            {
                type: 'value',
                min: -20,
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