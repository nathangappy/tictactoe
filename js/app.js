(function game() {
    //create and select all elements on start page
    const page = document.querySelector('body');
    const board = document.getElementById('board');
    const startScreen = document.createElement('div');
    const startHeader = document.createElement('header');
    const startScreenTitle = document.createElement('h1');
    const startGameButton = document.createElement('a');
    const startNameInput = document.createElement('input');
    const playerNameHolder = document.createElement('div');
    const playerTwoNameHolder = document.createElement('div');
    let playerOneName = document.createElement('p');
    let playerTwoName = document.createElement('p');
    const nameButton = document.createElement('button');
    const computerMessage = document.createElement('p');
    //set element properties and append for start page
    startScreenTitle.innerHTML = 'Tic Tac Toe';
    startGameButton.className = 'button';
    startGameButton.href = '#';
    startGameButton.innerHTML = 'Start Game';
    startNameInput.className = 'startscreeninput';
    startNameInput.placeholder = 'Enter Player One Name';
    playerNameHolder.className = 'nameholder';
    playerTwoNameHolder.className = 'nameholder2';
    playerOneName.className = 'playername';
    playerTwoName.className = 'playername';
    nameButton.className = 'namebutton';
    nameButton.innerHTML = 'Submit Name';
    computerMessage.innerHTML = 'One name only to play against Computer';
    computerMessage.style.display = 'none';
    //append elements to start screen
    playerNameHolder.appendChild(playerOneName);
    playerTwoNameHolder.appendChild(playerTwoName);
    startHeader.appendChild(startScreenTitle);
    startHeader.appendChild(startNameInput);
    startHeader.appendChild(nameButton);
    startHeader.appendChild(computerMessage);
    startHeader.appendChild(startGameButton);
    startScreen.appendChild(startHeader);
    //add start screen properties and append to page
    startScreen.className = 'screen screen-start';
    startScreen.id = 'start';
    //append start screen to page
    page.appendChild(startScreen);
    //counter to track different player name entry
    let nameCount = 0;
    startNameInput.addEventListener('click', () => {
        computerMessage.style.display = 'block';
    });
    //event listener for name submit
    nameButton.addEventListener('click', () => {
        if (nameCount === 0) {
            playerOneName.innerHTML = startNameInput.value;
            startNameInput.value = '';
            startNameInput.placeholder = 'Enter Player Two Name';
            nameCount += 1;
            computerMessage.style.display = 'none';
        } else if (nameCount === 1) {
            playerTwoName.innerHTML = startNameInput.value;
            startNameInput.value = '';
            startNameInput.placeholder = 'Start Game To Play';
            nameCount += 1;
            computerMessage.style.display = 'none';
        }
    });


    //add event listener to start button
    startGameButton.addEventListener('click', () => {
        if (nameCount > 0) {
            startScreen.style.display = 'none';
            board.childNodes[1].appendChild(playerNameHolder);
            board.childNodes[1].appendChild(playerTwoNameHolder);
            if (playerTwoName.innerHTML === '') {
                playerTwoName.innerHTML = 'Computer';
            }
        }
    });


    //ALTERNATE PLAYERS
    //select player elements
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');

    //make player one initially active
    player1.className += ' active';
    //number of selections
    let gameSelections = 0;
    //event listener on the grid ox boxes
    const boxGrid = document.querySelector('.boxes');
    //get random box number
    let x = '';

    function random() {
        do {
            x = Math.floor((Math.random() * 17) + 1);
        }
        while (x % 2 == 0 || boxGrid.childNodes[x].className.length > 5);
    }
    //if only one player selected, play computer
    function computerPlay() {

        random();
        boxGrid.childNodes[x].className += ' box-filled-2';
        boxGrid.childNodes[x].value = 2;
        player1.className = 'players active';
        player2.className = 'players';
        gameSelections += 1;
    }

    boxGrid.addEventListener('click', (e) => {

        //only allow click on empty square
        if (e.target.className === 'box') {
            //changes the active player
            if (player1.className === 'players active') {
                //add an o to clicked box
                e.target.className += ' box-filled-1';
                e.target.value = 1;
                player1.className = 'players';
                player2.className = 'players active';
                gameSelections += 1;
                if (nameCount === 1 && gameSelections < 9) {
                    computerPlay();
                }
            } else if (player2.className === 'players active' && nameCount === 2 || nameCount === 0) {
                //add an x to clicked box
                e.target.className += ' box-filled-2';
                e.target.value = 2;
                player1.className = 'players active';
                player2.className = 'players';
                gameSelections += 1;
            }
        }
    });


    //mouseover event listener on grid ox boxes
    //adds x and o when moused over box
    boxGrid.addEventListener('mouseover', (e) => {
        //adds x or o to the current box based on active player
        if (player1.className === 'players active') {
            e.target.style.backgroundImage = 'url(img/o.svg)';
        } else if (player2.className === 'players active') {
            e.target.style.backgroundImage = 'url(img/x.svg)';
        }
    });

    //mouseover event listener on grid ox boxes
    //removes x and o when moused off
    boxGrid.addEventListener('mouseout', (e) => {
        //adds x or o to the current box based on active player
        if (player1.className === 'players active') {
            e.target.style.backgroundImage = '';
        } else if (player2.className === 'players active') {
            e.target.style.backgroundImage = '';
        }
    });


    //checks if three in a row has been made
    boxGrid.addEventListener('click', () => {
        squareCheck();
    });


    let boxes = [];
    //an array of box elements
    function createArray() {
        for (let i = 1; i <= 17; i += 2) {
            boxes.push(boxGrid.childNodes[i].value);
        }
    }
    createArray();
    //function to change array
    function changeArray() {
        boxes = []
        createArray();
    }

    //create winning screen elements
    const pageWin = document.createElement('div');
    const pageWinHeader = document.createElement('header');
    const pageWinTitle = document.createElement('h1');
    const pageWinMessage = document.createElement('p');
    const pageNewGame = document.createElement('a');
    const newNameHolder = document.createElement('div');
    const newNameInput = document.createElement('input');
    const newNameButton = document.createElement('button');
    //set winning screen elements properties
    newNameButton.className = 'namebutton';
    newNameButton.innerHTML = 'Submit New Name';
    newNameHolder.className = 'newnameholder';
    newNameInput.placeholder = 'Enter player one name';
    newNameInput.className = 'newnameinput';
    pageWin.className = 'screen screen-win';
    pageWin.id = 'finish';
    pageWinTitle.innerHTML = 'Tic Tac Toe';
    pageWinMessage.className = 'message';
    pageNewGame.className = 'button';
    pageNewGame.innerHTML = 'New Game';
    pageNewGame.href = '#';
    pageWin.style.display = 'none';
    //append winning elements to screen and screen to page
    newNameHolder.appendChild(newNameInput);
    pageWinHeader.appendChild(pageWinTitle);
    pageWinHeader.appendChild(pageWinMessage);
    pageWinHeader.appendChild(newNameHolder);
    pageWinHeader.appendChild(newNameButton);
    pageWinHeader.appendChild(pageNewGame);
    pageWin.appendChild(pageWinHeader);
    page.appendChild(pageWin);


    //function to check squares and assign winner
    function squareCheck() {
        changeArray();
        //horizontal three in  a row
        if (boxes[0] === boxes[1] && boxes[0] === boxes[2]) {
            if (boxes[0] > 0 && boxes[1] > 0 && boxes[2] > 0) {
                board.style.display = 'none';
                pageWin.style.display = 'block';
                if (boxes[0] === 1) {
                    pageWin.className = 'screen screen-win screen-win-one';
                    pageWinMessage.innerHTML = playerOneName.innerHTML + ' Winner';
                    infoReset();
                } else if (boxes[0] === 2) {
                    pageWin.className = 'screen screen-win screen-win-two';
                    pageWinMessage.innerHTML = playerTwoName.innerHTML + ' Winner';
                    infoReset();
                }
            }
        } else if (boxes[3] === boxes[4] && boxes[3] === boxes[5]) {
            if (boxes[3] > 0 && boxes[4] > 0 && boxes[5] > 0) {
                board.style.display = 'none';
                pageWin.style.display = 'block';
                if (boxes[3] === 1) {
                    pageWin.className = 'screen screen-win screen-win-one';
                    pageWinMessage.innerHTML = playerOneName.innerHTML + ' Winner';
                    infoReset();
                } else if (boxes[3] === 2) {
                    pageWin.className = 'screen screen-win screen-win-two';
                    pageWinMessage.innerHTML = playerTwoName.innerHTML + ' Winner';
                    infoReset();
                }
            }
        } else if (boxes[6] === boxes[7] && boxes[6] === boxes[8]) {
            if (boxes[6] > 0 && boxes[7] > 0 && boxes[8] > 0) {
                board.style.display = 'none';
                pageWin.style.display = 'block';
                if (boxes[6] === 1) {
                    pageWin.className = 'screen screen-win screen-win-one';
                    pageWinMessage.innerHTML = playerOneName.innerHTML + ' Winner';
                    infoReset();
                } else if (boxes[6] === 2) {
                    pageWin.className = 'screen screen-win screen-win-two';
                    pageWinMessage.innerHTML = playerTwoName.innerHTML + ' Winner';
                    infoReset();
                }
            }
        } else if (boxes[0] === boxes[3] && boxes[3] === boxes[6]) {
            if (boxes[0] > 0 && boxes[3] > 0 && boxes[6] > 0) {
                board.style.display = 'none';
                pageWin.style.display = 'block';
                if (boxes[0] === 1) {
                    pageWin.className = 'screen screen-win screen-win-one';
                    pageWinMessage.innerHTML = playerOneName.innerHTML + ' Winner';
                    infoReset();
                } else if (boxes[0] === 2) {
                    pageWin.className = 'screen screen-win screen-win-two';
                    pageWinMessage.innerHTML = playerTwoName.innerHTML + ' Winner';
                    infoReset();
                }
            }
        } else if (boxes[1] === boxes[4] && boxes[4] === boxes[7]) {
            if (boxes[1] > 0 && boxes[4] > 0 && boxes[7] > 0) {
                board.style.display = 'none';
                pageWin.style.display = 'block';
                if (boxes[1] === 1) {
                    pageWin.className = 'screen screen-win screen-win-one';
                    pageWinMessage.innerHTML = playerOneName.innerHTML + ' Winner';
                    infoReset();
                } else if (boxes[1] === 2) {
                    pageWin.className = 'screen screen-win screen-win-two';
                    pageWinMessage.innerHTML = playerTwoName.innerHTML + ' Winner';
                    infoReset();
                }
            }
        } else if (boxes[2] === boxes[5] && boxes[5] === boxes[8]) {
            if (boxes[2] > 0 && boxes[5] > 0 && boxes[8] > 0) {
                board.style.display = 'none';
                pageWin.style.display = 'block';
                if (boxes[2] === 1) {
                    pageWin.className = 'screen screen-win screen-win-one';
                    pageWinMessage.innerHTML = playerOneName.innerHTML + ' Winner';
                    infoReset();
                } else if (boxes[2] === 2) {
                    pageWin.className = 'screen screen-win screen-win-two';
                    pageWinMessage.innerHTML = playerTwoName.innerHTML + ' Winner';
                    infoReset();
                }

            }
        } else if (boxes[0] === boxes[4] && boxes[4] === boxes[8]) {
            if (boxes[0] > 0 && boxes[4] > 0 && boxes[8] > 0) {
                board.style.display = 'none';
                pageWin.style.display = 'block';
                if (boxes[0] === 1) {
                    pageWin.className = 'screen screen-win screen-win-one';
                    pageWinMessage.innerHTML = playerOneName.innerHTML + ' Winner';
                    infoReset();
                } else if (boxes[0] === 2) {
                    pageWin.className = 'screen screen-win screen-win-two';
                    pageWinMessage.innerHTML = playerTwoName.innerHTML + ' Winner';
                    infoReset();
                }
            }
        } else if (boxes[2] === boxes[4] && boxes[4] === boxes[6]) {
            if (boxes[2] > 0 && boxes[4] > 0 && boxes[6] > 0) {
                board.style.display = 'none';
                pageWin.style.display = 'block';
                if (boxes[2] === 1) {
                    pageWin.className = 'screen screen-win screen-win-one';
                    pageWinMessage.innerHTML = playerOneName.innerHTML + ' Winner';
                    infoReset();
                } else if (boxes[2] === 2) {
                    pageWin.className = 'screen screen-win screen-win-two';
                    pageWinMessage.innerHTML = playerTwoName.innerHTML + ' Winner';
                    infoReset();
                }
            }
        } else if (gameSelections === 9) {
            pageWin.className = 'screen screen-win screen-win-tie';
            board.style.display = 'none';
            pageWin.style.display = 'block';
            pageWinMessage.innerHTML = 'TIE GAME';
        }
    }

    //function that resets info
    function infoReset() {
        gameSelections = 0;
        nameCount = 0;
        playerOneName.innerHTML = '';
        playerTwoName.innerHTML = '';
        newNameInput.placeholder = 'Enter player one name';
    }

    //when new game is pressed a new game is started
    pageNewGame.addEventListener('click', () => {
        if (nameCount > 0) {
            if (playerTwoName.innerHTML === '') {
                playerTwoName.innerHTML = 'Computer';
            }
            gameSelections = 0;
            pageWin.style.display = 'none';
            board.style.display = 'block';
            player1.className = 'players active';
            player2.className = 'players';
            for (let i = 1; i <= 17; i += 2) {
                boxGrid.childNodes[i].className = 'box';
                boxGrid.childNodes[i].value = 0;
            }
        }
    });

    //event listener for new name submit on winner page
    newNameButton.addEventListener('click', () => {
        if (nameCount === 0 && newNameInput.value.length > 0) {
            playerOneName.innerHTML = newNameInput.value;
            newNameInput.value = '';
            nameCount += 1;
            newNameInput.placeholder = 'Enter player two name';
        } else if (nameCount === 1 && newNameInput.value.length > 0) {
            playerTwoName.innerHTML = newNameInput.value;
            newNameInput.value = '';
            nameCount += 1;
            newNameInput.placeholder = 'New Game to Start';
        }
    });

})();