// player wins if they have any combination of: 
//store winning conditions in an object of arrays. If one of the players has all 3 of on array,
//That player wins.
//decide who's turn it is and switch from X to O.
//use boolean. True = player 1 False = player 2 use a toggle to switch between X and O

const winConditions = [
    ["box1", "box2", "box3"],["box4", "box5","box6"], 
    ["box7", "box8", "box9"],["box1","box4","box7"], 
    ["box2","box5","box8"],["box3","box6","box9"], 
    ["box1","box5","box9"],["box3", "box5","box7"]
]

const playerMoves = {
    player1: [],
    player2: [],
    roundCount: 1,
    player1wins: 0,
    player2wins: 0
};

const recordMoves = function(move, boolean){
    //move will be the this.id from the click event
    if (boolean == true){
        playerMoves.player1.push(move);
        // console.log(`player1 Moves ${playerMoves.player1}`)
    }
    else{
        playerMoves.player2.push(move);
        // console.log(`player2 Moves ${playerMoves.player2}`)
    }
};

const checkWinPlayer = function (playerarray1, playerarray2){
    //iterate through winConditions
    //does every item in each win condition exist in the play array?
    let winner = ''
    for (let i = 0; i< winConditions.length ; i++){
       let win1 = winConditions[i].every(elem => playerarray1.includes(elem))
       let win2 = winConditions[i].every(elem => playerarray2.includes(elem))
       if (win1 == true){
           playerMoves.player1wins+=1;
           return winConditions[i]
       }
       else if (win2 == true){
           playerMoves.player2wins+=1;
           return winConditions[i]
       }
       else if((playerarray1.length + playerarray2.length)/2 == 4.5 && winner == ''){
           console.log('hey!')
           return 'draw'
       }
    }
    // console.log(winner);
};


const roundCount = function(){
    playerMoves.roundCount+=1;
}

const resetPlayerMoves = function (){
    playerMoves.player1 = []
    playerMoves.player2 = []
    playerMoves.roundCount = 1;
    playerMoves.player1wins = 0;
    playerMoves.player2wins = 0;
}

const resetPlayers = function (){
    playerMoves.player1 = []
    playerMoves.player2 = []
}