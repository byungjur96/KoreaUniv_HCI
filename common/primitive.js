class Primitive {
    constructor(posX=0, posY=0) {
        this.id = undefined;
        this.type = this.constructor.name;
        this.posX = posX;
        this.posY = posY;
        this.parent = null;
        this.children = [];
    }

    // id를 반환한다.
    getId() { return this.id; }
    // type을 반환한다.
    getType() { return this.type; }
    // 부모 요소를 반환한다.
    getParent() { return this.parent; }
    // 자식 요소들을 반환한다.
    getChildren() { return this.children; }
    // node 자체를 반환한다.
    getNode() { return this; }
    // 요소가 차지하는 가로/세로값을 반환한다.
    getSize() { return [0,0]; }

    // 해당 node의 id 값을 만든다.
    setId() {
        let parent = this.parent;
        let siblings = parent.children.length + 1;
        return parent.id + siblings.toString();
    }

    // 좌표값을 설정한다.
    setStart(x, y) {
        this.posX = x;
        this.posY = y;
    }

    // root node를 만들 때 id 값을 생성한다.
    makeRoot(num) { this.id = "Node" + num.toString(); }

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
        while (ancestor.isRoot() === false) { ancestor = ancestor.parent; }
        return ancestor;
    }

    // offset을 반환한다.
    getRelPos() { return [this.posX, this.posY]; }

    // position을 반환한다.
    getAbsPos() {
        let before = this.parent;
        let [relX, relY] = [this.posX, this.posY];
        while (before !== null && before.parent.isRoot() === false) {
            let pos = before.getRelPos();
            relX += pos[0];
            relY += pos[1];
        }
        return [relX, relY];
    }

    // 자식 node를 더한다.
    addNode(type="Primitive") {
        let child = undefined;
        if (type === "Primitive") { child = new Primitive(); }
        else if (type === "Point") { child = new Point(); }
        else if (type === "Line") { child = new Line(); }
        else if (type === "Text") { child = new Text(); }
        else if (type === "Circle") { child = new Circle(); }
        else if (type === "Elliptic") { child = new Elliptic(); }
        else if (type === "Rectangle") { child = new Rectangle(); }
        else if (type === "RoundedRectangle") { child = new RoundedRectangle(); }
        else { child = new Primitive(); }
        child.parent = this;
        child.id = child.setId();
        this.children.push(child);
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

    // 자식 node 중에 타겟이 있는지 확인한다.
    searchChild(name, parent) {
        if (parent.children !== []) {
            for (let child of parent.children) {
                if (child.id === name) { return child; }
                else {
                    let result = this.searchChild(name, child);
                    if (result != undefined) { return result; }
                }
            }
        }
        return undefined;
    }

    // node를 찾는다.
    searchNode(name){
        let root = this.findRoot();
        let result = this.searchChild(name, root);
        return result;
    }
}

// 점을 의미하는 class
class Point extends Primitive {
    constructor(posX, posY) {
        super(posX, posY);
    }

    end_point() {
        super.end_point();
    }
}

// 선을 의미하는 class
class Line extends Primitive {
    constructor(posX, posY, endX=10, endY=10, color="black") {
        super(posX, posY);
        this.endX = endX;
        this.endY = endY;
        this.color = color;
    }

    setEnd(x, y) {
        this.endY = x;
        this.endY = y;
    }

    setColor(string) { this.color = string; }

    getSize() { 
        let [x_pos, y_pos] = [this.posX + this.end_x, this.posY + this.end_y];
        return [x_pos, y_pos];
    }
}

// text를 나타내는 class
class Text extends Primitive {
    constructor(posX, posY, contents="", color="black") {
        super(posX, posY);
        this.contents = contents;
        this.color = color;
    }
    // 텍스트를 수정하는 함수.
    editText(string) { this.contents = string; }
}

// 도형들을 나타내는 class
class Figure extends Primitive {
    constructor(posX, posY, background="transparent", border="black") {
        super(posX, posY);
        this.background = background;
        this.border = border;
    }

    // 색깔을 바꿀 수 있는 함수들
    setBackground(color) { this.background = color; }
    setBorder(color) { this.border = color; }

    // 색깔을 설정한다.
    setColor(background, border) {
        this.setBackground(background);
        this.setBorder(border);
    }
}

class Circle extends Figure {
    constructor (posX, posY, radius=5, background, border) {
        super(posX, posY, background, border);
        this.radius = radius;
    }
    // 사이즈를 설정한다.
    setSize(num) { this.radius = num; }

    getSize() { return [this.radius*2, this.radius*2] }
}

class Elliptic extends Figure {
    constructor(posX, posY, background, border, height=10, width=10) {
        super(posX, posY, background, border);
        this.height = height;
        this.width = width;
    }

    // 사이즈를 설정한다.
    setSize(w, h) {
        this.width = w;
        this.height = h;
    }

    getSize() { return [this.width, this.height] }
}

class Rectangle extends Figure {
    constructor(posX, posY, background, border, height=10, width=10) {
        super(posX, posY, background, border);
        this.height = height;
        this.width = width;
    }

    // 사이즈를 설정한다.
    setSize(w, h) {
        this.height = h;
        this.width = w;
    }

    getSize() { return [this.width, this.height]}
}

class RoundedRectangle extends Figure {
    constructor(posX, posY, background, border, radius, height=10, width=10) {
        super(posX, posY, background, border);
        this.height = height;
        this.width = width;
        this.radius = radius;
    }

    // 사이즈를 설정한다.
    setSize(w, h) {
        this.height = h;
        this.width = w;
    }

    // 모서리 크기를 설정한다.
    setRadius(r) { this.radius = r; }

    getSize() { return [this.width, this.height] }
}

export { Primitive, Point, Line, Text, Circle, Elliptic, Rectangle, RoundedRectangle };