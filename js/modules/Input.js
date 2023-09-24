class Input {
    constructor() {
        this.gram = document.querySelector('#gram-form');
        this.limitInput = document.querySelector('#limit-input');
    }

    getGram() {
        let result = {};

        let currentStart;
        this.gram.querySelectorAll('input').forEach((input) => {
            if(input.classList.contains('gram-start')) {
                currentStart = input.value;
                return;
            }
            
            if(result[currentStart]) {
                result[currentStart].push(input.value);
            }
            else {
                result[currentStart] = [input.value];
            }
        });

        return result;
    }

    getLimit() {
        return this.limitInput.value;
    }

    getAll() {
        return {
            'ways': this.getGram(),
            'limit': this.getLimit(),
        }
    }

}

export default Input;