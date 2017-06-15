/*
 GAME RULES:

 - The game has 2 players, playing in rounds
 - In each turn, a player rolls a dice as many times as he wishes. Each result get added to his CURRENT score
 - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
 - The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
 - The first player to reach 100 points on GLOBAL score wins the game

 */

/*
 YOUR 3 CHALLENGES
 Change the game to follow these rules:

 1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
 2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
 3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
 */


'use strict';

document.addEventListener("DOMContentLoaded", function () {
    var roundScore = 0,
        activePlayer,
        diceValue,
        lastDiceValue,
        dice = document.getElementById('dice'),
        boardPanels = document.getElementsByClassName('pig-game-board__panel'),
        playerOneCurrent = document.getElementById('current-0'),
        playerTwoCurrent = document.getElementById('current-1'),
        playerOneGlobal = document.getElementById('score-0'),
        playerTwoGlobal = document.getElementById('score-1'),
        rollDice = document.getElementById('rollDice'),
        newGame = document.getElementById('newGame'),
        holdGame = document.getElementById('holdGame'),
        scoresArray = [
            playerOneCurrent, playerTwoCurrent,
            playerOneGlobal, playerTwoGlobal
        ];

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function clearBoard() {
        dice.classList.add('not-visible');

        // setting scores to zero
        [].forEach.call(scoresArray, function (el) {
            if (typeof el !== 'undefined') {
                el.textContent = '0';
            }
        });

        // removing active class
        [].forEach.call(boardPanels, function (el) {
            el.classList.remove('pig-game-board__panel--active');
        });

        // setting random player
        if (randomIntFromInterval(0, 1) === 1) {
            activePlayer = 1;
        } else {
            activePlayer = 0;
        }
        boardPanels[activePlayer].classList.add('pig-game-board__panel--active');
    }

    function onDiceRoll() {
        diceValue = randomIntFromInterval(1, 6);

        if (diceValue === 1) {
            console.log("Player" + activePlayer + " rolls 1 amd looses round points!");

            scoresArray[activePlayer].textContent = '0';
            nextPlayer();
        }

        if (lastDiceValue === 6 && diceValue === 6) {
            console.log("Player" + activePlayer + " rolls two 6 in a row amd looses all points!");

            scoresArray[activePlayer + 2].textContent = '0';
            nextPlayer();
        } else {
            lastDiceValue = diceValue;
            roundScore += diceValue;
        }
        scoresArray[activePlayer].textContent = roundScore;
    }

    function nextPlayer() {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        lastDiceValue = 0;

        playerOneCurrent.textContent = '0';
        playerTwoCurrent.textContent = '0';

        // removing active class
        [].forEach.call(boardPanels, function (el) {
            el.classList.remove('pig-game-board__panel--active');
        });
        boardPanels[activePlayer].classList.add('pig-game-board__panel--active');
    }

    function onHold() {
        scoresArray[activePlayer + 2].textContent = Number(scoresArray[activePlayer + 2].textContent) + roundScore;
        nextPlayer();
    }

    clearBoard();
    newGame.addEventListener('click', clearBoard);
    rollDice.addEventListener('click', onDiceRoll);
    holdGame.addEventListener('click', onHold);
});

