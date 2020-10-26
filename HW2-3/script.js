import { Primitive, Point, Line, Text, Circle, Elliptic, Rectangle, RoundedRectangle } from '../common/primitive.js'
import { GUI, Title, Canvas, Button, RectangleButton, CircleButton, EllipticButton, Window, Table } from '../common/gui.js'
import { createPrimitiveRoot, createGUIRoot, findPrimitive, findGUI, printTree, getPrimitiveRoot, getGUIRoot } from '../common/display.js'

let canvas = document.getElementById("canvas");
let roots = getGUIRoot();

canvas.addEventListener("click", (event) => {
    let [posX, posY] = getClickPos(event);
    let primitives = [];
    let guis = [];
    console.log(posX, posY);
    for (let root of roots) {
        let [gui, primitive] = traverseGUI(root, posX, posY);
        primitives = primitives.concat(primitive);
        guis = guis.concat(gui);
    }
    console.log(guis);
    console.log(primitives);
    let lst = primitives.map(a => a.getId().slice(4).split("-"));
    console.log(lst);
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

function traverseGUI(node, x, y) {
    let primitive = [];
    let gui = [];
    let nodes = traverseNode(node.getComponent(), x, y);
    if (nodes.length != 0) {
        console.log(nodes);
        gui.push(node);}
    primitive = primitive.concat(nodes);
    for (let child of node.children) {
        let [g, p] = traverseGUI(child, x, y);
        primitive = primitive.concat(p);
        gui = gui.concat(g);
    }
    return [gui, primitive];
}

function traverseNode(node, x, y) {
    let result = [];
    
    let [posX, posY] = node.getAbsPos();
    let [width, height] = node.getSize();
    if (posX <= x && x <= posX+width && posY <= y && y <= posY+height) {
        result.push(node);
        // console.log(node.type);
        // console.log(`target node (start) : (${posX}, ${posY})`);
        // console.log(`target node (end) : (${posX+width}, ${posY+height})`);
        // console.log(`point : (${x}, ${y})`);
    }
    if (node.children === []) {
        return result;
    }
    for (let child of node.children) {
        result = result.concat(traverseNode(child, x, y));
    }
    return result;
}