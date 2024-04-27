import BinaryTreeNode from "./binaryTreeNode.js";
import { drawNode, drawLine, getTreeHeight, getTreeWidth, DEAULT_CONFIG } from "./utils.js";

function binaryTree(root, canvasEl) {
    if (!canvasEl) throw new Error("canvas element not defined");
    if (canvasEl.tagName !== "CANVAS") throw new Error("Invalid canvas");

    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;
    
    canvasEl.width = maxWidth;
    canvasEl.height = maxHeight;

    const requiredTreeWidth = getTreeWidth(root);
    const requiredTreeHeight = getTreeHeight(root);

    const xStart = maxWidth/2 - requiredTreeWidth/2;
    const xEnd = maxWidth/2 + requiredTreeWidth/2;
    drawTree(root, canvasEl, {xStart, xEnd}, 0);
}

function drawTree(root, canvasEl, pos, level) {
    const {xStart, xEnd} = pos;
    const x = (xStart + xEnd)/2;
    const y = (level * DEAULT_CONFIG.nodeHeightSpacing) + DEAULT_CONFIG.nodeHeightSpacing/2;
    const coords = {x, y};
    drawNode(canvasEl, root.value, coords);
    if (root.left) {
        const leftNodeBoundary = {xStart: x-DEAULT_CONFIG.nodeWidthSpacing, xEnd: x };
        drawTree(root.left, canvasEl, leftNodeBoundary, level+1);
        const lineStart = {
            x: x,
            y: y+DEAULT_CONFIG.radius
        }
        const lineEnd = {
            x: (leftNodeBoundary.xStart + leftNodeBoundary.xEnd)/2,
            y: (((level+1) * DEAULT_CONFIG.nodeHeightSpacing) + DEAULT_CONFIG.nodeHeightSpacing/2) - DEAULT_CONFIG.radius
        }
        drawLine(canvasEl, lineStart, lineEnd, true);
    }
    if (root.right) {
        const rightBoundary = {xStart: x, xEnd: x+DEAULT_CONFIG.nodeWidthSpacing};
        drawTree(root.right, canvasEl, rightBoundary, level+1);
        const lineStart = {
            x: x,
            y: y+DEAULT_CONFIG.radius
        }
        const lineEnd = {
            x: (rightBoundary.xStart + rightBoundary.xEnd)/2,
            y: (((level+1) * DEAULT_CONFIG.nodeHeightSpacing) + DEAULT_CONFIG.nodeHeightSpacing/2) - DEAULT_CONFIG.radius
        }
        drawLine(canvasEl, lineStart, lineEnd, false)
    }
}

function parseTree(nodes=[]) {
    let queue = []
    const root = nodes.shift();
    queue.push(root);
    while(nodes.length > 0 && queue.length > 0) {
        let currNode = queue.shift();
        const left = nodes.shift();
        const right = nodes.shift();
        if (left) {
            currNode.setLeft(left);
            queue.push(left);

        }
        if (right) {
            currNode.setRight(right);
            queue.push(right);
        }
    }
    return root;
}
const canvasEl = document.getElementById("tree");
document.getElementById("apply-button").addEventListener("click", apply);

function apply() {
    const value = document.getElementById("input-field").value;
    const nodes = String(value).split(",").map(v=>new BinaryTreeNode(v.trim()));
    const root = parseTree(nodes);
    binaryTree(root, canvasEl);
}


// binaryTree(root, canvasEl);
