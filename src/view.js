export default class View {
    static colors = {
        '1': 'rgb(0, 255, 255)',
        '2': 'rgb(1, 175, 1)',
        '3': 'rgb(138, 0, 138)',
        '4': 'rgb(255, 0, 0)',
        '5': 'rgb(255, 136, 0)',
        '6': 'rgb(4, 0, 255)',
        '7': 'rgb(255, 255, 0)',
    }

    constructor(element, width, height, rows, columns) {
        this.element = element;
        this.width = width;
        this.height = height;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');

        this.playFieldBorderWidth = 2;
        this.playFieldX = this.playFieldBorderWidth;
        this.playFieldY = this.playFieldBorderWidth;
        this.playFieldWidth = this.width * 2 / 3;
        this.playFieldHeight = this.height;
        this.playFieldInnerWidth = this.playFieldWidth - this.playFieldBorderWidth * 2;
        this.playFieldInnerHeight = this.playFieldHeight - this.playFieldBorderWidth * 2;

        this.blockWidth = this.playFieldInnerWidth / columns;
        this.blockHeight = this.playFieldInnerHeight / rows;

        this.panelX = this.playFieldWidth + 5;
        this.panelY = 0;
        this.panelWidth = this.width / 3;
        this.panelHeight = this.height;

        this.element.appendChild(this.canvas);
    }

    render(state) {
        this.clearScreen();
        this.renderPlayField(state);
        this.renderPanel(state);
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.width, this.height)
    }

    renderPlayField({
        playField
    }) {
        for (let y = 0; y < playField.length; y += 1) {
            const line = playField[y];

            for (let x = 0; x < line.length; x += 1) {
                const block = line[x];

                if (block) {
                    this.renderBlock(
                        this.playFieldX + (x * this.blockWidth),
                        this.playFieldY + (y * this.blockHeight),
                        this.blockWidth,
                        this.blockHeight,
                        View.colors[block]
                    );
                }
            }
        }
        // this.context.strokeStyle = 'black';
        // this.context.lineWidth = this.playFieldBorderWidth;
        // this.context.strokeRect(0, 0, this.playFieldWidth, this.playFieldHeight);
    }

    renderPanel({
        level,
        score,
        lines,
        nextPiece,
    }) {
        this.context.textAlign = 'start'
        this.context.textBaseline = 'top'
        this.context.fillStyle = '#fff'
        this.context.font = '16px "Press Start 2p"'

        this.context.fillText(`Score ${score}`, 0, 0)
        this.context.fillText(`Lines ${lines}`, 0, 26)
        this.context.fillText(`Level ${level}`, 0, 50)
        this.context.fillText('Next', 0, 98)

        for (let y = 0; y < nextPiece.blocks.length; y++) {
            for (let x = 0; x < nextPiece.blocks[y].length; x++) {
                const block = nextPiece.blocks[y][x]

                if (block) {
                    this.renderBlock(
                        x * this.blockWidth,
                        y * this.blockHeight,
                        this.blockWidth,
                        this.blockHeight,
                        View.colors[block]
                    )
                }
            }
        }
    }

    renderBlock(x, y, width, height, color) {
        this.context.fillStyle = color;
        this.context.strokeStyle = '#231F20';
        this.context.lineWidth = 1;

        this.context.fillRect(x, y, width, height);
        this.context.strokeRect(x, y, width, height);
    }

}