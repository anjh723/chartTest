// data name
const dataTitles = [
    "SPL_CH1_20Hz",
    "SPL_CH1_25Hz",
    "SPL_CH1_31_5Hz",
    "SPL_CH1_40Hz",
    "SPL_CH1_50Hz",
    "SPL_CH1_63Hz",
    "SPL_CH1_80Hz",
    "SPL_CH1_100Hz",
    "SPL_CH1_125Hz",
    "SPL_CH1_160Hz",
    "SPL_CH1_200Hz",
    "SPL_CH1_250Hz",
    "SPL_CH1_315Hz",
    "SPL_CH1_400Hz",
    "SPL_CH1_500Hz",
    "SPL_CH1_630Hz",
    "SPL_CH1_800Hz",
    "SPL_CH1_1KHz",
    "SPL_CH1_1_25KHz",
    "SPL_CH1_1_6KHz",
    "SPL_CH1_2KHz",
    "SPL_CH1_2_5KHz",
    "SPL_CH1_3_15KHz",
    "SPL_CH1_4KHz",
    "SPL_CH1_5KHz",
    "SPL_CH1_6_3KHz",
    "SPL_CH1_8KHz",
    "SPL_CH1_10KHz",
    "SPL_CH1_12_5KHz",
    "SPL_CH1_16KHz",
    "SPL_CH1_20KHz",
    "SPL_CH1_TOTAL",
];

// data key
// vo데이터와 일치하는 데이터 키값
const dataKeys = [
    "splCh1_20hz",
    "splCh1_25hz",
	"splCh1_31_5hz",
	"splCh1_40hz",
	"splCh1_50hz",
	"splCh1_63hz",
	"splCh1_80hz",
	"splCh1_100hz",
	"splCh1_125hz",
	"splCh1_160hz",
	"splCh1_200hz",
	"splCh1_250hz",
	"splCh1_315hz",
	"splCh1_400hz",
	"splCh1_500hz",
	"splCh1_630hz",
	"splCh1_800hz",
	"splCh1_1khz",
	"splCh1_1_25khz",
	"splCh1_1_6khz",
	"splCh1_2khz",
	"splCh1_2_5khz",
	"splCh1_3_15khz",
	"splCh1_4khz",
	"splCh1_5khz",
	"splCh1_6_3khz",
	"splCh1_8khz",
	"splCh1_10khz",
	"splCh1_12_5khz",
	"splCh1_16khz",
	"splCh1_20khz",
	"splCh1Total"
];

// 각 그래프 색상지정
const graghLineColors = [
    "#e1beff",
    "#ffdbff",
    "#78767b",
    "#1d1732",
    "#75363b",
    "#dd8356",
    "#ffc568",
    "#f178bf",
    "#f4eb9d",
    "#00fcee",
    "#beed56",
    "#ffde20",
    "#0086ff",
    "#153496",
    "#917ed1",
    "#20dbd8",
    "#b20e34",
    "#432d5b",
    "#f1c37f",
    "#ff6a13",
    "#8a0a1a",
    "#816603",
    "#feecf5",
    "#d8ff69",
    "#83cd00",
    "#405fff",
    "#121807",
    "#fffba2",
    "#ebae65",
    "#eab2f5",
    "#d4ba50",
    "#f5007e"
];

let dataSeries = [];  // vo key 값.
let chart; // chart
let livePointTime = 0;// live data호출시 가져올 데이터 시점.
let liveDataStopFlag = false;   // 동기/비동기 문제.

// chart 생성
function createChart(tableName, isAddLiveData, liveStartTime, shiftCnt, data) {
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

    chart = new Highcharts.chart({
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

/**
 * @desc: 정적 데이터 호출 및 차트 draw
 * 
 * @param {*} tableName (검색 테이블 명)
 * @param {*} isAll (검색조건: 전체 데이터 출력)
 * @param {*} startTime (검색조건: 시작시간)
 * @param {*} endTime (검색조건: 종료시간)
 * @param {*} isAddLiveData (실시간 데이터 추가)
 * @param {*} liveStartTime (실시간 데이터 start 지점, 종료시간의 데이터 보다 이후여야한다.)
 */
function callDataAndDrawChart(tableName, isAll, startTime, endTime, isAddLiveData, liveStartTime, shiftCnt) {
    fetch("/getStaticData", {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            isAll: isAll,
            startTime: startTime,
            endTime: endTime,
            tableName: tableName
        }),
    }).then((res) => {
        return res.json();
    }).then((data) => {
        // 차트 생성
        createChart(tableName, isAddLiveData, liveStartTime, shiftCnt, data);
    });
}
/**
 * @desc: 실시간 데이터 호출 및 draw
 * 
 * @param {*} tableName (검색 테이블 명)
 * @param {*} startTime (검색조건: 시작시간)
 * @param {*} endTime (검색조건: 종료시간)
 * @param {*} isAddLiveData (실시간 데이터 추가)
 * @param {*} pointTime (실시간 데이터 start 지점, 종료시간의 데이터 보다 이후여야한다.)
 */
function callRealTimeDataAndDrawChart(tableName, isAddLiveData, shiftCnt) {
    fetch("/getLiveData", {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            livePointTime: livePointTime,
            tableName: tableName
        }),
    }).then((res) => {
        return res.json();
    }).then((data) => {
        if (chart === undefined || !isAddLiveData) {
            return;
        }

        // add the point
        for (let i = 0; i < dataKeys.length; i++) {
            if (isAddLiveData) {
                // 데이터가 10개 이상부터는 이동
                let shift = chart.series[i].data.length > shiftCnt

                chart.series[i].addPoint(data[0][dataKeys[i]], true, shift);
            } else {
                return;
            }
        }

        // call it again after one second
        livePointTime++;
        setTimeout(callRealTimeDataAndDrawChart(tableName, isAddLiveData, shiftCnt), 1000);
    });
}



