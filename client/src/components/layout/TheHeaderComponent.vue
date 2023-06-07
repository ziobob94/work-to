<template>
    <v-toolbar class="d-flex justify-space-between" density="comfortable" title="Application">
        <TheMenuButton v-if="isAuthenticated"/>
    </v-toolbar>
</template>


<script>
import TheMenuButton from '../utils/TheMenuButton.vue';
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
// import TheTopMenu from '../utils/TheTopMenu.vue';

export default defineComponent({
    name: "TheHeaderComponent",
    components:{
       TheMenuButton,
    },
	computed:{
		...mapState('auth', ["isAuthenticated"]),
	}
    
})
</script>