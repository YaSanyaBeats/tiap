class RenderTree {
    constructor(root) {
        this.root = root;
        this.result = '';
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
            treeHTML += `
                <li>
                    <span class="tf-nc">
                        <div class="tree-key">Результат<br>${key}</div>
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