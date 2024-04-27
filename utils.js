export const DEAULT_CONFIG = {
    radius: 20,
    nodeWidthSpacing: 60,
    nodeHeightSpacing: 90,
    fontSize: 20
}

export function getTreeHeight(root) {
    return root.getHeight() * DEAULT_CONFIG.nodeHeightSpacing;
}

export function getTreeWidth(root) {
    return Math.pow(2, (root.getHeight() - 1)) * DEAULT_CONFIG.nodeWidthSpacing;
}

export function drawNode(canvasEl, value, pos) {
    const {x, y} = pos;
    const ctx = canvasEl.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, DEAULT_CONFIG.radius, 0, 2*Math.PI);
    ctx.fillStyle = "blue"
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillStyle = "white"
    ctx.font = `${DEAULT_CONFIG.fontSize}px Arial`;
    ctx.fillText(value, x - DEAULT_CONFIG.fontSize/2, y + DEAULT_CONFIG.fontSize/2)
}

export function drawLine(canvasEl, startCoords, endCoords, isLeft) {
    const ctx = canvasEl.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(startCoords.x, startCoords.y);
    let controlPoint1 = {x: startCoords.x, y: (endCoords.y + startCoords.y)/2};
    let controlPoint2 = {x: endCoords.x, y: (endCoords.y + startCoords.y)/2};
    ctx.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, endCoords.x, endCoords.y);
    ctx.stroke();
}