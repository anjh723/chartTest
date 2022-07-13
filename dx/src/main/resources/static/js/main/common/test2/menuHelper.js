// DOM loading 후 실행.
let dropdownClicked = 0;

$(document).ready(function () {
    // Get all buttons with class="tab" inside the container
    const dropdowns = document.getElementsByClassName("dropdown");
    const tabs = document.getElementsByClassName("tab");
    
    // Loop through the buttons and add the active class to the current/clicked tab
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", function() {
            let current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";

            // action
            if (this.className.includes("home") || dropdownClicked === 0) {
                clickedMenu(this.className);
            }

            dropdownClicked = 0;
        });
    }   

    // Loop through the buttons and add the active class to the current/clicked tab
    for (let i = 0; i < dropdowns.length; i++) {
        dropdowns[i].addEventListener("click", function() {
            let current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";

            // action
            if (!this.className.includes('dropdown menu')) {
                clickedMenu(this.className);
                dropdownClicked = 1;
            } 
        });
    }   
});

// 메뉴 클릭시 동작
function clickedMenu(menuId) {
    // home tab hide
    let mainDom = document.getElementsByClassName('homeTextArea');
    for (let x = 0; x < mainDom.length; x++) {
        mainDom[x].style.visibility = "hidden";
    }

    let chartDoms = [];
    chartDoms.push(document.getElementById('chart1'));
    chartDoms.push(document.getElementById('chart2-1'));
    chartDoms.push(document.getElementById('chart2-2'));
    chartDoms.push(document.getElementById('chart3'));

    clearChartArea(chartDoms);
    // ======================== 실시간 데이터 조회 ========================
    // 소음 + 내부데이터 조회
    if (menuId.includes('dropdown first')) {
        liveDataTimer = 1;

        // 소음 데이터 (차트 3개)
        // @params: chartType, url, divIdArr, tableName, echartArr, echartOptionArr, dataKeysArr, dataPer, categories, xAxisVal, shiftCnt
        callRealTimeDataAndDrawChart(
            'echarts',  // chartType
            soundLiveDataURL, //url
            ['chart1', 'chart2-1', 'chart2-2'], //divIdArr
            'NVT28',    // tableName
            [], //echartArr
            [
                createChartOptions(
                    '소음 Total',
                    dataTitlesTotal2Ch,
                    'line',
                    true,
                    true),
                createChartOptions(
                    'CH1',
                    dataTitles1Ch,
                    'bar',
                    false,
                    true),
                createChartOptions(
                    'CH2',
                    dataTitles2Ch,
                    'bar',
                    false,
                    true),
            ],  // echartOptionArr
            [dataKeysTotal2Ch, dataKeys1Ch, dataKeys2Ch],   // dataKeysArr
            1,  // dataPer
            [10800, dataTitles1Ch, dataTitles2Ch], // categories
            1,  // xAxisVal
            10800  // shiftCnt
        );
        
        // 내부 데이터
        callRealTimeDataAndDrawChart(
            'echarts',  // chartType
            inDataURL, //url
            ['chart3'], //divIdArr
            'CWREF_21011_20227618496',    // tableName
            [], //echartArr
            [
                createChartOptions(
                    '내부 데이터',
                    dataTitlesInData,
                    'line',
                    true,
                    false)
            ],  // echartOptionArr
            [dataKeysInData],   // dataKeysArr
            1,  // dataPer
            [10800], // categories
            1,  // xAxisVal
            10800  // shiftCnt
        );
    } 

    // 외부 + 내부데이터 조회
    else if (menuId.includes('dropdown second')) {
        liveDataTimer = 1;

        // 외부 데이터 호출
        callOutDataChart(
            getTableColumnsURL,
            'CWREF_21012_220705213643'
        );

        // 내부 데이터
        callRealTimeDataAndDrawChart(
            'echarts',  // chartType
            inDataURL, //url
            ['chart1'], //divIdArr
            'CWREF_21011_20227618496',    // tableName
            [], //echartArr
            [
                createChartOptions(
                    '내부 데이터',
                    dataTitlesInData,
                    'line',
                    true,
                    false)
            ],  // echartOptionArr
            [dataKeysInData],   // dataKeysArr
            1,  // dataPer
            [10800], // categories
            1,  // xAxisVal
            10800  // shiftCnt
        );

        
    } 


    // =========================== home ===========================
    else if (menuId.includes('tab home')) {
        // home tab show
        for (let x = 0; x < mainDom.length; x++) {
            mainDom[x].style.visibility = "visible";
        }
    }
    
    // ========================== others ==========================
    else {
        if (menuId.includes('dropdown'))
            return;
    }
}

function clearChartArea(chartDoms) {  // chart 영역 안의 자식요소, 사용된 메모리 모두 초기화.

    // chart div의 id를 제외한 모든 attr 삭제
    chartDoms.forEach(chartDom => {
        for(let i = 0 ; i < chartDom.attributes.length ; i++) {
            if (chartDom.attributes[i].name !== 'id') {
                chartDom.removeAttribute(chartDom.attributes[i].name);
            }
            chartDom.innerHTML = "";
        }
    });

    // timer 초기화
    clearTimeout(liveDataTimer);
    liveDataTimer = -1;

    // 실시간 x축 데이터 초기화
    xAxisVal = 1;

    // 테이블 컬럼 상자 초기화
    dynamicOutDataKeys = [];
    dynamicOutDataTitles = [];
}
