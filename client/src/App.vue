<template>
  <div class="main-container">
      <TheMenuComponent/>
      <div class="body-wrapper">
          <router-view v-slot="{ Component }">
              <!-- Use any custom transition and  to `fade` -->
              <!-- <transition name="moveUp" mode="out-in" > -->
                <component :is="Component" />
              <!-- </transition> -->
          </router-view>
      </div>


  </div>

</template>

<script>

import TheMenuComponent from './components/layout/TheMenuComponent.vue';
import TheFooterComponent from './components/layout/TheFooterComponent.vue';
import "./assets/main.scss";
import "./assets/animations.scss";
import "./assets/transitions.scss";
import { loadFull } from "tsparticles";
import * as particlesOptions from "./assets/particlesjs-config.json"

export default {
  name: 'App',
  components: {
    TheMenuComponent,
    TheFooterComponent
  },
  data(){
      return{
          particlesOptions
      }
  },
  async mounted() {

  },
  methods:{
      particlesInit : async engine => {
          await loadFull(engine);
      },

     particlesLoaded : async container => {
          console.log("Particles container loaded", container);
      }
  }
}
</script>



<style lang="scss">


</style>
