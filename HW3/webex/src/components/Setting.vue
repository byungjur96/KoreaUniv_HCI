<template>
    <div id="container">
        <h2>Current Routine</h2>
        <template v-for="(ex, idx) in myRoutine">
            <ExerciseBox @modify="openModify(ex)" :info="ex" class="box" :key="idx"></ExerciseBox>
        </template>
        <div id="add" @click="openModal">+</div>
        <div class="btn-group">
            <button id="save" @click="save">Save</button>
            <button id="clear" @click="clear">Clear</button>
        </div>
        <template v-if="modal">
            <ExerciseModal :modify="modify" :exercise="exercise" @close="closeModal"></ExerciseModal>
        </template>
    </div>
</template>

<script>
import ExerciseBox from './ExBox'
import ExerciseModal from './ExModal'
import router from '../router/router'
import routine from "@/data/routine.json";
import exercises from "@/data/exercises.json";

export default {
    name: 'Setting',
    components: {
        ExerciseBox, ExerciseModal
    },
    methods: {
        openModal() {
            this.modify = false;
            this.exercise = undefined;
            this.modal = true;
            },
        openModify(info) {
            this.modify = true;
            this.exercise = info;
            this.modal = true;
        },
        closeModal(info) {
            if (info !== undefined) {
                // 수정하는 경우
                if (info.modify) {
                    this.myRoutine[info.idx].num = info.num;
                    this.myRoutine[info.idx].term = info.term;
                }
                // 새로 추가하는 경우
                else {
                    let newRoutine = {};
                    newRoutine.name = info.name;
                    newRoutine.num = info.num;
                    newRoutine.term = info.term;
                    newRoutine.info = info.info;
                    newRoutine.pos = info.pos;
                    newRoutine.thumbnail = info.thumbnail;
                    this.myRoutine.push(newRoutine);
                }
            }
            this.modal = false;
            },
        goHome() { router.push('Home'); },
        save() {
            let result = this.myRoutine.map(e => {
                return {
                    'idx': e.idx,
                    'id': e.id,
                    'num': e.num,
                    'term': e.term
                }
            });
            console.log(result);
            this.goHome();
        },
        clear() {
            this.myRoutine = [];
            console.log(this.myRoutine);
        }
    },
    data() {
        return {
            modal: false,
            modify : false,
            exercise: undefined,
            myRoutine: []
		}
	},
    mounted() {
        let key = Object.keys(routine);
        key.forEach(r => {
            let ex = {};
            let info = routine[r];
            let detail = exercises[info["id"]];
            ex.name = detail.name;
            ex.idx = r;
            ex.thumbnail = detail["thumbnail"];
            ex.pos = detail["pos"];
            ex.info = detail["info"];
            ex.num = info["num"];
            ex.term = info["term"];
            this.myRoutine.push(ex);
        });
    },
    router
}
</script>

<style scoped>
#add {
	width: calc(100% - 20px);
	height : 40px;
	margin : 10px 10px 50px 10px;
	border-radius: 5px;
	border: 1px solid lightgray;
    font-size: 32px;
    line-height: 40px;
    vertical-align: middle;
    text-align: center;
    color: darkgray;
    font-weight: bold;
    box-shadow: rgba(0, 0, 0, 0.15) 2px 2px 3px;
}

h2 {
    text-align: center;
}

.box {
    width: calc(100% - 20px);
    margin: 10px;
}

.btn-group {
    position: fixed;
    width: 100%;
    margin: 10px 20px;
    bottom: 0;
}

.btn-group > button {
    width: calc(50% - 20px);
    height: 30px;
}

.btn-group > button:first-child {
    border-radius: 5px 0 0 5px;
    background-color: lawngreen;
}

.btn-group > button:first-child:focus {
    border-radius: 5px 0 0 5px;
}

.btn-group > button:last-child {
    border-radius: 0 5px 5px 0;
    background-color: red;
}

</style>
