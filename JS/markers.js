/*---------- Require ajax.js + maps.js preventively (url+ajax request)-------------------
*/


//pour instancier le marker vert 
var greenIcon = L.icon({
	iconUrl: '../images/leaf-green.png',
	shadowUrl: '../images/leaf-shadow.png',

	iconSize:     [38, 95], // size of the icon
	shadowSize:   [50, 64], // size of the shadow
	iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	shadowAnchor: [4, 62],  // the same for the shadow
	popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var redIcon = L.icon({
	iconUrl: '../images/leaf-red.png',
	shadowUrl: '../images/leaf-shadow.png',

	iconSize:     [38, 95], // size of the icon
	shadowSize:   [50, 64], // size of the shadow
	iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	shadowAnchor: [4, 62],  // the same for the shadow
	popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var orangeIcon = L.icon({
	iconUrl: '../images/leaf-orange.png',
	shadowUrl: '../images/leaf-shadow.png',

	iconSize:     [38, 95], // size of the icon
	shadowSize:   [50, 64], // size of the shadow
	iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	shadowAnchor: [4, 62],  // the same for the shadow
	popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var markers = L.markerClusterGroup();

function successAjax(detailsStation) {
    var details = JSON.parse(detailsStation);
        console.log(details);//pour faire un controle sur la console
    details.forEach(function (station) { //pour récupérer les détail de chaque station
        var coordLat = station.position.lat;
        var coordLng = station.position.lng;
        var dispo = station.available_bikes;
        var nameStation = station.name;
        var adressStation = station.address;
        var remainingPark = station.available_bikes_stands;
        var statutStation = station.status;
        var color = greenIcon;
        if (statutStation === 'OPEN' && (dispo === 0 || remainingPark === 0)) {
            color = orangeIcon;
        } else if (statutStation === 'CLOSED') {
            color = redIcon;
        }
        markers.addLayer(L.marker([coordLat, coordLng], {icon: color}));    //pour ajouter tous les markers aux clusters.   
    });
    markers.addTo(map);
};

ajaxGet(url, successAjax);