<template>
  <v-app class="main-container">
      <div class="body-wrapper">
          <router-view v-slot="{ Component }">
              <!-- Use any custom transition and  to `fade` -->
              <!-- <transition name="moveUp" mode="out-in" > -->
                <component :is="Component" />
              <!-- </transition> -->
          </router-view>
      </div>
      <TheNavigatorComponent/>
    </v-app>

</template>

<script>

import TheFooterComponent from './components/layout/TheFooterComponent.vue';
import TheNavigatorComponent from './components/layout/TheNavigatorComponent.vue';
import "./assets/main.scss";
import "./assets/animations.scss";
import "./assets/transitions.scss";

export default {
  name: 'App',
  components: {
    TheFooterComponent,
    TheNavigatorComponent
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
