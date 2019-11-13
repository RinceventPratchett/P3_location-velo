/* 
 * Required map.js + booking.js
 * créer la requete ajax (asynchrone) vers le server.
 */

var url = 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=aaa4da9065925332b37756d729ce3a07e7107a41';

// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url); //le troisième paramètre vaut true si absent et rend la fonction asynchrone
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(this.responseText);            
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}

