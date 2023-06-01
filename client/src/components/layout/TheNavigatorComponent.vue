<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
    <v-bottom-navigation :grow="true"  color="primary">
        <v-btn
            v-for="item in ((!isAuthenticated) ? itemsLogged : itemsOut)"
            :key="item.route"
            :to="item.route"
            @click="item.click"
            exact
            tile
            >
            {{  item.label }}
        </v-btn>
  </v-bottom-navigation>

</template>            
<script lang="ts">
import { mapActions, mapState } from 'vuex';
import { defineComponent } from "vue";


export default defineComponent({
    name: "TheNavigatorComponent",
    components: {
    },
    data() {
        return {
            itemsLogged: [
            {
                label: 'Home',
                icon: 'pi pi-fw pi-home',
                to: {path: '/home', hash: '#home'},
                route: "/home",
                hash: 'home',
                name: '/',
                visible: true,
				click: ''
            },
            {
                label: 'Login',
                icon: 'pi pi-fw pi-heart',
                to: {path: '/login', hash: '#login'},
                hash: 'login',
                route: '/login',
                name: 'login',
                visible: false,
				click: ''
            },
            {
                label: 'Signup',
                icon: 'pi pi-fw pi-heart',
                to: {path: '/signup', hash: '#signup'},
                hash: 'signup',
                route: '/signup',
                name: 'signup',
                visible: false,
				click: ''
            }
            ],
            itemsOut: [
               {
                label: 'Home',
                icon: 'pi pi-fw pi-home',
                to: {path: '/home', hash: '#home'},
                route: "/home",
                hash: 'home',
                name: '/',
                visible: true,
				click: ''
            },        
            {
                label: 'Logout',
                icon: 'pi pi-fw pi-heart',
                name: 'logout',
                visible: false,
                click: this.logoutHandle
            },
            ]
        }
    },
    computed:{
        ...mapState('auth', ["isAuthenticated"]),
    },
    mounted(){
    },
    methods: {
        ...mapActions({
            handleLogoutAPI: "auth/handleLogoutAPI"}),

        navigate(to: any){
			//@ts-ignore
            this.$router.push(to);
        },
        async logoutHandle(){
            const swalOpt = {
                title: "Fail",
                text: "Logout Failed",
                icon: "error",
                showConfirtButton: true,
                confirmButtonText: "Ok"
            }
            try{
                const outResp = await this.handleLogoutAPI()
                 console.log("[TheMenuComponent.logutHandle]", outResp);
                if(outResp?.data?.result){
                    swalOpt.title = "Success";
                    swalOpt.text = "Logout Ok";
                    swalOpt.icon = "success";
                    this.navigate({name: "login"})
                }
            }
            catch(err){
                console.error("[TheMenuComponent.logutHandle]", err);
            }
			//@ts-ignore
            this.$swal.fire(swalOpt);
        
        }
        
    }
})
</script>

<style lang="scss" >

.navigator-item{
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 100%;
    height: 100%;
    & > i {
        height: 100%;
        font-size: 2rem;
        text-align: center;
        display: flex;
        align-items: center;
    }
}

</style>