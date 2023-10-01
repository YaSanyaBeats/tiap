function bindListenersOnForms() {
    //Templates
    const gramRowNode = document.querySelector('#gram-row');
    const gramColNode = document.querySelector('#gram-col');
    const gramColLambdaNode = document.querySelector('#gram-col-lambda');
    const manualColNode = document.querySelector('#manual-col');

    //Wrappers
    const manualForm = document.querySelector('#manual-form');
    const gramForm = document.querySelector('#gram-form');
    const resultWrapper = document.querySelector('.result');

    //Buttons
    const gramRowButton = document.querySelector('#gram-row-button');

    //Inputs
    const limitInput = document.querySelector('#limit-input');
    const modeRadioInputs = document.querySelectorAll('.mode-radio');
    const scaleRangeInput = document.querySelector('#scaleRangeInput');

    gramRowButton.addEventListener('click', (event) => {
        let gramRowContent = gramRowNode.content.cloneNode(true);
        const gramColButtonAdd = gramRowContent.querySelector('.gram-col-button-add');
        const gramColButtonLambda = gramRowContent.querySelector('.gram-col-button-lambda');
        const gramColButtonDelete = gramRowContent.querySelector('.gram-col-button-delete');

        gramColButtonAdd.addEventListener('click', (event) => {
            gramColButtonAdd.parentElement.before(gramColNode.content.cloneNode(true));
        })

        gramColButtonLambda.addEventListener('click', (event) => {
            gramColButtonAdd.parentElement.before(gramColLambdaNode.content.cloneNode(true));
            gramColButtonLambda.parentElement.remove();
        })

        gramColButtonDelete.addEventListener('click', (event) => {
            gramColButtonDelete.parentElement.parentElement.remove();
        })

        gramRowButton.parentElement.before(gramRowContent);
        
    })

    scaleRangeInput.addEventListener('input', (event) => {
        resultWrapper.style.fontSize = scaleRangeInput.value + 'px';
    })
}

export default bindListenersOnForms;