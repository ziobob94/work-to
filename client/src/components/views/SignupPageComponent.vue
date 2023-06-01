<template>
  <div id="about" class="body-container" >
    <SignupFormComponent/>
  </div>
</template>

<script>
import SignupFormComponent from '../utils/SignupFormComponent.vue';

import { defineComponent } from 'vue';
export default defineComponent({
    name: "SignupPageComponent",
    components: { SignupFormComponent }
})
</script>

<style scoped>

</style>