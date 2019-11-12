/*---------- Require ajax.js + maps.js preventively (url+ajax request)-------------------
 */

//Instancie la class icons qui servira pour chaque icone de couleur
//const icons = L.Icon.extend({
//    options: {
//        iconSize: [38, 95],
//        iconAnchor: [22, 94],
//        popupAnchor: [-3, -76]
//    }
//});
////pour instancier le marker vert/rouge/orange 
//const greenIcon = new icons({iconUrl: '../images/leaf-green.png'});
//const redIcon = new icons({iconUrl: '../images/leaf-red.png'});
//const orangeIcon = new icons({iconUrl: '../images/leaf-orange.png'});
//



//booking.start = (idStation) => {
//    console.log('booking qui demarre');
//    booking.params.idStation = idStation;
//    booking.display(idStation);
//
//    // Set the timer
//    booking.timer();
//};

//booking.stop = () => {
//    console.log('fonction stop');
//    clearInterval(booking.loop);
//    $("#timer").html("EXPIRED");
//    booking.params.timer = false;
//    booking.params.idStation = 0;
//};
//
//booking.timer = () => {
//    if (!booking.params.timer) { //si le timer n'est pas initié
//        booking.params.timer = new Date().getTime() + (1000 * 60 * 20);
//    }
//    console.log('timer : ' + booking.params.timer);
//
//    // Update the count down every 1 second
//    booking.loop = setInterval(function () {
//        ;
//        ;
//        // Get today's date and time
//        var newResa = new Date().getTime();
//        // Find the distance between now and the count down date
//        var finResa = booking.params.timer - newResa;
//
//        // Time calculations for minutes and seconds
//
//        var minutes = Math.floor((finResa % (1000 * 60 * 60)) / (1000 * 60));
//        var seconds = Math.floor((finResa % (1000 * 60)) / 1000);
//
//        // Output the result in the element with id="timer"  .html = innerHTML
//        $("#timer").html(minutes + "m " + seconds + "s ");
//
//        // If the count down is over, write some text 
//        if (finResa < 0) {
//
//            booking.stop();
//            console.log('fin resa');
//        }
//    }, 1000);
//    sessionStorage.setItem('timer', booking.params.timer);
//    sessionStorage.setItem('idStation', booking.params.idStation);
//};

//booking.display = (idStation) => {
//    if (idStation === booking.params.idStation) {
//        //hide form
//        $("#firstName").css({display: "none"});
//        $("#lastName").css({display: "none"});
//    }
//    $("#timer").css({display: "block"});
//};
//
//if (sessionStorage.getItem('booking')) {
//    booking.params.timer = sessionStorage.getItem('timer');
//    booking.params.idStation = sessionStorage.getItem('idStation');
//    booking.timer();
//    console.log('resa existante avec timer et idStation');
//}
//;



/*
 * successAjax Executé au succès de la requete ajax du wenservice JCdecault
 * 
 * @param {object} detailsStation Objet retourné par l'API JCdecault
 * @returns true
 */
