

class Diaporama {
    constructor() {        
        this.items = document.getElementsByClassName("mySlides"); // Attribut de sélection des figures;;
        this.imageNum = 2; // Attribut qui permet de parcourir les images
        this.timeOut = 'Null';
        this.label = document.getElementsByTagName("label");
        this.init();

    }
    init(){
        this.label[0].style.display = "flex";
        this.timer = setInterval(this.suivant.bind(this),5000);//pour eviter de declarer la fonction de setInterval -> use bind(param) directement
        this.timeOut = 'Null';
        document.getElementById("playPause").textContent = "";
        document.getElementById("playPause").textContent = "Stop";
                console.log('passage txt button pause l-17');

    }
    // Méthode qui récupére les touches du clavier et actionne le diaporama en fonction de la touche
    infosClavier(e) {
        if(e.keyCode === 39) {
            document.addEventListener("keydown",  ObjDiaporama.suivant(), ObjDiaporama.pause()); // Appui sur la touche =>
            console.log('l-19 fleche droite ' + ObjDiaporama.pause);
        } else if(e.keyCode === 37) {
            document.addEventListener("keydown", ObjDiaporama.precedent(), ObjDiaporama.pause()); // Appui sur la touche <=
            console.log('l-22 fleche gauche ' + ObjDiaporama.pause);
        }
    }

    suivant() {
        var w = document.getElementsByClassName("position2")[0]; 
        var x = document.getElementsByClassName("position4")[0];
        var y = document.getElementsByClassName("position3")[0];
        var z = document.getElementsByClassName("position1")[0];

        w.className += " position1";
        document.querySelector('.position2 > label').style.display= "none"; //fait disparaitre le label avant de supprimer la classe
        w.classList.remove("position2");        
        x.className += " position2";
        document.querySelector('.position4 > label').style.display= "flex";
        x.classList.remove("position4");
        y.className += " position4";
        y.classList.remove("position3");
        z.className += " position3";
        z.classList.remove("position1");
        if(this.imageNum === 3) { // Si le diaporama est à la dernière image
            this.imageNum = 0; // On repasse l'attribut à 0 pour faire réapparaître la première image
        } else { // Sinon on passe à l'image suivante
            this.imageNum++; // En augmentant de 1 l'attribut
        }
    }

    // Méthode qui fait fonctionner le diaporama en arrière
    precedent() {
        var w = document.getElementsByClassName("position2")[0]; 
        var x = document.getElementsByClassName("position4")[0];
        var y = document.getElementsByClassName("position3")[0];
        var z = document.getElementsByClassName("position1")[0];
        document.querySelector('.position1 > label').style.display= "flex";
        document.querySelector('.position2 > label').style.display= "none";        
        w.className += " position4";
        w.classList.remove("position2");        
        x.className += " position3";        
        x.classList.remove("position4");
        y.className += " position1";
        y.classList.remove("position3");
        z.className += " position2";
        z.classList.remove("position1");
        if(this.imageNum === 0) { // Si le diaporama est à la dernière image
            this.imageNum = 3; // On repasse l'attribut à 0 pour faire réapparaître la première image
        } else { // Sinon on passe à l'image suivante
            this.imageNum--; // En augmentant de 1 l'attribut
        }
    } 
    

    pause() {
        if(this.timeOut !== 'Null') {
            clearTimeout(this.timeOut);
            this.timeOut = 'Null';//pour relancer si le diapo est en pause de 15 secondes
            console.log(' l-117 if this TimeOut fction pause');
        }else{
            clearInterval(this.timer);
            this.timer = 'Null';//pour arreter le defilement auto
            console.log(' l-121 else this.timer fction pause');
        }
        document.getElementById("playPause").textContent = "";
        document.getElementById("playPause").textContent = "Play";
        console.log('passage play l-125');
        this.timeOut = setTimeout(this.init.bind(this), 15000);
        console.log('l-127 exec this.timeOut ' + this.timeOut);
    }
    playPause() {
        if (this.timeOut !=='Null') {
            clearTimeout(this.timeOut);
            this.timeOut = 'Null';
            clearInterval(this.timer);
            this.timer = setInterval(this.suivant.bind(this),5000);
            document.getElementById("playPause").textContent = "";
            document.getElementById("playPause").textContent = "Stop";
                    console.log('passage pause l-137');
            this.suivant();
            console.log(' l-139 if this.timeOut fction playPause');
        }else if(this.timer){
            clearInterval(this.timer);
            this.timer = "Null";
            this.timeOut = 0;
            console.log(' l-144 else if this.timer fction playPause');
            document.getElementById("playPause").textContent = "";
            document.getElementById("playPause").textContent = "Play";
            console.log('paasage play l-148');
        }
    }
    UpdateSlides(){
        switch (this.imageNum) {
            case 0:
                console.log('case 0');
                this.items[0].classList.remove("position2");
                this.items[0].className += " position1";
                this.label[0].style.display = "none";
                this.items[1].classList.remove("position4");
                this.items[1].className += " position2";
                this.label[1].style.display = "flex";
                this.items[2].classList.remove("position3");
                this.items[2].className += " position4";
                this.items[3].classList.remove("position1");
                this.items[3].className += " position3";
                break;
            case 1:
                console.log('case 1');
                this.items[0].classList.remove("position1");
                this.items[0].className += " position3";
                this.items[1].classList.remove("position2");
                this.items[1].className += " position1";
                this.label[1].style.display = "none";
                this.items[2].classList.remove("position4");
                this.items[2].className += " position2";
                this.label[2].style.display = "flex";
                this.items[3].classList.remove("position3");
                this.items[3].className += " position4";
                break;
            case 2:
                console.log('case 2');
                this.items[0].classList.remove("position3");
                this.items[0].className += " position4";
                this.items[1].classList.remove("position1");
                this.items[1].className += " position3";
                this.items[2].classList.remove("position2");
                this.items[2].className += " position1";
                this.label[2].style.display = "none";
                this.items[3].classList.remove("position4");
                this.items[3].className += " position2";
                this.label[3].style.display = "flex";
                break;
            case 3:    
                console.log('case 3');
                this.items[0].classList.remove("position4");
                this.items[0].className += " position2";
                this.label[0].style.display = "flex";
                this.items[1].classList.remove("position3");
                this.items[1].className += " position4";
                this.items[2].classList.remove("position1");
                this.items[2].className += " position3";
                this.items[3].classList.remove("position2");
                this.items[3].className += " position1";
                this.label[3].style.display = "none";
                break;    
        }
    }
}

// Le bouton droit appel la méthode "suivant" du diaporama
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

 document.getElementsByTagName("button")[1].addEventListener("click", function(){
    ObjDiaporama.playPause();
}); 
    
