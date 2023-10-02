class Input {
    constructor() {
        this.gram = document.querySelector('#gram-form');
        this.limitInput = document.querySelector('#limit-input');
        this.termInput = document.querySelector('#term-alphabet');
        this.notTermInput = document.querySelector('#not-term-alphabet');
        this.startInput = document.querySelector('#start-input');
        this.minDiapInput = document.querySelector('#diap-min-input');
        this.maxDiapInput = document.querySelector('#diap-max-input');
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

    getTerm() {
        return this.termInput.value.split(' ');
    }

    getNoTerm() {
        return this.notTermInput.value.split(' ');
    }

    getStart() {
        return this.startInput.value;
    }

    getMin() {
        return this.minDiapInput.value;
    }

    getMax() {
        return this.maxDiapInput.value;
    }

    getAll() {
        return {
            'ways': this.getGram(),
            'limit': this.getLimit(),
            'term': this.getTerm(),
            'notTerm': this.getNoTerm(),
            'start': this.getStart(),
            'min': this.getMin(),
            'max': this.getMax()
        }
    }

}

export default Input;