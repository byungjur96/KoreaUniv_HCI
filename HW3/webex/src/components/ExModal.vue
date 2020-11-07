<template>
    <transition name="modal" appear>
        <div class="modal modal-overlay" @click.self="$emit('close')">
            <div class="modal-window">
                <div class="modal-content">
                    <h2 class="title">{{ title }}</h2>
                    <template v-if="!modify">
                        <select v-model="name">
                            <option v-for="(ex,idx) in exerciseList" :key="idx">{{ ex }}</option>
                        </select>
                    </template>
                    <template v-if="selected">
                        <img class="how-to" :src="require(`../images/${exercise.thumbnail}`)" alt="">
                        <div class="setting"><input type="number" v-model="num"> Times in 6 month</div>
                        <div class="setting"><input type="number" v-model="term"> sec Between.</div>
                    </template>

                </div>
                <footer class="modal-footer">
                    <slot name="footer">
                        <button @click="$emit('close', result)">{{ enroll }}</button>
                    </slot>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
import exercises from '@/data/exercises.json';

export default {
    name: "ExerciseModal",
    created() {
        for (const key of Object.keys(exercises)) {
            this.exerciseList.push(exercises[key].name);
        }
        console.log(exercises);
    },
    data() {
        return {
            name: this.modify ? this.$props.exercise.name : "",
            num : this.modify ? this.$props.exercise.num : 0,
            term : this.modify ? this.$props.exercise.term : 0,
            idx : this.modify ? this.$props.exercise.idx : undefined,
            enroll : this.modify ? 'Change' : 'Add',
            exerciseList : []
        }
    },
    computed: {
        title: function() {
            if (this.name === "") return "New Exercise";
            else return this.name;
        },
        selected: function() {
            return this.name !== "";
        },
        result: function() {
            let value = this.exerciseList.indexOf(this.name);
            console.log(value);
            return {
                modify: this.modify,
                idx: this.$data.idx,
                id: value,
                name: this.name,
                num : this.num,
                term : this.term,
                info: exercises[value].info,
                thumbnail: exercises[value].thumbnail,
                pos: exercises[value].pos,
            }
        }
    },
    props : {
        modify : { type: Boolean, default: false },
        exercise : { type: Object, default : null }
    },
}
</script>

<style scoped>
.how-to {
    border: 1px solid black;
    width: calc(80vw - 30px);
    margin: 0 15px 15px;
    /*height: 100px;*/
}
.setting {
    margin: 15px;
}

.setting > input { width: 30px}

.modal.modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
}
.modal-window {
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
}
.modal-content {
    padding: 10px 20px;
    width: 80vw;
    height: 40vh;
}
.modal-footer {
    background: #ccc;
    padding: 10px;
    text-align: right;
}
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.4s;
}
.modal-enter-active .modal-window,
.modal-leave-active .modal-window {
    transition: opacity 0.4s, transform 0.4s;
}
.modal-leave-active {
    transition: opacity 0.6s ease 0.4s;
}
.modal-enter,
.modal-leave-to {
    opacity: 0;
}
.modal-enter .modal-window,
.modal-leave-to .modal-window {
    opacity: 0;
    transform: translateY(-20px);
}

</style>
