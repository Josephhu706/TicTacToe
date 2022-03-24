//function to reset the game board when i hit the reset button
const resetBoard = function(){
    //resets victory popup, round counter, removes player win text, removes tokens, hides gifs.
    resetPlayerMoves();
    for(let i=1; i<=6; i++){
        $(`#heart${[i]}`).show();
    }
    $('#victorypopup').css({visibility:'hidden'});
    $('.box').removeClass("JO-turn IO-turn DX-turn HX-turn highlighted");
    $('#roundcounter').html(`${playerMoves.roundCount}`);
    $('#playerwins').html("");
    $("#choosechar1").show();
    $("#choosechar2").show();
    $('#box5').addClass('vs');

    const characters =["jotaro", "dio", "iggy", "holhorse"];
    // resets all character icons and makes them clickable.
    for (let i=0; i<characters.length; i++){
        $(`#${characters[i]} img`).removeAttr('src');
        $(`#${characters[i]} img`).show();
        $(`#${characters[i]} img`).attr({src: `./images/${characters[i]}icon.png`});
        $(`#${characters[i]}`).css('pointer-events','auto');
        $(`#${characters[i]} img`).removeClass('ready');
    }
}
//resets board tokens and player wins text and player moves array in logic file.
const nextRound = function(){
    $('.box').removeClass("JO-turn IO-turn DX-turn HX-turn highlighted");
    resetPlayers();
    $('#playerwins').html("");
}
//when three in a row is achieved highlight them 
const highlightBoxes = function(playerwinmoves){
    for (let i = 0; i<3 ; i++){
        $(`#${playerwinmoves[i]}`).addClass('highlighted');
    }
}
//function for assessing winner and creating winner message and gif popup if necessary
const winnerMessage = function(winstatus, turn, character1, character2){
    //checks if the win status function returns the winning array, which means someone has won the round.
    if (Array.isArray(winstatus)){
        //if it's player 1's turn
        if (turn==true){
            //enable next round button, disable clicking the board, highlight the 3 in a row boxes, reduce heart on player 2 side.
            $('#next-round').css('pointer-events','auto')
            $('.box').css('pointer-events','none')
            highlightBoxes(winstatus)
            $('#playerwins').html("Player 1 Wins!!!!")
            $('#next-round').attr("disabled", false);
            $(`#heart${playerMoves.player1wins+3}`).hide();
            //if the player has won 3 rounds (first to 3 wins) disable next round button, and popup victory gif depending on character and play victory sound.
            if (playerMoves.player1wins == 3 ){
                $('#next-round').attr("disabled", true);
                if (character1 == 'jotaro'){
                    console.log('jotaro wins')
                    $('#victorypopup').css({visibility:'visible', background:"url('./images/jotarovictory.gif')"})
                    const jotaroQuip = new Audio("./Sounds/jotarofinalquip.m4a")
                    jotaroQuip.play()
                }
                else if (character1 == 'iggy'){
                    console.log('iggy wins')
                    $('#victorypopup').css({visibility:'visible', background:"url('./images/iggyvictory.gif')"})
                    const iggyQuip = new Audio("./Sounds/iggyfinalquip.m4a")
                    iggyQuip.play();
                }
            }
        }
        //if it's plasyer's turn 
        else{
            //enable next round button, disable clicking the board, highlight the 3 in a row boxes, reduce heart on player 1 side.
            $('#next-round').css('pointer-events','auto')
            $('.box').css('pointer-events','none')
            highlightBoxes(winstatus)
            $('#playerwins').html("Player 2 Wins!!!!")
            $('#next-round').attr("disabled", false);
            $(`#heart${playerMoves.player2wins}`).hide();
             //if the player has won 3 rounds (first to 3 wins) disable next round button, and popup victory gif depending on character and play victory sound.
            if (playerMoves.player2wins == 3){
                $('#next-round').attr("disabled", true);
                if (character2 == 'dio'){
                    console.log('dio wins');
                    $('#victorypopup').css({visibility:'visible', background:"url('./images/diovictory.gif')"});
                    const dioQuip = new Audio("./Sounds/diofinalquip.m4a");
                    dioQuip.play();
                }
                else if (character2 == 'holhorse'){
                    console.log('holhorse wins');
                    $('#victorypopup').css({visibility:'visible', background:"url('./images/holhorsefinisher.gif')"});
                    const holhorseQuip = new Audio("./Sounds/holhorsefinalquip.m4a");
                    holhorseQuip.play();
                }
            }
        }
    }
    //if winstatus function in logic returns a draw, display draw.
    else if(winstatus=="draw"){
        $('#next-round').css('pointer-events','auto');
        $('.box').css('pointer-events','none');
        $('#playerwins').html("Draw!!!!");
        $('#next-round').attr("disabled", false);
    }
};
//functions for attack animations when a token is placed.
const animateJotaroPunch = function(){
    $(`#jotaro img`).attr({ src:'./images/jojouppercut.gif'});
    setTimeout(function(){$('#jotaro img').attr({ src:'./images/jotarostanding.gif'})}, 800);
};

