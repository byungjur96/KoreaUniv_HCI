import {createPrimitiveRoot, createGUIRoot, findPrimitive, findGUI, printTree } from '../common/display.js'

let a = createPrimitiveRoot();
createPrimitiveRoot();
createPrimitiveRoot();
a.addNode("Point");
a.addNode("Line");
a.addNode("Text");
a.addNode("Circle");
a.addNode("Elliptic");
a.addNode("Rectangle");
a.children[3].addNode("Primitive");
console.log("<Node 삭제 전>");
console.table(a.children);
a.deleteNode("Node11");
console.log("<Node 삭제 후>");
console.table(a.children);

let g = createGUIRoot();
g.addGUI("Table");
let c = g.children[0];
c.initTable(15, 3);
c.changeCellValue(1, 1, "9-1");
c.changeCellValue(2, 1, "9-2(2)");
c.changeCellValue(3, 1, "9-3(2)");
c.changeCellValue(4, 1, "9-4(2)");
c.changeCellValue(5, 1, "9-5(1)");
c.changeCellValue(6, 1, "10-1(2)");
c.changeCellValue(7, 1, "10-2(2)");
c.changeCellValue(8, 1, "10-3(2)");
c.changeCellValue(9, 1, "10-4(2)");
c.changeCellValue(10, 1, "11-1(2)");
c.changeCellValue(11, 1, "11-2(2)");
c.changeCellValue(12, 1, "11-3(2)");
c.changeCellValue(13, 1, "11-4(2)");
c.changeCellValue(14, 1, "12-1(2)");
c.changeCellValue(15, 1, "12-2(2)");
c.changeCellValue(1, 2, "Introduction");
c.changeCellValue(2, 2, "HTML/Java Script/XD");
c.changeCellValue(3, 2, "HTML/Java Script/XD");
c.changeCellValue(4, 2, "HCI System");
c.changeCellValue(5, 2, "Principles and Guidelines");
c.changeCellValue(6, 2, "Principles and Guidelines/Cognitive Aspect");
c.changeCellValue(7, 2, "Design Process");
c.changeCellValue(8, 2, "User Research");
c.changeCellValue(9, 2, "Project Proposal (Selected)");
c.changeCellValue(10, 2, "Ergonomics");
c.changeCellValue(11, 2, "Ergonomics/Implementation Issue");
c.changeCellValue(12, 2, "Implementation Issue/HCI Design");
c.changeCellValue(13, 2, "Evaluation");
c.changeCellValue(14, 2, "Buffer");
c.changeCellValue(15, 2, "Final Report Presentation");
c.changeCellValue(2, 3, "HW1");
c.changeCellValue(3, 3, "HW2");
c.changeCellValue(5, 1, "HW 3/4/5");
c.changeCellValue(6, 1, "Proposal");
c.changeCellValue(8, 1, "HW1 Due");
c.changeCellValue(9, 1, "Proposal Due");
c.changeCellValue(10, 1, "HW2 Due");
c.changeCellValue(13, 1, "Exam");
c.changeCellValue(14, 1, "HW 3/4/5 Due");
c.changeCellValue(15, 1, "Final Report/Presentation Due");
console.table(c);