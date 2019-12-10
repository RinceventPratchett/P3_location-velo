/* 
 *Required ajax.js + map.js + canvas.js
 * 
 *
 */

//creation de l'objet booking 
var booking = {
    init(){
        this.resume = $("#resume");
        //code à éxécuter au chargement de la page
        booking.identity();
        if (sessionStorage.getItem('timer')) { //pour vérifier la présence du timer en cache sessionStorage
            booking.params.timer = sessionStorage.getItem('timer');     //affecte le timer existant
            booking.timer();
            $(".timer").css({display: "block"});//fait apparaitre le timer contenu/en cours            
        }
        $("#buttonResa").click(function () { 
            booking.ResaButtonOnClick();
        });
    },
    
    start(){ //méthode pour démarer le booking
        $(".timer").css({display: "block"});//fait apparaitre le timer
        booking.timer(); //verifie la presence du timer et/ou l'initie
        this.resume.empty(); //vide le champ html resume
        this.resume.html($('#firstName').val() + " " + $('#lastName').val() + " a 1 velo reservé station : "  //donne le résumé à la page html
            + $("#id_station").val() + '  -  ' + '<span class="timer"></span>' + " restante");
    },

    stop(){ //lorsque le timer se termine ou q'une nouvell résa est lancée
        clearInterval(booking.loop); 
        booking.params.timer = false; //pour supprimer la valeur du timer en cours.
        $("#firstName").css({display: "block"}); //on fait reapparaitre le champ Nom et prénom pour une nouvelle réservation.
        $("#lastName").css({display: "block"});
        $(".timer").html("20mn 00s");   //remise à zéro du timer de la page html
        $('canvas').css({display: "block"});
        this.resume.empty();
        this.resume.html("en attente de réservation");
        ObjCanvas.clearAll(); //pour effacer le canvas à la fin de la résa
    },
    
    params(){
        booking.params = {};
        if (sessionStorage.getItem('timer')) {
            booking.params.timer = sessionStorage.getItem('timer');
        }else {
            booking.params.timer = false; 
        }
    },
    
    timer(){
        if (!booking.params.timer) { //si le timer n'est pas initié
            booking.params.timer = new Date().getTime() + (1000 * 60 * 20);//1000ms x 60 (1mn) x20(20mn) 
        }
        // Update the count down -> l-63
        booking.loop = setInterval(function () {           
            var newResa = new Date().getTime(); // affecte le jour et l'heure
            var finResa = booking.params.timer - newResa;// calcul la difference entre le timer initié et le moment ouy il a commencé
            // Calcul des minutes et seconde
            var minutes = Math.floor((finResa % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((finResa % (1000 * 60)) / 1000);
            $(".timer").each(function () { //renvoie le decompte pour chaque seconde à la page html
                $(this).html(minutes + "m " + seconds + "s "); // .each ->function jquery <--------- .html = innerHTML
            });
            if (finResa < 0) { //a la fin du decompte
                booking.stop(); //update le tableau de resa dur la page html
            }
        }, 1000); // -> every 1 second
        sessionStorage.setItem('timer', booking.params.timer);  //stock les infos de session - raz lors de la fermeture de session.
    },
    
    ResaButtonOnClick() {
        var lastName = $('#lastName'); //on redeclarre pour récupérer les éléments dans la fonction enfant
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
        if (shouldBook) { //si reservation on masque les champs et demarre le booking
            lastName.css({display: "none"});
            firstName.css({display: "none"});
            canvas.css({display: "none"});
            $('#rent').css({display: "none"});
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
    }   
};    

booking.init();

$(document).ready(function(){
    ObjCanvas.resizeCanvas(); //appelle l'objet canvas créer dans canvas.js
    booking.resume.empty(); 
    if (booking.params.timer === undefined || booking.params.timer === false) {
        booking.resume.html("en attente de réservation");
    } else {
        booking.resume.html($('#firstName').val() + " " + $('#lastName').val() + " a 1 velo reservé station : " 
            + $("#id_station").val() + '  -  ' + '<span class="timer"></span>' + " restante");
    }
});