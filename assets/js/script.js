
// --------------------------------------------------------------------------------------------------------------------------------------
// Initialisation des constantes et variables générales
// --------------------------------------------------------------------------------------------------------------------------------------

const nb_avatars = 9, nb_max_joueurs = 10, nb_min_pairs = 3, nb_max_pairs = 30;

let nb_paires, nb_joueurs;
let turn = 0, players_scores = []
let carte_1 = '', carte_2 = '';


$('#nb_max_joueurs').text(nb_max_joueurs);
$('#nb_max_pairs').text(nb_max_pairs);


// --------------------------------------------------------------------------------------------------------------------------------------
// Ouvrir et fermer une modal
// --------------------------------------------------------------------------------------------------------------------------------------

function openModal (name) {
    $('.modalcontainer[data-id='+name+']').fadeIn('slow');
    $('.modalcontainer[data-id='+name+'] .modalcontent').scrollTop(0);
}
$('.openModal').click(function() { openModal( $(this).attr('data-target') ); } );



function closeModal (name) {
    $('.modalcontainer[data-id='+name+']').fadeOut('slow');
}
$('.closeModal').click(function() { closeModal($(this).attr('data-target')); } );



$('.modalcontainer').click(function() { $(this).fadeOut('slow'); })
$( ".modal" ).click(function( event ) { event.stopPropagation(); });



// --------------------------------------------------------------------------------------------------------------------------------------
// Gestion de l'audio
// --------------------------------------------------------------------------------------------------------------------------------------

let audio = $('#sound-audio')[0];

$('#music').click( function() {
    $('#music svg').toggleClass('d-none');
    if (audio.paused) {audio.play();}
    else {audio.pause();}
})
$('#mute').click( function() {
    $('#mute svg').toggleClass('d-none');
    for (var i = 0; i < $('audio').length; i++) {
        $('audio')[i].muted = !($('audio')[i].muted);
    }
})




// --------------------------------------------------------------------------------------------------------------------------------------
// Changer d'écran
// --------------------------------------------------------------------------------------------------------------------------------------

function change_screen (backtotitle = false) {
    var overlay = $('#overlay');

    if (!backtotitle) { $('#sound-change')[0].play(); }

    overlay.fadeIn( function() {
        audio.pause();
        $('.modalcontainer').css('display', 'none');
        
        // Si on retourne vers l'écran titre
        if (backtotitle) {
            // DOM + background
            $('#container').css('display', 'none');
            $('#titlescreen').css('display', 'block');
            $('body').css('background-image', "url('assets/img/background-1.jpg')");

            // Audio
            $('#sound-end')[0].pause(); $('#sound-winner')[0].pause();
            audio.src = "./assets/songs/title.wav";
            if ($('#music [data-icon="play"]').hasClass('d-none')) {
                audio.play();
            }
        }
        // Sinon, si on commence le jeu
        else {
            // DOM + background + audio
            $('#container').css('display', 'grid');
            $('#titlescreen').css('display', 'none'); $('#open_results').css('display', 'none');
            $('body').css('background-image', "url('assets/img/background-2.jpg')");
            audio.src = "./assets/songs/ambiance.wav";

            // Créer les joueurs
            var joueurs = $('.title-avatarimg');
            players_scores = []; nb_joueurs = joueurs.length;
            for (var i = 0; i < nb_joueurs; i++) {
                players_scores.push({id: i, score: 0, avatar: $(joueurs[i]).attr('data-id'), pairs: []});
            }

            create_div_players();
            $(".player").first().attr('id', 'player_turn');
            turn = 0;

            // Randomiser les cartes
            nb_paires = parseInt($('#input_nbpairs').val());
            randomize_cards();
        }
    }).fadeOut(function() {
        if (!backtotitle && $('#music [data-icon="play"]').hasClass('d-none')) {
            audio.play();
        }
    });
}