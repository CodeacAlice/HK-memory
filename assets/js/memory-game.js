

// --------------------------------------------------------------------------------------------------------------------------------------
// Ajouter une div avec les scores pour chaque joueur
// --------------------------------------------------------------------------------------------------------------------------------------

function create_div_players () {
    var newPlayer;
    $('#allplayers_0, #allplayers_1').html('');

    for (var i = 0; i < nb_joueurs; i++) {
        newPlayer = $('<div>');
        newPlayer.addClass('player');
        newPlayer.attr('data-id', i);
    
        var div = $('<div>');
        div.html("Player "+(i+1)+"<br>Score : ");
        var span = $('<span>');
        span.attr('id', 'score_'+i); span.text('0');
        div.append(span); newPlayer.append(div);
    
        var ava = $('<div>');
        ava.addClass("player_avatar").css('background-image', 'url("assets/img/avatars/minia-'+players_scores[i].avatar+'.png")');
        newPlayer.append(ava);
    
        $('#allplayers_'+(i%2)).append(newPlayer);
    };
}




// --------------------------------------------------------------------------------------------------------------------------------------
// Randomiser et placer les cartes
// --------------------------------------------------------------------------------------------------------------------------------------

function randomize_cards() {
    var compteur = 50;
    $('#card-deck').html('');

    // Randomiser les cartes à prendre
    var n_cartes = []; for (var i = 1; i <= nb_max_pairs; i++) { n_cartes.push(i); }

    var random_ids = [];

    // Randomiser les ids
    while (random_ids.length < nb_paires*2 && compteur > 0) {
        var n = Math.floor(Math.random() * n_cartes.length);
        var id = n_cartes[n];
        random_ids.push(id+'_1', id+'_2') ;
        n_cartes.splice(n, 1)

        compteur --;
    };
    
    // Créer les cartes
    for (var i = 0; i < nb_paires*2; i++) {
        var m = Math.floor(Math.random() * random_ids.length), newid = random_ids[m];
        var nbcard = parseInt(newid), newcard = $('<div>');

        var whitecard = $('<div>');
        whitecard.addClass('card-container');
        whitecard.append(newcard);

        newcard.addClass("card grid-item fond");
        newcard.attr('id', newid);
        newcard.css("background-image", "url('assets/img/cards/"+nbcard+".png')");
        newcard.click(turn_card);
        $('#card-deck').append(whitecard);

        random_ids.splice(m, 1);
    };
}




// --------------------------------------------------------------------------------------------------------------------------------------
// Retourner les cartes, augmenter le score 
// --------------------------------------------------------------------------------------------------------------------------------------

function turn_card() {
    $('#sound-clic')[0].currentTime = 0;
    if (carte_1 == '') {
        $('#sound-clic')[0].play()
        $(this).removeClass('fond');
        carte_1 = this;
    }

    else if (carte_1 !== this && carte_2 == '') {
        $('button').attr('disabled', true)
        $('#sound-clic')[0].play()
        $(this).removeClass('fond');
        carte_2 = this;

        setTimeout(deux_cartes_retournees, 1000);
    }
}



function deux_cartes_retournees() {
    if (parseInt(carte_1.id) == parseInt(carte_2.id)) {
        anim_correctpair(parseInt(carte_1.id));
    }
    else {
        anim_notcorrect(carte_1.id, carte_2.id);
    }
}

function next_correct(id_pair) {
    players_scores[turn].score ++;
    $('#score_'+turn).html(players_scores[turn].score);

    players_scores[turn].pairs.push(id_pair);

    if ($('.fond').length == 0) {
        setTimeout(the_game_is_over, 500);
    } else {
        $('button').attr('disabled', false);
    }

    carte_1 = ''; carte_2 = '';
}

function next_incorrect() {
    $(".player[data-id="+turn+"]").attr('id', '');
    turn = (turn +1) % nb_joueurs;
    $(".player[data-id="+turn+"]").attr('id', 'player_turn');

    carte_1 = ''; carte_2 = '';
    $('button').attr('disabled', false);
}




// --------------------------------------------------------------------------------------------------------------------------------------
// Animations paires correctes et incorrectes
// --------------------------------------------------------------------------------------------------------------------------------------

function anim_correctpair (n_image) {
    $('#sound-good')[0].currentTime = 0;
    $('#sound-good')[0].play();

    $('.card-container').css('background-color', 'white');
    $('#'+n_image+'_1, #'+n_image+'_2').animate({opacity: '0'}, 'fast', function(){$(this).css('box-shadow', 'none')})
        .animate({opacity: '1'}, 'fast')
        .off();

    setTimeout(function (){next_correct(n_image)}, 400);
}

function anim_notcorrect (id1, id2) {
    $('#sound-bad')[0].currentTime = 0;
    $('#sound-bad')[0].play();

    $('#'+id1+', #'+id2).addClass('fond');
    next_incorrect();
}





// --------------------------------------------------------------------------------------------------------------------------------------
// Quand le jeu est fini
// --------------------------------------------------------------------------------------------------------------------------------------

