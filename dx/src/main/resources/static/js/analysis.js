let SPL_CH1_TOTAL_LIST = [];
let SPL_CH2_TOTAL_LIST = [];

let SPL_CH1_TOTAL;
let SPL_CH1_20Hz;
let SPL_CH1_25Hz;
let SPL_CH1_31_5Hz;
let SPL_CH1_40Hz;
let SPL_CH1_50Hz;
let SPL_CH1_63Hz;
let SPL_CH1_80Hz;
let SPL_CH1_100Hz;
let SPL_CH1_125Hz;
let SPL_CH1_160Hz;
let SPL_CH1_200Hz;
let SPL_CH1_250Hz;
let SPL_CH1_315Hz;
let SPL_CH1_400Hz;
let SPL_CH1_500Hz;
let SPL_CH1_630Hz;
let SPL_CH1_800Hz;
let SPL_CH1_1KHz;
let SPL_CH1_1_25KHz;
let SPL_CH1_1_6KHz;
let SPL_CH1_2KHz;
let SPL_CH1_2_5KHz;
let SPL_CH1_3_15KHz;
let SPL_CH1_4KHz;
let SPL_CH1_5KHz;
let SPL_CH1_6_3KHz;
let SPL_CH1_8KHz;
let SPL_CH1_10KHz;
let SPL_CH1_12_5KHz;
let SPL_CH1_16KHz;
let SPL_CH1_20KHz;
let SPL_CH2_TOTAL;
let SPL_CH2_20Hz;
let SPL_CH2_25Hz;
let SPL_CH2_31_5Hz;
let SPL_CH2_40Hz;
let SPL_CH2_50Hz;
let SPL_CH2_63Hz;
let SPL_CH2_80Hz;
let SPL_CH2_100Hz;
let SPL_CH2_125Hz;
let SPL_CH2_160Hz;
let SPL_CH2_200Hz;
let SPL_CH2_250Hz;
let SPL_CH2_315Hz;
let SPL_CH2_400Hz;
let SPL_CH2_500Hz;
let SPL_CH2_630Hz;
let SPL_CH2_800Hz;
let SPL_CH2_1KHz;
let SPL_CH2_1_25KHz;
let SPL_CH2_1_6KHz;
let SPL_CH2_2KHz;
let SPL_CH2_2_5KHz;
let SPL_CH2_3_15KHz;
let SPL_CH2_4KHz;
let SPL_CH2_5KHz;
let SPL_CH2_6_3KHz;
let SPL_CH2_8KHz;
let SPL_CH2_10KHz;
let SPL_CH2_12_5KHz;
let SPL_CH2_16KHz;
let SPL_CH2_20KHz;
let spacing = 0;

let COMP_PWM = [];


let 전력_1 = [];
let 전력_2 = [];
let 적산전력_1 = [];
let 적산전력_2 = [];
let oData = [];

let time = [];
let page = 0;
let isMonitoring = true;
let lastNum = 0;
let searchUID = 0;

