<template>
    <div id="permissions" class="w-100 h-100 d-flex align-start" >
        <PermissionsComponent/>
    </div>
</template>

<script>
import PermissionsComponent from '../admin/PermissionsComponent.vue';

export default {
    name: "PermissionsPageComponent",
    components: {PermissionsComponent }
}
</script>

<style scoped>

</style>