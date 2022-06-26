
/* 복사용
        , spltimetrace_1_1KHZ
        , spltimetrace_1_1_25KHZ
        , spltimetrace_1_1_6KHZ
        , spltimetrace_1_2KHZ
        , spltimetrace_1_2_5KHZ
        , spltimetrace_1_3_15KHZ
        , spltimetrace_1_4KHZ
        , spltimetrace_1_5KHZ
        , spltimetrace_1_6_3KHZ
        , spltimetrace_1_8KHZ
        , spltimetrace_1_10KHZ
        , spltimetrace_1_12_5KHZ
        , spltimetrace_1_16KHZ
        , spltimetrace_1_20HZ
        , spltimetrace_1_20KHZ
        , spltimetrace_1_25HZ
        , spltimetrace_1_31_5HZ
        , spltimetrace_1_40HZ
        , spltimetrace_1_50HZ
        , spltimetrace_1_63HZ
        , spltimetrace_1_80HZ
        , spltimetrace_1_100HZ
        , spltimetrace_1_125HZ
        , spltimetrace_1_160HZ
        , spltimetrace_1_200HZ
        , spltimetrace_1_250HZ
        , spltimetrace_1_315HZ
        , spltimetrace_1_400HZ
        , spltimetrace_1_500HZ
        , spltimetrace_1_630HZ
        , spltimetrace_1_800HZ
        , spltimetrace_1_TOTAL
        , spltimetrace_2_1KHZ
        , spltimetrace_2_1_6KHZ
        , spltimetrace_2_1_25KHZ)
*/

//
// window.addEventListener('click', (e) => {
//     selected = e;
//     console.log('객체값', e);
//     console.log('타겟값', e.target);
//     console.log('부모값', e.target.parentNode);
// })

let tmp = [];
let spltimetrace_1_1KHZ = [];
let spltimetrace_1_1_6KHZ = [];
let spltimetrace_1_1_25KHZ = [];
let spltimetrace_1_2KHZ = [];
let spltimetrace_1_2_5KHZ = [];
let spltimetrace_1_3_15KHZ = [];
let spltimetrace_1_4KHZ = [];
let spltimetrace_1_5KHZ = [];
let spltimetrace_1_6_3KHZ = [];
let spltimetrace_1_8KHZ = [];
let spltimetrace_1_10KHZ = [];
let spltimetrace_1_12_5KHZ = [];
let spltimetrace_1_16KHZ = [];
let spltimetrace_1_20HZ = [];
let spltimetrace_1_20KHZ = [];
let spltimetrace_1_25HZ = [];
let spltimetrace_1_31_5HZ = [];
let spltimetrace_1_40HZ = [];
let spltimetrace_1_50HZ = [];
let spltimetrace_1_63HZ = [];
let spltimetrace_1_80HZ = [];
let spltimetrace_1_100HZ = [];
let spltimetrace_1_125HZ = [];
let spltimetrace_1_160HZ = [];
let spltimetrace_1_200HZ = [];
let spltimetrace_1_250HZ = [];
let spltimetrace_1_315HZ = [];
let spltimetrace_1_400HZ = [];
let spltimetrace_1_500HZ = [];
let spltimetrace_1_630HZ = [];
let spltimetrace_1_800HZ = [];
let spltimetrace_1_TOTAL = [];
let spltimetrace_2_1KHZ = [];
let spltimetrace_2_1_6KHZ = [];
let spltimetrace_2_1_25KHZ = [];
let time = [];
let lastNum = 0;
let page = 0;
let tmpSet = new Set();
let selected = null;
let isMonitoring = true;
let transV20KHZ = null;


