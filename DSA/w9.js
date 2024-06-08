function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
function larget(root) {
    if (root === null) return [];
    return [...inorderTraversal(root.left), root.val, ...inorderTraversal(root.right)];
}
function largestValue(root) {
    if (!root) return [];
    const result = [];
    const queue = [root];
    while (queue.length) {
        let max = Number.MIN_SAFE_INTEGER;
        for (let i = 0, len = queue.length; i < len; i++) {
            const node = queue.shift();
            max = Math.max(max, node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(max);
    }
    return result;
}
function getHeight(root) {
    if (root.index >= root.array.length || root.array[root.index] === null) {
        return 0;
    } else {
        let leftHeight = getHeight({index: 2 * root.index + 1, array: root.array});
        let rightHeight = getHeight({index: 2 * root.index + 2, array: root.array});
        return 1 + Math.max(leftHeight, rightHeight);
    }
}


function arrayToBinaryTree(data) {
    if (!data.length) return null;
    const root = new TreeNode(data[0]);
    const queue = [root];
    let i = 1;
    while (queue.length && i < data.length) {
        const current = queue.shift();
        if (data[i] !== null) {
            current.left = new TreeNode(data[i]);
            queue.push(current.left);
        }
        i++;
        if (i < data.length && data[i] !== null) {
            current.right = new TreeNode(data[i]);
            queue.push(current.right);
        }
        i++;
    }
    return root;
}
// Test data
let data = [1, 2, 3, 4, 5, null, null, null, null, 10, 15];

// Convert array to binary tree
let root = arrayToBinaryTree(data);

// Calculate height of the binary tree
let height = getHeight({index: 0, array: data});

// Print the height
console.log(`The height of the binary tree is ${height}`);