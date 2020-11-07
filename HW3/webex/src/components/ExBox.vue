<template>
    <div id="container">
        <img class="thumbnail" :src="require(`../images/${info.thumbnail}`)" alt="">
        <div class="text-box">
            <div class="chip-list">
                <div class="chip">{{ info.pos }}</div>
            </div>
            <div class="name">{{ info.name }}</div>
            <div class="info">{{ info.num }} time. {{ info.term }}sec</div>
        </div>
        <div id="edit" @click="$emit('modify', routine)">
            <img class="edit-icon" src="../assets/edit.png" alt="">
        </div>
    </div>
</template>

<script>

export default {
    name : "ExerciseBox",
    methods : {
        openModal() {
            this.modal = true;
        },
        closeModal() {
            this.modal = false;
        },
    },
    props : {
        info : { type : Object, required: true }
    },
    data() {
        return {
            modal: false,
            routine: {
                idx: this.info.idx,
                name: this.info.name,
                num: this.info.num,
                term: this.info.term
            }
        }
    },
}
</script>

<style scoped>
#container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height : 80px;
    border-radius: 5px;
    border: 1px solid lightgray;
    box-shadow: rgba(0, 0, 0, 0.15) 2px 2px 3px;
}

.todo {
    border: 2px solid green!important;
}

.thumbnail {
    width: 60px;
    height: 60px;
    border: 1px solid black;
}

.text-box {
    width: calc(100% - 134px);
    height: 60px;
}

.text-box > div {
    margin: 4px 2px;
}

.text-box > div:first-child { margin-top: 0; }
.text-box > div:last-child { margin-bottom: 0; }

.chip {
    display: inline-block;
    padding: 2px;
    border-radius: 7px;
    border: 1px solid #898989;
    color: #898989;
    font-size: 10px;
}

.name {
    font-size: 15px;
}

.info {
    font-size: 12px;
}

#edit {
    height: 80px;
    display: flex;
    align-items: center;
 }

.edit-icon {
    width: 15px;
    height: 15px;
    margin-right: 5px;
}
</style>
