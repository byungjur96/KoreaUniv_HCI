import { Primitive, Point, Line, Text, Circle, Elliptic, Rectangle } from './primitive.js'
import { GUI, Canvas, Button, RectangleButton, CircleButton, EllipticButton, Window, Table } from './gui.js'

let primitive_num = 0;
let gui_num = 0;
let root_list = [];
let gui_list = [];
let visible = true;
let blink_cursor;

let command_line = document.getElementById("command");
let command_window = document.getElementById("interface");

command_window.addEventListener("click", function() {
    command_line.focus();
});


command_line.addEventListener("keyup", function(event){
    if (event.keyCode === 13) { command_discriminator(); }
});

function command_discriminator() {
    let command = document.getElementById("command").value;
    const res = document.getElementById("result");
    let command_list = command.split(" ");
    let result = "";

    if (command_list[0] === "primitive") {
        // root 노드 이름들 확인하기
        if (command_list[1] === "--list") {
            result = root_list.map(tree => tree.id);
        }
        // 해당 node의 subtree 구조 확인하기
        else if (command_list[1] === "--tree") {
            let tree = command_list[2];
            let target = find_primitive(tree);
            if (target === undefined) {result = "Tree Not Found!";}
            else {result = print_tree(target, 0); }
        }
        // 해당 node의 속성값 확인하기
        else if (command_list[1] === "--info") {
            let node = command_list[2];
            let target = find_primitive(node);
            if (target === undefined) {result = "Tree Not Found!";}
            else { result = view_element(target); } 
        }
        else { window.alert("Wrong Command!"); }
    }
    else if (command_list[0] === "gui") {
        if (command_list[1] === "--list") {
            result = gui_list.map(tree => tree.id);  
        }
        else if (command_list[1] === "--tree") {
            let tree = command_list[2];
            let target = find_gui(tree);
            if (target === undefined) {result = "Tree Not Found!";}
            else {result = print_tree(target, 0); }
        }
        else if (command_list[1] === "--component") {
            let tree = command_list[2];
            let target = find_gui(tree);
            if (target === undefined) {result = "Tree Not Found!";}
            else {result = print_tree(target.component, 0); }
        }
        else if (command_list[1] === "--info") {
            let tree = command_list[2];
            let target = find_gui(tree);
            if (target === undefined) {result = "Tree Not Found!";}
            else { result = view_element(target); } 
        }
        else { window.alert("Wrong Command!"); }
    }
    else if (command_list[0] === "--help") {
        result = result + "<i>[type]</i> --list <i>[node-name]</i> : Check Root Nodes<br>"
        + "<i>[type]</i> --tree <i>[node-name]</i> : Check Subtree Structure<br>"
        + "<i>[type]</i> --component <i>[node-name]</i> : Check Primitive Components (Only GUI)<br>"
        + "<i>[type]</i> --info <i>[node-name]</i> : Check Node Information<br>"
        +"clear : Clear all history"
    }
    else if (command_list[0] === "clear") {
        res.innerHTML = "";
        command_line.value = "";
        return;
    }
    else { 
        window.alert("Wrong Command!");
        command_line.value = "";
        return; 
    }
    result = `<div class="command-sentence">${command}</div><div class="command-result">${result}</div>`
    res.innerHTML += result;
    command_line.value = "";
}

function create_primitive_root(){
    primitive_num++;
    let root = new Primitive();
    root.make_root(primitive_num);
    root_list.push(root);
    return root;
}

function create_gui_root() {
    gui_num++;
    let root = new GUI();
    root.make_root(gui_num);
    gui_list.push(root);
    return root;
}

function find_primitive(name) {
    let root = name.slice(0,5);
    let tree = root_list.find(obj => obj.id === root);
    if (name === root) { return tree; }
    else {return tree.search_child(name, tree);}
}

function find_gui(name) {
    let root = name.slice(0,4);
    let tree = gui_list.find(obj => obj.id === root);
    if (name === root) { return tree; }
    else { return tree.search_child(name, tree); }
}

function print_tree(parent, depth) {
    let indentation = "";
    for (let i=0; i < depth; i++) { indentation += '&#9'; }
    indentation = `${indentation}-${parent.id} (${parent.constructor.name})<br>`;
    for (let child of parent.children) {
        indentation += print_tree(child, depth + 1);
    }
    return indentation;
}

// Primitive 요소를 table로 시각화한다.
function view_element(element) {
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
            else { table += `<tr><td>${key}</td><td>${print_tree(value, 0)}</td></tr>` }
            
        }
        else {
            table += `<tr><td>${key}</td><td>${value}</td></tr>`
        }
    }
    table += "</table><br>";
    return table;
}

export { create_primitive_root, create_gui_root, find_primitive, find_gui, print_tree, view_element }