const getMonitoringData = () => {
    if (isMonitoring) {
        fetch(`/graphData/${page}`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                data.forEach((e) => {
                    UID = (e.uid * 1)
                    //console.log(data)
                    let tmp_SPL_CH1_TOTAL_LIST = SPL_CH1_TOTAL_LIST[SPL_CH1_TOTAL_LIST.length -1]
                    let tmp_SPL_CH2_TOTAL_LIST = SPL_CH2_TOTAL_LIST[SPL_CH2_TOTAL_LIST.length -1]


                    if (e.spl_CH1_TOTAL == null || (e.spl_CH1_TOTAL * 1) === 0) {
                        SPL_CH1_TOTAL_LIST.push(tmp_SPL_CH1_TOTAL_LIST);
                    } else {
                        SPL_CH1_TOTAL_LIST.push(e.spl_CH1_TOTAL * 1);
                        SPL_CH1_TOTAL = (e.spl_CH1_TOTAL * 1);
                        SPL_CH1_20Hz = (e.spl_CH1_20Hz * 1);
                        SPL_CH1_25Hz = (e.spl_CH1_25Hz * 1);
                        SPL_CH1_31_5Hz = (e.spl_CH1_31_5Hz * 1);
                        SPL_CH1_40Hz = (e.spl_CH1_40Hz * 1);
                        SPL_CH1_50Hz = (e.spl_CH1_50Hz * 1);
                        SPL_CH1_63Hz = (e.spl_CH1_63Hz * 1);
                        SPL_CH1_80Hz = (e.spl_CH1_80Hz * 1);
                        SPL_CH1_100Hz = (e.spl_CH1_100Hz * 1);
                        SPL_CH1_125Hz = (e.spl_CH1_125Hz * 1);
                        SPL_CH1_160Hz = (e.spl_CH1_160Hz * 1);
                        SPL_CH1_200Hz = (e.spl_CH1_200Hz * 1);
                        SPL_CH1_250Hz = (e.spl_CH1_250Hz * 1);
                        SPL_CH1_315Hz = (e.spl_CH1_315Hz * 1);
                        SPL_CH1_400Hz = (e.spl_CH1_400Hz * 1);
                        SPL_CH1_500Hz = (e.spl_CH1_500Hz * 1);
                        SPL_CH1_630Hz = (e.spl_CH1_630Hz * 1);
                        SPL_CH1_800Hz = (e.spl_CH1_800Hz * 1);
                        SPL_CH1_1KHz = (e.spl_CH1_1KHz * 1);
                        SPL_CH1_1_25KHz = (e.spl_CH1_1_25KHz * 1);
                        SPL_CH1_1_6KHz = (e.spl_CH1_1_6KHz * 1);
                        SPL_CH1_2KHz = (e.spl_CH1_2KHz * 1);
                        SPL_CH1_2_5KHz = (e.spl_CH1_2_5KHz * 1);
                        SPL_CH1_3_15KHz = (e.spl_CH1_3_15KHz * 1);
                        SPL_CH1_4KHz = (e.spl_CH1_4KHz * 1);
                        SPL_CH1_5KHz = (e.spl_CH1_5KHz * 1);
                        SPL_CH1_6_3KHz = (e.spl_CH1_6_3KHz * 1);
                        SPL_CH1_8KHz = (e.spl_CH1_8KHz * 1);
                        SPL_CH1_10KHz = (e.spl_CH1_10KHz * 1);
                        SPL_CH1_12_5KHz = (e.spl_CH1_12_5KHz * 1);
                        SPL_CH1_16KHz = (e.spl_CH1_16KHz * 1);
                        SPL_CH1_20KHz = (e.spl_CH1_20KHz * 1);
                        if (SPL_CH1_TOTAL_LIST.length >= 80) {
                            SPL_CH1_TOTAL_LIST.shift();
                        }
                    }

                    if (e.spl_CH2_TOTAL == null || (e.spl_CH2_TOTAL * 1) === 0) {
                        SPL_CH2_TOTAL_LIST.push(tmp_SPL_CH2_TOTAL_LIST);
                    } else {
                        SPL_CH2_TOTAL_LIST.push(e.spl_CH2_TOTAL * 1);
                        SPL_CH2_TOTAL = (e.spl_CH2_TOTAL * 1);
                        SPL_CH2_20Hz = (e.spl_CH2_20Hz * 1);
                        SPL_CH2_25Hz = (e.spl_CH2_25Hz * 1);
                        SPL_CH2_31_5Hz = (e.spl_CH2_31_5Hz * 1);
                        SPL_CH2_40Hz = (e.spl_CH2_40Hz * 1);
                        SPL_CH2_50Hz = (e.spl_CH2_50Hz * 1);
                        SPL_CH2_63Hz = (e.spl_CH2_63Hz * 1);
                        SPL_CH2_80Hz = (e.spl_CH2_80Hz * 1);
                        SPL_CH2_100Hz = (e.spl_CH2_100Hz * 1);
                        SPL_CH2_125Hz = (e.spl_CH2_125Hz * 1);
                        SPL_CH2_160Hz = (e.spl_CH2_160Hz * 1);
                        SPL_CH2_200Hz = (e.spl_CH2_200Hz * 1);
                        SPL_CH2_250Hz = (e.spl_CH2_250Hz * 1);
                        SPL_CH2_315Hz = (e.spl_CH2_315Hz * 1);
                        SPL_CH2_400Hz = (e.spl_CH2_400Hz * 1);
                        SPL_CH2_500Hz = (e.spl_CH2_500Hz * 1);
                        SPL_CH2_630Hz = (e.spl_CH2_630Hz * 1);
                        SPL_CH2_800Hz = (e.spl_CH2_800Hz * 1);
                        SPL_CH2_1KHz = (e.spl_CH2_1KHz * 1);
                        SPL_CH2_1_25KHz = (e.spl_CH2_1_25KHz * 1);
                        SPL_CH2_1_6KHz = (e.spl_CH2_1_6KHz * 1);
                        SPL_CH2_2KHz = (e.spl_CH2_2KHz * 1);
                        SPL_CH2_2_5KHz = (e.spl_CH2_2_5KHz * 1);
                        SPL_CH2_3_15KHz = (e.spl_CH2_3_15KHz * 1);
                        SPL_CH2_4KHz = (e.spl_CH2_4KHz * 1);
                        SPL_CH2_5KHz = (e.spl_CH2_5KHz * 1);
                        SPL_CH2_6_3KHz = (e.spl_CH2_6_3KHz * 1);
                        SPL_CH2_8KHz = (e.spl_CH2_8KHz * 1);
                        SPL_CH2_10KHz = (e.spl_CH2_10KHz * 1);
                        SPL_CH2_12_5KHz = (e.spl_CH2_12_5KHz * 1);
                        SPL_CH2_16KHz = (e.spl_CH2_16KHz * 1);
                        SPL_CH2_20KHz = (e.spl_CH2_20KHz * 1);
                        if (SPL_CH2_TOTAL_LIST.length >= 80) {
                            SPL_CH2_TOTAL_LIST.shift();
                        }
                    }

                    if (page > 0) {
                        page--;
                    } else if (page <= 0) {
                        page = 0;
                    }


                });
            });
    }
};


