function generateProvincesMap() {
    var mymap = L.map('provinces-map', {
        minZoom: 7.4,
        maxZoom: 9,
        zoomSnap: 0,
        zoomDelta: 0.1,
    })        
        .setView([42.7160136,25.3435019])
        .setZoom(7.4);

    
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1Ijoibmlrb2xheXkiLCJhIjoiY2s0c2kybzRiMTl0eDNscDE5bXMwYXIzayJ9.EHG22-TMFIahiqXG-BuRMw'
    }).addTo(mymap);
    
    data['provinces'].forEach(feature => {
        let props = feature.properties;

        L.geoJSON(feature)
            .bindPopup(`<canvas id="${props['град']}" width="600" height="400"></canvas>`, {
                autoPan: false
            })
            .on('click', function () {
                let ctx = document.getElementById(props['град']).getContext('2d');
                let { град, ...months } = props;
                let myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: Object.keys(months),
                        datasets: [{
                            label: 'Наети лица в ' + props['град'],
                            data: Object.values(months),
                            borderWidth: 1,
                            backgroundColor: "#f5c011"
                        }]
                    },
                    options: {}
                });
            })
            .addTo(mymap);
    });
}


function generateHiredStatsChart() {
    let hired = data['hired']
    let len = hired.length;

    for (let i = 0; i < len; i++) {
        let item = hired[i];

        $('<a>')
            .text(item.activity)
            .attr('class', 'nav-link')
            .attr('id', `#chart-${i}-tab`)
            .attr('data-toggle', 'pill')
            .attr('href', `#chart-${i}`)
            .attr('role', 'tab')
            .attr('aria-controls', `#chart-${i}`)
            .attr('aria-selected', 'false')
            .on('click', scrollToTop)
            .appendTo('#v-pills-tab');


        let chartDiv = $('<div>')
            .attr('class', 'tab-pane fade')
            .attr('id', `chart-${i}`)
            .attr('role', 'tabpanel')
            .attr('aria-labelledby', `chart-${i}-tab`)
            .attr('aria-selected', 'false')
            .appendTo('#v-pills-tabContent');


        $('<canvas/>')
            .attr('id', `canvas-${i}`)
            .appendTo(chartDiv);
            

        let ctx = document.getElementById(`canvas-${i}`).getContext('2d');
        let chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'bar',
        
            // The data for our dataset
            data: {
                labels: ['Обществен сектор', 'Частен сектор'],
                
                datasets: [{
                    label: 'Брой наети лица',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [item.publicSector, item.privateSector]
                }]
            },
        
            // Configuration options go here
            options: {
                title: {
                    display: true,
                    text: item.activity
                }
            }
        });    
    }
}



function generateHiredStatsChartAlt() {
    var altDisplayData = {
        labels: data.hired.map(obj => obj.activity),
        datasets: [
            {
                label: 'Частен сектор',
                backgroundColor: "#136486",
                data: data.hired.map(obj => obj.privateSector)
            },
            {
                label: 'Обществен сектор',
                backgroundColor: "#f4b800",
                data: data.hired.map(obj => obj.publicSector)
            }
        ]
    };
    
    let ctx = document.getElementById('sektor2canvas').getContext('2d');
    let chart = new Chart(ctx, {
        type: 'horizontalBar',
        data: altDisplayData,
        options: {
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
}