const getJson = () => {
    fetch(`/nv/test?page=${page}`).then((res) => {
        return res.json()
    })
        .then((res) => {
            tmpSet.add(res);
            res.content.forEach((e) => {
                let content = e;
                transV20KHZ = `${content.spltimetrace_1_20KHZ.slice(0,2)}.${content.spltimetrace_1_20KHZ.slice(2)}12345`

                spltimetrace_1_20HZ.push(content.spltimetrace_1_20HZ*1);
                spltimetrace_1_25HZ.push(content.spltimetrace_1_25HZ*1);
                spltimetrace_1_31_5HZ.push(content.spltimetrace_1_31_5HZ*1);
                spltimetrace_1_40HZ.push(content.spltimetrace_1_40HZ*1);
                spltimetrace_1_50HZ.push(content.spltimetrace_1_50HZ*1);
                spltimetrace_1_63HZ.push(content.spltimetrace_1_63HZ*1);
                spltimetrace_1_80HZ.push(content.spltimetrace_1_80HZ*1);
                spltimetrace_1_100HZ.push(content.spltimetrace_1_100HZ*1);
                spltimetrace_1_125HZ.push(content.spltimetrace_1_125HZ*1);
                spltimetrace_1_160HZ.push(content.spltimetrace_1_160HZ*1);
                spltimetrace_1_200HZ.push(content.spltimetrace_1_200HZ*1);
                spltimetrace_1_250HZ.push(content.spltimetrace_1_250HZ*1);
                spltimetrace_1_315HZ.push(content.spltimetrace_1_315HZ*1);
                spltimetrace_1_400HZ.push(content.spltimetrace_1_400HZ*1);
                spltimetrace_1_500HZ.push(content.spltimetrace_1_500HZ*1);
                spltimetrace_1_630HZ.push(content.spltimetrace_1_630HZ*1);
                spltimetrace_1_800HZ.push(content.spltimetrace_1_800HZ*1);
                spltimetrace_1_1KHZ.push(content.spltimetrace_1_1KHZ*1);
                spltimetrace_1_2KHZ.push(content.spltimetrace_1_2KHZ*1);
                spltimetrace_1_6_3KHZ.push(content.spltimetrace_1_6_3KHZ*1);
                spltimetrace_1_4KHZ.push(content.spltimetrace_1_4KHZ*1);
                spltimetrace_1_5KHZ.push(content.spltimetrace_1_5KHZ*1);
                spltimetrace_1_2_5KHZ.push(content.spltimetrace_1_2_5KHZ*1);
                spltimetrace_1_1_6KHZ.push(content.spltimetrace_1_1_6KHZ*1);
                spltimetrace_1_8KHZ.push(content.spltimetrace_1_8KHZ*1);
                spltimetrace_1_10KHZ.push(content.spltimetrace_1_10KHZ*1);
                spltimetrace_1_12_5KHZ.push(content.spltimetrace_1_12_5KHZ*1);
                spltimetrace_1_3_15KHZ.push(content.spltimetrace_1_3_15KHZ*1);
                spltimetrace_1_16KHZ.push(content.spltimetrace_1_16KHZ*1);
                spltimetrace_1_20KHZ.push(transV20KHZ*1);
                spltimetrace_1_1_25KHZ.push(content.spltimetrace_1_1_25KHZ*1 + 0.5);
                spltimetrace_1_TOTAL.push(content.spltimetrace_1_TOTAL*1);




                time.push(parseInt(content.time));
            })
        })
    page++;
}

let chart = Highcharts.chart('container', {
    chart: {
        type: 'line',
        zoomType: 'x'
    },

    title: {
        text: 'Time History Graph'
    },

    credits: {
        enabled: false
    },

    subtitle: {
        text: '측정데이터'
    },

    tooltip: {
        valueDecimals: 2
    },

    Axis: {
        title: ''
    },

    xAxis: {
        title: '',
        enabled : false
    },

    yAxis: {
        name: '',
        enabled : false
    },

    series: [{
        data: [],
        // lineWidth: 0.5,
        name: 'spltimetrace_1_TOTAL',
    }],
})






