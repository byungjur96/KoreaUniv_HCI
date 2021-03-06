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
        this.action = {
            'root' : []
        };
    }

    // Primitive Root Tree를 만든다.
    setComponent() {
        let component = new Primitive();
        component.makeRoot(1);
        return component;
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
        return parent.id + '-' + siblings.toString();
    }

    // 좌표값을 설정한다.
    setStart(x, y) {
        this.posX = x;
        this.posY = y;
    }

    // position을 반환한다.
    getAbsPos() {
        let node = this;
        let relX = 0;
        let relY = 0;
        while (node !== null && node.isRoot() === false) {
            relX += node.posX;
            relY += node.posY;
            node = node.parent;
        }
        return [relX, relY];
    }

    makeRoot(num) { this.id = "GUI" + num.toString(); }

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
        while (ancestor.isRoot() === false) {
            ancestor = ancestor.parent;
        }
        return ancestor;
    }

    getSize() {
        let component = this.component;
        let node = component.findRoot();

        let maxX = 0;
        let maxY = 0;

        let stack = [];
        let temp = [node];
        while (temp.length !== 0) {
            let target = temp.pop();
            let [tempX, tempY] = target.getAbsPos();
            let [width, height] = target.getSize();
            maxX = Math.max(maxX, tempX+width);
            maxY = Math.max(maxY, tempY+height);
            stack.push(target);
            for (let child of target.children) {
                temp.push(child);
            }
        }
        return [maxX, maxY];
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
        else if (type === "Title") { child = new Title(); }
        else { child = new GUI(); }
        child.parent = this;
        this.children.push(child);
        child.id = child.setId();
        return child;
    }

    // node를 삭제한다.
    deleteNode(name){
        let target = this.searchNode(name);
        if (target !== undefined) {
            let lst = target.parent.children;
            const idx = lst.indexOf(target);
            lst.splice(idx, 1);
            target.parent = undefined;
        }
    }

    // 자식 gui를 찾는다.
    searchChild(name, parent) {
        let target = undefined;
        if (parent.children !== []) {
            for (let child of parent.children) {
                if (child.id === name) { target = child; }
                else { 
                    let next = this.searchChild(name, child);
                    if (next !== undefined) target = next;
                };
            }
        }
        return target;
    }

    // node를 찾는다.
    searchNode(name){
        let root = this.findRoot();
        let result = this.searchChild(name, root);
        return result;
    }
}

class Title extends GUI {
    constructor(contents, posX, posY) {
        super(posX, posY);
        let root = this.component.findRoot();
        let text = root.addNode("Text");
        this.component = root;
        this.setSize();
    }

    setSize() {
        let ctx = document.getElementById("canvas").getContext("2d");
        let text = this.component.findRoot().children[0];
        let width = Math.round(ctx.measureText(text.contents).width);
        let height = Math.round(parseInt(text.font));
        this.width = width;
        this.height = height;
    }

    setContents(contents) {
        let text = this.component.findRoot().children[0];
        text.editText(contents);
        this.setSize();
    }

    setRowAlign(idx, align="center") {
        let primitive = this.component;
        let rows = primitive.findRoot().children;
        let target = rows[idx].children;
        for (let cell of target) {
            this.horizontalCenter(cell);
        }
    }
}

class Canvas extends GUI {
    constructor(posX, posY) {
        super(posX, posY);
        this.component = this.initCanvas();
    }

    initCanvas() {
        let root = this.component.findRoot();
        root.addNode("Rectangle");
        return root;
    }

    setSize(w, h) {
        this.setWidth(w);
        this.setHeight(h);
    }

    setHeight(height) {
        let root = this.component.findRoot();
        let canvas = root.children[0];
        canvas.height = height;
    }

    setWidth(width) {
        let root = this.component.findRoot();
        let canvas = root.children[0];
        canvas.width = width;
    }

    setBackground(color) {
        let root = this.component.findRoot();
        let canvas = root.children[0];
        canvas.background = color;
    }
}

class Window extends GUI {
    constructor(posX, posY) {
        super(posX, posY);
        this.component = undefined;
        this.initWindow();
    }

    initWindow() {
        let root = new Primitive();
        root.makeRoot(1);
        let contents = root.addNode("Rectangle");
        let tab = root.addNode("Rectangle");
        let button = tab.addNode("Primitive");
        let btn = button.addNode("Circle");
        let btn_for = button.addNode("Text");
        
        tab.setSize(100, 30);
        tab.setBackground("lightgray");
        btn.setBackground("red");
        btn_for.setStart(10,5);
        btn_for.editText("X");
        btn_for.font = "20px Arial";
        btn_for.textAlign = "center";
        
        contents.setSize(100, 1300);
        contents.posY = tab.posY;
        contents.setBackground("white")
    
        this.component = root;
        this.setBtnPos(tab.width);
        this.action[`${btn.id}`]=[`closeGUI ${this.id}`];
        this.action[`${btn_for.id}`]=[`closeGUI ${this.id}`];
        return root;
    }

    setBtnPos(width) {
        let root = this.component.findRoot();
        let tab = root.children[1];
        let btn = root.children[1].children[0];
        let btn_style = btn.children[0];
        btn.children[0].setSize(10);
        btn.setStart(width-30, 5);
    }

