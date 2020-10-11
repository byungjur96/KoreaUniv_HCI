import { Primitive, Point, Line, Text, Circle, Elliptic, Rectangle, RoundedRectangle } from './primitive.js'

class GUI {
    constructor(x=0, y=0) {
        this.id = undefined;
        this.type = this.constructor.name;
        this.component = this.setComponent();
        this.posX = x;
        this.posY = y;
        this.parent = null;
        this.children = [];
    }

    // Primitive Root Tree를 만든다.
    setComponent() {
        let component = new Primitive();
        component.makeRoot(1);
        return component
    }

    // id를 반환한다.
    getId() { return this.id; }
    // type을 반환한다.
    getType() { return this.type; }
    // position을 반환한다.
    getPos() { return [this.posX, this.posY]; }
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

    makeRoot(num) {
        this.id = "GUI" + num.toString();
    }

    // root인지 확인한다.
    isRoot() { 
        if(this.parent === null) return true;
        else return false;
    }

    // root로부터의 깊이를 계산한다.
    getDepth() {
        let ancestor = this.parent;
        let depth = 1;
        while (ancestor.isRoot === false) {
            ancestor = ancestor.parent;
            depth++;
        }
        return depth;
    }

    // root를 찾는다.
    findRoot() {
        let ancestor = this;
        console.table(ancestor);
        while (ancestor.isRoot() === false) {
            ancestor = ancestor.parent;
        }
        return ancestor;
    }
    
    // 자식 gui를 더한다.
    addGUI(type="GUI") {
        let child = undefined;
        if (type === "GUI") { child = new GUI(); }
        else if (type === "Canvas") { child = new Canvas(); }
        else if (type === "RectangleButton") { child = new RectangleButton(); }
        else if (type === "CircleButton") { child = new CircleButton(); }
        else if (type === "EllipticButton") { child = new EllipticButton(); }
        else if (type === "RoundedRectangleButton") { child = new RoundedRectangleButton(); }
        else if (type === "Window") { child = new Window(); }
        else if (type === "Table") { child = new Table(); }
        else { child = new GUI(); }
        child.parent = this;
        this.children.push(child);
        child.id = child.setId();
    }

    // 자식 gui를 찾는다.
    searchChild(name, parent) {
        if (parent.children !== []) {
            for (let child of parent.children) {
                if (child.id === name) { return child; }
                else { return this.searchChild(name, child) };
            }
        }
        return undefined;
    }
}

class Canvas extends GUI {
    constructor(posX, posY) {
        super(posX, posY);
        this.component = this.init_canvas();
    }

    initCanvas() {
        let root = this.component.find_root();
        root.addNode("Rectangle");
        return root;
    }
}

class Button extends GUI {
    constructor(posX, posY) {
        super(posX, posY);
    }
}

class RectangleButton extends Button {
    constructor(posX, posY) {
        super(posX, posY);
        this.component = this.initButton();
    }

    initButton() {
        let root = this.component.findRoot();
        root.addNode("Rectangle");
        root.addNode("Button");
        return root;
    }
}

class CircleButton extends Button {
    constructor(posX, posY) {
        super(posX, posY);
        this.component = this.init_button();
    }

    initButton() {
        let root = this.component.findRoot();
        root.addNode("Rectangle");
        root.addNode("Button");
        return root;
    }
}

class EllipticButton extends Button {
    constructor(posX, posY) {
        super(posX, posY);
        this.component = this.initButton();
    }

    initButton() {
        let root = this.component.findRoot();
        root.addNode("Rectangle");
        root.addNode("Button");
        return root;
    }
}

class RoundedRectangleButton extends Button {
    constructor(posX, posY) {
        super(posX, posY);
        this.component = this.initButton();
    }

    initButton() {
        let root = this.component.findRoot();
        root.addNode("RoundedRectangle");
        root.addNode("Button");
        return root;
    }
}

class Window extends GUI {
    constructor(posX, posY) {
        super(posX, posY);
        this.component = this.initWindow();
    }

    initWindow() {
        let root = this.component.find_root();
        root.add_node("Rectangle");
        root.children[0].add_node("Text");
        root.add_node("Rectangle");
        return root;
    }
}

class Table extends GUI {
    constructor(row=2, column=2, posX, posY) {
        super(posX, posY);
        this.component = undefined;
    }

    initTable(row, column) {
        let rootNode = new Primitive();
        rootNode.makeRoot(1);
        // 행을 만든다.
        for(let i=0; i<row; i++) {
            rootNode.addNode("Primitive");
        }
        // 1개의 행에 들어가는 셀을 만든다.
        // 셀은 primitive를 sub_root로 두고, rectangle과 text를 children으로 가진다.
        let children = rootNode.getChildren();
        for (let child of children) {
            for(let j=0; j<column; j++) {
                child.addNode("Primitive");
                child.children[j].addNode("Rectangle");
                child.children[j].addNode("Text");
            }
        }
        this.component = rootNode;
        return rootNode;
    }

    changeCellValue(row, column, text) {
        let root = this.component.findRoot();
        root.children[row-1].children[column-1].children[1].editText(text);
    }
}

export { GUI, Canvas, Button, RectangleButton, CircleButton, EllipticButton, RoundedRectangleButton, Window, Table };