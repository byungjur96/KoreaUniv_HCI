<template>
    <div id="container">
        <!-- 옵션 선택 박스 -->
        <div class="select-container">
            <div class="select-option"
                 @click="option='Monthly'"
                 v-bind:class="{'selected-option': optionSelect('Monthly')}">
                Monthly
            </div>
            <div class="select-option"
                 @click="option='Weekly'"
                 v-bind:class="{'selected-option': optionSelect('Weekly')}">
                Weekly
            </div>
            <div class="select-option"
                 @click="option='Daily'"
                 v-bind:class="{'selected-option': optionSelect('Daily')}">
                Daily
            </div>
        </div>
        <!-- 옵션 선택 박스 끝 -->

        <!-- 결과 출력 -->
        <div class="record">
            <template v-if="option==='Monthly'">

            </template>
            <template v-if="option==='Weekly'">
                <template v-if="weekAvailable">
                    <LineChart :start="startDay" :key="reload"></LineChart>
                </template>

            </template>
            <template v-if="option==='Daily'">
                <template v-if="canExist(selected)">
                    <div class="exercise-day">{{ displayedYear }}.{{ fillDate(selected) }}</div>
                    <div class="daily-container">
                        <div class="daily-ex" v-for="r of routine" :key="r.idx">
                            <b>({{ r.idx + 1 }})</b> {{ exercise[r.id].name }} : {{record[r.idx]}}/{{ r.num }}
                        </div>
                    </div>
                </template>
            </template>
        </div>
        <!-- 결과 출력 끝 -->

        <!-- 달력 표시 부분 -->
        <div class="display">
            <!-- 한 달 달력 표시 -->
            <div class="month">
                <span class="before" @click="beforeMonth">&lt;</span>
                <span class="displayed">{{ displayedYear }}</span>
                <span class="after" @click="nextMonth">&gt;</span>
            </div>
            <table class="table">
                <tr><th v-for="d in date" :key="d">{{ d }}</th></tr>
                <tr v-for="i in week" :key="i"
                    @click="visualizeWeek(i)"
                    v-bind:class="{'selected-week': selectWeek(i)}">
                    <td v-bind:class="{'selected-day': isSelected(getCalPos(i, j))}"
                        @click="selectDay(getCalPos(i, j))"
                        v-for="j in 7"
                        :key="j" >
                        {{ getCalPos(i, j) }}
                        <div class="exist"
                             v-if="canExist(getCalPos(i, j))">
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import History from "../data/history.json"
import Routine from "../data/routine.json"
import Exercises from "../data/exercises.json"
import LineChart from "./Line"

export default {
    name: 'History',
    components: { LineChart },
    created() {
        let idx = Object.keys(Routine);
        for (let i of idx) {
            this.routine.push(Routine[i]);
        }
    },
    data() {
        return {
            date: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Tur', 'Fri', 'Sat'],
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            selected: undefined,
            option: 'Monthly',
            routine : [],
            exercise: Exercises,
            weekAvailable: false,
            startDay: undefined,
            reload : 0,
        }
    },
    computed: {
        week: function() {
            let days = new Date(this.year, this.month,0).getDate();
            let date = new Date(this.year, this.month-1,1).getDay();
            return Math.round((days + date)/7) + 1;
        },
        displayedYear: function() {
            let y = this.year.toString();
            let m = this.month.toString();
            return y + '.' + this.fillDate(m);
        },
        record: function() {
            if (this.selected === undefined) return [];
            if (this.canExist(this.selected)) {
                return History[this.year][this.month][this.selected];
            }
            else return [];
        },
        isToday: function() {
            let today = new Date();
            if (this.selected===undefined) return false;
            let selectedDay = new Date(this.year, this.month-1, this.selected);
            return ((today.getFullYear() === selectedDay.getFullYear()) &&
                (today.getMonth() === selectedDay.getMonth()) &&
                (today.getDate() === selectedDay.getDate()));
        }
    },
    methods: {
        getCalPos : function (week, day) {
            let start = new Date(this.year, this.month-1, 1).getDay();
            let end = new Date(this.year, this.month, 0).getDate();
            let value = (week - 1) * 7 + day - start;
            if ((value > 0) && (value <= end)) return value
            else return ""
        },
        calMonth: function (delta) {
            let a = new Date(this.year, this.month -1 + delta);
            this.year = a.getFullYear();
            this.month = a.getMonth() + 1;
            this.selected = undefined;
        },
        nextMonth: function() {
            this.calMonth(1);
        },
        beforeMonth: function() {
            this.calMonth(-1);
        },
        canExist(val) {
            if (val === "") return false;
            if (History[this.year] === undefined) return false;
            if (History[this.year][this.month] === undefined) return false;
            else if (History[this.year][this.month][val] === undefined) return false;
            return true;
        },
        selectDay(val) {
            this.selected = val;
        },
        selectWeek(week) {
            let start = new Date(this.year, this.month-1, 1).getDay();
            let value = (week - 1) * 7 - start;
            return (this.option === "Weekly") && (this.selected > value) && (this.selected <= value + 7);

        },
        isSelected(val) {
            return (this.option === "Daily") && (this.selected === val) && this.canExist(val);
        },
        fillDate(day) {
            if (day.length === 1) return '0' + day;
            else return day;
        },
        optionSelect(val) {
            return val === this.option;
        },
        visualizeWeek(i) {
            this.reload += 1;
            this.startDay = Object();
            this.startDay.year = this.year;
            this.startDay.month = this.month;
            this.startDay.day = this.getCalPos(i, 1);
            this.weekAvailable = true;
        }
    }
}
</script>

<style scoped>
.select-container {
    display: flex;
    width: 90%;
    height: 30px;
    margin : 10px 5%;
}

.select-option {
    border: 1px solid black;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.select-container > .select-option:first-child {
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
}

.select-container > .select-option:last-child {
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
}

.selected-option {
    background-color: lightskyblue;
}

.display {
    width: 90%;
    height: 40%;
    margin : 10px 5%;
}

.record {
    width: 90%;
    height: 306px;
    margin : 10px 5%;
    border: 1px solid black;
}

.month {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.table {
    width: 80%;
    margin: 10px 10%;
}

.month > span {
    margin: 10px;
}

.displayed {
    font-size: 20px;
}
.table th {
    width: 30px;
    height: 30px;
}

.table td {
    text-align: center;
    height: 30px;
    width: 30px;
    border-radius: 28px;
}

.selected-day {
    background-color: lightblue;
}

.selected-week {
    background-color: lightblue;
}

.exercise-day {
    text-align: center;
    margin: 10px;
    font-size: 20px;
}

.exist {
    width: 4px;
    height: 4px;
    border-radius: 4px;
    background-color: red;
    margin-left: auto;
    margin-right: auto;
}

.daily-container {
    margin-top: 20px;
}

.daily-ex {
    margin: 10px;
}

.yet {
    display: flex;
    vertical-align: middle;
    justify-content: center;
    align-items: center;
}
</style>
