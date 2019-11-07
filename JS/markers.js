/*---------- Require ajax.js + maps.js preventively (url+ajax request)-------------------
*/

//Instancie la class icons qui servira pour chaque icone de couleur
const icons = L.Icon.extend ({
        options : {
            iconSize: [38, 95],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76]
        }
});
//pour instancier le marker vert/rouge/orange 
const greenIcon = new icons({iconUrl: '../images/leaf-green.png'});
const redIcon = new icons({iconUrl: '../images/leaf-red.png'});
const orangeIcon = new icons({iconUrl: '../images/leaf-orange.png'});

//pour créer le Cluster utilisés avec l'ajout des markers ->39
const markers = L.markerClusterGroup();

function successAjax(detailsStation) { //l'utilisation de var permet l'appel du contenu dans toute la fonction
    var details = JSON.parse(detailsStation);
        console.log(details);//pour faire un controle sur la console
    details.forEach(function (station) { //pour récupérer les détail de chaque station
        var coordLat = station.position.lat;
        var coordLng = station.position.lng;
        var dispo = station.available_bikes;
        var nameStation = station.name;
        var adressStation = station.address;
        var remainingPark = station.available_bike_stands;
        var statutStation = station.status;
        var color = greenIcon;
        // marker vert de base et modifié par les conditions    
        if (statutStation === 'OPEN' && (dispo <= 2 || remainingPark <= 2)) {
                color = orangeIcon;
         
        } else if (statutStation === 'CLOSED') {
                color = redIcon;                
        }
        var marker = L.marker([coordLat, coordLng], {icon: color}); //pour ajouter les popup sur chaque marker 
        markers.addLayer(marker, marker.bindPopup('Statut de la station : ' + statutStation + '<br> Station : ' + nameStation + 
                '<br> Adresse : ' + adressStation + '<br> Vélo\'V disponible : ' + dispo 
                + '<br> Place de stationnement Vélo\'V disponible : ' + remainingPark)); //mise en place info contenu dans le marker.
        if (statutStation === 'CLOSED') {
                marker.bindPopup('Statut de la station : ' + statutStation + '<br> Station : ' + nameStation);
        }
    });
    markers.addTo(map);
};

ajaxGet(url, successAjax);