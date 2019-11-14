/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var canvas  = $('canvas')[0]; //il faut spécifier le canvas rechercher pour qu'il reçoive les propriétés.
var context = canvas.getContext('2d');

$('#canvas').mousedown(function(e){
    var mouseX = e.pageX - this.offsetLeft;      
    var mouseY = e.pageY - this.offsetTop;
		
    paint = true; // bascule la valeur de paint
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop); //pour enregistrer la position de la souris dans le canvas lors du click maintenu 
    redraw(); // maj du canvas avc fonction redraw() 
});

$('#canvas').mousemove(function(e){
    if(paint){ //si valeur a true la souris est considéré comme la pointe du stylo 
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true); //
        redraw();
    }
});

$('#canvas').mouseup(function(e){
    paint = false;
});

$('#canvas').mouseleave(function(e){
    paint = false;
    e.preventDefault();
    e.stopPropagation();
});


var clickX = new Array();   //definit les array qui contiendront la position du click
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging) //fonction qui déclenche l'enregistrement des positions
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
};

function redraw(){ 
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  
  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;
			
  for(var i=0; i < clickX.length; i++) {		
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.stroke();
  }
};
