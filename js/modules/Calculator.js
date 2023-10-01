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
    }

    setConfig(config) {
        this.config = config;
        console.log(this.config);
    }

    start() {

        for(let way in this.config.ways) {
            if(!checkInArray(way, this.config.notTerm)) {
                alert("Ошибка нетерминального алфавита");
                return;
            }
            let innerWays = this.config.ways[way];
            innerWays.forEach((innerWay) => {
                let symbols = innerWay.split('');
                symbols.forEach((symbol) => {
                    if(!checkInArray(symbol, this.config.term) && !checkInArray(symbol, this.config.notTerm)) {
                        alert("Ошибка терминального ошибка");
                        return;
                    }
                })
            })
        }

        return this.calcAll();
    }

    buildTree(tree, way, result, limit) {
        if(limit <= 0) {
            return tree;
        }
        limit--;
        if(way == 'λ') {
            return tree;
        }

        let currWays = this.config.ways[way.slice(-1)];

        if(!currWays) {
            return tree;
        }
        
        currWays.forEach((currWay) => {
            let currResult = result;
            let isValue = true;

            if(currWay != 'λ') {
                for(let way in this.config.ways) {
                    if(way == currWay.slice(0, -1)) {
                        isValue = false;
                    }
                }
                if(isValue) {
                    currResult += currWay.slice(0, -1);
                }
            }
            
            tree[currWay] = {
                result: currResult
            }
            this.buildTree(tree[currWay], currWay, currResult, limit)
        })
        return tree;
    }

    calcAll() {
        
        let result = {};

        result[this.config.start] = {
            result: ''
        }

        let currWays = this.config.ways[this.config.start];

        this.config.limit--;

        currWays.forEach((currWay) => {
            let currResult = '';
            let isValue = true;

            if(currWay != 'λ') {
                for(let way in this.config.ways) {
                    if(way == currWay.slice(0, -1)) {
                        isValue = false;
                    }
                }
                if(isValue) {
                    currResult += currWay.slice(0, -1);
                }
            }

            result[this.config.start][currWay] = {
                result: currResult
            }
            this.buildTree(result[this.config.start][currWay], currWay, currResult, this.config.limit);
        })
        

        return result;
        
    }
}

export default Calculator;