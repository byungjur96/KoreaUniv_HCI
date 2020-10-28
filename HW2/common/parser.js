import { createGUIRoot } from "./display.js";
import { GUI, Canvas, Title, Button, RectangleButton, CircleButton, EllipticButton, RoundedRectangleButton, Window, Table } from "./gui.js";

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

function parseXML(document) {
    let root = createGUIRoot();
    let children = document.childNodes;
    for(let child of children) {
        if (child.nodeType === 3) continue;
        iterParse(child, root);
    }
    return root;
}

function iterParse(node, parent) {
    // textnode는 생략한다.
    if (node.nodeType === 3) return;
    // 해당 element를 부모 GUI의 자식 node로 생성한다.
    let obj = xmlToGUI(node, parent);
    let children = node.childNodes;
    for (let child of children) {
        iterParse(child, obj);
    }
}

function xmlToGUI(node, parent) {
    let type = capitalize(node.nodeName);
    let child = undefined;
    if (type === "GUI") { child = new GUI(); }
    else if (type === "Canvas") { child = new Canvas(); }
    else if (type === "Button") {
        let style = node.getAttribute("style");
        if (style === "Rectangle") { child = new RectangleButton(); }
        else if (style === "Circle") { child = new CircleButton(); }
        else if (style === "Elliptic") { child = new EllipticButton(); }
        else if (style === "RoundedRectangle") { child = new RoundedRectangleButton(); }
        else {child = new RectangleButton(); }
        child.setContents(node.innerHTML);
        let width = Number(node.getAttribute("width"));
        let height = Number(node.getAttribute("height"));
        child.setSize(width, height);
    }
    else if (type === "Window") { 
        child = new Window();
        let width = Number(node.getAttribute("width"));
        let height = Number(node.getAttribute("height"));
        child.setWidth(width); 
        child.setHeight(height); 
    }
    else if (type === "Table") { 
        child = new Table(); 
        let row = Number(node.getAttribute("row"));
        let col = Number(node.getAttribute("col"));
        child.initTable(row, col);

        let component = node.children[0].children;
        let rows = child.component.findRoot().children;

        for (let i=0; i<row; i++){
            let cells =component[i].getElementsByTagName("Cell");
            let height = component[i].getAttribute("height");
            if (height !== null) child.changeRowHeight(i, Number(height));
            if (component[i].getAttribute("type")==="head") {
                child.setRowHeader(i);
                for (let j=0; j<col; j++){
                    let width = Number(cells[j].getAttribute("width"));
                    child.changeColWidth(j, width);
                }
            }
            for (let j=0; j<col; j++){
                let txt = cells[j].innerHTML;
                child.changeCellValue(i+1, j+1, txt);
            }
        }
        child.children.pop();
    }
    else if (type === "Title") { 
        child = new Title(); 
        child.setContents(node.innerHTML);
    }
    else if (type === "component") {return;}
    else { child = new GUI(); }
    
    let x = Number(node.getAttribute("x"));
    let y = Number(node.getAttribute("y"));
    child.setStart(x,y);

    child.parent = parent;
    parent.children.push(child);
    child.id = child.setId();
    return child;
}

export { parseXML }