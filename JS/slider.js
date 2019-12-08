/* 
 *Required style.css + index.html
 * 
 *
 */

class Diaporama {
    constructor() {        
        this.items = document.getElementsByClassName("mySlides"); // Attribut de sélection des figures;;
        this.timeOut = 'Null';
        this.label = document.getElementsByTagName("label");
        this.init();

    }
    init(){
       
        this.label[0].style.display = "flex";
        this.timer = setInterval(this.suivant.bind(this),5000);//pour eviter de declarer la fonction de setInterval -> use bind(param) directement
                    //declenche la fonction suvant au bout de 5sec.
        this.timeOut = 'Null';
        document.getElementById("playPause").textContent = "";
        document.getElementById("playPause").textContent = "Stop";
    }
    // Méthode qui récupére les touches du clavier et actionne le diaporama en fonction de la touche
    infosClavier(e) {
        if(e.keyCode === 39) {
            document.addEventListener("keydown",  ObjDiaporama.suivant()); // Appui sur la touche =>
        } else if(e.keyCode === 37) {
            document.addEventListener("keydown", ObjDiaporama.precedent()); // Appui sur la touche <=
        }
    }
    start(){
        clearInterval(this.timer);
        this.timer = setInterval(this.suivant.bind(this),5000);
        document.getElementById("playPause").textContent = "";
        document.getElementById("playPause").textContent = "Stop";
    }

    suivant() {
        var old2 = document.getElementsByClassName("position2")[0];
        var old4 = document.getElementsByClassName("position4")[0];
        var old3 = document.getElementsByClassName("position3")[0];
        var old1 = document.getElementsByClassName("position1")[0];

        document.querySelector('.position2 > label').style.display= "none"; //fait disparaitre le label avant de supprimer la classe
        document.querySelector('.position3 > label').style.display= "flex";

        old2.className = "mySlides position1"; //.classNmae remplace les classes existantes
        old3.className = "mySlides position2";
        old4.className = "mySlides position3";
        old1.className = "mySlides position4";
  
    }
    // Méthode qui fait fonctionner le diaporama en arrière
    precedent() {    
        var old2 = document.getElementsByClassName("position2")[0];
        var old4 = document.getElementsByClassName("position4")[0];
        var old3 = document.getElementsByClassName("position3")[0];
        var old1 = document.getElementsByClassName("position1")[0];

        document.querySelector('.position2 > label').style.display= "none"; //fait disparaitre le label avant de supprimer la classe
        document.querySelector('.position1 > label').style.display= "flex";

        old2.className = "mySlides position3";
        old3.className = "mySlides position4";
        old4.className = "mySlides position1";
        old1.className = "mySlides position2";

    } 
    playPause() {
        if (this.timeOut !=='Null') { //verifie l'existence de timeOut
            this.timeOut = 'Null';
            clearInterval(this.timer);
            this.timer = setInterval(this.suivant.bind(this),5000);
            document.getElementById("playPause").textContent = "";
            document.getElementById("playPause").textContent = "Stop";
            this.suivant();
        }else if(this.timer){ //relance le timer de zero
            clearInterval(this.timer);
            this.timer = "Null";
            this.timeOut = 0;
            document.getElementById("playPause").textContent = "";
            document.getElementById("playPause").textContent = "Play";
        }
    }
}

var ObjDiaporama = new Diaporama();



// Gestion de l'appui et du relâchement d'une touche du clavier
document.addEventListener("keydown", ObjDiaporama.infosClavier.bind(Diaporama));//pour que le diaporama puisse recevoir le keydown de chaque touche et déclencher l'action correspondante
                                //Attach a handler to an event for the elements.
document.getElementsByTagName("button")[1].addEventListener("click", function(){
    ObjDiaporama.playPause();
}); 

// Le bouton droit appel la méthode "suivant" du diaporama
$('#btnDroit').click(function(){
    ObjDiaporama.suivant();
    ObjDiaporama.start();
});

// Le bouton gauche appel la méthode "précédent" du diaporama
$('#btnGauche').click(function(){
    ObjDiaporama.precedent();
    ObjDiaporama.start();
});
    
