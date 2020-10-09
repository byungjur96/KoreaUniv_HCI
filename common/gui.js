import { Primitive, Point, Line, Text, Circle, Elliptic, Rectangle, RoundedRectangle } from './primitive.js'

class GUI {
    constructor(x_position=0, y_position=0) {
        this.id = undefined;
        this.type = this.constructor.name;
        this.component = this.setComponent();
        this.x_position = x_position;
        this.y_position = y_position;
        this.parent = null;
        this.children = [];
    }

    // Primitive Root Tree를 만든다.
    setComponent() {
        let component = new Primitive();
        component.make_root(1);
        return component
    }

    // id를 반환한다.
    getId() { return this.id; }
    // type을 반환한다.
    getType() { return this.type; }
    // position을 반환한다.
    getPos() { return this.position; }
    // 부모 요소를 반환한다.
    getParent() { return this.parent; }
    // 자식 요소들을 반환한다.
    getChildren() { return this.children; }
    // Component Tree를 반환한다.
    getComponent() { return this.component; }
    // GUI를 반환한다.
    getGUI() { return this; }

    // 해당 GUI의 id 값을 만든다.
    setId() {
        let parent = this.parent;
        let siblings = parent.children.length;
        return parent.id + siblings.toString();
    }

    make_root(num) {
        this.id = "GUI" + num.toString();
    }

    // root인지 확인한다.
    is_root() { 
        if(this.parent === null) return true;
        else return false;
    }

    // root로부터의 깊이를 계산한다.
    get_depth() {
        let ancestor = this.parent;
        let depth = 1;
        while (ancestor.is_root === false) {
            ancestor = ancestor.parent;
            depth++;
        }
        return depth;
    }

    // root를 찾는다.
    find_root() {
        let ancestor = this;
        console.table(ancestor);
        while (ancestor.is_root() === false) {
            ancestor = ancestor.parent;
        }
        return ancestor;
    }
    
    // 자식 gui를 더한다.
    add_gui(type="GUI") {
        let child = undefined;
        if (type === "GUI") { child = new GUI(); }
        else if (type === "Canvas") { child = new Canvas(); }
        else if (type === "RectangleButton") { child = new RectangleButton(); }
        else if (type === "CircleButton") { child = new CircleButton(); }
        else if (type === "EllipticButton") { child = new EllipticButton(); }
        else if (type === "Window") { child = new Window(); }
        else if (type === "Table") { child = new Table(); }
        else { child = new GUI(); }
        child.parent = this;
        this.children.push(child);
        child.id = child.setId();
    }

    // 자식 gui를 찾는다.
    search_child(name, parent) {
        if (parent.children !== []) {
            for (let child of parent.children) {
                if (child.id === name) { return child; }
                else {
                    let result = this.search_child(name, child);
                    if (result != undefined) { console.log(result); return result; }
                }
            }
        }
        return undefined;
    }
}

class Canvas extends GUI {
    constructor(x_position, y_position) {
        super(x_position, y_position);
        this.component = this.init_canvas();
    }

    init_canvas() {
        let root = this.component.find_root();
        root.add_node("Rectangle");
        return root;
    }
}

class Button extends GUI {
    constructor(x_position, y_position) {
        super(x_position, y_position);
        
    }
}

class RectangleButton extends Button {
    constructor(x_position, y_position) {
        super(x_position, y_position);
        this.component = this.init_button();
    }

    init_button() {
        let root = this.component.find_root();
        root.add_node("Rectangle");
        root.add_node("Button");
        return root;
    }
}

class CircleButton extends Button {
    constructor(x_position, y_position) {
        super(x_position, y_position);
        this.component = this.init_button();
    }

    init_button() {
        let root = this.component.find_root();
        root.add_node("Rectangle");
        root.add_node("Button");
        return root;
    }
}

class EllipticButton extends Button {
    constructor(x_position, y_position) {
        super(x_position, y_position);
        this.component = this.init_button();
    }

    init_button() {
        let root = this.component.find_root();
        root.add_node("Rectangle");
        root.add_node("Button");
        return root;
    }
}

class RoundedRectangleButton extends Button {
    constructor(x_position, y_position) {
        super(x_position, y_position);
        this.component = this.init_button();
    }

    init_button() {
        let root = this.component.find_root();
        root.add_node("RoundedRectangle");
        root.add_node("Button");
        return root;
    }
}

class Window extends GUI {
    constructor(x_position, y_position) {
        super(x_position, y_position);
        this.component = this.init_window();
    }

    init_window() {
        let root = this.component.find_root();
        root.add_node("Rectangle");
        root.children[0].add_node("Text");
        root.add_node("Rectangle");
        return root;
    }
}

class Table extends GUI {
    constructor(row=2, column=2, x_position, y_position) {
        super(x_position, y_position);
        this.component = undefined;
    }

    init_table(row, column) {
        let root_node = new Primitive();
        root_node.make_root(1);
        this.component = root_node;
        let root = this.component.find_root();
        for(let i=0; i<row; i++) {
            root.add_node("Primitive");
        }

        let children = root.getChildren();
        for (let child of children) {
            for(let j=0; j<column; j++) {
                child.add_node("Primitive");
                child.children[j].add_node("Rectangle");
                child.children[j].add_node("Text");
            }
        }
        return root;
    }

    change_cell_value(row, column, text) {
        let root = this.component.find_root();
        root.children[row-1].children[column-1].children[1].edit_text(text);
    }
}

export { GUI, Canvas, Button, RectangleButton, CircleButton, EllipticButton, Window, Table };