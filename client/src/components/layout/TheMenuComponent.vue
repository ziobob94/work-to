<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
    <div class="menu-container">
        <div class="pi">
            <img src>
        </div>
        
        <h2 v-for="(link, index) in items" 
            :key="link.name" 
            @click="navigate(link.to)"
            :ref="link.name"
            :style="{
                animationDelay: index*200+'ms',
                display: (!link.conditional) ? 'flex' : this.checkVisibility(link)
            }"
            :class="[
            'menu-link',
            ( this.$route.path === link.to.path ) ? 'b-active' : ''
            ]"
            > {{link.label}} 
        </h2>
        <h2 class="menu-link"               
            :style="{
                animationDelay: 200+'ms',
                display: (getAuthenticationStatus) ? 'flex' : 'none'
            }"
            @click="logoutHandle()">
            Logout
        </h2>
</div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
import Cookies from 'js-cookie';


export default {
    name: "TheMenuComponent",
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
                hash: 'home',
                name: '/',
                visible: true
            },
            {
                label: 'About',
                icon: 'pi pi-fw pi-calendar',
                to: {path: '/about', hash:'#about'},
                hash: 'about',
                name: 'about',
                visible: true
            },
            {
                label: 'Curriculum',
                icon: 'pi pi-fw pi-heart',
                to: {path: '/life', hash: '#life'},
                hash: 'life',
                name: 'life',
                visible: true
            },
            {
                label: 'Skills',
                icon: 'pi pi-fw pi-heart',
                to: {path: '/skills', hash: '#skills'},
                hash: 'skills',
                name: 'skills',
                visible: true
            },
            {
                label: 'Login',
                icon: 'pi pi-fw pi-heart',
                to: {path: '/login', hash: '#login'},
                hash: 'login',
                name: 'login',
                visible: true,
                conditional: true
            },
            {
                label: 'Signup',
                icon: 'pi pi-fw pi-heart',
                to: {path: '/signup', hash: '#signup'},
                hash: 'signup',
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
                console.log("[TheMenuComponent.logutHandle]", outResp.data);
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


</style>