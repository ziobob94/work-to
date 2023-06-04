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
				:to="{ name: item.name, params: (item.params) ?  item.params : null }"
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
				params: {
					id: null,
				}
			},
/* 			{
				title: 'Privacy',
				name: 'privacy',
				permission: 'can_view_privacy_page',
				visible: false,
				params: {
					id: null
				}
			}, */
			{ 
				title: 'Permissions', 
				name: 'permissions',
				permission: 'can_view_permission_admin',
				visible: false,
			},
			],
			userID: null
		}
	},
	async mounted(){
		
		let item = null;
		const usrID = await this.getUserLoggedData("_id");

		this.permissions = await this.getPermissions();
		
		for (let i = 0; i < this.items.length; i++) {
			
			item = this.items[i];

			const include = this.permissions.includes(item.permission.trim().toLowerCase());

			if(include){
				item.visible = true;
				if (item.params) {
					item.params.id = (item.params.id === null) ? usrID : null}

			}
		}		
	},
	computed:{
		...mapState('auth', ["isAuthenticated"]),
	},
	methods: {
		...mapActions({
			checkPermission: 'shared/checkPermission',
			getPermissions: 'shared/getPermissions',
			getUserLoggedData: 'shared/getUserLoggedData'
		}),
		goTo(name){
			this.$router.push({ name });
		},
		
	}
}
</script>