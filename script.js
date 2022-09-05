const memoryGame = {
    tileCount : 20, //liczba klocków
    tileOnRow : 5, //liczba klocków na rząd
    divBoard : null, //div z planszą gry
    divScore : null, //div z wynikiem gry
    tiles : [], //tutaj trafi wymieszana tablica klocków
    tilesChecked : [], //zaznaczone klocki
    moveCount : 0, //liczba ruchów
    tilesImg : [ //grafiki dla klocków
"Img/1.jpg",
"Img/2.jpg",
"Img/3.jpg",
"Img/4.jpg",
"Img/5.jpg",
"Img/6.jpg",
"Img/7.jpg",
"Img/8.jpg",
"Img/9.jpg",
"Img/10.jpg",
],
canGet : true, //czy można klikać na kafelki
tilePairs : 0, //liczba dopasowanych kafelkow

tileClick(e) {
    if (this.canGet) {
        //jeżeli jeszcze nie pobraliśmy 1 elementu
        //lub jeżeli index tego elementu nie istnieje w pobranych...
        if (!this.tilesChecked[0] || (this.tilesChecked[0].dataset.index !== e.target.dataset.index)) {
            this.tilesChecked.push(e.target);
            e.target.style.backgroundImage = `url(${this.tilesImg[e.target.dataset.cardType]})`;
        }

        if (this.tilesChecked.length === 2) {
            this.canGet = false;

            if (this.tilesChecked[0].dataset.cardType === this.tilesChecked[1].dataset.cardType) {
                setTimeout(() => this.deleteTiles(), 500);
            } else {
                setTimeout(() => this.resetTiles(), 500);
            }

            this.moveCount++;
            this.divScore.innerText = this.moveCount;
        }
    }
},

deleteTiles() {
    this.tilesChecked.forEach(el => {
        const emptyDiv = document.createElement("div");
        el.after(emptyDiv);
        el.remove();
    });

    this.canGet = true;
    this.tilesChecked = [];

    this.tilePairs++;

    if (this.tilePairs >= this.tileCount / 2) {
        alert("Udało ci się odgadnąć wszystkie obrazki");
    }
},

resetTiles() {
    this.tilesChecked.forEach(el => el.style.backgroundImage = "");
    this.tilesChecked = [];
    this.canGet = true;
},

startGame() {
    //czyścimy planszę
    this.divBoard = document.querySelector(".game-board");
    this.divBoard.innerText = "";

    //czyścimy planszę z ruchami
    this.divScore = document.querySelector(".game-score");
    this.divScore.innerText = 0;

    //czyścimy zmienne (bo gra może się zacząć ponownie)
    this.tiles = [];
    this.tilesChecked = [];
    this.moveCount = 0;
    this.canGet = true;
    this.tilePairs = 0;

    //generujemy tablicę numerów kocków (parami)
    for (let i=0; i<this.tileCount; i++) {
        this.tiles.push(Math.floor(i/2));
    }

    //i ją mieszamy
    for (let i=this.tileCount-1; i>0; i--) {
        const swap = Math.floor(Math.random()*i);
        const tmp = this.tiles[i];
        this.tiles[i] = this.tiles[swap];
        this.tiles[swap] = tmp;
    }

    for (let i=0; i<this.tileCount; i++) {
        const tile = document.createElement("div");
        tile.classList.add("game-tile");
        this.divBoard.appendChild(tile);

        tile.dataset.cardType = this.tiles[i];
        tile.dataset.index = i;

        tile.addEventListener("click", e => this.tileClick(e));
    }
}
};

document.addEventListener("DOMContentLoaded", () => {
const startBtn = document.querySelector(".game-start");
startBtn.addEventListener("click", e => memoryGame.startGame());
});