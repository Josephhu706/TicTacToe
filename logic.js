
//array of arrays storing win conditions
const winConditions = [
    ["box1", "box2", "box3"],["box4", "box5","box6"], 
    ["box7", "box8", "box9"],["box1","box4","box7"], 
    ["box2","box5","box8"],["box3","box6","box9"], 
    ["box1","box5","box9"],["box3", "box5","box7"]
]
//object that stores relevant information to decide who wins
const playerMoves = {
    player1: [],
    player2: [],
    roundCount: 1,
    player1wins: 0,
    player2wins: 0
};
//push moves into the player1 or player 2 arrays that corespond to the clicked square
const recordMoves = function(move, boolean){
    //move will be the this.id from the click event
    if (boolean == true){
        playerMoves.player1.push(move);

    }
    else{
        playerMoves.player2.push(move);

    }
};
//checks if a player has won the round
const checkWinPlayer = function (playerarray1, playerarray2){
    //iterate through winConditions
    //does every item in each win condition exist in the play array?
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
    }
    //checks for a draw 
    if((playerarray1.length + playerarray2.length)/2 == 4.5){
        console.log('hey!')
        return 'draw'
    }
};

//updates round count
const roundCount = function(){
    playerMoves.roundCount+=1;
}
//resets player moves, round count and wins
const resetPlayerMoves = function (){
    playerMoves.player1 = []
    playerMoves.player2 = []
    playerMoves.roundCount = 1;
    playerMoves.player1wins = 0;
    playerMoves.player2wins = 0;
}
//resets player moves.
const resetPlayers = function (){
    playerMoves.player1 = []
    playerMoves.player2 = []
}