// ======================= 차트 호출 =========================
$(document).ready(function () {
    // requestStaticDataChart();
    // callRealTimeDataChart();
});
// ===========================================================

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

let staticDataSeries = [];  // vo key 값.
let liveDataSeries = [];  // vo key 값.

// ==================== 정적 차트 =======================
// 정적 데이터 호출 및 차트 draw
function callStaticDataChart() {
    fetch("/getStaticData", {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            startTime: "12:00:00",
            endTime: "",
            tableName: "NVT6"
        }),
    }).then((res) => {
        return res.json();
    }).then((data) => {
        // series 데이터 셋팅
        for (let i = 0; i < dataKeys.length; i++) {
            staticDataSeries[i] = {
                name: dataTitles[i],
                color: graghLineColors[i],
                data: []
            }                
        }

        if (data != null && data.length > 0) {
            for(let i = 0 ; i < data.length ; i++) {
                for (let j = 0; j < dataKeys.length; j++) {
                    staticDataSeries[j].data.push(data[i][dataKeys[j]]);
                }
            }
        }

        createStaticChart();
    });
}

// 정적 데이터 차트
function createStaticChart() {
    let staticChart = new Highcharts.chart({
        chart: {
            renderTo: 'chart',
            type: 'spline',
        },
        title: {
            text: 'Time History Graph'
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
        tooltip: {
            split:true,
            crosshairs: true,
            shared: false,
        },
        series: staticDataSeries
    });

    // 데이터 초기화
    staticDataSeries = [];
    staticDataXTitles = [];
}

// ==================== 실시간 차트 =======================

// 실시간 데이터 차트는 화면에 먼저 표시 후 그림.
realTimeChart = new Highcharts.Chart({
    chart: {
        renderTo: 'realTimeChart',
        defaultSeriesType: 'spline',
        events: {
            load: callRealTimeDataChart
        }
    },
    title: {
        text: 'Live random data'
    },
    yAxis: {
        minPadding: 0.1,
        maxPadding: 0.1,
        title: {
            text: 'Value',
            margin: 80
        }
    },
    series: []
});

// 실시간 데이터 호출 및 차트 draw
function callRealTimeDataChart() {
    fetch("/getLiveData", {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            pointTime: "",
            tableName: "NVT9"
        }),
    }).then((res) => {
        return res.json();
    }).then((data) => {
        let date = new Date();
        let localTime = date.toLocaleTimeString();

        // chart에 series set
        for (let i = 0; i < dataKeys.length; i++) {
            realTimeChart.series[i] = {
                name: dataTitles[i],
                color: graghLineColors[i],
                data: []
            }                
        }

        // add the point
        for (let i = 0; i < dataKeys.length; i++) {
            // 데이터가 10개 이상부터는 이동
            let shift = realTimeChart.series[i].data.length > 10

            realTimeChart.series[i].addPoint(data[0][dataKeys[i]], true, shift);

            //realTimeChart.series[i].addPoint(data[0], true, shift);
        }

        // call it again after one second
        setTimeout(callRealTimeDataChart, 1000);
    });
}