/* */
var chart3 = Highcharts.chart('container2', {
    title: {
        text: '⅓  OCTAVE  GRAPH'
    },
    Axis: {
        enabled : false
    },
    xAxis: {
        labels: {
            enabled : false,
        },
        tickWidth: 1,
        tickLength: 20,
    },
    credits: {
        enabled: false,
    },
    series: [
          {type: 'column', name: 'spltimetrace_1_20HZ'   , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_25HZ'   , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_31_5HZ' , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_40HZ'   , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_50HZ'   , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_63HZ'   , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_80HZ'   , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_100HZ'  , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_125HZ'  , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_160HZ'  , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_200HZ'  , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_250HZ'  , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_315HZ'  , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_400HZ'  , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_500HZ'  , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_630HZ'  , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_800HZ'  , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_1KHZ'   , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_2KHZ'   , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_6_3KHZ' , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_4KHZ'   , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_5KHZ'   , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_2_5KHZ' , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_1_6KHZ' , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_8KHZ'   , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_10KHZ'  , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_12_5KHZ', data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_3_15KHZ', data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_16KHZ'  , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_20KHZ'  , data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_1_25KHZ', data: [], showInLegend: false,}
        , {type: 'column', name: 'spltimetrace_1_TOTAL'  , data: [], showInLegend: false,}
        ,
    ],
    labels: {
        items: [{
            style: {
                left: '50px',
                top: '18px',
                color: (
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || 'black'
            }
        }]
    }
});


const monitoring = () => {
    setInterval(() => {
        if (isMonitoring) {
            // getJson();
            lastNum = spltimetrace_1_TOTAL.length - 1;
            chart.series[0].setData(spltimetrace_1_TOTAL, true, true, true)

            chart3.series[0].setData([ spltimetrace_1_20HZ[lastNum] ],true,true);
            chart3.series[1].setData([ spltimetrace_1_25HZ[lastNum] ],true,true);
            chart3.series[2].setData([ spltimetrace_1_31_5HZ[lastNum] ],true,true);
            chart3.series[3].setData([ spltimetrace_1_40HZ[lastNum] ],true,true);
            chart3.series[4].setData([ spltimetrace_1_50HZ[lastNum] ],true,true);
            chart3.series[5].setData([ spltimetrace_1_63HZ[lastNum] ],true,true);
            chart3.series[6].setData([ spltimetrace_1_80HZ[lastNum] ],true,true);
            chart3.series[7].setData([ spltimetrace_1_100HZ[lastNum] ],true,true);
            chart3.series[8].setData([ spltimetrace_1_125HZ[lastNum] ],true,true);
            chart3.series[9].setData([ spltimetrace_1_160HZ[lastNum] ],true,true);
            chart3.series[10].setData([ spltimetrace_1_200HZ[lastNum] ],true,true);
            chart3.series[11].setData([ spltimetrace_1_250HZ[lastNum] ],true,true);
            chart3.series[12].setData([ spltimetrace_1_315HZ[lastNum] ],true,true);
            chart3.series[13].setData([ spltimetrace_1_400HZ[lastNum] ],true,true);
            chart3.series[14].setData([ spltimetrace_1_500HZ[lastNum] ],true,true);
            chart3.series[15].setData([ spltimetrace_1_630HZ[lastNum] ],true,true);
            chart3.series[16].setData([ spltimetrace_1_800HZ[lastNum] ],true,true);
            chart3.series[17].setData([ spltimetrace_1_1KHZ[lastNum] ],true,true);
            chart3.series[18].setData([ spltimetrace_1_2KHZ[lastNum] ],true,true);
            chart3.series[19].setData([ spltimetrace_1_6_3KHZ[lastNum] ],true,true);
            chart3.series[20].setData([ spltimetrace_1_4KHZ[lastNum] ],true,true);
            chart3.series[21].setData([ spltimetrace_1_5KHZ[lastNum] ],true,true);
            chart3.series[22].setData([ spltimetrace_1_2_5KHZ[lastNum] ],true,true);
            chart3.series[23].setData([ spltimetrace_1_1_6KHZ[lastNum] ],true,true);
            chart3.series[24].setData([ spltimetrace_1_8KHZ[lastNum] ],true,true);
            chart3.series[25].setData([ spltimetrace_1_10KHZ[lastNum] ],true,true);
            chart3.series[26].setData([ spltimetrace_1_12_5KHZ[lastNum] ],true,true);
            chart3.series[27].setData([ spltimetrace_1_3_15KHZ[lastNum] ],true,true);
            chart3.series[28].setData([ spltimetrace_1_16KHZ[lastNum] ],true,true);
            chart3.series[29].setData([ spltimetrace_1_20KHZ[lastNum] ],true,true);
            chart3.series[30].setData([ spltimetrace_1_TOTAL[lastNum] + 0.5 ],true,true);
            chart3.series[31].setData([ spltimetrace_1_TOTAL[lastNum] ],true,true);
            getJson();
        }
    }, 2000)
}


monitoring();


