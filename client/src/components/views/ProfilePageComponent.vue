<template>
    <BodyLayoutTemplate>
        <template #body >
            <div class="body-wrapper home">
				<ProfileFormComponent/>
            </div>
        </template>
    </BodyLayoutTemplate>
    
</template>

<script>
import BodyLayoutTemplate from "@/components/layout/BodyLayoutTemplate.vue";
import ProfileFormComponent from '../utils/ProfileFormComponent.vue';
export default {
    name: 'ProfilePageComponent',
    components: {
        BodyLayoutTemplate,
        ProfileFormComponent,
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
