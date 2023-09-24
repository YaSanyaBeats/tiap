import RenderTree from './modules/Render.js';
import bindListenersOnForms from './modules/UI.js';
import Input from './modules/Input.js';
import Calculator from './modules/Calculator.js';

bindListenersOnForms();

const gramForm = document.querySelector('#gram-form');
let input = new Input(gramForm);

let calculator = new Calculator();

const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', (event) => {
    calculator.setConfig(input.getAll());
    let result = calculator.start();
    console.log(result);

    const outputNode = document.querySelector('.result');
    let renderTree = new RenderTree(outputNode);
    renderTree.update(result);
})