/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    
    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length} ;
    
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
        
    }
    
    x[slideIndex-1].style.display = "inline-block"; //pour reculer d'une slide
    
}

carousel();
        //var t = setTimeout(carousel, 3000);
var play = document.getElementById("play");
var slider = setTimeout(carousel, 5000);

function carousel() {
    
    var i;
    var x = document.getElementsByClassName("mySlides");
    var stop = document.getElementById("pause");

    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    
    slideIndex++;
    if (slideIndex > x.length) {
        slideIndex = 1;
    }
    
    x[slideIndex-1].style.display = "inline-block";
    var slider = setTimeout(carousel, 5000);
    console.log(slider + " le premier t");
    
    stop.addEventListener("click", function(){
       clearTimeout(slider);
    });
}
play.addEventListener("click", function (e){
        carousel();
        slideIndex = 1;        
});
/*---------------------------------NON Fonctionnel pour le moment--------------------------------*/
document.onkeydown = function(e) { 
        switch (e.keyCode) { 
            case 37: 
                str = 'Left Key pressed!';

                slideIndex-1;
                break; 
            case 39: 
                str = 'Right Key pressed!';

                break;  
        } 
};