import { createPrimitiveRoot, createGUIRoot, findPrimitive, findGUI, printTree, getPrimitiveRoot, getGUIRoot } from "./display.js";
import { drawLine, drawText, drawCircle, drawElliptic, drawRectangle, drawNode, drawPrimitiveTree, drawGUITree } from "./draw.js";
import { Primitive, Point, Line, Text, Circle, Elliptic, Rectangle, RoundedRectangle } from './primitive.js';
import { GUI, Canvas, Title, Button, RectangleButton, CircleButton, EllipticButton, RoundedRectangleButton, Window, Table } from "./gui.js";

function closeGUI(gui) {
    let canvas = document.getElementById("canvas");
    let root = getGUIRoot()[0];
    root.deleteNode(gui);

    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    drawGUITree(root);
}

function changeCell(gui, row, col) {
    let root = getGUIRoot()[0];
    let table = root.searchNode(gui);
    // 표가 아닌 경우 아무 일도 발생하지 않음
    if (table.type !== "Table") return;
    let contents = window.prompt(`${row}행 ${col}열의 값을 입력해주세요.`);
    if (contents === null) return;
    table.changeCellValue(row, col, contents);
    drawGUITree(root);
}

function disableBtn(gui, newText) {
    let root = getGUIRoot()[0];
    let btn = root.searchNode(gui);
    // 버튼 GUI가 아닌 경우 아무 일도 발생하지 않음
    if (btn.type.includes("Button")===false) return;
    let box = btn.component.children[0];
    let text = btn.component.children[1];
    box.setBackground("lightgray");
    text.color ="gray";
    text.editText(newText);
    btn.action['root'] = [];
    drawGUITree(btn.findRoot());
}

function goToLink(gui, link) {
    let root = getGUIRoot()[0];
    let btn = root.searchNode(gui);
    // 버튼 GUI가 아닌 경우 아무 일도 발생하지 않음
    if (btn.type.includes("Button")===false) return;
    let text = btn.component.children[1];
    text.color = "purple";
    drawGUITree(btn.findRoot());
    window.open(link);
}

export { closeGUI, changeCell, disableBtn, goToLink };