const getInMonitoring = () => {
    fetch("/getInMonitoring/" + page)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            //console.log(data)
            COMP_PWM.push(data[0]);
            if (COMP_PWM.length - 1 > 30) {
                COMP_PWM.shift();
            }
        })
}


const getOutMonitoring = () => {
    fetch("/getOutMonitoring/" + page)
        .then((res) => {
                return res.json();
            }
        ).then((data) => {
            if (data == null) {
                전력_1.push( 전력_1.push(전력_1.length -1) );
                전력_2.push( 전력_2.push(전력_1.length -1) );
                적산전력_1.push( 적산전력_1.push(적산전력_1.length -1) );
                적산전력_2.push( 적산전력_2.push(적산전력_1.length -1) );
            } else {
                전력_1.push(data.전력_1);
                전력_2.push(data.전력_2);
                적산전력_1.push(data.적산전력_1);
                적산전력_2.push(data.적산전력_2);
            }


        if (전력_1.length - 1 > 30) {
            전력_1.shift();
            전력_2.shift();
            적산전력_1.shift();
            적산전력_2.shift();
        }
    })
}

var chart = Highcharts.chart('container', {
    chart: {
        width: 1000,
        height: 300,
        type: 'line',

    },
    title: {
        text: 'Time History Graph'
    },

    credits: {
        enabled: false,
    },

    series: [
        {
            data: [],
            name: 'SPL_CH1_TOTAL_LIST'
        },
        {
            data: [],
            name: 'SPL_CH2_TOTAL_LIST'
        }
    ]
});


var chart2 = Highcharts.chart('container2', {
    chart: {
        width: 1000,
        height: 300,

    },

    legend: {enabled: false},

    title: {
        text: '⅓  OCTAVE  GRAPH'
    },
    Axis: {
        enabled: false
    },
    xAxis: {
        labels: {
            enabled: false,
        },
        // tickWidth: 1,
        // tickLength: 10,


        categories: [
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
        ]
    },
    yAxis: {
        min: -20,
        max: 75,
    },

    colors: [
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#24CBE5',
        '#811010',
    ],

    plotOptions: {
        column: {
            min: -20,
            max: 80,
            threshold: -9999,
            colorByPoint: true,
            // dataLabels: {
            //     enabled: true,
            // }
        }
    },
    credits: {enabled: false,},

    boost: {
        useGPUTranslations: true
    }
    ,
    series: [{type: 'column', name: "", data: [], showInLegend: false,}],
    labels: {
        items: [{
            style: {
                // left: '50px',
                // top: '18px',
                // color: (
                //     Highcharts.defaultOptions.title.style &&
                //     Highcharts.defaultOptions.title.style.color
                // ) || 'black'
            }
        }]
    }
})

