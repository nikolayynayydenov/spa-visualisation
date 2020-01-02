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


function generateTableIfNeeded(chartDiv,itemFirst,itemSecond,itemFirstName,itemSecondName,color)
{
	let priv =parseInt(itemFirst)+1;
	let pub =  parseInt(itemSecond)+1;
	

	if((pub/priv)*100<10 || (priv/pub)*100<10)
	{
		priv--;
		pub--;
		let table=$('<table class="smallTable"></table>').appendTo(chartDiv);
		let firstRow=$('<tr></tr>')
		.appendTo(table);
		$('<th></th>')
			.text(itemFirstName)
			.css("background-color",color)
			.appendTo(firstRow);
		$('<th></th>')
			.text(itemSecondName)
			.css("background-color",color)
			.appendTo(firstRow);
		let secondRow=$('<tr></tr>')
		.appendTo(table);
		$('<td></td>')
			.text(itemFirst)
			.appendTo(secondRow);
		$('<td></td>')
			.text(itemSecond)
			.appendTo(secondRow);
	}
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
                    data: [item.publicSector, item.privateSector,"0"]
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
	    generateTableIfNeeded(chartDiv,item.publicSector,item.privateSector,'Обществен сектор','Частен сектор','rgb(255, 99, 132)');
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
		backgroundColor: "#f4b800", data: data.hired.map(obj =>
			obj.publicSector)
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
            },
            maintainAspectRatio: false
        }
    });
}




function generateSalaryChartBySector()
{
 let sectorDat = data['salary']['bySector'];
 let datlen = sectorDat.length;
    for (let i = 0; i < datlen; i++) {
        let item =  sectorDat[i];

        $('<a>')
            .text(item.activity)
            .attr('class', 'nav-link')
            .attr('id', `#salary-chart-${i}-tab`)
            .attr('data-toggle', 'pill')
            .attr('href', `#salary-chart-${i}`)
            .attr('role', 'tab')
            .attr('aria-controls', `#salary-chart-${i}`)
            .attr('aria-selected', 'false')
            .on('click', scrollToTop)
            .appendTo('#zaplati0-left-side');


        let chartDiv = $('<div>')
            .attr('class', 'tab-pane fade')
            .attr('id', `salary-chart-${i}`)
            .attr('role', 'tabpanel')
            .attr('aria-labelledby', `salary-chart-${i}-tab`)
            .attr('aria-selected', 'false')
            .appendTo('#zaplati0-right-side');


        $('<canvas/>')
            .attr('id', `salary-canvas-${i}`)
            .appendTo(chartDiv);
            
        let ctx = document.getElementById(`salary-canvas-${i}`).getContext('2d');
        let chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'bar',
        
            // The data for our dataset
            data: {
                labels: ['Обществен сектор', 'Частен сектор'],
                
                datasets: [{
                    label: 'Средна Заплата',
                    backgroundColor: 'rgba(0, 155, 100, 0.5)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [item.publicSector, item.privateSector,"0"]
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
	 generateTableIfNeeded(chartDiv,item.publicSector,item.privateSector,'Обществен сектор','Частен сектор','rgba(0, 155, 100, 0.5)');

    }
}
function generateSalaryChartByGender()
{
let sectorDat = data['salary']['byGender'];
 let datlen = sectorDat.length;
    for (let i = 0; i < datlen; i++) {
        let item =  sectorDat[i];

        $('<a>')
            .text(item.activity)
            .attr('class', 'nav-link')
            .attr('id', `#salary-1-chart-${i}-tab`)
            .attr('data-toggle', 'pill')
            .attr('href', `#salary-1-chart-${i}`)
            .attr('role', 'tab')
            .attr('aria-controls', `#salary-1-chart-${i}`)
            .attr('aria-selected', 'false')
            .on('click', scrollToTop)
            .appendTo('#zaplati-1-left-side');


        let chartDiv = $('<div>')
            .attr('class', 'tab-pane fade')
            .attr('id', `salary-1-chart-${i}`)
            .attr('role', 'tabpanel')
            .attr('aria-labelledby', `salary-1-chart-${i}-tab`)
            .attr('aria-selected', 'false')
            .appendTo('#zaplati-1-right-side');


        $('<canvas/>')
            .attr('id', `salary-1-canvas-${i}`)
            .appendTo(chartDiv);
            
        let ctx = document.getElementById(`salary-1-canvas-${i}`).getContext('2d');
        let chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'bar',
        
            // The data for our dataset
            data: {
                labels: ['Мъже', 'Жени'],
                
                datasets: [{
                    label: 'Средна годишна заплата',
                    backgroundColor: ['rgba(0,0,255,0.5)','rgba(255, 192, 203,1)'],
                    borderColor: 'rgba(0, 0, 0,0.1)',
                    data: [item.man, item.woman,"0"]
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
	$('<canvas/>')
            .attr('id', `salary-1-canvas-${i}-2`)
            .appendTo(chartDiv);
            
        let ctx2 = document.getElementById(`salary-1-canvas-${i}-2`).getContext('2d');
        let chart2 = new Chart(ctx2, {
            // The type of chart we want to create
            type: 'pie',
        
            // The data for our dataset
            data: {
                labels: ['Мъже', 'Жени'],
                
                datasets: [{
                    label: 'Средна годишна заплата',
                    backgroundColor: ['rgba(0,0,255,0.5)','rgba(255, 192, 203,1)'],
                    borderColor: 'rgba(0, 0, 0,0.1)',
                    data: [item.man, item.woman]
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


/*
function generateZaplatiAlt() {
    var altDisplayData = {
        labels: data.hired.map(obj => obj.activity),
        datasets: [
            {
                label: 'Частен сектор',
                backgroundColor: "#136486",
                data: data.salary.bySector.map(obj => obj.privateSector)
            },
            {
                label: 'Обществен сектор',
                backgroundColor: "#f4b800",
                data: data.salary.bySector.map(obj => obj.publicSector)
            }
        ]
    };
    
    let ctx = document.getElementById('zaplati2canvas').getContext('2d');
    let chart = new Chart(ctx, {
        type: 'horizontalBar',
        data: altDisplayData,
        options: {
            scales: {
            },
            maintainAspectRatio: false
        }
    });
}
*/

//generateProvincesMap();
//generateHiredStatsChart();
//generateHiredStatsChartAlt();
//generateSalaryChartBySector();
//generateSalaryChartByGender();
// generateZaplatiAlt();
