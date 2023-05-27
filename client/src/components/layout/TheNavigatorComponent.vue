<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>

    <v-bottom-navigation :grow="true"  color="primary">
        <v-btn
            v-for="item in items"
            :key="item.route"
            :to="item.route"
            :style="{
                    display: (!item.conditional) ? 'inherit' : this.checkVisibility(item)
                }"
            exact
            tile
        >
            {{ item.label }}
        </v-btn>
        <v-btn
            :style="{
                    display: (getAuthenticationStatus) ? 'inherit' : 'none'
                }"
            route="/logout"
            exact
            @click="logoutHandle"
            tile
        >
            Logout
        </v-btn>
  </v-bottom-navigation>

</template>            
<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
import Cookies from 'js-cookie';


export default {
    name: "TheNavigatorComponent",
    components: {
    },
    data() {
        return {
            active: '',
            items: [
            {
                label: 'Home',
                icon: 'pi pi-fw pi-home',
                to: {path: '/home', hash: '#home'},
                route: "/home",
                hash: 'home',
                name: '/',
                visible: true,
            },
            {
                label: 'Login',
                icon: 'pi pi-fw pi-heart',
                to: {path: '/login', hash: '#login'},
                hash: 'login',
                route: '/login',
                name: 'login',
                visible: true,
                conditional: true
            },
            {
                label: 'Signup',
                icon: 'pi pi-fw pi-heart',
                to: {path: '/signup', hash: '#signup'},
                hash: 'signup',
                route: '/signup',
                name: 'signup',
                visible: true,
                conditional: true,
            },
            ],
        }
    },
    mounted() {
    },
    computed:{
        ...mapState(["isAuthenticated"]),
        ...mapGetters(["getAuthenticationStatus"])
    },
    methods: {
        ...mapMutations(["setAuthenticated"]),

        navigate(to){
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
                const outResp = await this.$http.get("/api/logout");
                // // console.log("[TheMenuComponent.logutHandle]", outResp.data);
                if(outResp.data.result){
                    swalOpt.title = "Success";
                    swalOpt.text = "Logout Ok";
                    swalOpt.icon = "success";
                    Cookies.remove("auth");
                    this.$http.defaults.headers.common.Authorization = "";
                    this.setAuthenticated(false);
                    this.$router.push({path: "/login"})
                }
            }
            catch(err){
                console.error("[TheMenuComponent.logutHandle]", err)
            }
            this.$swal.fire(swalOpt);
        },
        checkVisibility(link){
            link.visible = !this.getAuthenticationStatus;
            return (this.getAuthenticationStatus) ? 'none' : 'flex'
        }
        
    }
}
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