
const resetBoard = function(){
    $('#victorypopup').css({visibility:'hidden'})
    $('.box').removeClass("O-turn X-turn highlighted")
    $('#roundcounter').html(`${playerMoves.roundCount}`)
    $('#playerwins').html("")

    $('#jotaro img').removeAttr('src')
    $('#jotaro img').show();
    $('#jotaro img').attr({src: "./images/Jotaroicon.png"})
    $('#jotaro').css('pointer-events','auto')
    $('#jotaro img').removeClass('ready')

    $('#dio img').removeAttr('src')
    $('#dio img').show();
    $('#dio img').attr({src: "./images/dioicon.png"})
    $('#dio').css('pointer-events','auto')
    $('#dio img').removeClass('ready')

    $('#iggy img').removeAttr('src')
    $('#iggy img').show();
    $('#iggy img').attr({src: "./images/iggyicon.png"})
    $('#iggy').css('pointer-events','auto')
    $('#iggy img').removeClass('ready')

    $('#holhorse img').removeAttr('src')
    $('#holhorse img').show();
    $('#holhorse img').attr({src: "./images/holhorseicon.png"})
    $('#holhorse ').css('pointer-events','auto')
    $('#holhorse img').removeClass('ready')

    resetPlayerMoves();
}
const nextRound = function(){
    $('.box').removeClass("O-turn X-turn highlighted")
    resetPlayers();
    $('#playerwins').html("");
}

const highlightBoxes = function(playerwinmoves){
    for (let i = 0; i<3 ; i++){
        $(`#${playerwinmoves[i]}`).addClass('highlighted')
    }
}

const winnerMessage = function(winstatus, turn, round, character1, character2){
    if (Array.isArray(winstatus)){
        if (turn==true){
            $('#next-round').css('pointer-events','auto')
            $('.box').css('pointer-events','none')
            highlightBoxes(winstatus)
            $('#playerwins').html("Player 1 Wins!!!!")
            $('#next-round').attr("disabled", false);
            if (character1 == 'jotaro' && round == 3){
                console.log('jotaro wins')
                $('#victorypopup').css({visibility:'visible', background:"url('./images/jotarovictory.gif')"})
            }
        }
        else{
            $('#next-round').css('pointer-events','auto')
            $('.box').css('pointer-events','none')
            highlightBoxes(winstatus)
            $('#playerwins').html("Player 2 Wins!!!!")
            $('#next-round').attr("disabled", false);
            if (character2 == 'dio' && round == 3){
                console.log('dio wins')
                $('#victorypopup').css({visibility:'visible', background:"url('./images/diovictory.gif')"})
            }
        }
    }
    else if(winstatus=="draw"){
        $('#next-round').css('pointer-events','auto')
        $('.box').css('pointer-events','none')
        $('#playerwins').html("Draw!!!!")
        $('#next-round').attr("disabled", false);
    }
}

const animateJotaroPunch = function(){
    $(`#jotaro img`).attr({ src:'./images/jojouppercut.gif'})
    setTimeout(function(){$('#jotaro img').attr({ src:'./images/jotaro.gif'})}, 800)
}

const animateDioPunch = function(){
    $(`#dio img`).attr('src', "./images/diopunch.gif")
    setTimeout(function(){$('#dio img').attr('src', "./images/diostanding.gif")}, 800)
}

let playmusic = false;

const playPauseMusic = function () {
    if (playmusic == false){
        document.getElementById("music").play();
        document.getElementById("musicbutton").innerHTML="Pause Music"
        playmusic = true;
    }
    else{
        document.getElementById("music").pause();
        document.getElementById("musicbutton").innerHTML="Play Music"
        playmusic = false;

    }
}

$( document ).ready(function() {

    let character1;
    let character2;

    $('.box').css('pointer-events','none')
    $('#player1turn').html("It's player1's turn") 
    let turn = true;
    let selected1 = false;
    let selected2 = false;

    const boxHover = new Audio("./Sounds/boxhover.mp3")


    $(".box").mouseenter(function() {
        // boxaudio.play();
        boxHover.play();
    });


    $('.character').on('click', function(event){
        if (this.id == 'jotaro'){
            character1 = 'jotaro'
            $('#jotaro img').attr({ src:'./images/jotaro.gif'})
            $('#jotaro img').addClass('ready')
            $('#iggy img').hide();
            $('#iggy').css('pointer-events','none')
            $('#jotaro').css('pointer-events','none')
            selected1 = true;
            if (selected1==true && selected2==true){
                $('.box').css('pointer-events','auto')
                $('#next-round').attr("disabled", true);
            }
        }
        if(this.id == 'dio'){
            character2 = 'dio'
            $('#dio').css('background-image', 'none')
            $('#dio img').attr('src', './images/diostanding.gif')
            $('#holhorse img').hide();
            $('#dio img').addClass('ready')
            $('#holhorse').css('pointer-events','none')
            $('#dio').css('pointer-events','none')
            selected2 = true
            if (selected1==true && selected2==true){
                $('.box').css('pointer-events','auto')
                $('#next-round').attr("disabled", true);
            }
        }
        if(this.id == 'iggy'){
            character1 = 'iggy'
            $('#iggy').css('background-image', 'none')
            $('#iggy img').attr('src', './images/iggystanding.gif')
            $('#jotaro img').hide();
            $('#iggy').css('pointer-events','none')
            $('#jotaro').css('pointer-events','none')
            $('#iggy img').addClass('ready')
            selected1 = true
            if (selected1==true && selected2==true){
                $('.box').css('pointer-events','auto')
                $('#next-round').attr("disabled", true);
            }
        }
        if(this.id == 'holhorse'){
            character2 = 'holhorse'
            $('#holhorse').css('background-image', 'none')
            $('#holhorse img').attr('src', './images/holhorsestanding.gif')
            $('#dio img').hide();
            $('#holhorse').css('pointer-events','none')
            $('#dio').css('pointer-events','none')
            $('#holhorse img').addClass('ready')
            selected2 = true
            if (selected1==true && selected2==true){
                $('.box').css('pointer-events','auto')
                $('#next-round').attr("disabled", true);
            }
        }
    });


    $('.box').on('click', function(event){
        //find location of click event (which box was clicked);
        //toggle the background image of the click event as a o if true, x if false;
        $('#next-round').css('pointer-events','none')
        if (turn == true){
            $('#player2turn').html("It's player 2's turn")
            $('#player1turn').html("")
            $(`#${this.id}`).addClass('O-turn');
            animateJotaroPunch();
            recordMoves(this.id, turn)
            let winstatus=checkWinPlayer(playerMoves.player1, playerMoves.player2)
            winnerMessage(winstatus, turn, playerMoves.roundCount, character1, character2)
            turn = false;
        }
        else{
            $('#player1turn').html("It's player 1's turn")
            $('#player2turn').html("")
            $(`#${this.id}`).addClass('X-turn');
            animateDioPunch();
            recordMoves(this.id, turn)
            let winstatus=checkWinPlayer(playerMoves.player1, playerMoves.player2)
            winnerMessage(winstatus, turn, playerMoves.roundCount, character1, character2)
            turn = true;
        }
    })

    $('#next-round').on('click', function(event){
        roundCount();
        nextRound();
        $('#roundcounter').html(`${playerMoves.roundCount}`)
        $('.box').css('pointer-events','auto')
    })

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