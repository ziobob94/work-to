<template>
    <v-toolbar class="d-flex justify-space-between" density="comfortable" title="Application">
        <TheMenuButton/>
    </v-toolbar>
</template>


<script>
import TheMenuButton from '../utils/TheMenuButton.vue';
import { defineComponent } from 'vue';
export default defineComponent({
    name: "TheHeaderComponent",
    components:{
        TheMenuButton
    }
    
})
</script>