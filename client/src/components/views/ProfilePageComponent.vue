<template>
    <BodyLayoutTemplate>
        <template #body >
            <div class="body-wrapper home">
                <div class="">
                    <h1> Welcome </h1>
                    <h1> To User profile page</h1>
                </div>
            </div>
        </template>
    </BodyLayoutTemplate>
    
</template>

<script>
import BodyLayoutTemplate from "@/components/layout/BodyLayoutTemplate.vue";
export default {
    name: 'ProfilePageComponent',
    components: {
        BodyLayoutTemplate,
    },
    data(){
        return{
            
        }
    },
    methods: {
        
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
