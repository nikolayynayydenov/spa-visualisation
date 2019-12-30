function generateProvincesMap() {
    var mymap = L.map('provinces-map')
        .setView([42.4860136,25.4435019])
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
                let props = layer.feature.properties;
                let result = "";
                for (var prop in props) {
                    if (Object.prototype.hasOwnProperty.call(props, prop)) {
                        result += `<b>${prop}</b>: ${props[prop]}</br>`;
                    }
                }
                return result;
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
            
	generateStatisticsTable(chartDiv,i)
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




///Makes a table with general statistics of the data.For example exact values, %of people from whole 
//sample goup, %of people from all samples , etc.

function generateStatisticsTable(chartDiv, index){
let statTable = $('<table></table>')
	.attr('id',`chart-table-${index}`)
	.attr('class','chart-table')	
	.appendTo(chartDiv);

let headerRow = $('<tr></tr>')
	.attr('class','chtable-head-row')
	.attr('id',`chtable-head-row-${index}`)
	.appendTo(statTable);

	$('<th></th>')
	.text('Обществен Сектор')
	.appendTo(headerRow);
	
	$('<th></th>')
	.text('Частен Сектор')
	.appendTo(headerRow);
	
}
