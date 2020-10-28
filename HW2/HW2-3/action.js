import { createPrimitiveRoot, createGUIRoot, findPrimitive, findGUI, printTree, getPrimitiveRoot, getGUIRoot } from '../common/display.js'
import { drawLine, drawText, drawCircle, drawElliptic, drawRectangle, drawNode, drawPrimitiveTree, drawGUITree } from '../common/draw.js'

function defaultAction(){
// GUI Root
    let g = createGUIRoot();

    // window
    let window = g.addGUI("Window");
    window.initWindow();
    window.setStart(100, 100);
    window.setWidth(1800);

    // title
    let title = window.addGUI("Title");
    title.setContents("Human Computer Interface(2020.2H)");
    title.setStart(650, 100);

    // table
    let c = window.addGUI("Table");
    c.initTable(16, 3);
    c.setStart(300, 150);

    // Apply 버튼
    let btn1 = window.addGUI("RectangleButton");
    btn1.setStart(300, 1200);
    btn1.setSize(200, 50);
    btn1.setContents("Apply");
    btn1.action['root'] = [`disableBtn ${btn1.id} Enrolled`];

    // Link 버튼
    let btn2 = window.addGUI("RectangleButton");
    btn2.setStart(550, 1200);
    btn2.setSize(200, 50);
    btn2.setContents("Visit Link");
    btn2.action['root'] = [`goToLink ${btn2.id} https://dxp.korea.ac.kr/`];

    let sub = window.addGUI("Window");
    sub.initWindow();
    sub.setStart(800, 650);
    sub.setWidth(400);
    sub.setHeight(200);

    let msg = sub.addGUI("Title");
    msg.setStart(100, 100);
    msg.setContents("Focusing Test");


    // table 컨텐츠 채우기
    c.changeCellValue(1, 1, "Week");
    c.changeCellValue(2, 1, "9-1");
    c.changeCellValue(3, 1, "9-2(2)");
    c.changeCellValue(4, 1, "9-3(2)");
    c.changeCellValue(5, 1, "9-4(2)");
    c.changeCellValue(6, 1, "9-5(1)");
    c.changeCellValue(7, 1, "10-1(2)");
    c.changeCellValue(8, 1, "10-2(2)");
    c.changeCellValue(9, 1, "10-3(2)");
    c.changeCellValue(10, 1, "10-4(2)");
    c.changeCellValue(11, 1, "11-1(2)");
    c.changeCellValue(12, 1, "11-2(2)");
    c.changeCellValue(13, 1, "11-3(2)");
    c.changeCellValue(14, 1, "11-4(2)");
    c.changeCellValue(15, 1, "12-1(2)");
    c.changeCellValue(16, 1, "12-2(2)");
    c.changeCellValue(1, 2, "Contents");
    c.changeCellValue(2, 2, "Introduction");
    c.changeCellValue(3, 2, "HTML/Java Script/XD");
    c.changeCellValue(4, 2, "HTML/Java Script/XD");
    c.changeCellValue(5, 2, "HCI System");
    c.changeCellValue(6, 2, "Principles and Guidelines");
    c.changeCellValue(7, 2, "Principles and Guidelines/Cognitive Aspect");
    c.changeCellValue(8, 2, "Design Process");
    c.changeCellValue(9, 2, "User Research");
    c.changeCellValue(10, 2, "Project Proposal (Selected)");
    c.changeCellValue(11, 2, "Ergonomics");
    c.changeCellValue(12, 2, "Ergonomics/Implementation Issue");
    c.changeCellValue(13, 2, "Implementation Issue/HCI Design");
    c.changeCellValue(14, 2, "Evaluation");
    c.changeCellValue(15, 2, "Buffer");
    c.changeCellValue(16, 2, "Final Report Presentation");
    c.changeCellValue(1, 3, "Events");
    c.changeCellValue(3, 3, "HW1");
    c.changeCellValue(4, 3, "HW2");
    c.changeCellValue(6, 3, "HW 3/4/5");
    c.changeCellValue(7, 3, "Proposal");
    c.changeCellValue(9, 3, "HW1 Due");
    c.changeCellValue(10, 3, "Proposal Due");
    c.changeCellValue(11, 3, "HW2 Due");
    c.changeCellValue(14, 3, "Exam");
    c.changeCellValue(15, 3, "HW 3/4/5 Due");
    c.changeCellValue(16, 3, "Final Report/Presentation Due");

    // 테이블 크기 변경
    c.changeRowHeight(0, 100);
    c.changeColWidth(0, 150);
    c.changeColWidth(1, 600);
    c.changeColWidth(2, 450);
    c.setRowHeader(0);

    let alert = g.addGUI("Window");
    alert.initWindow();
    alert.setStart(800, 650);
    alert.setWidth(400);
    alert.setHeight(200);

    let warning = alert.addGUI("Title");
    warning.setStart(100, 100);
    warning.setContents("Render Success!");

    // GUI 화면 표시
    drawGUITree(g);
}

export { defaultAction }