/* 
 *Required ajax.js + map.js
 * 
 *
 */
//creation de l'objet booking 
var booking = {
    start(){ //méthode pour démarer le booking
        console.log('booking qui demarre');
        booking.display();
    // Set the timer
        booking.timer();
    },

    stop(){
        console.log('fonction stop');
        clearInterval(booking.loop);
        booking.params.timer = false;
        console.log('pour vérifier que booking.params.timer est bien a false ' + booking.params.timer);
        $("#firstName").css({display: "block"});
        $("#lastName").css({display: "block"});
        $("#timer").html("20mn 00s");
        clearall();
    },
    
    timer(){
        if (!booking.params.timer) { //si le timer n'est pas initié
            console.log('pour vérifier que booking.params.timer a une valeur dans la méthode timer ' + booking.params.timer);
        booking.params.timer = new Date().getTime() + (100 * 60/* * 20*/);//1000 au lieu de 100 + 
        }
        console.log('timer : ' + booking.params.timer);
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
            $("#timer").html(minutes + "m " + seconds + "s ");
            // If the count down is over, write some text 
            if (finResa < 0) {
                booking.stop();
                $('canvas').css({display: "block"});
                $("#lastName").css({display: "block"});
                $("#firstName").css({display: "block"});
                console.log('fin resa');
            }
        }, 1000);
        sessionStorage.setItem('timer', booking.params.timer);  //stock les infos de session - raz lors de la fermeture de session.
        console.log('pour vérifier que booking.params.timer a une valeur dans la méthode timer en appel sessionSTorage' + booking.params.timer);
//        sessionStorage.setItem('idStation', booking.params.idStation);
    },
    
    display(){
        $("#timer").css({display: "block"});
    },
    
    params(){
        booking.params = {};
        if (sessionStorage.getItem('timer')) {
            booking.params.timer = sessionStorage.getItem('timer');
            console.log('pour vérifier que booking.params.timer a une valeur dans la méthode params' + booking.params.timer);
        }else {
            booking.params.timer = false; 
        }
    },
    
    init(){
        //code à éxécuter au chargement de la page
        if (sessionStorage.getItem('timer')) { //pour vérifier la présence du timer en cache sessionStorage
            booking.params.timer = sessionStorage.getItem('timer');     //affecte le timer existant
            console.log('pour vérifier que booking.params.timer a une valeur dans la méthode init' + booking.params.timer);
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
        console.log('pour vérifier que booking.params.timer a une valeur dans la fonction bouton résa ' + booking.params.timer);
    }   
});
        

// pour stocker les infos saisies lors de la session (pas de reset si fermeture du nav)
var stockNomPrenom = () => {
    var lastName = document.getElementById('lastName');
    var firstName = document.getElementById('firstName');
    if (localStorage.getItem('stockLastName')) {
        lastName.value = localStorage.getItem('stockLastName'); //pour restaurer le champ Nom
    }
    lastName.addEventListener("change", function () {
        localStorage.setItem('stockLastName', lastName.value); //pour enregistrer les modificarions faites dans le champs au moment de la saisie
    });
    if (localStorage.getItem('stockFirstName')) {
        firstName.value = localStorage.getItem('stockFirstName');
    }
    firstName.addEventListener("change", function () {
        localStorage.setItem('stockFirstName', firstName.value);
    });
};

$(document).ready(function(){
    let largeurwidth = $("body").width();
    if (largeurwidth <= 900) {
        $("#canvas").removeAttr('width');
        $("#canvas").removeAttr('height');
        $("#canvas").attr({height:230, width:170});
    }
});


stockNomPrenom();
booking.init();


