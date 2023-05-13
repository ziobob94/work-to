<template>
  <div class="footer-container">
    <h2>Footer</h2>
  </div>
</template>

<script>
export default {
  name: "TheFooterComponent"
}
</script>

<style lang="scss" scoped>
  .footer-container{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.5rem;
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 50px;
  }
</style>