    setWidth(width) {
        let root = this.component.findRoot();
        let tab = root.children[0];
        let contents = root.children[1];
        tab.width = width;
        contents.width = width;
        this.setBtnPos(width);
    }

    setHeight(height) {
        let root = this.component.findRoot();
        let tab = root.children[1];
        let contents = root.children[0];
        contents.height = height;
    }
}

class Button extends GUI {
    constructor(posX, posY) {
        super(posX, posY);
    }

    setContentsPos() {
        let box = this.component.findRoot().children[0].getSize();
        let text = this.component.findRoot().children[1];
        text.posX = box[0] / 2;
        text.posY = box[1] / 2;
        text.textAlign = "center";
        text.textBaseline = "middle";
    }

    setContents(contents) {
        this.component.findRoot().children[1].editText(contents);
    }

    setSize(w, h) {
        this.component.findRoot().children[0].setSize(w, h);
        this.setContentsPos();
    }
}

class RectangleButton extends Button {
    constructor(posX, posY) {
        super(posX, posY);
        this.component = this.initButton();
    }

    initButton() {
        let root = this.component.findRoot();
        let box = root.addNode("Rectangle");
        let contents = root.addNode("Text");
        super.setContentsPos();
        return root;
    }
}

class CircleButton extends Button {
    constructor(posX, posY) {
        super(posX, posY);
        this.component = this.initButton();
    }

    initButton() {
        let root = this.component.findRoot();
        let box = root.addNode("Rectangle");
        let contents = root.addNode("Text");
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
        let box = root.addNode("Rectangle");
        let contents = root.addNode("Text");
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
        let box = root.addNode("RoundedRectangle");
        let contents = root.addNode("Text");
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
            child.setStart(0, children.indexOf(child)*50);
            for(let j=0; j<column; j++) {
                let cell = child.addNode("Primitive");
                let border = cell.addNode("Rectangle");
                let contents = cell.addNode("Text");
                cell.setStart(j*100, 0);
                border.setSize(100, 60);
                contents.setStart(10, 0);
                let pos = border.id.split("-");
                this.action[border.id] = [`changeCell ${this.id} ${pos[1]} ${pos[2]}`];
                this.action[contents.id] = [`changeCell ${this.id} ${pos[1]} ${pos[2]}`];
            }
        }
        this.component = rootNode;
        return rootNode;
    }

    // 행의 높이를 바꾼다.
    changeRowHeight(idx, height) {
        let primitive = this.component;
        let rows = primitive.findRoot().children;
        let target = rows[idx].children;
        for (let cell of target) {
            cell.children[0].height = height;
        }
        let offsetY = 0;  // 이전까지의 높이 합
        let before = 0;  // 전 행의 높이
        for (let row of rows) {
            before = row.children[0].children[0].height;
            row.posY = offsetY;
            offsetY += before;
            let cells = row.children;
        }
    }

    // 열의 너비를 바꾼다.
    changeColWidth(idx, width) {
        let primitive = this.component;
        let rows = primitive.findRoot().children;
        for (let row of rows) {
            let cells = row.children;
            for (let i in cells) {
                if (i === idx.toString()) {
                    cells[i].children[0].width = width;
                }
                if (i > 0) {
                    cells[i].posX = cells[i-1].posX + cells[i-1].children[0].width
                }
                this.verticalAlign(cells[i]);
            }
        }
    }

    // 행을 가로로 정렬한다.
    setRowAlign(idx, align="center") {
        let primitive = this.component;
        let rows = primitive.findRoot().children;
        let target = rows[idx].children;
        for (let cell of target) {
            this.horizontalCenter(cell);
        }
    }

    // 행의 text를 굵게 만든다.
    setRowBold(idx) {
        let primitive = this.component;
        let rows = primitive.findRoot().children;
        let target = rows[idx].children;
        for (let cell of target) {
            cell.children[1].font += " bold";
        }
    }

    setRowBackground(idx, color="gray") {
        let primitive = this.component;
        let rows = primitive.findRoot().children;
        let target = rows[idx].children;
        for (let cell of target) {
            cell.children[0].setBackground(color);
        }
    }

    // 행을 th 셀로 만든다.
    setRowHeader(idx) {
        this.setRowBackground(idx, "gray");
        this.setRowBold(idx);
        this.setRowAlign(idx);

    }

    // 세로로 텍스트를 가운데 정렬해준다.
    verticalAlign(node) {
        let rec = node.children[0];
        let text = node.children[1];
        text.posY = (rec.height - text.height)/2;
    }

    // 가로로 텍스트를 가운데 정렬해준다.
    horizontalCenter(node, align="center") {
        let rec = node.children[0];
        let text = node.children[1];
        text.textAlign = align;
        text.posX = rec.width/2;
    }

    changeCellValue(row, column, text) {
        let root = this.component.findRoot();
        root.children[row-1].children[column-1].children[1].editText(text);
    }
}

export { GUI, Canvas, Title, Button, RectangleButton, CircleButton, EllipticButton, RoundedRectangleButton, Window, Table };