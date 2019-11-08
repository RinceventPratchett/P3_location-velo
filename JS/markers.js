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

/*
 * successAjax Executé au succès de la requete ajax du wenservice JCdecault
 * 
 * @param {object} detailsStation Objet retourné par l'API JCdecault
 * @returns true
 */
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
        var popup = 'Statut de la station : ' + statutStation + '<br /> Station : ' + nameStation + 
                '<br /> Adresse : ' + adressStation + '<br /> Vélo\'V disponible : ' + dispo 
                + '<br /> Place de stationnement Vélo\'V disponible : ' + remainingPark;
        // marker vert de base et modifié par les conditions + popup    
        if (statutStation === 'OPEN' && (dispo <= 2 || remainingPark <= 2)) {
                color = orangeIcon;
         
        } else if (statutStation === 'CLOSED') {
                color = redIcon;
                popup = 'Statut de la station : ' + statutStation + '<br /> Station : ' + nameStation;
        }
        var marker = L.marker([coordLat, coordLng], {icon: color}); //pour ajouter les popup sur chaque marker 
        
        marker.addEventListener("click", function(){
                $("#statut").empty();
                $(".detailsStation").empty();
                $(".nameStation").empty();
                $(".address").empty();
                $(".dispo").empty();
                $(".stationnement").empty();
                $("#velov").css({ display: "flex" });
                $("#billboard").css({ display: "block" });
                $("#map").css({ width : "75%" });
                if (statutStation === 'OPEN'){
                    $("#statut").append("open");
                    $(".detailsStation").css({ display: "block" });
                    $(".detailsStation").append("Détails de la station");
                    $(".nameStation").css({ display: "block" });
                    $(".nameStation").append(nameStation);
                    $(".address").css({ display: "block" });
                    $(".address").append(adressStation);
                    (".dispo").css({ display: "block" });
                    $(".dispo").append(dispo);
                    (".stationnement").css({ display: "block" });
                    $(".stationnement").append(remainingPark);                    
                    
                    if (dispo > 0){
                            $("#rent").css({ display: "block" });  
                    } else {
                            $("#rent").css({ display: "none" });
                    }
                } else if (statutStation === 'CLOSED') {
                    $(".detailsStation").css({ display: "block" });
                    $(".detailsStation").append("Détails de la station");
                    $("#statut").append("closed");
                    $(".nameStation").css({ display: "block" });
                    $(".nameStation").append(nameStation);
                    $(".address").css({ display: "none" });
                    $(".dispo").css({ display: "none" });
                    $("#rent").css({ display: "none" });
                    $(".stationnement").css({ display: "none" });  

                }        
                map.addEventListener("click", function() {
                   $("#billboard").css({ display: "none" });
                   $("#map").css({ width : "100%" });
                });        
        
        });
        marker.bindPopup(popup);    
        markers.addLayer(marker); //mise en place info contenu dans le marker.
    });
    markers.addTo(map);
    return true;
};

ajaxGet(url, successAjax);