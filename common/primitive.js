class Primitive {
    constructor(x_position=0, y_position=0) {
        this.id = undefined;
        this.type = this.constructor.name;
        this.x_position = x_position;
        this.y_position = y_position;
        this.parent = null;
        this.children = [];
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
    // node 자체를 반환한다.
    getNode() { return this; }

    // 해당 node의 id 값을 만든다.
    setId() {
        let parent = this.parent;
        let siblings = parent.children.length + 1;
        return parent.id + siblings.toString();
    }

    // root node를 만들 때 id 값을 생성한다.
    make_root(num) {
        this.id = "Node" + num.toString();
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
        while (ancestor.is_root() === false) {
            ancestor = ancestor.parent;
        }
        return ancestor;
    }

    // 자식 node를 더한다.
    add_node(type="Primitive") {
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
    }

    // node를 삭제한다.
    delete_node(name){
        let target = this.search_node(name);
        if (target !== undefined) {
            let lst = target.parent.children;
            const idx = lst.indexOf(target);
            lst.splice(idx, 1);
            target.parent = undefined;
        }
    }

    // 자식 node 중에 타겟이 있는지 확인한다.
    search_child(name, parent) {
        if (parent.children !== []) {
            for (let child of parent.children) {
                if (child.id === name) { return child; }
                else {
                    let result = this.search_child(name, child);
                    if (result != undefined) { return result; }
                }
            }
        }
        return undefined;
    }

    // node를 찾는다.
    search_node(name){
        let root = this.find_root();
        let result = this.search_child(name, root);
        return result;
    }
}

// 점을 의미하는 class
class Point extends Primitive {
    constructor(x_position, y_position) {
        super(x_position, y_position);
    }
}

// 선을 의미하는 class
class Line extends Primitive {
    constructor(x_position, y_position, end_x=10, end_y=0, color="black") {
        super(x_position, y_position);
        if (typeof end_x === "number") { this.end_x = end_x; }
        if (typeof end_y === "number") { this.end_y = end_y; }
        this.color = color;
    }

    set_color(string) {
        this.color = string;
    }
}

// text를 나타내는 class
class Text extends Primitive {
    constructor(x_position, y_position, contents="", color="black", editable=false) {
        super(x_position, y_position);
        this.contents = contents;
        this.color = color;
        this.editable = editable;
    }
    // 텍스트를 수정하는 함수.
    edit_text(string) { if (this.editable === true) this.contents = string; }
}

// 도형들을 나타내는 class
class Figure extends Primitive {
    constructor(x_position, y_position, background="transparent", border="black") {
        super(x_position, y_position);
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
    constructor (x_position, y_position, background, border, radius=5) {
        super(x_position, y_position, background, border);
        this.radius = radius;
    }
    // 사이즈를 설정한다.
    setSize(num) { this.radius = num; }
    
}

class Elliptic extends Figure {
    constructor(x_position, y_position, background, border, height=10, width=10) {
        super(x_position, y_position, background, border);
        this.height = height;
        this.width = width;
    }

    // 사이즈를 설정한다.
    setSize(w, h) {
        this.height = h;
        this.width = w;
    }
}

class Rectangle extends Figure {
    constructor(x_position, y_position, background, border, height=10, width=10) {
        super(x_position, y_position, background, border);
        this.height = height;
        this.width = width;
    }

    // 사이즈를 설정한다.
    setSize(w, h) {
        this.height = h;
        this.width = w;
    }
}

class RoundedRectangle extends Figure {
    constructor(x_position, y_position, background, border, border_radius, height=10, width=10) {
        super(x_position, y_position, background, border);
        this.height = height;
        this.width = width;
        this.border_radius = border_radius;
    }

    // 사이즈를 설정한다.
    setSize(w, h) {
        this.height = h;
        this.width = w;
    }

    setBorderRadius(r) {
        this.border_radius = border_radius;
    }
}

export {Primitive, Point, Line, Text, Circle, Elliptic, Rectangle, RoundedRectangle};