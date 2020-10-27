import { Primitive, Point, Line, Text, Circle, Elliptic, Rectangle, RoundedRectangle } from '../common/primitive.js';
import { GUI, Title, Canvas, Button, RectangleButton, CircleButton, EllipticButton, Window, Table } from '../common/gui.js';
import { createPrimitiveRoot, createGUIRoot, findPrimitive, findGUI, printTree, getPrimitiveRoot, getGUIRoot } from '../common/display.js';
import { popAlert, closeGUI, changeCell, disableBtn } from "../common/interaction.js";

let canvas = document.getElementById("canvas");

canvas.addEventListener("click", (event) => {
    let roots = getGUIRoot();
    let [posX, posY] = getClickPos(event);
    let result = {};
    // 클릭된 좌표
    for (let root of roots) {
        let [guiX, guiY] = root.getAbsPos();
        result = traverseGUI(root, posX, posY, result);
    }
    let [gui, primitive] = chooseTop(result);
    selectedBox(gui, primitive);
    console.log(`${gui.id}[${gui.type}] Selected!\n(node: ${primitive.id}[${primitive.type}])`);
    if (gui.action["root"]) {
        for(let act of gui.action["root"]) {
            actionParser(act);
        }
    }
    if (gui.action[primitive.id]) {
        for(let act of gui.action[primitive.id]) {
            actionParser(act);
        }
    }
    
});

function actionParser(str) {
    let commands = str.split(" ");
    if (commands[0] === "closeGUI") {
        closeGUI(commands[1]);
    }
    else if (commands[0] === "changeCell") {
        changeCell(commands[1], commands[2], commands[3]);
    }
    else if (commands[0] === "disableBtn") {
        disableBtn(commands[1], commands[2])
    }
    
}

// 화면에서 클릭된 좌표를 canvas의 좌표로 변환한다.
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

function chooseTop(obj) {
    let roots = getGUIRoot();
    let guiID = Object.keys(obj).reverse()[0];
    let gui = obj[guiID][0];
    let primitive = obj[guiID][1].reverse()[0];
    return [gui, primitive];
}

// 선택된 primitive에 테두리를 둘러준다.
function selectedBox(gui, primitive) {
    canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    let [guiX, guiY] = gui.getAbsPos();
    let [nodeX, nodeY] = primitive.getAbsPos();
    let size = primitive.getSize();
    ctx.background="transparent";
    ctx.strokeStyle="red";
    let posX = guiX + nodeX - 5;
    let posY = guiY + nodeY - 5;
    ctx.strokeRect(posX, posY, size[0]+10, size[1]+10);
    ctx.stroke();
}

// 클릭된 위치의 좌표를 포함하고 있는 GUI와 해당 GUI의 primitive를 반환한다.
function traverseGUI(gui, x, y, res) {
    let [posX, posY] = gui.getAbsPos();
    let inRange = isRange(gui.getComponent(), x-posX, y-posY);
    let lst = traverseNode(gui.getComponent(), x-posX, y-posY);

    if (inRange) {
        if (gui.id in res) {res[gui.id][1] = res[gui.id][1].concat(lst);console.log("H");}
        else res[gui.id] = [gui,lst];
    }

    for (let child of gui.children) {
        let [guiX, guiY] = child.getAbsPos();
        res = traverseGUI(child, x, y, res);
    }
    // return [guiList, primitiveList];
    return res;
}

// GUI 중에서 component가 클릭한 위치를 포함하는지 확인한다.
function isRange(node, x, y) {
    let inRange = false;
    let [posX, posY] = node.getAbsPos();
    let [width, height] = node.getSize();
    //  범위 안에 포함되면 true를 return한다.
    if (posX <= x && x <= posX+width && posY <= y && y <= posY+height) return true;
    // 더 이상 children이 없으면 return한다.
    if (node.children === []) return inRange;
    for (let child of node.children) {
        inRange = inRange || isRange(child, x, y);
    }
    return inRange;
}

// component 중에서 클릭한 위치를 포함하는 primitive를 return한다.
function traverseNode(node, x, y) {
    let result = [];
    let [posX, posY] = node.getAbsPos();
    let [width, height] = node.getSize();
    if (posX <= x && x <= posX+width && posY <= y && y <= posY+height) result.push(node);
    if (node.children === []) return result;
    for (let child of node.children) {
        result = result.concat(traverseNode(child, x, y));
    }
    return result;
}

