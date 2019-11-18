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
    $('#canvas').val("ok"); //pour authoriser la reservation de vélo
    $('#canvas').removeClass("hilight"); //si le champ etait hilgihted   
    addClick(mouseX, mouseY); //pour enregistrer la position de la souris dans le canvas lors du click maintenu 
    redraw(); 
    
});

$('#canvas').mousemove(function(e){
    if(paint){ //si valeur a true la souris est considéré comme la pointe du stylo 
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true); //
        redraw();
    }
});

$('#canvas').mouseup(function(){
    paint = false;
});

$('#canvas').mouseleave(function(){
    paint = false;
});

// Evénements Tactiles
//on clic sur le tactile
// Set up touch events for mobile, etc
canvas.addEventListener("touchstart", function (e) {
        mousePos = getTouchPos(canvas, e);
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);

function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}
// Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchend", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchmove", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);

function redraw(){ 
 
    context.strokeStyle = "#222222";
    context.lineJoin = "round";
    context.lineWidth = 2;
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

function clearall() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
};

var effacer = document.getElementById('erase');

effacer.addEventListener("click", function () {
    clickX = new Array();
    clickY = new Array();
    clickDrag = new Array();
    var paint = false;
    clearall();    
});