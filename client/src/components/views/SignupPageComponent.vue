<template>
  <div id="about" class="body-container" >
    <SignupFormComponent/>
  </div>
</template>

<script>
import SignupFormComponent from '../utils/SignupFormComponent.vue';

export default {
    name: "SignupPageComponent",
    components: { SignupFormComponent }
}
</script>

<style scoped>

</style>