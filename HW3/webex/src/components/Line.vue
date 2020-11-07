<template>
    <div class="small">
        <template v-if="loaded">
            <LineChart :chart-data="dataCollection"></LineChart>
        </template>
    </div>
</template>

<script>
import LineChart from './LineChart.js'
import History from '../data/history.json'
import Routine from '../data/routine.json'
import Exercise from '../data/exercises.json'

let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purle'];

export default {
    name: 'Chart',
    props: ['start'],
    components: {
        LineChart
    },
    data () {
        return {
            dataCollection: null,
            routine: null,
            orders: null,
            loaded: false
        }
    },
    mounted () {
        this.routine = Object();
        this.orders = Object.keys(Routine);
        for (let i of this.orders) {
            let id = Routine[i]["id"];
            let name = Exercise[id].name;
            this.routine[name] = [];
        }
        for (let j=0; j<7; j++) {
            let d = new Date(this.start.year, this.start.month, this.start.day + j);
            let target = {
                year: d.getFullYear(),
                month: d.getMonth(),
                day: d.getDate()
            }
            let info = this.checkVal(target);
            if (info === null) {
                for (let i of this.orders) {
                    let id = Routine[i]["id"];
                    let name = Exercise[id].name;
                    this.routine[name].push(0);
                }
            }
            else {
                for (let i of this.orders) {
                    let id = Routine[i]["id"];
                    let name = Exercise[id].name;
                    this.routine[name].push(info[i]);
                }
            }
        }
        this.fillData();

    },
    methods: {
        fillData () {
            this.dataCollection = {
                labels: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Tur', 'Fri', 'Sat'],
                datasets: []
            }
            for (let order of this.orders) {
                let id = Routine[order]["id"];
                let name = Exercise[id].name;
                this.dataCollection.datasets.push({
                    label: name,
                    data: this.routine[name],
                    borderColor: colors[order],
                    lineTension: 0
                });
            }
            this.loaded = true;
        },
        checkVal(date) {
            if (History[date.year] === undefined) return null;
            else if (History[date.year][date.month] === undefined) return null;
            else if (History[date.year][date.month][date.day] === undefined) return null;
            else return History[date.year][date.month][date.day];
        }
    }
}
</script>

<style>
.small {
    max-width: 600px;
    margin: 0;
}
</style>
