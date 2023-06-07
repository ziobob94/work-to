<template>
		<v-app-bar-nav-icon @click="toggleSidebar"></v-app-bar-nav-icon>
</template>


<script>
import { mapActions, mapState } from 'vuex';
export default {
	name: 'TheMenuButton',
	computed:{
		...mapState('main', ['sidebarToggle'])
	},
	methods: {
		...mapActions({
			toggleSidebar: 'main/toggleSidebar'

		})
	}
}
</script>