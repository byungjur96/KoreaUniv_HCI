<template>
  <div id="container">
      <div class="side" v-bind:class="{'hide-side' : isRoot}">
          <img @click="goHome()" class="icon" src="../assets/home.png" alt="">
      </div>
      <div class="title">{{ title }}</div>
      <div class="side hide-side">
          <img @click="goHome()" class="icon" src="../assets/home.png" alt="">
      </div>
  </div>
</template>

<script>
import router from "@/router/router";

export default {
    name: 'Navigation',
    components: {

    },
    methods: {
        goHome() {
            router.push('/home').catch(() => {})
        }
    },
    computed: {
        title : function() {
            let url = this.$route.name;
            if (url === 'root' || url === 'home') return "webEX";
            else if (url === "Setting") return "Setting";
            else if (url === "History") return "History";
            else if (url === "Exercise") return "Exercise";
            else return "webEX";
        },
        isRoot: function() {
            let url = this.$route.name;
            if (url === 'root' || url === 'Home') return true;
            else return false;
        }
        },
  data() {
    return {
      name : this.$route.name
    }
  }
}
</script>

<style scoped>
#container {
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: gray;
    box-shadow: 0 0 10px;
}

.side {
    margin: 20px;
}

.icon {
    width: 20px;
    height: 20px;
}

.hide-side {
    visibility: hidden;
}

.title {
    font-size: 24px;
    font-weight: bold;
}
</style>
