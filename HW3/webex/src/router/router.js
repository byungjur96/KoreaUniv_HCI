import VueRouter from "vue-router";

import Home from  '../components/Home'
import Setting from '../components/Setting'
import Exercise from '../components/Exercise'
import History from '../components/History'
import Chart from '../components/LineChart'

const routes = [
    {
        path: "/chart",
        name: "Chart",
        component: Chart
    },
    {
        path: "/",
        name: "root",
        component: Home
    },
    {
        path: "/home",
        name: "Home",
        component: Home
    },
    {
        path: "/setting",
        name : 'Setting',
        component: Setting,
    },
    {
        path: "/exercise",
        name : 'Exercise',
        component: Exercise,
    },
    {
        path: "/history",
        name : 'History',
        component: History,
    },
];

const router = new VueRouter({
    mode: 'history',    
    routes
});

export default router;
