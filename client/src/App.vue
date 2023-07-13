<template>
	<v-app class="h-100">
		<v-navigation-drawer v-model="drawer" app>
			<!-- Sidebar Content -->
			
			<RouterListComponent />

		</v-navigation-drawer>
		
		<v-app-bar app>
			<v-toolbar-title>Work To</v-toolbar-title>
			<v-app-bar-nav-icon v-if="isAuthenticated" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
		</v-app-bar>
		
		<v-content>
			<router-view></router-view><!-- Main Content -->
			
		</v-content>
		<TheNavigatorComponent/>

	</v-app>
</template>
	<!-- 	<v-app class="w-100">
		<TheHeaderComponent/>
		<TheSideBar>
			<template #body >
				<div class="body-wrapper">
					<router-view v-slot="{ Component }"> -->
						<!-- Use any custom transition and  to `fade` -->
						<!-- <transition name="moveUp" mode="out-in" > -->
							<!-- <component :is="Component" /> -->
							<!-- </transition> -->
							<!-- 					</router-view>
							</div>
						</template>
					</TheSideBar>
					
					<TheNavigatorComponent/>
				</v-app> -->
			
<script>

/* 			import TheFooterComponent from './components/layout/TheFooterComponent.vue';
import TheHeaderComponent from './components/layout/TheHeaderComponent.vue';
import TheSideBar from './components/utils/TheSideBar.vue'; */
import TheNavigatorComponent from './components/layout/TheNavigatorComponent.vue';
import "./assets/main.scss";
import "./assets/animations.scss";
import "./assets/transitions.scss";
import { mapState } from 'vuex';
import RouterListComponent from './components/utils/RouterListComponent.vue';

export default {
	name: 'App',
	components: {
	/* 					TheFooterComponent,
	TheHeaderComponent,
	TheSideBar, */
		TheNavigatorComponent,
		RouterListComponent
	},
	data(){
		return{
			drawer: false
		}

	},
	computed:{
		...mapState('auth', ["isAuthenticated"]),
	},
	async beforeCreate(){
		this.$store.dispatch("auth/verifyToken")
	},
	async mounted() {
		
	},
	methods:{
	}
}
</script>
		
		
		
<style lang="scss">


#app > div > * {
	backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    max-width: 100%;
	min-height: 100vh;
    align-items: center;
    position: relative;
    justify-content: center;
}

#app > div {
	display: flex;
	align-items: center;
}
		
</style>
