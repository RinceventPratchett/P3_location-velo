
//Required ajax.js + booking.js


class MyMap{
    constructor() {
        this.map = L.map('map', {gestureHandling: true}).setView([45.76, 4.85], 13);
        this.markers = L.markerClusterGroup(); //initialise le cluster des markers
        this.icons = L.Icon.extend({
            options: {
                iconSize: [38, 95],
                iconAnchor: [22, 94],
                popupAnchor: [-3, -76]
            }        
        });
    }
    
    init() {
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>\n\
            contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1Ijoib2Nwcm9qZWN0NjkiLCJhIjoiY2sya2kzeWZpMTRnczNubWw5ZWNpN2pmYyJ9.oxsBCTb68dqIZhCi_2pySw'
        }).addTo(this.map);
        
        this.greenIcon = new NewMap.icons({iconUrl: '../images/leaf-green.png'});
        this.redIcon =  new NewMap.icons({iconUrl: '../images/leaf-red.png'});
        this.orangeIcon = new NewMap.icons({iconUrl: '../images/leaf-orange.png'});  

        this.map.addEventListener("click", function () {
            $("#billboard").css({display: "none"}); //pour effacer le panneau lors d'un click sur la map 
            $("#map").css({width: "100%"});
            window.location.hash = "#resume";
        });
    }
 
/*
 * successAjax Executé au succès de la requete ajax du wenservice JCdecault
 * 
 * @param {object} detailsStation Objet retourné par l'API JCdecault
 * @return true
 */
    successAjax(detailsStation) { //l'utilisation de var permet l'appel du contenu dans toute la fonction
            var details = JSON.parse(detailsStation);
            var mapObj =this; // on garde le context pour la callback du foreach
  			
            details.forEach(function (station) { //pour récupérer les détail de chaque station
                var coordLat = station.position.lat;
                var coordLng = station.position.lng;
                var dispo = station.available_bikes;
                var remainingPark = station.available_bike_stands;
                var statutStation = station.status;
                var color = mapObj.greenIcon; 
                if (statutStation === 'OPEN' && ((dispo <= 2 && dispo > 0)  || remainingPark <= 2)) { //condition d'attribution du marker orange
                    color = mapObj.orangeIcon;
                } else if (statutStation === 'CLOSED' || dispo === 0) {
                    color = mapObj.redIcon;
                }
                var marker = L.marker([coordLat, coordLng], {icon: color});
                marker.stationData = station;        
                marker.addEventListener("click", function (e) { //écouter le click pour chaque maker
                    mapObj.markerClick(e.target.stationData); //récupère l'objet target correspondant au marker cliké
                    window.location.hash = '';
                    window.location.hash = '#billboard'; //pour rejoindre l'ancre créer par l'id billboard

                });
            mapObj.markers.addLayer(marker); //pour ajouter les marker au cluster.
            });//end foreach
			
        this.markers.addTo(NewMap.map);
        return true;
    }
	
    markerClick(station) {
        $(".statut").empty();   //pour vider les champs si ils ont déjà été appelés 
        $(".detailsStation").empty();
        $(".nameStation").empty();
        $(".address").empty();
        $(".dispo").empty();
        $(".stationnement").empty();
        $("#velov").css({display: "flex"});
        $("#billboard").css({display: "block"});
        $("#map").css({width: "75%"});
        $("#id_station").val(station.name); //pour récupérer l'id de la station et l'attribuer à l'input html 


        if (station.status === 'OPEN') { //verification du statut pour déffinir les infos à afficher        
            $(".statut").append("statut : open");
            $(".detailsStation").css({display: "flex"});
            $(".detailsStation").append("Détails de la station"); //texte qui apparait
            $(".nameStation").css({display: "flex"});
            $(".nameStation").append(station.name);
            $(".address").css({display: "flex"});
            $(".address").append("adresse : " + station.address);
            $(".dispo").css({display: "flex"});
            $(".dispo").append(station.available_bikes + " vélo'v disponible(s)");
            $(".stationnement").css({display: "flex"});
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
            $(".detailsStation").css({display: "flex"});
            $(".detailsStation").append("détails de la station");
            $(".statut").append("statut : closed");
            $(".nameStation").css({display: "flex"});
            $(".nameStation").append(station.name);
            $(".address").css({display: "none"}); //pour faire disparaitre le bloc vide
            $(".dispo").css({display: "none"});
            $("#rent").css({display: "none"});
            $(".stationnement").css({display: "none"});
        }
    }
}; 

var NewMap = new MyMap();
NewMap.init(); //pour afficher la map définit.

ajaxGet(url, function(detailsStation) { 
    NewMap.successAjax(detailsStation); //function qui récupère les info de l'api.
});

          /*Developers are often confused by what a callback is because of the name of the damned thing.

A callback function is a function which is:

    accessible by another function, and
    is invoked after the first function if that first function completes

A nice way of imagining how a callback function works is that it is a function that is "called at the back" 
of the function it is passed into.

Maybe a better name would be a "call after" function.

This construct is very useful for asynchronous behaviour where we want an activity to take place 
whenever a previous event completes.*/