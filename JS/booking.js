/* 
 *Required ajax.js + map.js
 * 
 *
 */

var resume = $("#resume");
//creation de l'objet booking 
var booking = {
    start(){ //méthode pour démarer le booking
        booking.display();
    // Set the timer
        booking.timer();
        resume.empty();
        resume.html($('#firstName').val() + " " + $('#lastName').val() + " a 1 velo reservé station : " 
            + $("#id_station").val() + '  -  ' + '<span class="timer"></span>' + " restante");
    

    },

    stop(){
        clearInterval(booking.loop);
        booking.params.timer = false;
        $("#firstName").css({display: "block"});
        $("#lastName").css({display: "block"});
        $(".timer").html("20mn 00s");        
        ObjCanvas.clearAll(); //pour effacer le canvas à la fin de la résa
        //window.location.hash = '#resume';
    },
    
    timer(){
        if (!booking.params.timer) { //si le timer n'est pas initié
            booking.params.timer = new Date().getTime() + (1000 * 60 * 20);//1000 au lieu de 100  
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
                resume.empty();
                resume.html("en attente de réservation");
            }
        }, 1000);
        sessionStorage.setItem('timer', booking.params.timer);  //stock les infos de session - raz lors de la fermeture de session.
    },
    
    display(){
        $(".timer").css({display: "block"});
    },
    
    ResaButtonOnClick() {
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
    },
    
    identity() {
        // pour stocker les infos saisies lors de la session (pas de reset si fermeture du nav)
        var lastName = $('#lastName');
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
        booking.identity();
        if (sessionStorage.getItem('timer')) { //pour vérifier la présence du timer en cache sessionStorage
            booking.params.timer = sessionStorage.getItem('timer');     //affecte le timer existant
            booking.timer();
            booking.display(); //pour faire apparaitre le timer contenu/en cours            
        }
        $("#buttonResa").click(function () { 
            booking.ResaButtonOnClick();
        });
    }
};    

$(document).ready(function(){
    ObjCanvas.resizeCanvas();
    resume.empty();
    if (booking.params.timer === undefined || booking.params.timer === false) {
        resume.html("en attente de réservation");
    } else {
        resume.html($('#firstName').val() + " " + $('#lastName').val() + " a 1 velo reservé station : " 
            + $("#id_station").val() + '  -  ' + '<span class="timer"></span>' + " restante");
    }
});


booking.init();


