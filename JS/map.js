//Required ajax.js + booking.js

/* 
Pour appeler la map mapbox
 */
let map = L.map('map').setView([45.76, 4.85], 13);

var myMap={
    init() {
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>\n\
            contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1Ijoib2Nwcm9qZWN0NjkiLCJhIjoiY2sya2kzeWZpMTRnczNubWw5ZWNpN2pmYyJ9.oxsBCTb68dqIZhCi_2pySw'
        }).addTo(map);
    }
};
    
//créer l'objet icon qui servira de marker
const icons = L.Icon.extend({
    options: {
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    }
});
//pour instancier le marker vert/rouge/orange 
const greenIcon = new icons({iconUrl: '../images/leaf-green.png'});
const redIcon = new icons({iconUrl: '../images/leaf-red.png'});
const orangeIcon = new icons({iconUrl: '../images/leaf-orange.png'});

const markers = L.markerClusterGroup(); //initialise le cluster des markers
//pour refermer le bilboard lors du click dans la map

map.addEventListener("click", function () {
    $("#billboard").css({display: "none"}); //pour effacer le panneau lors d'un click sur la map 
    $("#map").css({width: "100%"});
//    window.location.reload();
});

/*
 * successAjax Executé au succès de la requete ajax du wenservice JCdecault
 * 
 * @param {object} detailsStation Objet retourné par l'API JCdecault
 * @return true
 */
function successAjax(detailsStation) { //l'utilisation de var permet l'appel du contenu dans toute la fonction
    var details = JSON.parse(detailsStation);
    console.log(details);//pour faire un controle sur la console
    details.forEach(function (station) { //pour récupérer les détail de chaque station
        var coordLat = station.position.lat;
        var coordLng = station.position.lng;
        var dispo = station.available_bikes;
        var remainingPark = station.available_bike_stands;
        var statutStation = station.status;
        var color = greenIcon; 
        if (statutStation === 'OPEN' && (dispo <= 2 || remainingPark <= 2)) {
            color = orangeIcon;
        } else if (statutStation === 'CLOSED') {
            color = redIcon;
        }
        var marker = L.marker([coordLat, coordLng], {icon: color}); //pour ajouter les popup sur chaque marker 
        marker.stationData = station;        
        marker.addEventListener("click", function (e) { //écouter le click pour chaque maker
            markerClick(e.target.stationData); //récupère l'objet target correspondant au marker cliké
        });
        markers.addLayer(marker); //pour ajouter les marker au cluster.
    });
    markers.addTo(map);
    return true;
};

function markerClick(station) {
    $(".statut").empty();   //pour vider les champs si ils ont déjà été appelé 
    $(".detailsStation").empty();
    $(".nameStation").empty();
    $(".address").empty();
    $(".dispo").empty();
    $(".stationnement").empty();
    $("#velov").css({display: "flex"});
    $("#billboard").css({display: "block"});
    $("#map").css({width: "75%"});
    console.log('station num :' + station.number + 'function marker addeventlistener');
    $("#id_station").val(station.number); //pour récupérer l'id de la station et l'attribuer à l'input html 

    if (station.status === 'OPEN') { //verification du statut pour déffinir les infos à afficher
        $(".statut").append("statut : open");
        $(".detailsStation").css({display: "block"});
        $(".detailsStation").append("Détails de la station"); //texte qui apparait
        $(".nameStation").css({display: "block"});
        $(".nameStation").append(station.name);
        $(".address").css({display: "block"});
        $(".address").append("adresse : " + station.address);
        $(".dispo").css({display: "block"});
        $(".dispo").append(station.available_bikes + " vélo'v disponible(s)");
        $(".stationnement").css({display: "block"});
        $(".stationnement").append(station.available_bike_stands + " place(s) restante(s)");

        if (station.available_bikes > 0) { //ouverture du formulaire de resa
            $("#rent").css({display: "flex"});
            $("input").css({display: "block"});
            $("canvas").css({display: "block"});

        } else {
            $("input").css({display: "none"});
            $("canvas").css({display: "none"});
            $("timer").css({display: "block"});
            
        }
    } else if (station.status === 'CLOSED') { //affichage limité en cas de statut fermé
        $(".detailsStation").css({display: "block"});
        $(".detailsStation").append("détails de la station");
        $(".statut").append("statut : closed");
        $(".nameStation").css({display: "block"});
        $(".nameStation").append(station.name);
        $(".address").css({display: "none"}); //pour faire disparaitre le bloc vide
        $(".dispo").css({display: "none"});
        $("#rent").css({display: "none"});
        $(".stationnement").css({display: "none"});

    }
}
myMap.init(map);
ajaxGet(url, successAjax);