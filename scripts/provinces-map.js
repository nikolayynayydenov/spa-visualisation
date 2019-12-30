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