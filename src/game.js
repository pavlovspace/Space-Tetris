export default class Game {

    score = 0;
    lines = 0;
    level = 0;

    playField = this.createPlayField();
    activePiece = {
        x: 0,
        y: 0,

        get blocks() {
            return this.rotations[this.rotationIndex]
        },

        rotationIndex: 0,

        blocks: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ]
    }


    getState() {
        const playField = this.createPlayField();
        const {
            y: pieceY,
            x: pieceX,
            blocks
        } = this.activePiece;

        for (let y = 0; y < this.playField.length; y++) {
            playField[y] = [];

            for (let x = 0; x < this.playField[y].length; x++) {
                playField[y][x] = this.playField[y][x];
            }
        }

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x]) {
                    playField[pieceY + y][pieceX + x] = blocks[y][x]
                }
            }
        }

        return {
            playField
        }
    }

    createPlayField() {
        const playField = [];
        for (let y = 0; y < 20; y++) {
            playField[y] = [];

            for (let x = 0; x < 10; x++) {
                playField[y][x] = 0;
            }

        }
        return playField;
    }

    movePieceLeft() {
        this.activePiece.x -= 1;

        if (this.hasCollision()) {
            this.activePiece.x += 1
        }
    }

    movePieceRight() {
        this.activePiece.x += 1;

        if (this.hasCollision()) {
            this.activePiece.x -= 1
        }
    }

    movePieceDown() {
        this.activePiece.y += 1;

        if (this.hasCollision()) {
            this.activePiece.y -= 1
            this.lockPiece()
        }
    }

    rotatePiece() {

        this.rotateBlocks();
        if (this.hasCollision()) {
            this.rotateBlocks(false)
        }
    }

    //obracamy figurę
    rotateBlocks(clockwise = true) {
        const blocks = this.activePiece.blocks;
        const length = blocks.length;
        const x = Math.floor(length / 2);
        const y = length - 1;

        for (let i = 0; i < x; i++) {
            for (let j = i; j < y - i; j++) {
                const temp = blocks[i][j];

                if (clockwise) {
                    blocks[i][j] = blocks[y - j][i];
                    blocks[y - j][i] = blocks[y - i][y - j];
                    blocks[y - i][y - j] = blocks[j][y - i];
                    blocks[j][y - i] = temp;
                } else {
                    blocks[i][j] = blocks[j][y - i];
                    blocks[j][y - i] = blocks[y - i][y - j];
                    blocks[y - i][y - j] = blocks[y - j][i];
                    blocks[y - j][i] = temp;
                }
            }
        }
    }

    hasCollision() {
        const {
            y: pieceY,
            x: pieceX,
            blocks
        } = this.activePiece;

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x] &&
                    ((this.playField[pieceY + y] === undefined || this.playField[pieceY + y][pieceX + x] === undefined) ||
                        this.playField[pieceY + y][pieceX + x])
                ) {
                    return true;
                }
            }

        }

        return false;
    }

    // przenosimy wartości blocks do playField
    lockPiece() {
        const {
            y: pieceY,
            x: pieceX,
            blocks
        } = this.activePiece;

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x]) {
                    this.playField[pieceY + y][pieceX + x] = blocks[y][x];
                }
            }
        }
    }
}