function the_game_is_over() {
    $('#firstwinners, #otherwinners').html('');
    $('.player').attr('id', '');

    var allscores = players_scores.map(pl => {return {id: pl.id, score: pl.score}}), victory = false;

    var i = 1;
    // Pour chaque "rang" (vainqueur, 2e, 3e...)
    while ($('.avatar-win').length < nb_joueurs && i <= nb_joueurs) {

        // Récupérer le ou les gagnants
        var bestscore = 0, bestplayers = [];
        // Pour chaque joueur, voir s'iel est gagnant
        allscores.forEach(player => {
            if (player.score > bestscore) {
                bestscore = player.score;
                bestplayers = [player.id]
            }
            else if (player.score == bestscore) {
                bestplayers.push(player.id)
            }
        })

        // Si on utilise le premier ou second container + rang
        var container, place = '';
        if (i == 1) {
            container = $('#firstwinners'); 
            place = 'win';

            if (bestplayers.length == 1) {
                place += 's';

                // Son de fin s'il n'y a qu'un vainqueur
                var ava = players_scores[bestplayers[0]].avatar;
                if (ava != 0) {
                    victory = true;
                    $('#sound-winner').attr('src', 'assets/songs/end/'+ava+'.wav')
                }
            }

            bestplayers.forEach(pl => {$('.player[data-id='+pl+']').addClass('player_wins')})
        }
        else { 
            container = $('#otherwinners'); 

            if (i == 2) {place = '2nd';}
            else if (i == 3) {place = '3rd';}
            else {place = i+'th';}
            if (bestplayers.length == 1) {place = 'is ' + place}
            else {place = 'are ' + place}
        }

        // Div utilisées
        var winners = $('<div>'), avatarscontainer = $('<div>'), namewinners = $('<div>'), text = '';
        winners.addClass('winners'); avatarscontainer.addClass('avatars-container');

        winners.append(avatarscontainer);

        // Texte de félicitations
        text = 'Player';
        if (bestplayers.length == 1) {text += ' ' + (bestplayers[0]+1)}
        else {text += ' ' + bestplayers.map(x => x+1).join(', ')}
        text += ' ' + place + ' with ' + bestscore + ' pair';
        if (bestscore >= 2) {text += 's';}

        namewinners.text(text).addClass('name-winners');
        winners.append(namewinners);

        // Pour chaque joueur
        bestplayers.forEach(pl_id => {
            // Avatars
            var img = $('<img>');
            img.attr('src', "assets/img/avatars/"+players_scores[pl_id].avatar+".png").addClass('avatar-win')
            avatarscontainer.append(img);

            // Paires trouvées s'il y en a
            if (bestscore > 0) {
                var showpairs = $('<div>');
                showpairs.addClass('showpairs');
                players_scores[pl_id].pairs.forEach(pair => {
                    var pairimg = $('<img>');
                    pairimg.attr('src', 'assets/img/cards/'+pair+'.png');
                    showpairs.append(pairimg);
                })
                winners.append(showpairs);
            }
        })

        container.append(winners);

        allscores = allscores.filter(pl => pl.score !== bestscore);
        i++
    }


    $('.card').animate({'opacity': 0}, function(){$(this).css('box-shadow', '0px 0px 10px 10px white')})
        .animate({'opacity': 1});
    setTimeout(function() {showresults(victory)}, 1000);
}


// Fonction qui ouvre la modal et gère l'audio de fin
function showresults(victory) {
    $('button').attr('disabled', false);
    openModal('end');
    $('#open_results').fadeIn();

    audio.pause();
    audio.currentTime = 0;
    $('.fa-pause').addClass('d-none');
    $('.fa-play').removeClass('d-none');

    $('#sound-end')[0].currentTime = 0;
    $('#sound-end')[0].play();

    if (victory) {
        $('#sound-winner')[0].currentTime = 0;
        $('#sound-winner')[0].play();
    }
}



// --------------------------------------------------------------------------------------------------------------------------------------
// Recommencer le jeu
// --------------------------------------------------------------------------------------------------------------------------------------

$('.restart').click(function(){
    restartGame();
});

function restartGame() {
    $('#sound-end')[0].pause(); $('#sound-winner')[0].pause();
    $('#sound-change')[0].currentTime = 0;
    $('#sound-change')[0].play();

    $('#overlay').fadeIn(400, function(){
        $('#open_results').css('display', 'none');
        randomize_cards();
        for (var i = 0; i < nb_joueurs; i++) {
            $('#score_'+i).html('0');
            var player = players_scores[i];
            player.score = 0; 
            player.pairs = [];
        }
        $('.modalcontainer[data-id=end]').css('display', 'none')
        turn = 0; carte_1 = ''; carte_2 = '';
        $(".player").attr('id', '').removeClass('player_wins');
        $(".player").first().attr('id', 'player_turn');
    }).fadeOut(400);
    
}


// --------------------------------------------------------------------------------------------------------------------------------------
// Retourner à l'écran titre
// --------------------------------------------------------------------------------------------------------------------------------------

$('.backtitle').click(function(){
    change_screen(true);
})