var chart3 = Highcharts.chart('container3', {
    chart: {
        width: 1000,
        height: 300,
        type: 'line'
    },

    title: {
        text: 'In Data'
    },

    credits: {
        enabled: false,
    },

    Axis: {
        enabled: false
    },
    xAxis: {
        // labels: {
        //     enabled: false,
        // },
        // tickWidth: 1,
        // tickLength: 10,

    },
    yAxis: {
        min: 0,
    },

    series: [
        {
            data: [],
            name: 'COMP_PWM'
        },

    ]
});

var chart4 = Highcharts.chart('container4', {
    chart: {
        width: 1000,
        height: 300,
        type: 'line'
    },


    credits: {
        enabled: false,
    },

    title: {
        text: 'Out Data'
    },
    Axis: {
        enabled: false
    },

    xAxis: {
        // labels: {
        //     enabled: false,
        // },
        // tickWidth: 1,
        // tickLength: 10,

    },
    yAxis: {
        min: 0,
        startOnTick: true
    },

    series: [
        {
            type: 'line',
            data: [],
            name: '전력_1'
        },
        {
            type: 'line',
            data: [],
            name: '전력_2'
        },
        {
            type: 'line',
            data: [],
            name: '적산전력_1'
        },
        {
            type: 'line',
            data: [],
            name: '적산전력_1'
        },
    ]
});


const graphMonitoring = () => {

    chart.series[0].setData(SPL_CH1_TOTAL_LIST, true, false);
    chart.series[1].setData(SPL_CH2_TOTAL_LIST, true, false);

    chart2.series[0].setData(
        [
            SPL_CH1_20Hz,
            SPL_CH1_25Hz,
            SPL_CH1_31_5Hz,
            SPL_CH1_40Hz,
            SPL_CH1_50Hz,
            SPL_CH1_63Hz,
            SPL_CH1_80Hz,
            SPL_CH1_100Hz,
            SPL_CH1_125Hz,
            SPL_CH1_160Hz,
            SPL_CH1_200Hz,
            SPL_CH1_250Hz,
            SPL_CH1_315Hz,
            SPL_CH1_400Hz,
            SPL_CH1_500Hz,
            SPL_CH1_630Hz,
            SPL_CH1_800Hz,
            SPL_CH1_1KHz,
            SPL_CH1_1_25KHz,
            SPL_CH1_1_6KHz,
            SPL_CH1_2KHz,
            SPL_CH1_2_5KHz,
            SPL_CH1_3_15KHz,
            SPL_CH1_4KHz,
            SPL_CH1_5KHz,
            SPL_CH1_6_3KHz,
            SPL_CH1_8KHz,
            SPL_CH1_10KHz,
            SPL_CH1_12_5KHz,
            SPL_CH1_16KHz,
            SPL_CH1_20KHz,
            SPL_CH1_TOTAL,


            SPL_CH2_20Hz,
            SPL_CH2_25Hz,
            SPL_CH2_31_5Hz,
            SPL_CH2_40Hz,
            SPL_CH2_50Hz,
            SPL_CH2_63Hz,
            SPL_CH2_80Hz,
            SPL_CH2_100Hz,
            SPL_CH2_125Hz,
            SPL_CH2_160Hz,
            SPL_CH2_200Hz,
            SPL_CH2_250Hz,
            SPL_CH2_315Hz,
            SPL_CH2_400Hz,
            SPL_CH2_500Hz,
            SPL_CH2_630Hz,
            SPL_CH2_800Hz,
            SPL_CH2_1KHz,
            SPL_CH2_1_25KHz,
            SPL_CH2_1_6KHz,
            SPL_CH2_2KHz,
            SPL_CH2_2_5KHz,
            SPL_CH2_3_15KHz,
            SPL_CH2_4KHz,
            SPL_CH2_5KHz,
            SPL_CH2_6_3KHz,
            SPL_CH2_8KHz,
            SPL_CH2_10KHz,
            SPL_CH2_12_5KHz,
            SPL_CH2_16KHz,
            SPL_CH2_20KHz,
            SPL_CH2_TOTAL
        ]
        , true, true);

    // chart3.series[0].setData(COMP_PWM, true, true);


    chart4.series[0].setData(전력_1, true, true);
    chart4.series[1].setData(전력_2, true, true);
    chart4.series[2].setData(적산전력_1, true, true);
    chart4.series[3].setData(적산전력_2, true, true);
    // getInMonitoring();
    getOutMonitoring();
    getMonitoringData();
}
setInterval(graphMonitoring, 500);





