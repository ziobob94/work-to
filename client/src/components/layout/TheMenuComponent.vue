<template>
    <div class="menu-container">
        <div class="pi">
            <img src>
        </div>
        <h2 v-for="(link, index) in items"
            @click="navigate(link.to)"
            :key="link.name"
            :ref="link.name"
            :style="{
                animationDelay: index*200+'ms',
            }"
            :class="[
                'menu-link',
                 ( this.$route.path === link.to.path ) ? 'b-active' : ''
               ]"

        > {{link.label}} </h2>
    </div>
</template>
<script>


export default {
    name: "TheMenuComponent",
    components: {
    },
    mounted() {
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
                    name: '/'
                },
                {
                    label: 'About',
                    icon: 'pi pi-fw pi-calendar',
                    to: {path: '/about', hash:'#about'},
                    hash: 'about',
                    name: 'about'
                },
                {
                    label: 'Curriculum',
                    icon: 'pi pi-fw pi-heart',
                    to: {path: '/life', hash: '#life'},
                    hash: 'life',
                    name: 'life'
                },
                {
                    label: 'Skills',
                    icon: 'pi pi-fw pi-heart',
                    to: {path: '/skills', hash: '#skills'},
                    hash: 'skills',
                    name: 'skills'
                },
                {
                    label: 'Login',
                    icon: 'pi pi-fw pi-heart',
                    to: {path: '/login', hash: '#login'},
                    hash: 'login',
                    name: 'login'
                },
                {
                    label: 'Signup',
                    icon: 'pi pi-fw pi-heart',
                    to: {path: '/signup', hash: '#signup'},
                    hash: 'signup',
                    name: 'signup'
                },
            ],
        }
    },
    methods: {
        navigate(to){
            this.$router.push(to);
        },
    }

}
</script>

<style lang="scss" >


</style>