/* 
 *Required style.css + index.html
 * 
 *
 */
class Diaporama {
    constructor() {
        // Gestion de l'appui et du relâchement d'une touche du clavier
        document.addEventListener("keydown", this.infosClavier.bind(this));//pour que le diaporama puisse recevoir le keydown de chaque touche et déclencher l'action correspondante
        //Attach a handler to an event for the elements.
        this.items = document.getElementsByClassName("mySlides"); // Attribut de sélection des figures;;
        this.label = document.getElementsByTagName("label");
        var that = this;
        document.getElementById("playPause").addEventListener("click", function () {
            that.playPause();
        });
        this.label[0].style.display = "flex";
        this.start();
        this.infosBtnDroit();
        this.infosBtnGauche();
    }
    // Méthode qui récupére les touches du clavier et actionne le diaporama en fonction de la touche
    infosClavier(e) {
        var that = this;
        if (e.keyCode === 39) {
            document.addEventListener("keydown", that.suivant()); // Appui sur la touche =>
        } else if (e.keyCode === 37) {
            document.addEventListener("keydown", that.precedent()); // Appui sur la touche <=
        }
    }
    infosBtnDroit() {
        var that = this;
        $("#btnDroit").click(function () {
            that.suivant();
            that.start();
        });
    }
    infosBtnGauche() {
        var that = this;
        $('#btnGauche').click(function () {
            that.precedent();
            that.start();
        });
    }
    start() {
        clearInterval(this.timer);
        this.timer = setInterval(this.suivant.bind(this), 5000);
        document.getElementById("playPause").textContent = "Stop";
    }
    stop() {
        clearInterval(this.timer);
        this.timer = 0;
        document.getElementById("playPause").textContent = "Play";
    }
    suivant() {
        var old2 = document.getElementsByClassName("position2")[0];
        var old4 = document.getElementsByClassName("position4")[0];
        var old3 = document.getElementsByClassName("position3")[0];
        var old1 = document.getElementsByClassName("position1")[0];

        document.querySelector('.position2 > label').style.display = "none"; //fait disparaitre le label avant de supprimer la classe
        document.querySelector('.position3 > label').style.display = "flex";

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


        document.querySelector('.position2 > label').style.display = "none"; //fait disparaitre le label avant de supprimer la classe
        document.querySelector('.position1 > label').style.display = "flex";

        old2.className = "mySlides position3";
        old3.className = "mySlides position4";
        old4.className = "mySlides position1";
        old1.className = "mySlides position2";

    }
    playPause() {
        if (this.timer > 0) {
            this.stop();
        } else {
            this.start();
            this.suivant();
        }
    }
}
var ObjDiaporama = new Diaporama();


