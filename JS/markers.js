/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
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

ajaxGet(url, function (detailsStation) {
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
        if ((dispo > 0) && (statutStation === "OPEN")) {
            L.marker([coordLat, coordLng], {icon: greenIcon}).addTo(map);
        } else if (statutStation === "CLOSED") {
            L.marker([coordLat, coordLng], {icon: redIcon}).addTo(map);
        } else if ((statutStation === "OPEN") && ((dispo === 0) || (remainingPark === 0))) {
            L.marker([coordLat, coordLng], {icon: orangeIcon}).addTo(map);
        };
    });
});