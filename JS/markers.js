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
                $(".statut").empty();   //pour vider les champs si ils ont déjà été appelé 
                $(".detailsStation").empty();
                $(".nameStation").empty();
                $(".address").empty();
                $(".dispo").empty();
                $(".stationnement").empty();
                $("#velov").css({ display: "flex" }); 
                $("#billboard").css({ display: "block" });
                $("#map").css({ width : "75%" });
                if (statutStation === 'OPEN'){
                    $(".statut").append("statut : open");
                    $(".detailsStation").css({ display: "block" });
                    $(".detailsStation").append("Détails de la station"); //texte qui apparait
                    $(".nameStation").css({ display: "block" });
                    $(".nameStation").append(nameStation);
                    $(".address").css({ display: "block" });
                    $(".address").append("adresse : " + adressStation);
                    $(".dispo").css({ display: "block" });
                    $(".dispo").append(dispo + " vélo'v disponible(s)");
                    $(".stationnement").css({ display: "block" });
                    $(".stationnement").append(remainingPark + " place(s) restante(s)");                    
                    
                    if (dispo > 0){
                            $("#rent").css({ display: "flex" });  
                    } else {
                            $("#rent").css({ display: "none" });
                    }
                } else if (statutStation === 'CLOSED') {
                    $(".detailsStation").css({ display: "block" });
                    $(".detailsStation").append("détails de la station");
                    $(".statut").append("statut : closed");
                    $(".nameStation").css({ display: "block" });
                    $(".nameStation").append(nameStation);
                    $(".address").css({ display: "none" }); //pour faire disparaitre le bloc vide
                    $(".dispo").css({ display: "none" });
                    $("#rent").css({ display: "none" });
                    $(".stationnement").css({ display: "none" });  

                }        
                map.addEventListener("click", function() {
                   $("#billboard").css({ display: "none" }); //pour effacer le panneau lors d'un click sur la map 
                   $("#map").css({ width : "100%" });
                });        
        
        });
        marker.bindPopup(popup);     //initialise les popups
        markers.addLayer(marker); //mise en place info contenu dans le marker.
    });
    markers.addTo(map);
    return true;
};
// pour stocker les infos saisies lors de la session (reset si fermeture du nav)
var stockNomPrenom = () => { 
    var lastName = document.getElementById('lastName');
    var firstName = document.getElementById('firstName');
    if (sessionStorage.getItem('stockLastName')){
      nom.value = sessionStorage.getItem('stockLastName'); //pour restaurer le champ Nom
    }
    nom.addEventListener("change", function() {
      sessionStorage.setItem('stockLastName', lastName.value); //pour enregistrer les modificarions faites dans le champs au moment de la saisie
    });
    if(sessionStorage.getItem('stockFirstName')){
      firstName.value = sessionStorage.getItem('stockFirstName');
    }
    firstName.addEventListener("change", function() {
      sessionStorage.setItem('stockFirstName', firstName.value);
    });
   
};
 
ajaxGet(url, successAjax);
stockNomPrenom();

