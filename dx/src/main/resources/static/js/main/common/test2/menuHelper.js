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

    clearChartArea(chartDoms);
    // ======================== 실시간 데이터 조회 ========================
    // 내부 + 외부데이터 조회
    if (menuId.includes('dropdown first')) {
        liveDataTimer = 1;

        // @params: chartType, tableName, echart, echartOption, dataKeys, dataPer, xAxisRange, xAxisVal, shiftCnt
        callRealTimeDataAndDrawChart(
            'echarts',
            ['chart1', 'chart2-1', 'chart2-2'],
            'NVT28',
            [],
            [
                createChartOptions(
                    'Total',
                    dataTitlesTotal2Ch,
                    'line'),
                createChartOptions(
                    'CH1',
                    dataTitles1Ch,
                    'bar'),
                createChartOptions(
                    'CH2',
                    dataTitles2Ch,
                    'bar'),
            ],
            [dataKeysTotal2Ch, dataKeys1Ch, dataKeys2Ch],   // dataKeysArr
            1,  // dataPer
            [10800, dataTitles1Ch, dataTitles2Ch], // categories
            1,  // xAxisVal
            10800  // shiftCnt
        );

        //callDataAndDrawChart('echarts', 'chart2-1', null, new Object(), 'NVT28', true, 10800, 1, 10800);
        //callDataAndDrawChart('echarts', 'chart2-2', null, new Object(), 'NVT28', true, 10800, 1, 10800);
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

function clearChartArea(chartDoms) {  // chart 영역 안의 자식요소 모두 삭제

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
}
