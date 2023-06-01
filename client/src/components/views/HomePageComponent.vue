<template>
    <BodyLayoutTemplate>
        <template #body >
            <div class="body-wrapper home">
                <div class="">
                    <h1> Welcome </h1>
                    <h1> This is is WorkTo</h1>
                    <h1> the new way to find your job </h1>
                </div>
            </div>
        </template>
    </BodyLayoutTemplate>

</template>

<script lang="ts">
import BodyLayoutTemplate from "@/components/layout/BodyLayoutTemplate.vue";
import { defineComponent} from 'vue';
export default defineComponent({
  name: 'HomePageComponent',
  components: {
      BodyLayoutTemplate,
  },
  props: ['socialButtons'],
  data(){
    return{

    }
  },
  methods: {
    getImgUrl(url: string) {
            return './assets' + url
        },
    goTo(url: string, id: string){
        if(id !== 'mail') window.open( url, "_blank");
    }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
