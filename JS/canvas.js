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
  
    context.strokeStyle = "#222222";
    context.lineJoin = "round";
    context.lineWidth = 3;
			
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
// Set up touch events for mobile, etc
//canvas.addEventListener("touchstart", function (e) {
//        mousePos = getTouchPos(canvas, e);
//  var touch = e.touches[0];
//  var mouseEvent = new MouseEvent("mousedown", {
//    clientX: touch.clientX,
//    clientY: touch.clientY
//  });
//  canvas.dispatchEvent(mouseEvent);
//}, false);
//canvas.addEventListener("touchend", function (e) {
//  var mouseEvent = new MouseEvent("mouseup", {});
//  canvas.dispatchEvent(mouseEvent);
//}, false);
//canvas.addEventListener("touchmove", function (e) {
//  var touch = e.touches[0];
//  var mouseEvent = new MouseEvent("mousemove", {
//    clientX: touch.clientX,
//    clientY: touch.clientY
//  });
//  canvas.dispatchEvent(mouseEvent);
//}, false);
//
//// Get the position of a touch relative to the canvas
//function getTouchPos(canvasDom, touchEvent) {
//  var rect = canvasDom.getBoundingClientRect();
//  return {
//    x: touchEvent.touches[0].clientX - rect.left,
//    y: touchEvent.touches[0].clientY - rect.top
//  };
//}
//
//// Prevent scrolling when touching the canvas
//document.body.addEventListener("touchstart", function (e) {
//  if (e.target == canvas) {
//    e.preventDefault();
//  }
//}, false);
//document.body.addEventListener("touchend", function (e) {
//  if (e.target == canvas) {
//    e.preventDefault();
//  }
//}, false);
//document.body.addEventListener("touchmove", function (e) {
//  if (e.target == canvas) {
//    e.preventDefault();
//  }
//}, false);
//
(function() {
	// Set up mouse events for drawing
	var drawing = false;
	var mousePos = { x:0, y:0 };
	var lastPos = mousePos;
	canvas.addEventListener("mousedown", function (e) {
		drawing = true;
		lastPos = getMousePos(canvas, e);
	}, false);
	canvas.addEventListener("mouseup", function (e) {
		drawing = false;
	}, false);
	canvas.addEventListener("mousemove", function (e) {
		mousePos = getMousePos(canvas, e);
	}, false);

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
	canvas.addEventListener("touchend", function (e) {
		var mouseEvent = new MouseEvent("mouseup", {});
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

	// Prevent scrolling when touching the canvas
	document.body.addEventListener("touchstart", function (e) {
		if (e.target === canvas) {
			e.preventDefault();
		}
	}, false);
	document.body.addEventListener("touchend", function (e) {
		if (e.target === canvas) {
			e.preventDefault();
		}
	}, false);
	document.body.addEventListener("touchmove", function (e) {
		if (e.target === canvas) {
			e.preventDefault();
		}
	}, false);

	// Get the position of the mouse relative to the canvas
	function getMousePos(canvasDom, mouseEvent) {
		var rect = canvasDom.getBoundingClientRect();
		return {
			x: mouseEvent.clientX - rect.left,
			y: mouseEvent.clientY - rect.top
		};
	}

	// Get the position of a touch relative to the canvas
	function getTouchPos(canvasDom, touchEvent) {
		var rect = canvasDom.getBoundingClientRect();
		return {
			x: touchEvent.touches[0].clientX - rect.left,
			y: touchEvent.touches[0].clientY - rect.top
		};
	}

	// Draw to the canvas
	function renderCanvas() {
		if (drawing) {
			context.moveTo(lastPos.x, lastPos.y);
			context.lineTo(mousePos.x, mousePos.y);
			context.stroke();
			lastPos = mousePos;
		}
	}
})();