const animateDioPunch = function(){
    $(`#dio img`).attr('src', "./images/diopunch.gif");
    setTimeout(function(){$('#dio img').attr('src', "./images/diostanding.gif")}, 800);
}

const animateIggyPunch = function(){
    $(`#iggy img`).attr('src', "./images/iggyattack.gif");
    setTimeout(function(){$('#iggy img').attr('src', "./images/iggystanding.gif")}, 1500);
}

const animateHolHorsePunch = function(){
    $(`#holhorse img`).attr('src', "./images/holhorseattack.gif");
    setTimeout(function(){$('#holhorse img').attr('src', "./images/holhorsestanding.gif")}, 1600);
}
//document ready function
$( document ).ready(function() {
    //disables next round button at the start so the player must choose a character
    $('#next-round').attr("disabled", true);
    //array's of player 1 characters and player2 characters.
    const heros =["jotaro", "iggy"];
    const villains = ["dio","holhorse"];
    //sets the current characters after selection
    let character1;
    let character2;
    //adds the VS symbol in the middle grid div
    $('#box5').addClass('vs');
    $('.box').css('pointer-events','none');
    $('#player1turn').html("It's player1's turn") ;
    //tracks who's turn it is
    let turn = true;
    //tracks if both characters are selected
    let selected1 = false;
    let selected2 = false;

    //all sounds for the games
    const soundTrack = new Audio ("./Sounds/JOJO's Bizarre Adventure Golden Wind O.S.T vol.1 Overture/01 il vento d’oro.mp3")
        soundTrack.volume = 0.2;
    const announcer = new Audio("./Sounds/getready.m4a")
    const boxHover = new Audio("./Sounds/boxhover.mp3")
    const jotaroAttack = new Audio("./Sounds/jotaroattacksound.m4a")
    const dioAttack = new Audio("./Sounds/dioattacksound.m4a")
    const iggyAttack = new Audio("./Sounds/iggyattacksound.mov")
    const holhorseAttack = new Audio("./Sounds/holhorseattacksound.m4a")
    //music is not playing when page loads in
    let playmusic = false;
    //music button to toggle GIORNO'S SICK ASS THEME
    $('#musicbutton').on('click', function(event){
        if (playmusic == false){
            soundTrack.play();
            $('#musicbutton').html("Pause Music")
            playmusic = true;
        }
        else{
            soundTrack.pause();
            $('#musicbutton').html("Play Music")
            playmusic = false;
        }
    })
    //boxhover sound plays when i hover over a game grid square
    $(".box").mouseenter(function() {
        boxHover.play();
    });
    //on click function for selecting characters
    $('.character').on('click', function(event){
        if (heros.includes(this.id)){
            //loops through heros array and removes icon background image, replaces it with standing.gif and adds class to set them at the bottom of the board.
            //disables clicking on the other character divs and hides the choose character text. Then updates selected1 that a character has been selected.
            for (let i=0; i<heros.length; i++){
                if(this.id == heros[i]){
                    character1=heros[i]
                    $(`#${heros[i]}`).css('background-image', 'none')
                    $(`#${heros[i]} img`).attr({ src:`./images/${heros[i]}standing.gif`})
                    $(`#${heros[i]} img`).addClass(`ready`)
                    $(`#${heros[i]}`).css('pointer-events','none')
                    $("#choosechar1").hide()
                    selected1 = true;
                }
                //for character that wasn't selected, hide the icon and prevent clicking on them
                else{
                    $(`#${heros[i]} img`).hide();
                    $(`#${heros[i]}`).css('pointer-events','none')
                }
            }
        }
        if (villains.includes(this.id)){
            //loops through villains array and removes icon background image, replaces it with standing.gif and adds class to set them at the bottom of the board.
            //disables clicking on the other character divs and hides the choose character text. Then updates selected1 that a character has been selected.
            for (let i=0; i<villains.length; i++){
                if(this.id == villains[i]){
                    character2=villains[i]
                    $(`#${villains[i]}`).css('background-image', 'none')
                    $(`#${villains[i]} img`).attr('src', `./images/${villains[i]}standing.gif`)
                    $(`#${villains[i]}`).css('pointer-events','none')
                    $(`#${villains[i]} img`).addClass('ready')
                    $("#choosechar2").hide();
                    selected2=true;
                }
                //for character that wasn't selected, hide the icon and prevent clicking on them
                else{
                    $(`#${villains[i]} img`).hide();
                    $(`#${villains[i]}`).css('pointer-events','none')
                }
            }
        }
        //if both characters have been selected remove the vs symbol and allow interaction with board and play ready start announcer.
        if (selected1==true && selected2==true){
            $('.box').css('pointer-events','auto')
            $('#next-round').attr("disabled", true);
            $('#box5').removeClass('vs')
            announcer.play();
        }
    });

    //function for clicking on grid squares
    $('.box').on('click', function(event){
        //disables next  round pointer until round is complete
        $('#next-round').css('pointer-events','none')
        //if it is player 1's turn
        if (turn == true){
            //switch text to player 2's turn and blank out player 1's turn div.
            $('#player2turn').html("It's player 2's turn")
            $('#player1turn').html("")
            //depending on selected character, animate the attack and place token specific to character
            if (character1 == 'jotaro'){
                $(`#${this.id}`).addClass('JO-turn');
                jotaroAttack.play();
                animateJotaroPunch();
            }
            else if (character1 == 'iggy'){
                $(`#${this.id}`).addClass('IO-turn');
                iggyAttack.play();
                animateIggyPunch();
            }
            //records which box was clicked for player 1 anc checks if they have won yet
            //if they have won, display a message accordingly. 
            //switch the turn to player 2
            recordMoves(this.id, turn)
            let winstatus=checkWinPlayer(playerMoves.player1, playerMoves.player2)
            winnerMessage(winstatus, turn, character1, character2)
            turn = false;
        }
        //if it's player's turn 
        else{
            //switch text to player 1's turn and blank out player 2's turn div.
            $('#player1turn').html("It's player 1's turn")
            $('#player2turn').html("")
            //depending on selected character, animate the attack and place token specific to character
            if (character2 == 'dio'){
                $(`#${this.id}`).addClass('DX-turn');
                dioAttack.play();
                animateDioPunch();
            }
            else if (character2 == 'holhorse'){
                $(`#${this.id}`).addClass('HX-turn');
                holhorseAttack.play();
                animateHolHorsePunch();
            }
            //records which box was clicked for player 1 anc checks if they have won yet
            //if they have won, display a message accordingly. 
            //switch the turn to player 
            recordMoves(this.id, turn)
            let winstatus=checkWinPlayer(playerMoves.player1, playerMoves.player2)
            winnerMessage(winstatus, turn, character1, character2)
            turn = true;
        }
    })
    //if the nexty round button is clicked, update roundcount and reset board for next round.
    //updates round counter div and allows interaction with the board.
    $('#next-round').on('click', function(event){
        roundCount();
        nextRound();
        $('#roundcounter').html(`${playerMoves.roundCount}`)
        $('.box').css('pointer-events','auto')
    })
    //if the reset button is clicked, reset the board, make turn player1's turn, prevent ineraction with the board.
    //reset selected character variables to get player to select characters again.
    $('#reset').on('click', function(event){
        resetBoard();
        turn=true
        $('.box').css('pointer-events','none')
        $('#player1turn').html("It's player 1's turn")
        $('#player2turn').html("")
        selected1 = false;
        selected2 = false;
    })

});