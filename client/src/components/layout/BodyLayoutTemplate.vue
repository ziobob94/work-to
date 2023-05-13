<template>
  <div :id="id" class="body-container">
      <slot name="body" class="body-content">

      </slot>
  </div>
</template>

<script>


export default {
    components: {},
    props: ['id'],
    name: "BodyLayoutTemplate"
}
</script>

<style scoped>

</style>