

class Diaporama {
    constructor() {        
        this.items = document.getElementsByClassName("mySlides"); // Attribut de sélection des figures;;
        this.imageNum = 0; // Attribut qui permet de parcourir les images
        this.init();
    }
    init(){
        this.suivant();
        this.timer = setInterval(this.suivant.bind(this),5000);//pour eviter de declarer la fonction de setInterval -> use bind(param) directement
    }
    // Méthode qui récupére les touches du clavier et actionne le diaporama en fonction de la touche
    infosClavier(e) {
        if(e.keyCode === 39) {
            document.addEventListener("keydown", ObjDiaporama.pause(), ObjDiaporama.suivant()); // Appui sur la touche =>
        } else if(e.keyCode === 37) {
            document.addEventListener("keydown", ObjDiaporama.pause(), ObjDiaporama.precedent()); // Appui sur la touche <=
        }
    }   
    // Méthode qui fait fonctionner le diaporama en avant
    suivant() {
        this.items[this.imageNum].style.display = "none"; // Fait disparaître l'image active
        if(this.imageNum === 2) { // Si le diaporama est à la dernière image
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
            this.imageNum = 2; // On passe l'attribut à 4 pour faire réapparaître l'image précédente
        } else { // Sinon on passe à l'image précédente
            this.imageNum--; // En diminuant de 1 la valeur de l'attribut
        }
        this.items[this.imageNum].style.display = "flex"; // Fait apparaître l'image précédente        
    }
    pause() {
        if(this.timeOut) {
            clearTimeout(this.timeOut);
        }else{
            clearInterval(this.timer); //pour arreter le defilement auto 
        }
        this.timeOut = setTimeout(this.init.bind(this), 15000);
    }
    playPause() {
        if (this.timeOut) {
            clearTimeout(this.timeOut);
            this.timeOut = 0;
            clearInterval(this.timer);
            this.init();
        }else if(this.timer){
            clearInterval(this.timer);
            this.timer = "Null";
            this.timeOut = setTimeout(this.init.bind(this), 15000);
        }else{
            this.init();
        }
    }
}

// Le bouton droit appel la méthode "suivant" du diaporama
//document.getElementById("btnDroit").addEventListener("click", Diaporama.suivant.bind());
$('#btnDroit').click(function(){
    ObjDiaporama.pause();
    ObjDiaporama.suivant();
});

// Le bouton gauche appel la méthode "précédent" du diaporama
//document.getElementById("btnGauche").addEventListener("click", Diaporama.precedent.bind(Diaporama));
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
//
//
//$('#play-pause').click(function(){
//    
//    if (ObjDiaporama.timeOut != undefined){
//        clearTimeout(ObjDiaporama.timeOut());
//    }else{
//        ObjDiaporama.timeOut;
//    }       
//});  