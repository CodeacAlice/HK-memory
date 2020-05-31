
const   titleAvaContainer1 = $('.title-allavatarcontainer').first(), 
        titleAvaContainer2 = $('.title-allavatarcontainer').last();

let changingAva;


// --------------------------------------------------------------------------------------------------------------------------------------
// Remplir l'input
// --------------------------------------------------------------------------------------------------------------------------------------

$('#input_nbpairs').attr('min', nb_min_pairs).attr('max', nb_max_pairs).attr('value', nb_max_pairs);


// --------------------------------------------------------------------------------------------------------------------------------------
// Ajouter des joueurs
// --------------------------------------------------------------------------------------------------------------------------------------

$('#btn-addava').click(function () {
    var n = $('.title-avatar').length;

    if ( n < nb_max_joueurs ) {

        var container, n_ava = n % nb_avatars;
        $('#sound-addplayer')[0].currentTime = 0;
        $('#sound-addplayer')[0].play();

        if ( n < nb_max_joueurs/2 ) {
            container = titleAvaContainer1; 
            $('.title-avatarclose').removeClass('d-none');
        }
        else { container = titleAvaContainer2; }

        var avatar = $('<div>'), img = $('<div>'), close = $('<div>');
        avatar.addClass('title-avatar').css('display', 'none');
        img.addClass('title-avatarimg').css('background-image', "url('assets/img/avatars/minia-"+n_ava+".png')")
            .attr('data-id', n_ava).click(changeAva);
        close.addClass('title-avatarclose').html('&#10005;').click( deletePlayer );

        avatar.append(img).append(close);
        container.append(avatar);

        avatar.fadeIn();
    }
})



// --------------------------------------------------------------------------------------------------------------------------------------
// Supprimer des joueurs
// --------------------------------------------------------------------------------------------------------------------------------------

$('.title-avatarclose').click( deletePlayer );

function deletePlayer () {
    var ava = $(this).parent();
    $('#sound-supprplayer')[0].currentTime = 0;
    $('#sound-supprplayer')[0].play();

    ava.fadeOut(function() {
        ava.remove();
        if ( $('.title-avatar').length == 1 ) {
            $('.title-avatarclose').addClass('d-none');
        }
        else if ($('.title-avatar').length >= 5 && titleAvaContainer1.children().length < 5) {
            titleAvaContainer2.children().first().appendTo(titleAvaContainer1);
        }
    })
    
}



// --------------------------------------------------------------------------------------------------------------------------------------
// Carousel
// --------------------------------------------------------------------------------------------------------------------------------------

// Création
for (var i = 0; i < nb_avatars; i++) {
    var div = $('<div>'), img = $('<img>');
    img.attr('src', 'assets/img/avatars/'+i+'.png').width(100);
    div.addClass('carouselslide').append(img);
    $('#avatarcarousel').append(div);
}

$('#avatarcarousel').slick({
    slidesToShow: 3,
    centerMode: true,
    focusOnSelect: true,

    prevArrow: "<button type='button' class='carouselarrows carouselarrows-left'></button>",
    nextArrow: "<button type='button' class='carouselarrows carouselarrows-right'></button>"
});


// Ouvrir
$('.title-avatarimg').click(changeAva);

function changeAva () {
    var frame = $(this).attr('data-id');
    openModal('ava'); 
    $('#avatarcarousel').slick('setPosition'); 
    $('#avatarcarousel').slick('slickGoTo', frame, true);
    changingAva = this;
}





// --------------------------------------------------------------------------------------------------------------------------------------
// Sauvegarde avatar
// --------------------------------------------------------------------------------------------------------------------------------------

$('#saveAva').click(function () {
    $('#sound-save')[0].currentTime = 0
    $('#sound-save')[0].play();
    var id = $('#avatarcarousel').slick('slickCurrentSlide');
    $(changingAva).css('background-image', "url('assets/img/avatars/minia-"+id+".png')").attr('data-id', id)
    closeModal('ava');
    changingAva = 0;
})




// --------------------------------------------------------------------------------------------------------------------------------------
// START
// --------------------------------------------------------------------------------------------------------------------------------------

$('#startgame').click(function() {
    // Vérifications avant de lancer le jeu
    // S'il n'y a pas de joueur
    if ($('.title-avatarimg').length == 0) {
        alert("No player detected. If this is a bug, please report it. If it's not, stop messing with my code.")
    }
    // S'il y a trop de joueurs
    else if ($('.title-avatarimg').length > nb_max_joueurs) {
        alert("Too many players. How did you even find that many people to play a memory game?")
    }
    // Nombre de paires
    else if (!($('#input_nbpairs').val() >= nb_min_pairs && $('#input_nbpairs').val() <= nb_max_pairs)) {
        alert("Incorrect number of pairs.")
    }
    else { closeModal('ava'); change_screen(); }
})

