// DOM loading 후 실행.
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
            clickedMenu(this.className);
        });
    }   

    // Loop through the buttons and add the active class to the current/clicked tab
    for (let i = 0; i < dropdowns.length; i++) {
        dropdowns[i].addEventListener("click", function() {
            let current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";

            // action
            clickedMenu(this.className);
        });
    }   
});

function clickedMenu(menuId) {
    document.getElementById('chart').innerHTML = "";
    
    // ======================== highchart ========================
    if (menuId.includes('dropdown first static')) {
        clearTimeout(liveDataTimer);
        liveDataTimer = -1;
        liveDataStopFlag = true;
        callDataAndDrawChart('highcharts', 'NVT10', false, 1, 3000, false, 0);
    } else if (menuId.includes('dropdown first merge')) {
        liveDataTimer = 0;
        liveDataStopFlag = false;
        callDataAndDrawChart('highcharts', 'NVT10', false, 1, 900, true, 901, 900);
    } else if (menuId.includes('dropdown first live')) {
        liveDataTimer = 0;
        liveDataStopFlag = false;
        callDataAndDrawChart('highcharts', 'NVT10', false, 1, 1, true, 901, 900);
    } 
        
    // ======================== echart ========================
    else if (menuId.includes('dropdown second static')) {
        clearTimeout(liveDataTimer);
        liveDataTimer = -1;
        liveDataStopFlag = true;
        callDataAndDrawChart('echarts', 'NVT10', false, 1, 3000, false, 0);
    } else if (menuId.includes('dropdown second merge')) {
        liveDataTimer = 0;
        liveDataStopFlag = false;
        callDataAndDrawChart('echarts', 'NVT10', false, 1, 900, true, 901, 900);
    } else if (menuId.includes('dropdown second live')) {
        liveDataTimer = 0;
        liveDataStopFlag = false;
        callDataAndDrawChart('echarts', 'NVT10', false, 1, 1, true, 901, 900);
    } 
        
    // ======================== uplotchart ========================
    else if (menuId.includes('dropdown third static')) {
        clearTimeout(liveDataTimer);
        liveDataTimer = -1;
        liveDataStopFlag = true;
        callDataAndDrawChart('uplotcharts', 'NVT10', false, 1, 3000, false, 0);
    } else if (menuId.includes('dropdown third merge')) {
        liveDataTimer = 0;
        liveDataStopFlag = false;
        callDataAndDrawChart('uplotcharts', 'NVT10', false, 1, 900, true, 901, 900);
    } else if (menuId.includes('dropdown third live')) {
        liveDataTimer = 0;
        liveDataStopFlag = false;
        callDataAndDrawChart('uplotcharts', 'NVT10', false, 1, 1, true, 901, 900);
    } 
    
    // =========================== home ===========================
    else if (menuId.includes('tab home')) {
        clearTimeout(liveDataTimer);
        liveDataTimer = -1;
        document.getElementById('chart').innerHTML = "";
    }
    
    // ========================== others ==========================
    else {
        if (menuId.includes('dropdown'))
            return;    
        document.getElementById('chart').innerHTML = "<h2>준비중입니다.</h2>";
    }
}