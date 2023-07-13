<template>
	<v-list v-if="isAuthenticated && items.length > 0">
		<v-list-item
			prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
			title="John Leider"
			></v-list-item>
			
		<v-divider></v-divider>

		<div v-for="(item, index) in items" :key="'side-link-'+index">
			<v-list-item
				:value="index"
				@click="goTo(item.route)"
				model     
				:class="classNames || 'w-100' "
				:style="styleObject || {'display': (item.visible) ? 'flex' : 'none'}"
			>
				<v-list-item-title> {{ item.title }} </v-list-item-title>
			</v-list-item> 
			<v-menu v-if="item.children?.length > 0" offset-y>
				<template v-slot:activator="{ on }">
					<v-list-item
						:value="index"
						@click="goTo(item.route)"
						model     
						v-on="on"
					>
						<v-list-item-icon>
							<v-icon>mdi-menu</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Submenu</v-list-item-title>
					</v-list-item>
				</template>
				<v-list>
					<v-list-item router :to="{ path: '/submenu-item-1' }">
					<v-list-item-title>Submenu Item 1</v-list-item-title>
					</v-list-item>
					<v-list-item router :to="{ path: '/submenu-item-2' }">
					<v-list-item-title>Submenu Item 2</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</div>
		
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
			},
			children:[
				{
					title: 'Privacy and security',
					name: '/privacy',
					permission: 'can_view_privacy_page',
					visible: false,
					route: {
						name: 'privacy',
					},
				},
				{
					title: 'Payments',
					name: '/payments',
					permission: 'can_view_payments_page',
					visible: false,
					route: {
						name: 'payments'
					},
				}
			]
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