<template>
	<v-app class="w-100">
		<TheHeaderComponent/>
		<TheSideBar>
			<template #body >
				<div class="body-wrapper">
					<router-view v-slot="{ Component }">
					<!-- Use any custom transition and  to `fade` -->
					<!-- <transition name="moveUp" mode="out-in" > -->
						<component :is="Component" />
						<!-- </transition> -->
					</router-view>
				</div>
			</template>
		</TheSideBar>

		<TheNavigatorComponent/>
		</v-app>
		
	</template>
	
	<script>
	
	import TheFooterComponent from './components/layout/TheFooterComponent.vue';
	import TheNavigatorComponent from './components/layout/TheNavigatorComponent.vue';
	import "./assets/main.scss";
	import "./assets/animations.scss";
	import "./assets/transitions.scss";
	import TheHeaderComponent from './components/layout/TheHeaderComponent.vue';
	import TheSideBar from './components/utils/TheSideBar.vue';
	
	export default {
		name: 'App',
		components: {
			TheFooterComponent,
			TheNavigatorComponent,
			TheHeaderComponent,
			TheSideBar
		},
		data(){
			return{
			}
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


</style>
