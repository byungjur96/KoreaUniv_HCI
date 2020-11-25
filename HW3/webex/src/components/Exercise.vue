<template>
    <div id="container">
        <!-- 시작 전 화면 -->
        <template v-if="stage===-1">
            <div class="page" id="intro">
                <div class="description">You Have</div>
                <div class="sets">{{ sets }}</div>
                <div class="description">doses for Today!</div>
                <button class="intro-btn" @click="readyExercise">Start</button>
            </div>
        </template>
        <!-- Get Ready -->
        <template v-if="stage===0">
            <div class="page" id="ready">
                <img class="thumbnail" :src="require(`../images/${exList[currentSet].info.thumbnail}`)" alt="">
                <div class="announcement">
                    Get Ready {{ isFirst }} Exercise # {{ currentSet + 1 }}
                </div>
                <div class="timer">
                    Starts after <span :interval="1000">{{ timer }}</span> seconds!
                </div>
            </div>
        </template>
        <!-- 운동 화면 -->
        <template v-if="stage===1">
            <div class="page" id="exercise">
                <div class="info-tab">
                    <div class="small-info">
                        <span class="info-count">
                            {{ exList.length - 1 - Number(currentSet) }}
                        </span>
                        <span class="info-description">SET LEFT</span>
                    </div>
                    <div class="small-info">
                        <span class="info-count">
                            {{ exList[currentSet].term }}
                        </span>
                        <span class="info-description">TERM</span>
                    </div>
                    <div class="small-info">
                        <span class="info-count">
                            {{ exList[currentSet].num }}
                        </span>
                        <span class="info-description">NUM</span>
                    </div>
                </div>
                <div class="count" :interval="1000">{{ currentNum + 1 }}</div>

                <div class="pause-resume" @click="pauseEx">
                    <template v-if="play">
                        <img src="../assets/pause.png" alt="">
                    </template>
                    <template v-if="!play">
                        <img src="../assets/play.png" alt="">
                    </template>
                </div>
                <button class="skip-btn" @click="skipEx">SKIP</button>
            </div>
        </template>
        <!-- Done -->
        <template v-if="stage===2">
            <div class="page" id="done">
                <div>Today's Work</div>
            </div>
        </template>
    </div>
</template>

<script>
import Routine from "../data/routine.json"
import Exercises from "../data/exercises.json"
import router from "@/router/router";

export default {
    name: 'Exercise',
    components: {},
    created() {
        this.exList = [];
        let idxs = Object.keys(Routine);
        for (let idx in idxs) {
            let exercise = Routine[idx];
            exercise["info"] = Exercises[exercise["id"]];
            this.exList.push(exercise);
        }
        this.sets = idxs.length;
    },
    beforeDestroy() {
        clearInterval(this.timerId);
        clearTimeout(this.totalTimer);
    },
    data() {
        return {
            stage : -1,
            // stage : ,
            sets : undefined,
            timer : undefined,
            exList : undefined,
            currentSet : 0,
            currentNum : 0,
            play: false,
            timerId : undefined,
            totalTimer: undefined,
            history: [],
        }
    },
    computed: {
        isFirst : function() {
            return this.currentSet === 0 ? "" : "Next"
        }
    },
    methods: {
        readyExercise: function() {
            this.stage = 0;
            this.timer = 5;
            this.speak(`Get Ready for ${ this.isFirst } Exercise ${ this.currentSet + 1 }`);
            let readyTimer = setInterval(() => { this.timer-=1; }, 1000);

            setTimeout(() => {
                clearInterval(readyTimer);
                this.timer = 5;
                this.beginExercise();
            }, 5000);
        },
        beginExercise: function() {
            this.stage = 1;
            this.startSet(this.exList[this.currentSet].term, this.exList[this.currentSet].num);
            // this.startSet(1, 5);
        },
        startSet: function(term, num) {
            this.play = true;
            this.speak(this.currentNum+1);
            this.timerId = setInterval(() => {
                this.currentNum += 1;
                if (this.currentNum + 2 < this.exList[this.currentSet].num) this.speak(this.currentNum + 1);
                else if (this.currentNum + 2 === this.exList[this.currentSet].num) this.speak("Just One More");
                else if (this.currentNum + 1 === this.exList[this.currentSet].num) this.speak(this.currentNum + 1);
            }, 1000*term);
            this.totalTimer = setTimeout(() => {
                clearInterval(this.timerId);
                this.play = false;
                this.currentNum = 0;
                this.currentSet += 1;
                if (this.currentSet <= this.exList.length) this.readyExercise();
                else this.endExercise();
            }, num*term*1000);
        },
        pauseEx: function() {
            this.play = !this.play;
            clearInterval(this.timerId);
            clearTimeout(this.totalTimer);
            if (this.play) {
                console.log(this.exList[this.currentSet].num - this.currentNum);
                this.startSet(this.exList[this.currentSet].term, this.exList[this.currentSet].num - this.currentNum);
            }
        },
        endExercise: function() {
            this.speak("Good Job!");
            setTimeout(() => {
                router.push("/history");
            }, 1500);
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
            this.speak("Skip this Exercise");
            clearInterval(this.timerId);
            clearTimeout(this.totalTimer);
            this.history.push(this.currentNum);
            this.play = false;
            this.currentNum = 0;

            setTimeout(() => {
                if (this.currentSet+1 < this.exList.length) {
                    this.currentSet += 1;
                    this.readyExercise();
                }
                else this.endExercise();
            }, 2500);

        }
    }
}
</script>

<style scoped>
#intro {
    position: relative;
    width: calc(100% - 100px);
    padding: 100px 50px;
    height: calc(100% - 200px);
}
#intro > .description {
    font-size: 24px;
    font-style: italic;
}

#intro > .sets {
    font-size: 64px;
    font-family: Times;
    font-style: italic;
    margin: 20px 0;
}

#intro .intro-btn {
    width: calc(100% - 100px);
    height: 50px;
    background-color: forestgreen;
    font-size: 24px;
    border-radius: 25px;
    position: absolute;
    bottom: 0;
    margin: 100px 0;
}

#ready {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#ready > .thumbnail {
    width: 80%;
    margin: 10px;
}

#ready > .announcement {
    font-size: 24px;
    margin: 20px;
}

#exercise > .info-tab {
    margin: 0 20px;
    padding-top: 10px;
    width: calc(100% - 40px);
    display: flex;
    justify-content: space-between;
}

#exercise .small-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#exercise .count {
    font-size: 100px;
    font-style: italic;
    margin: 100px 0;
    width: 100%;
    text-align: center;
}

#exercise .info-description {
    font-size : 6px;
}

#exercise > .pause-resume {
    width: 100px;
    margin: 0 calc(50% - 50px);
}

#exercise > .pause-resume img {
    width: 100%;
}

#exercise .skip-btn {
    width: calc(100% - 100px);
    height: 50px;
    background-color: forestgreen;
    font-size: 24px;
    border-radius: 25px;
    position: absolute;
    bottom: 0;
    margin: 100px 50px;
}

</style>
