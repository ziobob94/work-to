<template>
    <v-toolbar class="d-flex justify-space-between" density="comfortable" title="Application">
        <TheMenuButton/>
    </v-toolbar>
</template>


<script>
import TheMenuButton from '../utils/TheMenuButton.vue';
export default {
    name: "TheHeaderComponent",
    components:{
        TheMenuButton
    }
    
}
</script>