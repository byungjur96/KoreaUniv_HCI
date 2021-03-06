import { Primitive, Point, Line, Text, Circle, Elliptic, Rectangle, RoundedRectangle } from './primitive.js'
import { GUI, Title, Canvas, Button, RectangleButton, CircleButton, EllipticButton, Window, Table } from './gui.js'
import { createPrimitiveRoot, createGUIRoot, findPrimitive, findGUI, printTree, getPrimitiveRoot, getGUIRoot } from './display.js'

// 선을 그린다.
function drawLine(node, x, y) {
    if (node.type === "Line" && canvas.getContext) {
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(node.posX+x, node.posY+y);
        ctx.closePath();
        ctx.lineTo(node.endX, node.endY);
        ctx.lineWidth = 2;
        ctx.strokeStyle = node.color;
        ctx.stroke();
        return true;
    }
    else return false;
}

// 텍스트를 입력한다.
function drawText(node, x, y) {
    if (node.type === "Text" && canvas.getContext) {
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.font = node.font;
        ctx.fillStyle = node.color;
        let [posX, posY] = node.getAbsPos();
        ctx.textBaseline = node.textBaseline;
        ctx.textAlign = node.textAlign;
        let textLen = Math.round(ctx.measureText(node.contents).width);
        node.height = parseInt(node.font);
        node.width = textLen;
        ctx.fillText(node.contents, posX+x, posY+y);
        return true;
    }
    else return false;
}

// 원을 그린다.
function drawCircle(node, x, y) {
    if (node.type === "Circle" && canvas.getContext) {
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        let absPos = node.getAbsPos();
        let centerX = absPos[0] + node.posX + node.radius + x;
        let centerY = absPos[1] + node.posY + node.radius + y;
        ctx.arc(centerX, centerY, node.radius, 0, 2*Math.PI);
        ctx.fillStyle = node.background;
        ctx.strokeStyle = node.border;
        ctx.fill();
        ctx.stroke();
        return true;
    }
    else return false;
}

// 타원을 그린다.
function drawElliptic(node, x, y) {

}

// 직사각형을 그린다.
function drawRectangle(node, x, y) {
    if (node.type === "Rectangle" && canvas.getContext) {
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.fillStyle=node.background;
        let absPos = node.getAbsPos();
        let centerX = absPos[0] + node.posX + x;
        let centerY = absPos[1] + node.posY + y;
        let size = node.getSize();
        ctx.fillRect(centerX, centerY, size[0], size[1]);
        ctx.strokeStyle=node.border;
        ctx.strokeRect(centerX, centerY, size[0], size[1]);
        ctx.stroke();
        return true;
    }
    else return false;
}

// node의 종류에 따라 해당하는 node를 canvas에 표시한다.
function drawNode(node, x, y) {
    let type = node.type;
    let res = false;
    if (type === "Primitive" ) { res = true; }
    else if (type === "Point") { res = true; }
    else if (type === "Line") { res = drawLine(node, x, y); }
    else if (type === "Text") { res = drawText(node, x, y); }
    else if (type === "Circle") { res = drawCircle(node, x, y); }
    else if (type === "Elliptic") { res = drawElliptic(node, x, y); }
    else if (type === "Rectangle") { res = drawRectangle(node, x, y); }
    // else if (type === "RoundedRectangle") { drawCircle(node); }
    else { 
        console.warn("Wrong Node");
        console.log(node); 
    }
}

// GUI node에 대한 component를 canvas에 표시한다.
function drawGUI(gui) {
    let root = gui.component.findRoot();
    let [absX, absY] = gui.getAbsPos();
    drawPrimitiveTree(gui.component, absX, absY);
}

// 해당 primitive node를 root node로 가지는 subtree를 canvas에 표시한다.
function drawPrimitiveTree(node, x, y) {
    drawNode(node, x, y);
    if (node === undefined || node.children === undefined || node.children.length === 0) return;
    let children = node.children;
    for(let child of children) {
        drawPrimitiveTree(child, x, y);
    }
}

// 해당 gui node를 root node로 가지는 subtree를 canvas에 표시한다.
function drawGUITree(gui) {
    drawGUI(gui);
    if (gui === undefined || gui.children === undefined || gui.children.length === 0) return
    let children = gui.children;
    for(let child of children) {
        drawGUITree(child);
    }
}

export { drawLine, drawText, drawCircle, drawElliptic, drawRectangle, drawNode, drawPrimitiveTree, drawGUITree }