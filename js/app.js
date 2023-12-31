import RenderTree from './modules/Render.js';
import {bindListenersOnForms, showError} from './modules/UI.js';
import Input from './modules/Input.js';
import Calculator from './modules/Calculator.js';

bindListenersOnForms();

const gramForm = document.querySelector('#gram-form');
let input = new Input(gramForm);

let calculator = new Calculator();

const startButton = document.querySelector('#start-button');


startButton.addEventListener('click', (event) => {
    calculator.setConfig(input.getAll());
    let calcResult = calculator.start();
    console.log(calcResult);

    if(calcResult.body != 'error') {
        const outputNode = document.querySelector('.result');
        let renderTree = new RenderTree(outputNode, input.getAll());
        renderTree.update(calcResult.body);
        
        /*const outputNode = document.querySelector('.result');
        outputNode.innerText = calcResult.body;*/
    }
    else {
        showError(calcResult.error);
    }
})