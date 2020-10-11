import { Primitive, Point, Line, Text, Circle, Elliptic, Rectangle, RoundedRectangle } from '../common/primitive.js'
import { GUI, Canvas, Button, RectangleButton, CircleButton, EllipticButton, Window, Table } from '../common/gui.js'

let canvas = document.getElementById("canvas");

// 선을 그린다.
function drawLine(node) {
    if (node.type === "Line" && canvas.getContext) {
        console.log("Line Displayed!");
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(node.x_position, node.y_position);
        ctx.lineTo(node.end_x, node.end_y);
        ctx.closePath();
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
        ctx.font = "30px Arial";
        ctx.fillStyle = node.color;
        let [x_pos, y_pos] = node.end_point();
        ctx.textBaseline = "top"
        ctx.fillText(node.contents, x_pos+200, y_pos+200);
    }
    else { console.log("Text Failed!"); }
    
}

// 원을 그린다.
function drawCircle(node) {
    if (node.type === "Circle" && canvas.getContext) {
        console.log("Circle Displayed!");
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        let abs_pos = node.end_point();
        let center_x = abs_pos[0] + node.x_position + node.radius;
        let center_y = abs_pos[1] + node.y_position + node.radius;
        ctx.arc(center_x, center_y, node.radius, 0, 2*Math.PI);
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
        ctx.rect(200,200, 200, 200);
        ctx.stroke();
    }
    else { console.log("Rectangle Failed!"); }
}

// node의 종류에 따라 해당하는 node를 canvas에 표시한다.
function drawNode(node) {
    let type = node.type;
    if (type === "Point") { child = new Point(); }
    else if (type === "Line") { drawLine(node); }
    else if (type === "Text") { drawText(node); }
    else if (type === "Circle") { drawCircle(node); }
    else if (type === "Elliptic") { drawElliptic(node); }
    else if (type === "Rectangle") { drawRectangle(node); }
    else if (type === "RoundedRectangle") { drawCircle(node); }
    else { console.log("Wrong Node!"); }
}


let vertical = new Line(100, 0, 100, 2000);
let line = new Line(100,200);
let text = new Text(200,200,"Hello World");
let circle = new Circle(500, 500, "black", "red", 100);
let elliptic = new Elliptic(1000, 1000, "transparent", "black", 100, 200);
let rectangle = new Rectangle(1000, 1000, "transparent", "red", 100, 200);

drawNode(vertical);
drawNode(line);
drawNode(text);
drawNode(circle);
drawNode(elliptic);
drawNode(rectangle);

