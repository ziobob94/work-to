<template>
    <BodyLayoutTemplate>
        <template #body >
            <div name="list" tag="ul" class="logos-container" >
                <div class="list-logo" v-for="(logo, index) in logosList" 
                     :key="logo.name"
                     :style="{
                        animationDelay: index*200+'ms',
                    }"
                    @click="goTo(logo.link)"
                >
                    <img class="skill-logo" 
                        :src='getImgUrl(logo.url)'
                        
                    />
                    <h3 class="logo-title">{{ logo.name.toUpperCase() }}</h3>
                </div>
            </div>
        </template>
    </BodyLayoutTemplate>
</template>

<script>
import BodyLayoutTemplate from "@/components/layout/BodyLayoutTemplate.vue";

export default {
    name: "SkillsPageComponent",
    components: {BodyLayoutTemplate},
    props:['logosList'],
    data(){
        return{
            id: '',
        }
    },
    mounted() {
        this.id = 'skills';
    },
    methods: {

        getImgUrl(url) {
            return './assets'+url
        },
        goTo(url){
            window.open( url, "_blank");
        }
    }
}
</script>

<style lang="scss" scoped>
</style>