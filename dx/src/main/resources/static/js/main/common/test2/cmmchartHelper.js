// ========================== data titles =========================
// 1ch all
const dataTitles1Ch = [
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
    "SPL_CH1_TOTAL"
];

// 2ch all
const dataTitles2Ch = [
	"SPL_CH2_20Hz",
    "SPL_CH2_25Hz",
    "SPL_CH2_31_5Hz",
    "SPL_CH2_40Hz",
    "SPL_CH2_50Hz",
    "SPL_CH2_63Hz",
    "SPL_CH2_80Hz",
    "SPL_CH2_100Hz",
    "SPL_CH2_125Hz",
    "SPL_CH2_160Hz",
    "SPL_CH2_200Hz",
    "SPL_CH2_250Hz",
    "SPL_CH2_315Hz",
    "SPL_CH2_400Hz",
    "SPL_CH2_500Hz",
    "SPL_CH2_630Hz",
    "SPL_CH2_800Hz",
    "SPL_CH2_1KHz",
    "SPL_CH2_1_25KHz",
    "SPL_CH2_1_6KHz",
    "SPL_CH2_2KHz",
    "SPL_CH2_2_5KHz",
    "SPL_CH2_3_15KHz",
    "SPL_CH2_4KHz",
    "SPL_CH2_5KHz",
    "SPL_CH2_6_3KHz",
    "SPL_CH2_8KHz",
    "SPL_CH2_10KHz",
    "SPL_CH2_12_5KHz",
    "SPL_CH2_16KHz",
    "SPL_CH2_20KHz",
    "SPL_CH2_TOTAL"
];

// total 2ch
dataTitlesTotal2Ch = [
    "SPL_CH1_TOTAL",
    "SPL_CH2_TOTAL"
];



// ========================== data key ==========================
// vo데이터와 일치하는 데이터 키값
// 1ch all
const dataKeys1Ch = [
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

// 2ch all
const dataKeys2Ch = [
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

// total 2ch
dataKeysTotal2Ch = [
    "splCh1Total",
    "splCh2Total"
];


let liveDataTimer = 1;  // live data호출시 동작할 timer

/**
 * @desc: 실시간 데이터 호출 및 draw
 * 
 * @param {*} chartType (차트 종류)
 * @param {*} divId (차트가 그려질 div id)
 * @param {*} tableName (검색 테이블 명)
 * @param {*} echart (차트)
 * @param {*} echartOption (차트 옵션)
 * @param {*} dataKeys (data key 값)
 * @param {*} dataPer (몇초 주기로 데이터를 가져올건지)
 * @param {*} xAxisRange (x축 데이터 범위)
 * @param {*} xAxisVal (x축 값위치)
 * @param {*} shiftCnt (데이터 개수가 일정수 이상이면 옆으로 넘김)
 */

function callRealTimeDataAndDrawChart(chartType, divIdArr, tableName, echartArr, echartOptionArr, dataKeysArr, dataPer, categories, xAxisVal, shiftCnt) {
    fetch("/getLiveData", {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            xAxisVal: xAxisVal,
            tableName: tableName
        }),
    }).then((res) => {
        return res.json();
    }).then((data) => {
        // ========== 차트가 없으면 차트 생성 ==========
        if (echartArr.length === 0) {
            for (let i = 0; i < dataKeysArr.length; i++) {
                // x축 카테고리 설정
                if (typeof categories[i] === 'number') {
                    // 라인차트
                    for (let j = 1; j <= categories[i]; j++) {
                        echartOptionArr[i].xAxis.data.push(j);
                    }
                } else {;
                    // 바 차트
                    echartOptionArr[i].xAxis.data = categories[i]
                }

                // 차트 생성 (첫번째 data set)
                echartArr[i] = createEChart(divIdArr[i], echartOptionArr[i]);
            }
        } 

        // ========== 실시간 데이터 set ==========
        for (let i = 0; i < dataKeysArr.length; i++) {
            if (echartArr[i] === null || echartArr[i] === undefined
                || echartOptionArr[i] === null || echartOptionArr[i] === undefined) {
                return;
            }
            
            // 라인차트 데이터 set
            if (typeof categories[i] === 'number') {    
                // 데이터가 shiftCnt개 이상부터는 이동
                let shift = echartOptionArr[i].series[0].data.length >= shiftCnt

                if (shift) {
                   echartOptionArr[i].xAxis.data.shift();
                    echartOptionArr[i].xAxis.data.push(xAxisVal);
                } 

                for (let j = 0; j < dataKeysArr[i].length; j++) {
                    // 가장 왼쪽의 데이터 제거
                    /* if (shift)
                        echartOptionArr[i].series[j].data.shift(); */
                    
                    
                    // x축의 데이터를 xAxisVal기준으로 차트 그리기
                    echartOptionArr[i].series[j].data.push([xAxisVal, data[0][dataKeysArr[i][j]]]);
                }
            }
            
            // 바 차트 데이터 set
            else {
                for (let j = 0; j < dataKeysArr[i].length; j++) {
                    echartOptionArr[i].series.data[j] = data[0][dataKeysArr[i][j]];
                }
            }

            echartArr[i].setOption(echartOptionArr[i]);
        }

        // ========== 재귀호출 ==========
        if (liveDataTimer !== -1) {
            xAxisVal += dataPer;
            liveDataTimer = setTimeout(() => callRealTimeDataAndDrawChart(chartType, divIdArr, tableName, echartArr, echartOptionArr, dataKeysArr, dataPer, categories, xAxisVal, shiftCnt), 1000 * dataPer);
        }
    });
}