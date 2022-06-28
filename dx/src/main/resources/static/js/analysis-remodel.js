

// ============================== 대용량 데이터 차트 테스트 Start ===============================
// table : NVT6 총 데이터 개수 53000개
// option : CH1 데이터 32개
// 총 데이터 수 170만건 가량

const staticDataTitle = [
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

const staticDataKeys = [
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

const staticDataLineColor = [
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

let staticDataSeries = [];
let staticDataXTitles = [];

// 화면 load후 바로실행
$(document).ready(function () {
    requestStaticData();
});

function createStaticChart() {
    let staticChart = new Highcharts.chart({
        chart: {
            renderTo: 'static_data_container',
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


function requestStaticData() {
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
        for (let i = 0; i < staticDataKeys.length; i++) {
            staticDataSeries[i] = {
                name: staticDataTitle[i],
                color: staticDataLineColor[i],
                data: []
            };          
        }

        if (data != null) {
            for (let i = 0; i < data.length; i++) {  // 데이터 개수만큼 반복 (쿼리 데이터 row수)
                for (let j = 0; j < staticDataKeys.length; j++) {
                    staticDataSeries[j].data.push(data[i][staticDataKeys[j]]);  // 그래프 마다 반복하며 데이터 set
                }
            }
        }

        // chart 생성
        createStaticChart();
    });
}
// ============================== 대용량 데이터 차트 테스트 End ===============================


// ============================== TODO : 실시간 차트 작업 해야함.==============================
let liveChart = new Highcharts.Chart({
    chart: {
        renderTo: 'container-remodel2',
        defaultSeriesType: 'spline',
        events: {
            load: requestLiveData
        }
    },
    title: {
        text: 'Live random data'
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 100,
        maxZoom: 30000 * 1000
    },
    yAxis: {
        minPadding: 0.1,
        maxPadding: 0.1,
        title: {
            text: 'Value',
            margin: 80
        }
    },
    series: [{
        name: 'Random data',
        data: []
    }]
});

function requestLiveData() {
    fetch("getLiveData", {cache: "no-cache"})
    .then((res) => {
        return res.json();
    })
    .then((point) => {
        var series = chart.series[0];

        // shift if the series is longer than 30000
        var shift = series.data.length > 30000; 

        // add the point
        chart.series[0].addPoint(point[0].spl_CH1_1KHz, true, shift);

        // call it again after one second
        setTimeout(requestLiveData, 1000);
    });
}