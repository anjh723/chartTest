let liveDataTimer = 1;  // live data호출시 동작할 timer



/**
 * @desc: 테이블 컬럼을 data array에 반영
 * 
 * @param {*} url 
 * @param {*} tableName 
 * @param {*} dataKeys 
 */
function callOutDataChart(url, tableName, dataKeys, callback) {
    fetch(url, {
        method: "POST",
        cache: "no-cache",
        async: false,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tableName: tableName
        }),
    }).then((res) => {
        return res.json();
    }).then((data) => {
        dataKeys = [];
        data.forEach(element => {
            dataKeys.push(element['COLUMN_NAME']);
        });

        // 외부 데이터 호출
        callRealTimeDataAndDrawChart(
                'echarts',  // chartType
                outDataURL, //url
                ['chart3'], //divIdArr
                'CWREF_21012_220705213643',    // tableName
                [], //echartArr
                [
                    createChartOptions(
                        '외부데이터',
                        dataKeys,
                        'line')
                ],  // echartOptionArr
                [dataKeys],   // dataKeysArr
                6,  // dataPer
                [10800], // categories
                1,  // xAxisVal
                10800  // shiftCnt
            )

        return dataKeys;
    });
}

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
function callRealTimeDataAndDrawChart(chartType, url, divIdArr, tableName, echartArr, echartOptionArr, dataKeysArr, dataPer, categories, xAxisVal, shiftCnt) {
    // ========== 차트가 없으면 차트 생성 ==========
    if (echartArr.length === 0) {
        for (let i = 0; i < dataKeysArr.length; i++) {
            // x축 카테고리 설정
            if (typeof categories[i] === 'number') {
                // 라인차트
                for (let j = 1; j <= categories[i]; j++) {
                    echartOptionArr[i].xAxis.data.push(j.toString());
                }
            } else {;
                // 바 차트
                echartOptionArr[i].xAxis.data = categories[i];
            }

            // 차트 생성 (첫번째 data set)
            echartArr[i] = createEChart(divIdArr[i], echartOptionArr[i]);
            echartArr[i].showLoading();
        }
    }

    // ========== 실시간 차트 데이터 반영 ==========
    fetch(url, {
        method: "POST",
        cache: "no-cache",
        async: false,
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
        // ========== 실시간 데이터 set ==========
        for (let i = 0; i < dataKeysArr.length; i++) {
            // Exception skip
            if (echartArr[i] === null || echartArr[i] === undefined
                || echartOptionArr[i] === null || echartOptionArr[i] === undefined) {
                return;
            }
            
            // line charts
            if (typeof categories[i] === 'number') {    
                // 데이터가 shiftCnt개 이상부터는 이동
                let shift = echartOptionArr[i].series[0].data.length >= shiftCnt;

                for (let j = 0; j < dataKeysArr[i].length; j++) { 
                    if (shift)
                        echartOptionArr[i].series[j].data.shift();
                    
                    // x축의 데이터를 xAxisVal기준으로 차트 그리기
                    echartOptionArr[i].series[j].data.push( [xAxisVal.toString(), data[0][dataKeysArr[i][j]] * 1] );
                }

                // x축 이동
                if (shift) {
                    echartOptionArr[i].xAxis.data.shift();
                    echartOptionArr[i].xAxis.data.push(xAxisVal.toString());
                } 
            }
            
            // bar charts
            else {
                for (let j = 0; j < dataKeysArr[i].length; j++) {
                    echartOptionArr[i].series.data[j] = data[0][dataKeysArr[i][j]];
                }
            }

            echartArr[i].hideLoading();
            echartArr[i].setOption(echartOptionArr[i]);
            window.onresize = function() {
                echartArr[i].resize();
            };
        }

        // ========== 재귀호출 ==========
        if (liveDataTimer !== -1) {
            xAxisVal += dataPer;
            liveDataTimer = setTimeout(() => callRealTimeDataAndDrawChart(chartType, url, divIdArr, tableName, echartArr, echartOptionArr, dataKeysArr, dataPer, categories, xAxisVal, shiftCnt), 1000 * dataPer);
        }
    });
}