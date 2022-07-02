// DOM loading 후 실행.
$(document).ready(function () {
    // Get all buttons with class="tab" inside the container
    const tabs = document.getElementsByClassName("tab");
    
    // Loop through the buttons and add the active class to the current/clicked tab
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", function() {
            let current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";

            // action
            clickedMenu(this.className);
        });
    }   
});

function clickedMenu(menuId) {
    if (menuId.includes('first')) {
        callStaticDataChart();
    } else if (menuId.includes('second')) {
        callRealTimeDataChart();
    }
}