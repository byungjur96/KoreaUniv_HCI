import { Primitive, Point, Line, Text, Circle, Elliptic, Rectangle, RoundedRectangle } from './primitive.js'
import { GUI, Canvas, Button, RectangleButton, CircleButton, EllipticButton, Window, Table } from './gui.js'

let primitiveNum = 0;
let GUINum = 0;
let rootList = [];
let GUIList = [];

// primitive 루트 노드 리스트를 return 한다.
function getPrimitiveRoot() {
    return rootList;
}

// GUI 루트 노드 리스트를 return 한다.
function getGUIRoot() {
    return GUIList;
}

// primitive 루트 노드를 만든다.
function createPrimitiveRoot(){
    primitiveNum++;
    let root = new Primitive();
    root.makeRoot(primitiveNum);
    rootList.push(root);
    return root;
}

// GUI 루트 노드를 만든다.
function createGUIRoot() {
    GUINum++;
    let root = new GUI();
    root.makeRoot(GUINum);
    GUIList.push(root);
    return root;
}

// primitive 노트를 검색한다.
function findPrimitive(name) {
    let root = name.slice(0,5);
    let tree = rootList.find(obj => obj.id === root);
    if (name === root) { return tree; }
    else { return tree.searchChild(name, tree); }
}

// GUI 노트를 검색한다.
function findGUI(name) {
    let root = name.slice(0,4);
    let tree = GUIList.find(obj => obj.id === root);
    if (name === root) { return tree; }
    else { return tree.searchChild(name, tree); }
}

// subtree를 출력한다.
function printTree(parent, depth) {
    let indentation = "";
    for (let i=0; i < depth; i++) { indentation += '&#9'; }
    indentation = `${indentation}-${parent.id} (${parent.constructor.name})<br>`;
    for (let child of parent.children) {
        indentation += printTree(child, depth + 1);
    }
    return indentation;
}

export { createPrimitiveRoot, createGUIRoot, findPrimitive, findGUI, printTree, getPrimitiveRoot, getGUIRoot }