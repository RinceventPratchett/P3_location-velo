/*              ---signature canvas ou autre a mettre.---
 * 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

let clickX = new Array();   //definit les array qui contiendront la position du click
let clickY = new Array();
let clickDrag = new Array();

let effacer = $('#erase');

class Canvas {
    constructor(cible) { //cible est un obj jquery
        this.paint = false; //pour récupérer le paint dans le 
        this._canvas = cible;
        this.context = cible[0].getContext('2d');  //index du canvas indispensable pour appliquer le context      
        var that = this; //pour pouvoir utiliser le this venant du constructeur dans les fonctions enfant
        this._canvas.mousedown(function(e){
            var mouseX = e.pageX - this.offsetLeft;      
            var mouseY = e.pageY - this.offsetTop;
            
            that.paint = true; // bascule la valeur de paint
            cible.val("ok"); //pour authoriser la reservation de vélo
            cible.removeClass("hilight"); //si le champ etait hilighted   
            that.addClick(mouseX, mouseY, false); //pour enregistrer la position de la souris dans le canvas lors du click maintenu 
            that.redraw();     //dessine les mouvements enregistrés
        });
        
        this._canvas.mousemove(function(e){
            if(that.paint){ //si valeur a true la souris est considéré comme la pointe du stylo 
                that.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true); //calacule des coordonnées X et Y en retirant le décalage calculé par le offsetTop
                that.redraw();
            }
        });

        this._canvas.mouseup(function(){
            that.paint = false;
        });

        this._canvas.mouseleave(function(){
            that.paint = false;
        });
        
        // Evénements Tactiles
        //on clic sur le tactile
        this._canvas.on("touchstart", function (e){ //on = addEventListener onclick en Jquery !
        // Mouse down location
            e.preventDefault(); //preventDefault pour stoper la propagation de l'event.
            //alert('touch start');
            var mouseX = e.originalEvent.changedTouches[0].pageX - $(this).offset().left;
            var mouseY = e.originalEvent.changedTouches[0].pageY - $(this).offset().top;
            
            that.paint = true;
            cible.val("ok"); //pour authoriser la reservation de vélo
            cible.removeClass("hilight"); //si le champ etait hilighted   
            that.addClick(mouseX, mouseY, false);
            that.redraw();
        });

        //on bouge sur le tactile
       this._canvas.on("touchmove", function (e) {            
            e.preventDefault();
            var mouseX = e.originalEvent.changedTouches[0].pageX - $(this).offset().left; 
            var mouseY = e.originalEvent.changedTouches[0].pageY - $(this).offset().top;
            
            if (that.paint) {
                that.paint = true;    
                that.addClick(mouseX, mouseY, true);
                that.redraw();
            }
        });
        //on lache le tactile
        this._canvas.on("touchend", function (e) {
            e.preventDefault();
            that.paint = false;
            //alert('touch end');
        });
         
        effacer.click(function () {    
           that.clearAll();
        });
    }
    get canvas() { //getter -> fonction spécifique qui permet de récupérer un objet js
        return this._canvas;
    }
    clearAll() {
        this.context.clearRect(0, 0, this._canvas.width(), this._canvas.height()); //.get(0) permet de récupérer l'élément Dom venant de l'objet JQuery - utilisation du width Jquery
        clickX = new Array();
        clickY = new Array();
        clickDrag = new Array();
        this.paint = false;
        this._canvas.val("");
    }
    redraw(){  
        
        this.context.strokeStyle = "#222222";
        this.context.lineJoin = "round";
        this.context.lineWidth = 2;
        for(var i=0; i < clickX.length; i++) {		
            this.context.beginPath();
            if(clickDrag[i] && i){
                this.context.moveTo(clickX[i-1], clickY[i-1]);
            }else{
                this.context.moveTo(clickX[i]-1, clickY[i]);
            }
            this.context.lineTo(clickX[i], clickY[i]);
            this.context.closePath();
            this.context.stroke();
        }        
    }
    addClick(x, y, dragging) { //fonction qui déclenche l'enregistrement des positions via le glissé-déposé.
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
    }

}

var ObjCanvas = new Canvas($('canvas'));




