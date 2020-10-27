import { createPrimitiveRoot, createGUIRoot, findPrimitive, findGUI, printTree, getPrimitiveRoot, getGUIRoot } from "./display.js";
import { drawLine, drawText, drawCircle, drawElliptic, drawRectangle, drawNode, drawPrimitiveTree, drawGUITree } from "./draw.js";
import { Primitive, Point, Line, Text, Circle, Elliptic, Rectangle, RoundedRectangle } from './primitive.js';
import { GUI, Canvas, Title, Button, RectangleButton, CircleButton, EllipticButton, RoundedRectangleButton, Window, Table } from "./gui.js";

function popAlert(target, contents) {
    let alert = target.addGUI("Window");
    alert.initWindow();
    let [absX, absY] = target.getAbsPos();
    alert.setStart(absX+target.width/2-200, absY+target.height/2-100);
    alert.setWidth(400);
    alert.setHeight(200);
    let msg = alert.addGUI("Title");
    msg.setStart(100, 100);
    msg.setContents(contents);
    drawGUITree
}

function closeGUI(gui) {
    let canvas = document.getElementById("canvas");
    let root = getGUIRoot()[0];
    console.log(root);
    root.deleteNode(gui);
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    drawGUITree(root);
}

function changeCell(gui, row, col) {
    let root = getGUIRoot()[0];
    let table = root.searchNode(gui);
    if (table.type !== "Table") return;
    let contents = window.prompt(`${row}행 ${col}열의 값을 입력해주세요.`);
    if (contents === null) return;
    table.changeCellValue(row, col, contents);
    drawGUITree(table.findRoot());
}

function disableBtn(gui, newText) {
    let root = getGUIRoot()[0];
    let btn = root.searchNode(gui);
    let box = btn.component.children[0];
    box.setBackground("lightgray");
    let text = btn.component.children[1];
    text.editText(newText);
    console.log(btn);
    btn.action['root'] = [];
    drawGUITree(btn.findRoot());
}

export { popAlert, closeGUI, changeCell, disableBtn };