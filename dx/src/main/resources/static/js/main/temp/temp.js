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
    if (menuId.includes('dropdown first first')) {
        liveDataStopFlag = true;
        callDataAndDrawChart('NVT10', false, 1, 3000, false, 0);
    } else if (menuId.includes('dropdown first second')) {
        liveDataStopFlag = false;
        callDataAndDrawChart('NVT10', false, 1, 900, true, 901, 900);
    } else if (menuId.includes('dropdown first third')) {
        liveDataStopFlag = false;
        callDataAndDrawChart('NVT10', false, 1, 1, true, 901, 900);
    } else if (menuId.includes('tab home')) {
        document.getElementById('chart').innerHTML = "";
    }
}