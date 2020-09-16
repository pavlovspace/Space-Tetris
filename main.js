import Game from './src/game.js';
import eyeMove from './src/alien.js';
import View from './src/view.js';
import Control from './src/control.js';

const root = document.querySelector('#root')

const game = new Game()
const view = new View(root, 480, 640, 20, 10)
const control = new Control(game, view)

window.game = game;
window.view = view;
window.control = control;