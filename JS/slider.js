

class Diaporama {
    constructor() {        
        this.items = document.getElementsByClassName("mySlides"); // Attribut de sélection des figures;;
        this.imageNum = 0; // Attribut qui permet de parcourir les images
        this.timeOut = 'Null';
        this.init();
        
    }
    init(){
        this.suivant();
        this.timer = setInterval(this.suivant.bind(this),5000);//pour eviter de declarer la fonction de setInterval -> use bind(param) directement
        this.timeOut = 'Null';
        document.getElementById("playPause").textContent = "";
        document.getElementById("playPause").textContent = "Pause";
    }
    // Méthode qui récupére les touches du clavier et actionne le diaporama en fonction de la touche
    infosClavier(e) {
        if(e.keyCode === 39) {
            document.addEventListener("keydown",  ObjDiaporama.suivant(), ObjDiaporama.pause()); // Appui sur la touche =>
        } else if(e.keyCode === 37) {
            document.addEventListener("keydown", ObjDiaporama.precedent(), ObjDiaporama.pause()); // Appui sur la touche <=
        }
    }   
    // Méthode qui fait fonctionner le diaporama en avant
    suivant() {
        this.items[this.imageNum].style.display = "none"; // Fait disparaître l'image active
        if(this.imageNum === 3) { // Si le diaporama est à la dernière image
            this.imageNum = 0; // On repasse l'attribut à 0 pour faire réapparaître la première image
        } else { // Sinon on passe à l'image suivante
            this.imageNum++; // En augmentant de 1 l'attribut
        }
        this.items[this.imageNum].style.display = "flex"; // Fait apparaître l'image suivante
    }

    // Méthode qui fait fonctionner le diaporama en arrière
    precedent() {
        //this.timer = clearInterval();
        this.items[this.imageNum].style.display = "none"; // Fait disparaître l'image active
        if(this.imageNum === 0) { // Si le diaporama est à la première image
            this.imageNum = 3; // On passe l'attribut à 4 pour faire réapparaître l'image précédente
        } else { // Sinon on passe à l'image précédente
            this.imageNum--; // En diminuant de 1 la valeur de l'attribut
        }
        this.items[this.imageNum].style.display = "flex"; // Fait apparaître l'image précédente        
    }

    pause() {
        if(this.timeOut !== 'Null') {
            clearTimeout(this.timeOut);
            this.timeOut = 'Null';//pour relancer si le diapo est en pause de 15 secondes
        }else{
            clearInterval(this.timer);
            this.timer = 'Null';//pour arreter le defilement auto
        }
        document.getElementById("playPause").textContent = "";
        document.getElementById("playPause").textContent = "Play";
        this.timeOut = setTimeout(this.init.bind(this), 15000);
    }
    playPause() {
        if (this.timeOut !=='Null') {
            clearTimeout(this.timeOut);
            this.timeOut = 'Null';
            clearInterval(this.timer);
            this.timer = setInterval(this.suivant.bind(this),5000);
            document.getElementById("playPause").textContent = "";
            document.getElementById("playPause").textContent = "Pause";
        }else if(this.timer){
            clearInterval(this.timer);
            this.timer = "Null";
            this.timeOut = 0;
            document.getElementById("playPause").textContent = "";
            document.getElementById("playPause").textContent = "Play";
        }
    }
}

// Le bouton droit appel la méthode "suivant" du diaporama
$('#btnDroit').click(function(){
    ObjDiaporama.pause();
    ObjDiaporama.suivant();
});

// Le bouton gauche appel la méthode "précédent" du diaporama
$('#btnGauche').click(function(){
    ObjDiaporama.pause();
    ObjDiaporama.precedent();
});

var ObjDiaporama = new Diaporama();

// Gestion de l'appui et du relâchement d'une touche du clavier
document.addEventListener("keydown", ObjDiaporama.infosClavier.bind(Diaporama));//pour que le diaporama puisse recevoir le keydown de chaque touche

document.getElementById("playPause").addEventListener("click", function(){
    ObjDiaporama.playPause();
});