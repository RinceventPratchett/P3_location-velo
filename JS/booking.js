/* 
 *Required ajax.js + map.js
 * 
 *
 */
//creation de l'objet booking 
var booking = {
    start(idStation){ //méthode pour démarer le booking correspondant à la station déterminé.
        console.log('booking qui demarre');
        booking.params.idStation = idStation;
        booking.display(idStation);
    // Set the timer
        booking.timer();
    },

    stop(){
        console.log('fonction stop');
        clearInterval(booking.loop);
        $("#timer").html("EXPIRED");
        booking.params.timer = false;
        console.log('pour vérifier que booking.params.timer est bien a false ' + booking.params.timer);
        booking.params.idStation = 0;
        $("#firstName").css({display: "block"});
        $("#lastName").css({display: "block"});
        $("#timer").html("20mn 00s");
    },
    
    timer(){
        if (!booking.params.timer) { //si le timer n'est pas initié
            console.log('pour vérifier que booking.params.timer a une valeur dans la méthode timer ' + booking.params.timer);
        booking.params.timer = new Date().getTime() + (1000 * 60 * 20);
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
                console.log('fin resa');
            }
        }, 1000);
        sessionStorage.setItem('timer', booking.params.timer);  //stock les infos de session - raz lors de la fermeture de session.
        console.log('pour vérifier que booking.params.timer a une valeur dans la méthode timer en appel sessionSTorage' + booking.params.timer);
        sessionStorage.setItem('idStation', booking.params.idStation);
    },
    
    display(idStation){
        if (idStation === booking.params.idStation) {
        //hide form
            $("#firstName").css({display: "none"});
            $("#lastName").css({display: "none"});
        }
        $("#timer").css({display: "block"});
    },
    
    params(){
        booking.params = {};
        if (sessionStorage.getItem('timer')) {
            booking.params.timer = sessionStorage.getItem('timer');
            booking.params.idStation = sessionStorage.getItem('idStation');
            console.log('pour vérifier que booking.params.timer a une valeur dans la méthode params' + booking.params.timer);
        }else {
            booking.params.timer = false; 
            booking.params.idStation = 0;
        }
    },
    
    init(){
        //code à éxécuter au chargement de la page
        if (sessionStorage.getItem('timer')) { //pour vérifier la présence du timer en cache sessionStorage
            booking.params.timer = sessionStorage.getItem('timer');     //affecte le timer existant
            console.log('pour vérifier que booking.params.timer a une valeur dans la méthode init' + booking.params.timer);
            booking.params.idStation = sessionStorage.getItem('idStation'); //affect l'id station existant
            booking.timer();
            booking.display(booking.params.idStation); //pour faire apparaitre le timer contenu/en cours
        }
    }
};    



/*class Sign
{
    constructor() {
        this.canvas = $("#canvas");
        this.context = this.canvas.getContext('2d');
        this.context.strokeStyle = "rgb(23, 145, 167)";
        this.context.lineCap = 'round';
        this.context.lineCap = 'round';
        this.cursorX, this.cursorY;
        this.painting = false;
        this.started = false;
        this.mousemove();
        this.mousedown();
        this.mouseup();
    }
};*/

$("#buttonResa").click(function () {
    var idStation = $("#id_station").val();
    console.log('clik boutton résa' + $('#lastName').val());
    if ($('#lastName').val() === "" || $('#firstName').val() === "" || $('canvas').val() === "") { //gère le fait q'un champ soit vide
        $("#buttonResa").disabled = true;
        if (/*$('#lastName').val() === "" && $('#firstName').val() === "" &&*/ $('canvas').val() === "") {
            $('#lastName').addClass("hilight");     
            $('#firstName').addClass("hilight");
            $('canvas').addClass("hilight");
        } else if (($('#firstName').val() === "") && ($('#lastName').val() !== "")) {            
            $('#firstName').addClass("hilight");
            $('#lastName').removeClass("hilight");
        } else if (($('#lastName').val() === "") && ($('#firstName').val() !== "")) {
            $('#lastName').addClass("hilight");
            $('#firstName').removeClass("hilight");
        } else if ($('canvas').val() === "") {
            $('canvas').addClass("hilight");
        }
//        else if ($('#lastName').val() !== "" || $('#firstName').val() !== ""/* || $('canvas').val() === ""*/) { //gère le fait q'un champ soit remplit{
//            $('#firstName').removeClass("hilight");
//            $('#lastName').removeClass("hilight");
//            $('canvas').removeClass("hilight");
//        } //alert('les champs nom,prénom et signature sont indispensables pour créer une réservation');
    }else if (booking.params.timer === undefined || booking.params.timer === false) {
          //booking non existant 
        booking.start(idStation);
        console.log('pour vérifier que booking.params.timer a une valeur dans la fonction bouton résa ' + booking.params.timer);
    }else{
        $('#lastName').val(localStorage.getItem('stockLastName'));
        $('#firstName').val(localStorage.getItem('stockFirstName'));
        console.log('pour vérifier que booking.params.timer a une valeur dans la fonction bouton résa ' + booking.params.timer);
        var r = confirm("réservation existante. Continuer la nouvelle reservation ?");
            if (r === true) { //pour reset le counter
            booking.stop();
            booking.start(idStation);
            }
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
        $("#canvas").removeAttr('heigth');
        $("#canvas").attr({heigth:230, width:170});
    }
});


stockNomPrenom();
booking.init();


