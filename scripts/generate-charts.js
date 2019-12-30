function generateProvincesMap() {
    var mymap = L.map('provinces-map')
        .setView([42.8860136,26.0435019], 13)
        .setZoom(7.7);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1Ijoibmlrb2xheXkiLCJhIjoiY2s0c2kybzRiMTl0eDNscDE5bXMwYXIzayJ9.EHG22-TMFIahiqXG-BuRMw'
    }).addTo(mymap);
    
    data['provinces'].forEach(feature => {
        L.geoJSON(feature)
            .bindPopup((layer) => {
                return layer.feature.properties.nuts3;
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