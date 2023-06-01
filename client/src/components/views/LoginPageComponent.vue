<template>
    <div id="about" class="body-container" >
      <LoginFormComponent/>
    </div>
  </template>
  
  <script>
import LoginFormComponent from '../utils/LoginFormComponent.vue';
import { defineComponent } from 'vue';
export default defineComponent({
	name: "LoginPageComponent",
    components: { LoginFormComponent }
})

  </script>
  
  <style lang="scss" scoped>

  </style>