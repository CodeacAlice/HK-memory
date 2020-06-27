<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hollow Knight Memory</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="assets/css/stylesheet.css" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="assets/lib/slick-1.8.1/slick/slick.css"/>
    <!-- Add the slick-theme.css if you want default styling -->
    <link rel="stylesheet" type="text/css" href="assets/lib/slick-1.8.1/slick/slick-theme.css"/>
</head>
<body>
    <audio id="sound-audio" src="assets/songs/title.wav" loop="loop"></audio>
    <audio id="sound-clic" src="assets/songs/clic.wav"></audio>
    <audio id="sound-good" src="assets/songs/correct.wav"></audio>
    <audio id="sound-bad" src="assets/songs/wrong.wav"></audio>
    <audio id="sound-end" src="assets/songs/end.wav"></audio>
    <audio id="sound-winner" src="assets/songs/end/1.wav"></audio>
    <audio id="sound-change" src="assets/songs/startgame.wav"></audio>
    <audio id="sound-save" src="assets/songs/save.wav"></audio>
    <audio id="sound-addplayer" src="assets/songs/add_player.wav"></audio>
    <audio id="sound-supprplayer" src="assets/songs/suppr_player.wav"></audio>


    <img id="title" src="assets/img/logo_memory_hk.png" alt="Hollow Knight Memory" />


    <div id="titlescreen">
        <p>Select the Players <span style="font-size:0.7em">(max: <span id="nb_max_joueurs">10</span>)</span></p>
        <div>(Click to change the picture)</div>

        <div class="title-allavatarcontainer">
            <div class="title-avatar">
                <div class="title-avatarimg" style="background-image:url('assets/img/avatars/minia-0.png');" data-id="0"></div>
                <div class="title-avatarclose d-none">&#10005;</div>
            </div>
        </div>
        <div class="title-allavatarcontainer">
        </div>
        <button id="btn-addava">+</button>

        <p>Number of Pairs: <input id="input_nbpairs" type="number" required/> <span style="font-size:0.7em">(max: <span id="nb_max_pairs">12</span>)</p>

        <button id="startgame">Start</button>
    </div>





   
    <div id="container" style="display:none">
        <div id="allplayers_0"></div>

        <div id="card-deck" class="deck grid-container"></div>

        <div id="allplayers_1"></div>

        
        <div></div>
        <div class="bottombuttons">
            <button class="restart">Restart</button>
            <button id="open_results" class="openModal" data-target='end'>Results</button>
            <button class="backtitle">Title Screen</button>
        </div>
    </div>


    <!-- Modals -->
    <div id="overlay"></div>

    <div class="modalcontainer" data-id="ava">
        <div class="modal" style="min-width: 800px;">
            <div class="modalcontent">
                <h3>Choose a character</h3>
                <div id="avatarcarousel"></div>
            
                <div class="bottombuttons">
                    <button id="saveAva">Save</button>
                    <button class="closeModal" data-target="ava">Cancel</button>
                </div>

            </div>
        </div>
    </div>

    <div class="modalcontainer" data-id="end">
        <div class="modal">
            <div class="modalcontent">

                <div id="firstwinners"></div>
                <div id="otherwinners"></div>

                <div class="bottombuttons">
                    <button class="closeModal" data-target="end">Close</button>
                    <button class="restart">Restart</button>
                    <button class="backtitle">Title Screen</button>
                </div>

            </div>
        </div>
    </div>





    <footer>
        <div style="margin:auto;">
            <a href="https://hollowknight.com/" target="blank">Hollow Knight</a> is made and owned by <a href="http://teamcherry.com.au/" target="blank">Team Cherry</a> – icons from <a href="https://fontawesome.com/license" target="blank">Font Awesome</a><br>
            This memory is made by Alice Carry &copy; all rights reserved
        </div>
    </footer>

    

    <div id="music" class="svg-container" title="play/pause the music">
        <?php echo file_get_contents("assets/img/play-solid.svg"); ?>
        <?php echo file_get_contents("assets/img/pause-solid.svg"); ?>
    </div>

    <div id="mute" class="svg-container" title="mute/unmute the music and sound effects">
        <?php echo file_get_contents("assets/img/volume-mute-solid.svg"); ?>
        <?php echo file_get_contents("assets/img/volume-up-solid.svg"); ?>
    </div>

    <script type="text/javascript" src="assets/js/jquery.js"></script>
    <script type="text/javascript" src="assets/lib/slick-1.8.1/slick/slick.min.js"></script>

    <script type="text/javascript" src="assets/js/script.js"></script>
    <script type="text/javascript" src="assets/js/memory-title.js"></script>
    <script type="text/javascript" src="assets/js/memory-game.js"></script>
    
</body>
</html>