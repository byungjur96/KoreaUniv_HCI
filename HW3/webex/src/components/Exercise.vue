<template>
    <div id="container">
        <img class="thumbnail" src="../assets/sample.jpg" alt="">
        <div class="info">{{ exName }}</div>
        <div class="set">{{ total - routine.length }} Sets Done Among {{ total }} Sets!</div>
        <div class="play-btn">
            <template v-if="play">
                <img src="../assets/pause.png" alt="">
            </template>
            <template v-if="!play">
                <img src="../assets/play.png" alt="">
            </template>
        </div>
        <div @click="skipEx" class="skip-btn">SKIP</div>
    </div>
</template>

<script>
import Routine from "../data/routine.json"
// import Exercises from "../data/exercises.json"


export default {
    name: 'Exercise',
    components: {},
    created() {
        let idx = Object.keys(Routine);
        for (let i of idx) {
            this.routine.push(Routine[i]);
        }
        this.total = this.routine.length;
    },
    data() {
        return {
            play : false,
            routine: [],
            exName: "",
            total: undefined,
            timer: true,
            result: [],
            exercise : undefined,
            pause: false,
            exNum: 0
        }
    },
    methods: {
        changePlay() {
            this.play = !this.play;
        },
        speak: function (text) {
            if (typeof SpeechSynthesisUtterance === "undefined" || typeof window.speechSynthesis === "undefined") {
                alert("이 브라우저는 음성 합성을 지원하지 않습니다.");
                return;
            }
            window.speechSynthesis.cancel(); // 현재 읽고있다면 초기화
            const speechMsg = new SpeechSynthesisUtterance();
            speechMsg.rate = 1; // 속도: 0.1 ~ 10
            speechMsg.pitch = 1; // 음높이: 0 ~ 2
            speechMsg.lang = "en-US";
            speechMsg.text = text;

            // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
            window.speechSynthesis.speak(speechMsg)
        },
        skipEx: function() {
            this.speak("Skip this exercise.");
        }
    }
}
</script>

<style scoped>
.set {
    width: calc(100% - 20px);
    margin: 10px 10px 50px 10px;
    text-align: center;
}
.thumbnail {
    width: 90%;
    min-height: 200px;
    margin: 0 5%;
    border: 1px solid black;
}

.play-btn {
    width: 40%;
    margin: 0 30%;
}

.timer-num {
    /*color: white;*/
}

.skip-btn {
    width: 40%;
    height: 40px;
    margin: 60px 30%;
    border-radius: 10px;
    border: 1px solid black;
    text-align: center;
    vertical-align: middle;
    line-height: 40px;
}

.play-btn img {
    width: 100%;
    height: 100%;
}
</style>
