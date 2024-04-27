class BinaryTreeNode {
    value = null;
    left = null;
    right = null;

    constructor(value) {
        this.value = value;
    }

    setLeft(node) {
        this.left = node;
    }

    setRight(node) {
        this.right = node;
    }

    getHeight() {
        let leftSideHeight = 0;
        let rightSideHeight = 0;
        // base case: if the node does not have child
        if (!this.left && !this.right) return 1;

        if (this.left) leftSideHeight =  this.left.getHeight();
        if (this.right) rightSideHeight = this.right.getHeight();
        return Math.max(leftSideHeight, rightSideHeight) + 1;
    }
}

export default BinaryTreeNode;