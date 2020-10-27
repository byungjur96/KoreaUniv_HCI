import { Primitive, Point, Line, Text, Circle, Elliptic, Rectangle, RoundedRectangle } from '../common/primitive.js'
import { GUI, Title, Canvas, Button, RectangleButton, CircleButton, EllipticButton, Window, Table } from '../common/gui.js'
import { createPrimitiveRoot, createGUIRoot, findPrimitive, findGUI, printTree, getPrimitiveRoot, getGUIRoot } from '../common/display.js'

let canvas = document.getElementById("canvas");
let roots = getGUIRoot();

canvas.addEventListener("click", (event) => {
    let [posX, posY] = getClickPos(event);
    let guis = [];
    console.clear();
    console.log(posX, posY);
    for (let root of roots) {
        let [guiX, guiY] = root.getAbsPos();
        let gui = traverseGUI(root, posX, posY);
        guis = guis.concat(gui);
    }
    console.log(guis);
    // let lst = primitives.map(a => a.getId().slice(4).split("-"));
    // console.log(lst);
})

function getClickPos(e) {
    // 실제 화면에 표시된 canvas 사이즈
    let realWidth = e.target.clientWidth;
    let realHeight = e.target.clientHeight;

    // 실제 클릭된 화면 위치
    let realX = e.offsetX;
    let realY = e.offsetY;

    // canvas 내의 위치
    let canvasX = Math.round(realX * (2000/realWidth));
    let canvasY = Math.round(realY * (2000/realHeight));

    return [canvasX, canvasY];
}

function traverseGUI(gui, x, y) {
    let primitive = [];
    let guiList = [];
    let [posX, posY] = gui.getAbsPos();
    console.log(gui.id, gui.type);
    console.log(gui.getAbsPos());
    let inRange = isRange(gui.getComponent(), x-posX, y-posY);
    let lst = traverseNode(gui.getComponent(), x-posX, y-posX);
    console.log(lst);
    if (inRange) guiList.push(gui);
    for (let child of gui.children) {
        let [guiX, guiY] = child.getAbsPos();
        let g = traverseGUI(child, x, y);
        guiList = guiList.concat(g);
    }
    return guiList;
}

function isRange(node, x, y) {
    let inRange = false;
    let [posX, posY] = node.getAbsPos();
    let [width, height] = node.getSize();
    if (posX <= x && x <= posX+width && posY <= y && y <= posY+height) {
        console.log(node);
        return true;
    }
    if (node.children === []) {
        return inRange;
    }
    for (let child of node.children) {
        inRange = inRange || isRange(child, x, y);
    }
    return inRange;
}

function traverseNode(node, x, y) {
    let result = [];
    let [posX, posY] = node.getAbsPos();
    let [width, height] = node.getSize();
    if (posX <= x && x <= posX+width && posY <= y && y <= posY+height) {
        result.push(node);
    }
    if (node.children === []) {
        return result;
    }
    for (let child of node.children) {
        result = result.concat(traverseNode(child, x, y));
    }
    return result;
}