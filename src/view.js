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

        this.blockWidth = this.width / columns;
        this.blockHeight = this.height / rows;


        this.element.appendChild(this.canvas);
    }
    render({
        playField
    }) {
        this.clearScreen();
        this.renderPlayField(playField);
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.width, this.height)
    }

    renderPlayField(playField) {
        for (let y = 0; y < playField.length; y++) {
            const line = playField[y];

            for (let x = 0; x < line.length; x++) {
                const block = line[x];

                if (block) {
                    this.renderBlock(x * this.blockWidth, y * this.blockHeight, this.blockWidth, this.blockHeight, View.colors[block])

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