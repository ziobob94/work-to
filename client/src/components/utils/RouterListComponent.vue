<template>

	<v-list v-if="isAuthenticated && items.length > 0">
		<v-list-item
			v-for="(item, index) in items"
			:key="index"
			:value="index"
			@click="goTo(item.route)"
			model     
			:class="classNames || 'w-100' "
			:style="styleObject || {'display': (item.visible) ? 'flex' : 'none'}"
		>
			<v-list-item-title> {{ item.title }} </v-list-item-title>
		</v-list-item> 
	</v-list> 

</template>


<script>
import { mapActions, mapState } from 'vuex';
export default {
name: 'TheMenuButton',
props: ['classNames', 'styleObject'],
data() {
	return {
		permissions: null,
		items: [
		{
			title: 'Profile',
			name: 'profile',
			permission: 'can_view_profile_page',
			visible: false,
			route: {
				name: 'profile',
				params: {
					id: null
				}
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
			route: {
				name: 'permissions'
			}
		},
		],
		userID: null
	}
},
async created(){
		
	let item = null;

	const usrID = await this.getUserLoggedData("_id");

	if ( !usrID && usrID.trim().length < 1) return

	this.permissions = await this.getPermissions();
	// eslint-disable-next-line no-debugger
	// debugger;
	for (let i = 0; i < this.items.length; i++) {
		
		item = this.items[i];

		const include = this.permissions.includes(item.permission.trim().toLowerCase());

		if(include){
			item.visible = true;
			if (item?.route.params ) {
				item.route.params.id =  usrID 
			}
		}
	}		
},
computed:{
	...mapState('auth', ["isAuthenticated"]),
	...mapState('main', ['sidebarToggle'])
},
methods: {
	...mapActions({
		checkPermission: 'main/checkPermission',
		getPermissions: 'main/getPermissions',
		getUserLoggedData: 'main/getUserLoggedData',
		toggleSidebar: 'main/toggleSidebar'
	}),
	goTo(route){
/* 		// eslint-disable-next-line no-debugger
		debugger; */
		this.$router.push(route);
		this.toggleSidebar();
	},
}
}
</script>