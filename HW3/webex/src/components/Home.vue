<template>
    <div id="container">
        <img class="icon" src="../assets/exercise.png" alt="">
        <router-link class="link" to="/setting">Setting</router-link>
        <router-link class="link" to="/exercise">Start</router-link>
        <router-link class="link" to="/History">History</router-link>
        <div class="link">Quit</div>
    </div>
</template>

<script>
import router from '../router/router'

export default {    
  name: 'Home',
  components: {
    
  },
  router
}
</script>

<style scoped>
#container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.icon {
    width: 60%;
    margin-bottom: 25px;
}

.link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 40px;
    border: 1px solid lightgrey;
    margin: 10px;
    text-decoration: none;
    font-size: 20px;
}

.link:hover {
    font-weight: bold;
}

.link:visited {
    color: black;
}
</style>
