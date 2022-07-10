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
/**
 * @desc: 정적 데이터 호출 및 차트 draw
 * 
 * @param {*} chartType (차트 종류)
 * @param {*} divId (차트 그릴 div id)
 * @param {*} tableName (검색 테이블 명)
 * @param {*} startTime (검색조건: 시작시간)
 * @param {*} endTime (검색조건: 종료시간)
 * @param {*} isAddLiveData (실시간 데이터 추가 여부)
 * @param {*} dataPer (몇초 주기로 데이터를 가져올건지)
 * @param {*} shiftCnt (데이터 개수가 일정수 이상이면 옆으로 넘김)
 */
function callDataAndDrawChart(chartType, divId, echart, echartOption, tableName, isAddLiveData, xAxisRange, dataPer, shiftCnt) {
    let url = isAddLiveData ? "/getLiveData" : "/getStaticData" ;
    
    fetch(url, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tableName: tableName
        }),
    }).then((res) => {
        return res.json();
    }).then((data) => {
        // x축 카테고리
        xAxisCategories = [];
        for (let i = 0 ; i < xAxisRange; i++) {
            xAxisCategories.push(i);
        }

        // 차트 생성
        createEChart(chartType, divId, echart, echartOption, tableName, isAddLiveData, dataPer, xAxisCategories, 0, shiftCnt, data);
    });
}


let liveDataTimer = 1;  // live data호출시 동작할 timer

/**
 * @desc: 실시간 데이터 호출 및 draw
 * 
 * @param {*} chartType (차트 종류)
 * @param {*} tableName (검색 테이블 명)
 * @param {*} isAddLiveData (실시간 데이터 추가 여부)
 * @param {*} dataPer (몇초 주기로 데이터를 가져올건지)
 * @param {*} xAxisVal (x축 데이터)
 * @param {*} shiftCnt (데이터 개수가 일정수 이상이면 옆으로 넘김)
 */
function callRealTimeDataAndDrawChart(chartType, tableName, echart, echartOption, isAddLiveData, dataPer, xAxisVal, shiftCnt) {
    fetch("/getLiveData", {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tableName: tableName
        }),
    }).then((res) => {
        return res.json();
    }).then((data) => {
        if (!isAddLiveData) {
            return;
        }

        // add the point
        for (let i = 0; i < dataKeys.length; i++) {
            let dataVal;

            if (isAddLiveData) {
                // echart
                if (chartType === 'echarts' 
                    && echartOption !== null 
                    && echartOption !== undefined) {
                    
                    // 데이터가 shiftCnt개 이상부터는 이동
                    let shift = echartOption.series[i].data.length > shiftCnt

                    // 가장 왼쪽의 데이터 제거
                    if (shift) {
                        echartOption.series[i].data.shift();
                    }

                    // 데이터가 없을경우 이전 데이터 setting
                    if (data.length === 0 && i > 0 ) {
                        dataVal = echartOption.series[i-1].data[dataKeys[i]];
                    } else {
                        dataVal = data[0][dataKeys[i]];
                    }
                    
                    // x축의 데이터를 가장 마지막 uid로 실시간 차트 그리기
                    echartOption.series[i].data.push([xAxisVal, dataVal]);
                }
            } else {
                return;
            }
        }
        
        // call it again after one second
        if (liveDataTimer !== -1) {
            if (chartType === 'echarts' && echart !== null && echart !== undefined) 
                echart.setOption(echartOption);
            
            xAxisVal += dataPer;
            liveDataTimer = setTimeout(() => callRealTimeDataAndDrawChart(chartType, tableName, echart, echartOption, isAddLiveData, dataPer, xAxisVal, shiftCnt), 1000 * dataPer);
        }
    });
}