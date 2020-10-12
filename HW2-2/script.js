import { Primitive, Point, Line, Text, Circle, Elliptic, Rectangle, RoundedRectangle } from '../common/primitive.js'
import { GUI, Canvas, Button, RectangleButton, CircleButton, EllipticButton, Window, Table } from '../common/gui.js'
import { createPrimitiveRoot, createGUIRoot, findPrimitive, findGUI, printTree, getPrimitiveRoot, getGUIRoot } from '../common/display.js'

let canvas = document.getElementById("canvas");

// 선을 그린다.
function drawLine(node) {
    if (node.type === "Line" && canvas.getContext) {
        console.log("Line Displayed!");
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(node.posX, node.posY);
        ctx.closePath();
        ctx.lineTo(node.endX, node.endY);
        ctx.lineWidth = 2;
        ctx.strokeStyle = node.color;
        ctx.stroke();
    }
    else { console.log("Line Failed!"); }
}

// 텍스트를 입력한다.
function drawText(node) {
    if (node.type === "Text" && canvas.getContext) {
        console.log("Text Displayed!");
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.font = node.font;
        ctx.fillStyle = node.color;
        let [posX, posY] = node.getAbsPos();
        ctx.textBaseline = node.textBaseline;
        ctx.textAlign = node.textAlign;
        ctx.fillText(node.contents, posX, posY);
    }
    else { console.log("Text Failed!"); }
}

// 원을 그린다.
function drawCircle(node) {
    if (node.type === "Circle" && canvas.getContext) {
        console.log("Circle Displayed!");
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        let absPos = node.getAbsPos();
        let centerX = absPos[0] + node.posX + node.radius;
        let centerY = absPos[1] + node.posY + node.radius;
        ctx.arc(centerX, centerY, node.radius, 0, 2*Math.PI);
        ctx.fillStyle = node.background;
        ctx.strokeStyle = node.border;
        ctx.fill();
        ctx.stroke();
    }
    else { console.log("Circle Failed!");}
}

// 타원을 그린다.
function drawElliptic(node) {

}

// 직사각형을 그린다.
function drawRectangle(node) {
    if (node.type === "Rectangle" && canvas.getContext) {
        console.log("Rectangle Displayed!");
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.fillStyle=node.background;
        let absPos = node.getAbsPos();
        let centerX = absPos[0] + node.posX;
        let centerY = absPos[1] + node.posY;
        let size = node.getSize();
        ctx.fillRect(centerX, centerY, size[0], size[1]);
        ctx.strokeStyle=node.border;
        ctx.strokeRect(centerX, centerY, size[0], size[1]);
        ctx.stroke();
    }
    else { console.log("Rectangle Failed!"); }
}

// node의 종류에 따라 해당하는 node를 canvas에 표시한다.
function drawNode(node) {
    let type = node.type;
    if (type === "Primitive" ) { return; }
    else if (type === "Point") { return; }
    else if (type === "Line") { drawLine(node); }
    else if (type === "Text") { drawText(node); }
    else if (type === "Circle") { drawCircle(node); }
    else if (type === "Elliptic") { drawElliptic(node); }
    else if (type === "Rectangle") { drawRectangle(node); }
    // else if (type === "RoundedRectangle") { drawCircle(node); }
    else { 
        console.log("Wrong Node!");
        console.log(node); 
    }
}

// GUI node에 대한 component를 canvas에 표시한다.
function drawGUI(gui) {
    console.log(`Draw ${gui.type}`)
    let root = gui.component.findRoot();
    root.posX += gui.posX;
    root.posY += gui.posY;
    drawPrimitiveTree(gui.component);
}

// 해당 primitive node를 root node로 가지는 subtree를 canvas에 표시한다.
function drawPrimitiveTree(node) {
    drawNode(node);
    if (node !== undefined && node.children !== undefined && node.children.length !== 0) {
        let children = node.children;
        for(let child of children) {
            drawPrimitiveTree(child);
        }
    }
}

// 해당 gui node를 root node로 가지는 subtree를 canvas에 표시한다.
function drawGUITree(gui) {
    drawGUI(gui);
    if (gui !== undefined && gui.children !== undefined && gui.children.length !== 0) {
        let children = gui.children;
        for(let child of children) {
            drawGUITree(child);
        }
    }
}

// let root = createPrimitiveRoot();

// let vertical = root.addNode("Line");
// vertical.setStart(100,0);
// vertical.setEnd(100,2000);

// let child = vertical.addNode("Rectangle");
// child.setSize(200, 200);
// console.log(child.getAbsPos());

// let grand = child.addNode("Rectangle");
// grand.setSize(100, 100);
// console.log(grand.getAbsPos());

// let text = root.addNode("Text");
// text.editText("Hello World");
// text.setStart(200, 200);

// let circle = root.addNode("Circle");
// circle.setStart(600, 600);
// circle.setSize(100);
// circle.setBackground("purple");
// circle.setBorder("green");

// let rectangle = root.addNode("Rectangle");
// rectangle.setStart(400, 400);
// rectangle.setSize(200, 200);
// rectangle.setBackground("blue");
// rectangle.setBorder("red");

// // let elliptic = new Elliptic(1000, 1000, "transparent", "black", 100, 200);
// // let rectangle = new Rectangle(1000, 1000, "transparent", "red", 100, 200);

// drawPrimitiveTree(root);

export { drawLine, drawText, drawCircle, drawElliptic, drawRectangle, drawNode, drawPrimitiveTree, drawGUITree }