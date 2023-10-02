class RenderTree {
    constructor(root, config) {
        this.root = root;
        this.result = '';
        this.config = config;
    }

    isEmptyNode(result) {
        for(let key in result) {
            if(key != 'result') {
                return false;
            }
        }
        return true;
    }

    buildTree(result) {
        if(this.isEmptyNode(result)) {
            return '';
        }
        let treeHTML = '<ul>';
        for(let key in result) {
            let resutlStr = key.replaceAll('λ', '');
            let resultLength = 0;
            for(let symbol of key) {
                if(this.config.notTerm.includes(symbol)) {
                    resultLength++;
                }
            }
            if(resultLength > this.config.max || resultLength < this.config.min) {
                this.buildTree(result[key]);
                console.log(key);
                continue;
            }
            treeHTML += `
                <li>
                    <span class="tf-nc">
                        <div class="tree-key">Результат<br>${resutlStr}</div>
                    </span>
                    ${this.buildTree(result[key])}
                </li>
            `;
        }
        treeHTML += '</ul>';
        return treeHTML;
    }

    update(result) {
        let treeHTML = this.buildTree(result);
        this.root.innerHTML = treeHTML;
    }
}

export default RenderTree;