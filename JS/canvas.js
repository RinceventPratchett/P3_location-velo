/*              
    required index.hmtl + 
 */

let clickX = new Array();   //definit les array qui contiendront la position du click et le mouvement
let clickY = new Array();
let clickDrag = new Array();
let effacer = $('#erase'); //boutton du panneau d'information

class Canvas {
    
    constructor(cible) { //cible est type obj contenant le canvas html 
        this.paint = false; //pour pouvoir basculer en mode écriture 
        this._canvas = cible; 
        this.context = cible[0].getContext('2d');  //index du canvas indispensable pour appliquer le context qui fournit le contexte de rendu 2D pour la surface de dessin     
        var that = this; //pour pouvoir utiliser le this venant du constructeur dans les fonctions enfant
        this._canvas.mousedown(function(e){
            var mouseX = e.pageX - this.offsetLeft;      
            var mouseY = e.pageY - this.offsetTop;
            
            that.paint = true; // bascule la valeur de paint
            cible.val("ok"); //pour authoriser la reservation de vélo
            cible.removeClass("hilight"); //si le champ etait hilighted   
            that.addClick(mouseX, mouseY, false); //pour retourner les positions de la souris dans le canvas.
            that.redraw();     //dessine les mouvements enregistrés en donnant le type de crayon/la couleur/l'épaisseur
        });
        
        this._canvas.mousemove(function(e){
            if(that.paint){ //si valeur a true la souris est considéré comme la pointe du stylo 
                that.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true); //calcule des coordonnées X et Y en retirant le décalage calculé par le offsetTop 
                that.redraw();
            }
        });

        this._canvas.mouseup(function(){ //relachement du click de la souris
            that.paint = false;         //on arrete de dessiner
        });

        this._canvas.mouseleave(function(){
            that.paint = false;
        });
        
        // Evénements Tactiles
        //on clic sur le tactile
        this._canvas.on("touchstart", function (e){ //on = addEventListener onclick en Jquery !
        // Mouse down location
            e.preventDefault(); //preventDefault pour stoper la propagation de l'event.
            var mouseX = e.originalEvent.changedTouches[0].pageX - $(this).offset().left; //méthode JQ qui detecte l'emplacement du doigt sur le canvas au start 
            var mouseY = e.originalEvent.changedTouches[0].pageY - $(this).offset().top;
            
            that.paint = true; //on laisse écrire
            cible.val("ok"); //pour authoriser la reservation de vélo
            cible.removeClass("hilight"); //si le champ etait hilighted   
            that.addClick(mouseX, mouseY, false); //appel de la méthode addClick qui enregistre les poistions
            that.redraw();
        });

        //on bouge sur le tactile
       this._canvas.on("touchmove", function (e) {            
            e.preventDefault();
            var mouseX = e.originalEvent.changedTouches[0].pageX - $(this).offset().left; //pour gérer le tracé tant que le click/touch est maintenu
            var mouseY = e.originalEvent.changedTouches[0].pageY - $(this).offset().top;
            
            if (that.paint) {
                that.paint = true;    
                that.addClick(mouseX, mouseY, true);
                that.redraw();
            }
        });
        //on lache le tactile
        this._canvas.on("touchend", function (e) { //relachement du click sur l'écran tactile
            e.preventDefault(); 
            that.paint = false;
            //alert('touch end');
        });
         
        effacer.click(function () {    
           that.clearAll();
        });
    }

    clearAll() {
        this.context.clearRect(0, 0, this._canvas.width(), this._canvas.height()); // utilisation du width Jquery pour définir la largeur ->ctx.clearRect(x, y, largeur, hauteur);
        clickX = new Array();
        clickY = new Array();
        clickDrag = new Array();
        this.paint = false;
        this._canvas.val("");
    }
    redraw(){  
        this.context.strokeStyle = "#222222"; //dessine le chemin actuel ou donné avec le style de trait
        this.context.lineJoin = "round"; //détermine la forme à utiliser pour joindre deux segments de ligne à leur intersection
        this.context.lineWidth = 2; 
        for(var i=0; i < clickX.length; i++) {		
            this.context.beginPath(); //La méthode CanvasRenderingContext2D.beginPath() de l'API Canvas 2D permet de commencer un nouveau chemin en vidant la liste des sous-chemins.
            if(clickDrag[i] && i){  
                this.context.moveTo(clickX[i-1], clickY[i-1]); //déplace le point de départ d'un nouveau sous-chemin vers les coordonnées (x, y).
            }else{ //The CanvasRenderingContext2D.moveTo() method of the Canvas 2D API begins a new sub-path at the point specified by the given (x, y) coordinates.
                this.context.moveTo(clickX[i]-1, clickY[i]); 
            }
            this.context.lineTo(clickX[i], clickY[i]); //connecte le dernier point du sous-chemin en cours aux coordonnées x, y spécifiée
            this.context.closePath(); // provoque le retour du stylo au point de départ du sous-traçé courant. 
            this.context.stroke(); // dessine le chemin actuel ou donné avec le style de trait actuel 
        }        
    }
    addClick(x, y, dragging) { //fonction qui déclenche l'enregistrement des positions 
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging); //dragging est un booleen qui recoit sa valeur au click/touch et au relachement
    }
    
    resizeCanvas(){
        let canvasDOM = $('#canvas');
        let largeurwidth = $("body").width();

        if (largeurwidth <= 900) {
            canvasDOM.removeAttr('width');
            canvasDOM.removeAttr('height');
            canvasDOM.attr({height:115, width:200});
        }else{
            canvasDOM.removeAttr('width');
            canvasDOM.removeAttr('height');
            canvasDOM.attr({height:165, width:300});
        }
    };
}

var ObjCanvas = new Canvas($('canvas'));

$(window).resize(function(){
    ObjCanvas.resizeCanvas();
});    


