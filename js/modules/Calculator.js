class Calculator{
    constructor(config) {
        this.setConfig(config);
    }

    setConfig(config) {
        this.config = config;
    }

    start() {
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
        
        currWays.forEach((currWay) => {
            let currResult = result;
            if(currWay != 'λ') {
                currResult += currWay.slice(0, 1);
            }
            
            tree[currWay] = {
                result: currResult
            }
            this.buildTree(tree[currWay], currWay, currResult, limit)
        })
        return tree;
    }

    calcAll() {
        
        let result = {
            'S': {
                result: '',
            }
        };

        let currWays = this.config.ways['S'];

        this.config.limit--;

        currWays.forEach((currWay) => {
            result['S'][currWay] = {
                result: currWay.slice(0, 1)
            }
            this.buildTree(result['S'][currWay], currWay, currWay.slice(0, 1), this.config.limit);
        })
        

        return result;
        
    }
}

export default Calculator;