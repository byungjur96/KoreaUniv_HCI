import { Primitive, Point, Line, Text, Circle, Elliptic, Rectangle, RoundedRectangle } from './primitive.js'
import { GUI, Canvas, Button, RectangleButton, CircleButton, EllipticButton, Window, Table } from './gui.js'

let primitive_num = 0;
let gui_num = 0;
let root_list = [];
let gui_list = [];

function get_primitive_root() {
    return root_list;
}

function get_gui_root() {
    return gui_list;
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

export { create_primitive_root, create_gui_root, find_primitive, find_gui, print_tree, get_primitive_root, get_gui_root }