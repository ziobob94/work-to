<template>
    <div id="permissions" class="w-100 h-100 d-flex align-start" >
        <PermissionsComponent/>
    </div>
</template>

<script>

import PermissionsComponent from '../admin/PermissionsComponent.vue';
import store from '@/store/store';

export default {
    name: "PermissionsPageComponent",
    components: {
		PermissionsComponent 
	},
	async beforeRouteEnter (to, from, next) {

		const p = await store.dispatch('permissionsAd/fetchPermissions');
		const r = await store.dispatch('permissionsAd/fetchRoles');

		if( p && r ) next();
		else to.name = "home";
		
	}
}
</script>

<style scoped>

</style>