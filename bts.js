class Node{
    constructor(d){
        this.data = d;
        this.left = null;
        this.right = null;
    }
}

class Tree{
    constructor(){
        this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
    }

    buildTree(array){
        if(array.length === 0) return null;

        const mid = Math.floor(array.length / 2);
        const root = new Node(array[mid]);

        root.left = this.buildTree(array.slice(0, mid));
        root.right = this.buildTree(array.slice(mid + 1));

        return root;
    }

    insert(value){
        this.root = this._insertRec(this.root,value);
    }

    _insertRec(node, value){
        if(node === null) return new Node(value);

        if(value < node.data){
            node.left = this._insertRec(node.left, value);
        } else if(value > node.data){
            node.right = this._insertRec(node.right, value);
        }
        return node;
    }

    deleteItem(value){
        this.root = this._deleteRec(this.root, value);
    }
    _deleteRec(node, value){
        if(node === null) return node;

        if(value < node.data){
            node.left = this._deleteRec(node.left, value);
        } else if(value > node.data){
            node.right = this._deleteRec(node.right, value);
        } else {
            // Node with only one child or no child
            if(node.left === null) return node.right;
            else if(node.right === null) return node.left;

            // Node with 2 children(inorder successor)
            node.data = this._minValue(node.right);

            // Delete the inorder successor
            node.right = this._deleteRec(node.right, node.data);
        }
        return node;
    }

    _minValue(node) {
        let current = node;
        while(current.left !== null){
            current = current.left;
        }
        return current.data;
    }

    find(value){
        return this._findRec(this.root, value);
    }

    _findRec(node, value){
        if(node === null || node.data === value){
            return node;
        }
        if(value < node.data){
            return this._findRec(node.left, value);
        }   else{
            return this._findRec(node.right, value);
        }
    }

    levelOrder(callback){
        if(this.root === null) return [];

        const queue = [this.root];
        const result = [];
        
        while (queue.length > 0){
            const node = queue.shift();
            if(callback){
                callback(node);
            }   else{
                result.push(node.data);
            }

            if(node.left !== null) queue.push(node.left);
            if(node.right !== null) queue.push(node.right);
        }
        if(!callback) return result;
    }

    _traverse(node, callback, order){
        if(node === null) return [];

        const left = this._traverse(node.left, callback, order);
        const right = this._traverse(node.right, callback, order);

        if(callback){
            callback(node);
        } else{
            switch(order) {
                case 'in':
                    return [...left, node.data, ...right];
                case 'pre':
                    return [node.data, ...left, ...right];
                case 'post':
                    return [...left, ...right, node.data];
            }
        }
    }
    inOrder(callback){
        return this._traverse(this.root, callback,'in');
    }
    preOrder(callback){
        return this._traverse(this.root, callback,'pre');
    }
    postOrder(callback){
        return this._traverse(this.root, callback, 'post');
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};


// Example Usage
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);

tree.insert(10);
prettyPrint(tree.root);

tree.deleteItem(7);
prettyPrint(tree.root);

const foundNode = tree.find(9);
console.log('Found node:', foundNode);

const levelOrderResult = tree.levelOrder();
console.log('Level Order traversal:', levelOrderResult);

// In-order traversal
const inOrderResult = tree.inOrder();
console.log('In-order traversal:', inOrderResult);

// Pre-order traversal
const preOrderResult = tree.preOrder();
console.log('Pre-order traversal:', preOrderResult);

// Post-order traversal
const postOrderResult = tree.postOrder();
console.log('Post-order traversal:', postOrderResult);
