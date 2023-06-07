<template>
	<v-layout class="side-layout">
		<v-navigation-drawer
		v-model="sidebarToggle"
		temporary
		>
			<v-list-item
			prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
			title="John Leider"
			></v-list-item>
			
			<v-divider></v-divider>
			
			<RouterListComponent/>

		</v-navigation-drawer>

		<v-main  style="height: 100%">
			<slot name="body">
			</slot>
		</v-main>
	</v-layout>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import RouterListComponent from './RouterListComponent.vue';
  export default {
    computed: {
        ...mapState("main", ["sidebarToggle"])
    },
    method: {
        ...mapActions({
            toggleSidebar: "main/toggleSidebar"
        })
    },
    components: { RouterListComponent }
}
</script>
<style scoped lang="scss">
.side-layout {
	margin-bottom: 56px;
}
</style>