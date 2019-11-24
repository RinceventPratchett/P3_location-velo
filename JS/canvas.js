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

var test = '';

class Canvas {
    constructor(cible) { //cible est un obj jquery
        this.paint = false; //pour récupérer le paint dans le 
        this._canvas = cible;
        this.context = cible[0].getContext('2d');  //index du canvas indispensable pour appliquer le context      
        var that = this; //pour pouvoir utiliser le this venant du constructeur dans les fonctions enfant
        /*this._canvas.mousedown(function(e){
            var mouseX = e.pageX - this.offsetLeft;      
            var mouseY = e.pageY - this.offsetTop;
            
            that.paint = true; // bascule la valeur de paint
            cible.val("ok"); //pour authoriser la reservation de vélo
            cible.removeClass("hilight"); //si le champ etait hilgihted   
            that.addClick(mouseX, mouseY); //pour enregistrer la position de la souris dans le canvas lors du click maintenu 
            that.redraw();     
        });
        
        this._canvas.mousemove(function(e){
            if(that.paint){ //si valeur a true la souris est considéré comme la pointe du stylo 
                that.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true); //
                that.redraw();
            }
        });

        this._canvas.mouseup(function(){
            that.paint = false;
        });

        this._canvas.mouseleave(function(){
            that.paint = false;
        });*/
        $('canvas').on("touchstart", function (e){ //bind = addEventListener en Jquery !
            e.preventDefault(); 
             alert('start ' + e.changedTouches[0].pageX + ' - ' + this.offsetLeft);
        });
        // Evénements Tactiles
        //on clic sur le tactile
        /*$('canvas').on("touchstart", function (e){ //bind = addEventListener en Jquery !
        // Mouse down location
            e.preventDefault(); //preventDefault pour stoper la propagation de l'event.
            //alert('touch start');
            alert('start');
            var mouseX = e.changedTouches[0].pageX - this.offsetLeft;
            var mouseY = e.changedTouches[0].pageY - this.offsetTop;
            alert('mouse ' + e.originalEvent.changedTouches[0].pageX + ' - ' + e.changedTouches[0].pageX + ' - ' + mouseX + ' - ' + this.offsetLeft + ' - ');

            that.paint = true;
            cible.val("ok"); //pour authoriser la reservation de vélo
            cible.removeClass("hilight"); //si le champ etait hilighted   
            that.addClick(mouseX, mouseY);
            that.redraw();
        }, false);*/

        //on bouge sur le tactile
       /*$('canvas').on("touchmove", function (e) {            
            e.preventDefault();
            var mouseX = e.changedTouches[0].pageX - $(this).offset().left; // condition ? express si vrai : express si faux
            var mouseY = e.changedTouches[0].pageY - $(this).offset().top;
            
            alert('move - ' + test);
            //alert('move' + mouseX);
            if (e.paint) {
                that.paint = true;    
                that.addClick(mouseX, mouseY, true);
                that.redraw();
            }
        });
        //on lache le tactile
        $('canvas').on("touchend", function (e) {
            alert('end - ' + test);
            e.preventDefault();
            that.paint = false;
            //alert('touch end');
        }, false);
         
        effacer.click(function () {    
           that.clearAll();
        });*/
    }
    get canvas() { //getter -> fonction spécifique qui permet de récupérer un objet js
        console.log(this._canvas + "dans le get canvas");
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
        test += 't :' + x + y + ' - ';
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
    }

}

var ObjCanvas = new Canvas($('canvas'));




