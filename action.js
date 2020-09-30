import {create_primitive_root, create_gui_root, find_primitive, find_gui, print_tree, view_element} from './script.js'

//  actions
let a = create_primitive_root();
create_primitive_root();
create_primitive_root();
a.add_node("Point");
a.add_node("Line");
a.add_node("Text");
a.add_node("Circle");
a.add_node("Elliptic");
a.add_node("Rectangle");
a.children[3].add_node("Primitive");

// // a.delete_node("Node 11");
// view_element(a.children[2]);
// // console.table(a);
// console.log(display_tree("Node 1"));
// let text = a.search_node('Node 13');


let g = create_gui_root();
g.add_gui("Table");
let c = g.children[0];
c.init_table(15, 3);
c.change_cell_value(1, 1, "9-1");
c.change_cell_value(2, 1, "9-2(2)");
c.change_cell_value(3, 1, "9-3(2)");
c.change_cell_value(4, 1, "9-4(2)");
c.change_cell_value(5, 1, "9-5(1)");
c.change_cell_value(6, 1, "10-1(2)");
c.change_cell_value(7, 1, "10-2(2)");
c.change_cell_value(8, 1, "10-3(2)");
c.change_cell_value(9, 1, "10-4(2)");
c.change_cell_value(10, 1, "11-1(2)");
c.change_cell_value(11, 1, "11-2(2)");
c.change_cell_value(12, 1, "11-3(2)");
c.change_cell_value(13, 1, "11-4(2)");
c.change_cell_value(14, 1, "12-1(2)");
c.change_cell_value(15, 1, "12-2(2)");
c.change_cell_value(1, 2, "Introduction");
c.change_cell_value(2, 2, "HTML/Java Script/XD");
c.change_cell_value(3, 2, "HTML/Java Script/XD");
c.change_cell_value(4, 2, "HCI System");
c.change_cell_value(5, 2, "Principles and Guidelines");
c.change_cell_value(6, 2, "Principles and Guidelines/Cognitive Aspect");
c.change_cell_value(7, 2, "Design Process");
c.change_cell_value(8, 2, "User Research");
c.change_cell_value(9, 2, "Project Proposal (Selected)");
c.change_cell_value(10, 2, "Ergonomics");
c.change_cell_value(11, 2, "Ergonomics/Implementation Issue");
c.change_cell_value(12, 2, "Implementation Issue/HCI Design");
c.change_cell_value(13, 2, "Evaluation");
c.change_cell_value(14, 2, "Buffer");
c.change_cell_value(15, 2, "Final Report Presentation");
c.change_cell_value(2, 3, "HW1");
c.change_cell_value(3, 3, "HW2");
c.change_cell_value(5, 1, "HW 3/4/5");
c.change_cell_value(6, 1, "Proposal");
c.change_cell_value(8, 1, "HW1 Due");
c.change_cell_value(9, 1, "Proposal Due");
c.change_cell_value(10, 1, "HW2 Due");
c.change_cell_value(13, 1, "Exam");
c.change_cell_value(14, 1, "HW 3/4/5 Due");
c.change_cell_value(15, 1, "Final Report/Presentation Due");
console.table(c);