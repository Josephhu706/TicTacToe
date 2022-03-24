
const resetBoard = function(){
    for(let i=1; i<=6; i++){
        $(`#heart${[i]}`).show()
    }
    $('#victorypopup').css({visibility:'hidden'})
    $('.box').removeClass("JO-turn IO-turn DX-turn HX-turn highlighted")
    $('#roundcounter').html(`${playerMoves.roundCount}`)
    $('#playerwins').html("")
    $("#choosechar1").show()
    $("#choosechar2").show()
    $('#box5').addClass('vs')

    const characters =["jotaro", "dio", "iggy", "holhorse"]

    for (let i=0; i<characters.length; i++){
        $(`#${characters[i]} img`).removeAttr('src')
        $(`#${characters[i]} img`).show();
        $(`#${characters[i]} img`).attr({src: `./images/${characters[i]}icon.png`})
        $(`#${characters[i]}`).css('pointer-events','auto')
        $(`#${characters[i]} img`).removeClass('ready');
    }
    resetPlayerMoves();
}

const nextRound = function(){
    $('.box').removeClass("JO-turn IO-turn DX-turn HX-turn highlighted")
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
            $(`#heart${playerMoves.player1wins+3}`).hide();
            if (playerMoves.player1wins == 3 ){
                if (character1 == 'jotaro'){
                    console.log('jotaro wins')
                    $('#victorypopup').css({visibility:'visible', background:"url('./images/jotarovictory.gif')"})
                }
                else if (character1 == 'iggy'){
                    console.log('iggy wins')
                    $('#victorypopup').css({visibility:'visible', background:"url('./images/iggyvictory.gif')"})
                }
            }
        }
        else{
            $('#next-round').css('pointer-events','auto')
            $('.box').css('pointer-events','none')
            highlightBoxes(winstatus)
            $('#playerwins').html("Player 2 Wins!!!!")
            $('#next-round').attr("disabled", false);
            $(`#heart${playerMoves.player2wins}`).hide();
            if (playerMoves.player2wins == 3){
                if (character2 == 'dio'){
                    console.log('dio wins')
                    $('#victorypopup').css({visibility:'visible', background:"url('./images/diovictory.gif')"})
                }
                else if (character2 == 'holhorse'){
                    console.log('holhorse wins')
                    $('#victorypopup').css({visibility:'visible', background:"url('./images/holhorsefinisher.gif')"})
                }
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
    setTimeout(function(){$('#jotaro img').attr({ src:'./images/jotarostanding.gif'})}, 800)
}

const animateDioPunch = function(){
    $(`#dio img`).attr('src', "./images/diopunch.gif")
    setTimeout(function(){$('#dio img').attr('src', "./images/diostanding.gif")}, 800)
}

const animateIggyPunch = function(){
    $(`#iggy img`).attr('src', "./images/iggyattack.gif")
    setTimeout(function(){$('#iggy img').attr('src', "./images/iggystanding.gif")}, 1500)
}

const animateHolHorsePunch = function(){
    $(`#holhorse img`).attr('src', "./images/holhorseattack.gif")
    setTimeout(function(){$('#holhorse img').attr('src', "./images/holhorsestanding.gif")}, 1600)
}

$( document ).ready(function() {
    $('#next-round').attr("disabled", true);
    const heros =["jotaro", "iggy"];
    const villains = ["dio","holhorse"];
    let character1;
    let character2;
    $('#box5').addClass('vs')
    $('.box').css('pointer-events','none')
    $('#player1turn').html("It's player1's turn") 
    let turn = true;
    let selected1 = false;
    let selected2 = false;

    const soundTrack = new Audio ("./Sounds/JOJO's Bizarre Adventure Golden Wind O.S.T vol.1 Overture/01 il vento d’oro.mp3")
        soundTrack.volume = 0.2;
    const announcer = new Audio("./Sounds/getready.m4a")
    const boxHover = new Audio("./Sounds/boxhover.mp3")
    const jotaroAttack = new Audio("./Sounds/jotaroattacksound.mp3")
    const dioAttack = new Audio("./Sounds/dioattacksound.m4a")
    const iggyAttack = new Audio("./Sounds/iggyattacksound.mov")
    const holhorseAttack = new Audio("./Sounds/holhorseattacksound.m4a")

    let playmusic = false;

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

    $(".box").mouseenter(function() {
        boxHover.play();
    });

    $('.character').on('click', function(event){
        if (heros.includes(this.id)){
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
                else{
                    $(`#${heros[i]} img`).hide();
                    $(`#${heros[i]}`).css('pointer-events','none')
                }
            }
        }
        if (villains.includes(this.id)){
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
                else{
                    $(`#${villains[i]} img`).hide();
                    $(`#${villains[i]}`).css('pointer-events','none')
                }
            }
        }
        if (selected1==true && selected2==true){
            $('.box').css('pointer-events','auto')
            $('#next-round').attr("disabled", true);
            $('#box5').removeClass('vs')
            announcer.play();
        }
    });


    $('.box').on('click', function(event){
        //find location of click event (which box was clicked);
        //toggle the background image of the click event as a o if true, x if false;
        $('#next-round').css('pointer-events','none')
        if (turn == true){
            $('#player2turn').html("It's player 2's turn")
            $('#player1turn').html("")
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
            recordMoves(this.id, turn)
            let winstatus=checkWinPlayer(playerMoves.player1, playerMoves.player2)
            winnerMessage(winstatus, turn, playerMoves.roundCount, character1, character2)
            turn = false;
        }
        else{
            $('#player1turn').html("It's player 1's turn")
            $('#player2turn').html("")
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