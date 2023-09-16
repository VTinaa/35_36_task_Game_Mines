import { Grid } from "./grid.js";


export class Game {
    constructor(gridElement, mines = 10) {
        this.board = new Grid(gridElement)
        this.boardValue = this.helperArray(0)
        this.flag = this.helperArray(false)
        // console.log(this.boardValue)

        this.mines = mines;
        this.placeMines()
        // console.log(this.boardValue)

        this.handlerClick()
        // console.log(this.board)
        this.helpHandler();
    }

    handlerClick() {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                this.board[i][j].addEventListener('click', () => {
                    // this.board[i][j].textContent = `${i},${j}`;
                    // console.log(this.countMines(i,j))
                    this.revelod(i, j)
                })
            }
        }
    }
    helperArray(value) {
        let tmp = []
        for (let i = 0; i < this.board.length; i++) {
            let row = []
            for (let j = 0; j < this.board.length; j++) {
                row.push(value)
            }
            tmp.push(row)
        }
        return tmp;
    }
    placeMines() {
        let counter = 0;
        while (counter < this.mines) {
            let x = parseInt(Math.random() * this.board.length)
            let y = parseInt(Math.random() * this.board.length)
            // console.log(x,y)
            if (this.boardValue[x][y] != -1) {
                this.boardValue[x][y] = -1
                counter++;
            }
        }
    }
    countMines(x, y) {
        let counter = 0;
        if (x > 0 && this.boardValue[x - 1][y] == -1) {
            counter++
        }
        if (x < this.board.length - 1 && this.boardValue[x + 1][y] == -1) {
            counter++
        }
        if (y > 0 && this.boardValue[x][y - 1] == -1) {
            counter++
        }
        if (y < this.board.length - 1 && this.boardValue[x][y + 1] == -1) {
            counter++
        }

        if (x > 0 && y > 0 && this.boardValue[x - 1][y - 1] == -1) {
            counter++
        }
        if (x < this.board.length - 1 && y > 0 && this.boardValue[x + 1][y - 1] == -1) {
            counter++
        }
        if (x > 0 && y < this.board.length - 1 && this.boardValue[x - 1][y + 1] == -1) {
            counter++
        }
        if (x < this.board.length - 1 && y < this.board.length - 1 && this.boardValue[x + 1][y + 1] == -1) {
            counter++
        }
        return counter;
    }

    revelod(x, y) {

        if (this.boardValue[x][y] == -1) {
            // this.board[x][y].textContent = '*';// показує м!ну
            // this.flag[x][y] = true;
            //викликати метот endGame коли 
            this.endGame()
        }
        else if (!this.flag[x][y]) {
            let mines = this.countMines(x, y);
            this.flag[x][y] = true;
            this.board[x][y].textContent = mines;
            this.print(x, y)
            if (mines == 0) {
                if (x > 0) {
                    this.revelod(x - 1, y);
                }
                if (x < this.board.length - 1) {
                    this.revelod(x + 1, y);
                }
                if (y > 0) {
                    this.revelod(x, y - 1);
                }
                if (y < this.board.length - 1) {
                    this.revelod(x, y + 1);
                }
                if (x > 0 && y > 0) {
                    this.revelod(x - 1, y - 1);
                }
                if (x < this.board.length - 1 && y < this.board.length - 1) {
                    this.revelod(x + 1, y + 1);
                }
                if (x > 0 && y < this.board.length - 1) {
                    this.revelod(x - 1, y + 1);
                }
                if (y > 0 && x < this.board.length - 1) {
                    this.revelod(x + 1, y - 1)
                }
            }
            this.winGame()
        }
    }
    print(x, y) {
        this.board[x][y].classList.add('visible')
        if (this.board[x][y].textContent == 0) {
            this.board[x][y].textContent == " "
        }
        else if (this.board[x][y].textContent == 1) {
            this.board[x][y].style.color = 'blue'
        }
        else if (this.board[x][y].textContent == 2) {
            this.board[x][y].style.color = 'green'
        }
        else if (this.board[x][y].textContent == 3) {
            this.board[x][y].style.color = 'red'
        }
        else if (this.board[x][y].textContent == 4) {
            this.board[x][y].style.color = 'darkblue'
        }
        else if (this.board[x][y].textContent == 5) {
            this.board[x][y].style.color = 'brown'
        }
    }


    winGame() {// когда открит! вс! поля без м!н
        // if(this.flag[x][y]){
        //     this.flag[x][y] - 10 == true;
        // }
        let end = document.querySelector('.theEnd')
        let number = 0;
        for (let i = 0; i < this.flag.length; i++) {
            for (let j = 0; j < this.flag.length; j++) {

                if (this.flag[i][j] == true) {

                    number++;
                }
            }


        }
        if (number == (this.board.length ** 2) - this.mines) {
            end.classList.add('theEndd')
            end.textContent = "Ви виграли!"
        }

    }



    endGame() { // коли натиснули по ком!рц! з м!ною
        let end = document.querySelector('.theEnd')
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {

                if (this.boardValue[i][j] == -1) {
                    // this.board[i][j].textContent = "*"
                    this.board[i][j].textContent = "🚩"
                    //     const flagImage = document.createElement("img");
                    // flagImage.src = "https://w7.pngwing.com/pngs/1008/604/png-transparent-red-pennant-flag-red-flag-small-red-flag-miscellaneous-angle-flag-thumbnail.png";

                    // flagImage.style.width = "30px";
                    // flagImage.style.height = "30px";

                    // this.board[i][j].textContent = "";
                    // this.board[i][j].appendChild(flagImage);
                }
            }

        }
        end.classList.add('theEndd')
        end.textContent = "Ви програли!"

    }

    //restartGame() //почати сначала

    // helpHandler() // флажок
    helpHandler() {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                const cell = this.board[i][j];

                // Додаємо обробник події для лівого кліку
                cell.addEventListener('click', () => {
                    this.revelod(i, j);
                });

                // Додаємо обробник події для правого кліку (контекстне меню)
                cell.addEventListener('contextmenu', (event) => {
                    event.preventDefault(); // Забороняємо стандартне контекстне меню
                    this.toggleFlag(i, j); // Встановлюємо або видаляємо флажок
                });
            }
        }
    }

    toggleFlag(x, y) {
        if (!this.flag[x][y]) {
            this.board[x][y].textContent = "🚩";
        } else {
            this.board[x][y].textContent = "";
        }
        this.flag[x][y] = !this.flag[x][y];
    }


}