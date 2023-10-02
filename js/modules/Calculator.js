function checkInArray(symbol, array) {
    let result = false;
    array.forEach((elem) => {
        if(elem == symbol) {
            result = true;
        }
    })

    return result;
}

class Calculator{
    constructor(config) {
        this.setConfig(config);
        this.error = '';
    }

    setConfig(config) {
        this.config = config;
    }

    isUniq(array) {
        for (let i = 0; i < array.length; i++) {
            for (let j = i + 1; j < array.length; j++) {
                if(array[i] == array[j]) {
                    return false;
                }
            }
        }
        return true;
    }

    isValidSymbols(array) {
        for (let elem of array) {
            if(!elem || elem.length > 1 || elem == 'λ') {
                return false;
            }
        }
        return true;
    }

    checkGram() {
        
        for(let way in this.config.ways) {
            if(!this.config.term.includes(way)) {
                return false;
            }

            let wayValues = this.config.ways[way];
            for(let wayValue of wayValues) {
                if(!wayValue) {
                    return false;
                }

                if(wayValue == 'λ') {
                    continue;
                }

                for(let symbol of wayValue) {
                    if(!this.config.term.includes(symbol) && !this.config.notTerm.includes(symbol)) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    checkStart() {
        if(!this.config.start ||!this.config.term.includes(this.config.start) || !this.config.start == 1) {
            return false;
        }

        return true;
    }

    validate() {
        console.log(this.config);

        if(!this.isValidSymbols(this.config.term)) {
            this.error = 'Невалидный символ в нетерминальном алфавите';
            return false;
        }


        if(!this.isValidSymbols(this.config.notTerm)) {
            this.error = 'Невалидный символ в терминальном алфавите';
            return false;
        }

        if(!this.isUniq(this.config.term.concat(this.config.notTerm))) {
            this.error = 'В алфавитах присутствует неуникальный символ';
            return false;
        }

        if(!this.checkStart()) {
            this.error = 'Невалидный стартовый символ';
            return false;
        }

        if(Object.keys(this.config.ways).length == 0) {
            this.error = 'Пустая грамматика';
            return false;
        }

        if(!this.checkGram()) {
            this.error = 'Ошибка в грамматике';
            return false;
        }

        if(this.config.min > this.config.max) {
            this.error = 'Минимум больше максимума';
            return false;
        }

        if(this.config.min != Math.ceil(this.config.min)) {
            this.error = 'Минимум должен быть целым числом';
            return false;
        }

        if(this.config.max != Math.ceil(this.config.max)) {
            this.error = 'Максимум должен быть целым числом';
            return false;
        }

        return true;
    }

    start() {
        if(!this.validate()) {
            return {
                body: 'error',
                error: this.error
            } 
        }

        return this.calcAll();
    }

    executeStep(str, limit) {
        if(limit < 0) {
            return;
        }

        limit--;

        let result = {};

        for(let way in this.config.ways) {
            if(str.includes(way)) {
                for(let newStr of this.config.ways[way]) {
                    let resultStr = str.replace(way, newStr)
                    result[resultStr] = this.executeStep(resultStr, limit)
                }
            }
        }

        return result;

        /*let result = [];
        
        for (let str of array) {
            let buffer1 = [''];
            while(str.length > 0) {
                let symbol = str[0];
                str = str.slice(1);
                
                let buffer2 = [];
                
    
                if(this.config.term.includes(symbol)) {
                    for(let way of this.config.ways[symbol]) {
                        for (let elem of buffer1) {
                            buffer2.push(elem + way);
                        }
                    }
                }
                else {
                    for (let elem of buffer1) {
                        buffer2.push(elem + symbol);
                    }
                }

                buffer1 = buffer2.concat();
            }

            result = result.concat(buffer1);
        }

        return result;*/
    }

    calcAll() {
        let result = {
            body: {}
        };

        result.body[this.config.start] = this.executeStep(this.config.start, this.config.limit - 1)
        return result;
        
    }
}

export default Calculator;