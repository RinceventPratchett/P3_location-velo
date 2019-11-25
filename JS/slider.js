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
    x[slideIndex-1].style.display = "block";
    
}

carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    var stop = document.getElementById("stop1") && document.getElementById("stop2") && document.getElementById("pause");
    var play = document.getElementById("play");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) {
        slideIndex = 1;
    }
    x[slideIndex-1].style.display = "block";
    var t = setTimeout(carousel, 3000);
    t;// Change image every 3 seconds
    stop.addEventListener("click", function(){
       clearTimeout(t);
    });
    play.addEventListener("click", function (){
        setTimeout(carousel, 3000);;
    });
}
