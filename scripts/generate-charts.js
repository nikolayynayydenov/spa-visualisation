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





var altDisplayData = {
    labels: hired.map(obj => obj.activity),
    datasets: [
        {
            label: 'Частен сектор',
            backgroundColor: "#136486",
            data: hired.map(obj => obj.privateSector)
        },
        {
            label: 'Обществен сектор',
            backgroundColor: "#f4b800",
            data: hired.map(obj => obj.publicSector)
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