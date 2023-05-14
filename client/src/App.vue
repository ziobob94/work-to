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

export default {
  name: 'App',
  components: {
    TheMenuComponent,
    TheFooterComponent
  },
  data(){
      return{
      }
  },
  async mounted() {

  },
  methods:{
  }
}
</script>



<style lang="scss">


</style>
