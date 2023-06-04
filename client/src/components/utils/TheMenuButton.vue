<template>
	<v-menu v-if="isAuthenticated">
		
		<template v-slot:activator="{ props }" >
			<v-app-bar-nav-icon v-bind="props"></v-app-bar-nav-icon>
		</template>
		
		<v-list v-if="items.length > 0">
			<v-list-item
			v-for="(item, index) in items"
			:key="index"
			:value="index"
			model     
			class="w-100"
			@click="goTo(item.name)"
			:style="{'display': (item.visible) ? 'inherit' : 'none'}"
			>
			<v-list-item-title>{{ item.title  }}</v-list-item-title>
		</v-list-item>
	</v-list>
</v-menu>
</template>


<script>
import { mapActions, mapState } from 'vuex';
export default {
	name: 'TheMenuButton',
	data() {
		return {
			permissions: null,
			items: [
			{
				title: 'Profile',
				name: 'profile',
				permission: 'can_view_profile_page',
				visible: false,
			},
			{
				title: 'Privacy',
				name: 'privacy',
				permission: 'can_view_privacy_page',
				visible: false,
			},
			{ 
				title: 'Permissions', 
				name: 'permissions',
				permission: 'can_view_permission_admin',
				visible: false
			},
			],
			elements: []
		}
	},
	async mounted(){
		
		let item = null;
		this.permissions = await this.getPermissions();
		for (let i = 0; i < this.items.length; i++) {
			
			item = this.items[i];
			
			console.log(`\n\n\n\n ***** PERMISSION ITEM ${item.permission} ******** \n\n`)
			console.log("SLUG: " + item.permission + "\nVIS: " + this.permissions);
			
			const include = this.permissions.includes(item.permission.trim().toLowerCase())
			console.log("INCLUDES?: " , include);
			if(include) item.visible = true;
		}		
	},
	computed:{
		...mapState('auth', ["isAuthenticated"]),
	},
	methods: {
		...mapActions({
			checkPermission: 'shared/checkPermission',
			getPermissions: 'shared/getPermissions'
		}),
		goTo(name){
			this.$router.push({ name });
		},
		
	}
}
</script>