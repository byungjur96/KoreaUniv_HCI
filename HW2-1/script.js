import { Primitive, Point, Line, Text, Circle, Elliptic, Rectangle, RoundedRectangle } from '../common/primitive.js'
import { GUI, Title, Canvas, Button, RectangleButton, CircleButton, EllipticButton, RoundedRectangleButton, Window, Table } from '../common/gui.js'
import {createPrimitiveRoot, createGUIRoot, findPrimitive, findGUI, printTree, getPrimitiveRoot, getGUIRoot } from '../common/display.js'

let commandLine = document.getElementById("command");
let commandWindow = document.getElementById("interface");

// input 태그 테두리를 없앤다.
commandWindow.addEventListener("click", function() {
    commandLine.focus();
});

// Enter 입력 시 커멘드 실행
commandLine.addEventListener("keyup", function(event){
    if (event.keyCode === 13) { commandDiscriminator(); }
});

function commandDiscriminator() {
    let command = commandLine.value;
    const res = document.getElementById("result");
    let commandList = command.split(" ");
    let result = "";

    if (commandList[0] === "primitive") {
        // root 노드 이름들 확인하기
        if (commandList[1] === "--list") {
            result = getPrimitiveRoot().map(tree => tree.id);
        }
        // 해당 node의 subtree 구조 확인하기
        else if (commandList[1] === "--tree") {
            let tree = commandList[2];
            let target = findPrimitive(tree);
            if (target === undefined) { result = "Tree Not Found!"; }
            else { result = printTree(target, 0); }
        }
        // 해당 node의 속성값 확인하기
        else if (commandList[1] === "--info") {
            let node = commandList[2];
            let target = findPrimitive(node);
            if (target === undefined) { result = "Tree Not Found!"; }
            else { result = viewElement(target); } 
        }
        else { 
            window.alert("Wrong Command!"); 
            commandLine.value = "";
            return;
        }
    }
    else if (commandList[0] === "gui") {
        if (commandList[1] === "--list") {
            result = getGUIRoot().map(tree => tree.id);  
        }
        else if (commandList[1] === "--tree") {
            let tree = commandList[2];
            let target = findGUI(tree);
            if (target === undefined) { result = "Tree Not Found!"; }
            else {result = printTree(target, 0); }
        }
        else if (commandList[1] === "--component") {
            let tree = commandList[2];
            let target = findGUI(tree);
            if (target === undefined) {result = "Tree Not Found!";}
            else {result = printTree(target.component, 0); }
        }
        else if (commandList[1] === "--info") {
            let tree = commandList[2];
            let target = findGUI(tree);
            if (target === undefined) { result = "Tree Not Found!"; }
            else { result = viewElement(target); } 
        }
        else { 
            window.alert("Wrong Command!"); 
            commandLine.value = "";
            return;
        }
    }
    else if (commandList[0] === "--help") {
        result = result + "<i>[type]</i> : primitive | gui<br>"
        + "<i>[type]</i> --list : Check Root Nodes<br>"
        + "<i>[type]</i> --tree <i>[node-name]</i> : Check Subtree Structure<br>"
        + "<i>[type]</i> --component <i>[node-name]</i> : Check Primitive Components (Only GUI)<br>"
        + "<i>[type]</i> --info <i>[node-name]</i> : Check Node Information<br>"
        +"clear : Clear all history"
    }
    else if (commandList[0] === "clear") {
        res.innerHTML = "";
        commandLine.value = "";
        return;
    }
    else { 
        window.alert("Wrong Command!");
        commandLine.value = "";
        return; 
    }
    result = `<div class="command-sentence">${command}</div><div class="command-result">${result}</div>`
    res.innerHTML += result;
    commandLine.value = "";
}

// Primitive 요소를 table로 시각화한다.
function viewElement(element) {
    let table = `<table><tr><th colspan=2>${element.id} (${element.constructor.name})</th></tr>`;
    for (let [key, value] of Object.entries(element)) {
        if (key === "children") {
            let children = [];
            for (let child of value) { children.push(child.id) }
            table += `<tr><td>${key}</td><td>${children}</td></tr>`
        }
        else if (key === "parent") {
            if (value === null) {table += `<tr><td>${key}</td><td>${value}</td></tr>`}
            else { table += `<tr><td>${key}</td><td>${value.id}</td></tr>` }
        }
        else if (key === "component") {
            if (value === null) {table += `<tr><td>${key}</td><td>${value}</td></tr>`}
            else { table += `<tr><td>${key}</td><td>${printTree(value, 0)}</td></tr>` }
            
        }
        else {
            table += `<tr><td>${key}</td><td>${value}</td></tr>`
        }
    }
    table += "</table><br>";
    return table;
}
