/* 
 *Required ajax.js + map.js
 * 
 *
 */
//creation de l'objet booking 
var booking = {
    start(){ //méthode pour démarer le booking
        booking.display();
    // Set the timer
        booking.timer();
        //$("#resume").html($('#firstName').val() + " " + $('#lastName').val() + " a 1 velo reserve pour " + booking.timer()); ligne de code qui plante la fonction, stop du code ....
        $("#resume").empty();
        $("#resume").html($('#firstName').val() + " " + $('#lastName').val() + " a 1 velo reservé station : " 
            + $("#id_station").val() + '  -  ' + '<span class="timer"></span>' + " restante");
    
        window.location.hash = '#resume';
        console.log($('.timer'));
    },

    stop(){
        clearInterval(booking.loop);
        booking.params.timer = false;
        $("#firstName").css({display: "block"});
        $("#lastName").css({display: "block"});
        $(".timer").html("20mn 00s");        
        ObjCanvas.clearAll(); //pour effacer le canvas à la fin de la résa
        window.location.hash = '#resume';
    },
    
    timer(){
        if (!booking.params.timer) { //si le timer n'est pas initié
            booking.params.timer = new Date().getTime() + (100 * 60 * 20);//1000 au lieu de 100  
        }
        // Update the count down every 1 second
        booking.loop = setInterval(function () {

            // Get today's date and time
            var newResa = new Date().getTime();
            // Find the distance between now and the count down date
            var finResa = booking.params.timer - newResa;
            // Time calculations for minutes and seconds
            var minutes = Math.floor((finResa % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((finResa % (1000 * 60)) / 1000);
            // Output the result in the element with id="timer"  .html = innerHTML
            $(".timer").each(function () {
                $(this).html(minutes + "m " + seconds + "s "); // .each ->function jquery <-------------------------
            });
            // If the count down is over, write some text 
            if (finResa < 0) {
                booking.stop();
                $('canvas').css({display: "block"});
                $("#lastName").css({display: "block"});
                $("#firstName").css({display: "block"});
                $("#resume").empty();
                $("#resume").html("en attente de réservation");
            }
        }, 1000);
        sessionStorage.setItem('timer', booking.params.timer);  //stock les infos de session - raz lors de la fermeture de session.
    },
    
    display(){
        $(".timer").css({display: "block"});
    },
    
    params(){
        booking.params = {};
        if (sessionStorage.getItem('timer')) {
            booking.params.timer = sessionStorage.getItem('timer');
        }else {
            booking.params.timer = false; 
        }
    },
    
    init(){
        //code à éxécuter au chargement de la page
        if (sessionStorage.getItem('timer')) { //pour vérifier la présence du timer en cache sessionStorage
            booking.params.timer = sessionStorage.getItem('timer');     //affecte le timer existant
            booking.timer();
            booking.display(); //pour faire apparaitre le timer contenu/en cours
            
        }
    }
};    

$("#buttonResa").click(function () {
    
    var lastName = $('#lastName');
    var firstName = $('#firstName');
    var canvas = $('#canvas');
    var hasError = false;
    
    function setState(myObject, value) {
        if (value) {
            myObject.addClass("hilight");
            hasError = true;
        } else {
            myObject.removeClass("hilight"); 
        }
    }  
    
    setState (lastName, lastName.val() === "");
    setState (firstName, firstName.val() === "");
    setState (canvas, canvas.val() === "");
    
    let shouldBook = false;
    
    if (hasError){
        alert('les champs nom,prénom et signature sont indispensables pour créer une réservation');
    } else if (booking.params.timer === undefined || booking.params.timer === false) {
          //booking non existant 
          shouldBook = true;
    } else {
        lastName.val(localStorage.getItem('stockLastName'));
        firstName.val(localStorage.getItem('stockFirstName'));        
        var r = confirm("réservation existante. Continuer la nouvelle reservation ?");
        if (r === true) { //pour reset le counter
            booking.stop();
            shouldBook = true;
        }
    } 
    if (shouldBook) {
        lastName.css({display: "none"});
        firstName.css({display: "none"});
        canvas.css({display: "none"});
        booking.start();
    }   
});

// pour stocker les infos saisies lors de la session (pas de reset si fermeture du nav)
var stockNomPrenom = () => {
    var lastName = $('#lastName');
//    var firstName = document.getElementById('firstName'); mise en place de Jquery
    var firstName = $('#firstName');
    if (localStorage.getItem('stockLastName')) {
        lastName.val(localStorage.getItem('stockLastName')); //pour restaurer le champ Nom
    }
    lastName.change(function () {
        localStorage.setItem('stockLastName', lastName.val()); //pour enregistrer les modificarions faites dans le champs au moment de la saisie
    });
    if (localStorage.getItem('stockFirstName')) {
        firstName.val(localStorage.getItem('stockFirstName'));
    } 
   firstName.change(function () {
        localStorage.setItem('stockFirstName', firstName.val());
    });
};
function resizeCanvas(){
    console.log('fonction resize');
    let largeurwidth = $("body").width();
    if (largeurwidth <= 900) {
        $("#canvas").removeAttr('width');
        $("#canvas").removeAttr('height');
        $("#canvas").attr({height:115, width:200});
    }else{
        $("#canvas").removeAttr('width');
        $("#canvas").removeAttr('height');
        $("#canvas").attr({height:165, width:300});
    }
};

$(window).resize(function(){
    resizeCanvas();
});    

$(document).ready(function(){
    alert('v1.1.7');
    resizeCanvas();
    $("#resume").empty();
    if (booking.params.timer === undefined || booking.params.timer === false) {
        $("#resume").html("en attente de réservation");
    } else {
        $("#resume").html($('#firstName').val() + " " + $('#lastName').val() + " a 1 velo reservé station : " 
            + $("#id_station").val() + '  -  ' + '<span class="timer"></span>' + " restante");
    }
});


stockNomPrenom();
booking.init();


