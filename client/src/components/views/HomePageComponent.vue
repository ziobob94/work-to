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

<script>
import BodyLayoutTemplate from "@/components/layout/BodyLayoutTemplate.vue";
export default {
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
    getImgUrl(url) {
            return './assets'+url
        },
    goTo(url,id){
        if(id !== 'mail') window.open( url, "_blank");
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.body-wrapper{
    display: flex;
    flex-direction: column;
    max-width: 30%;
    gap: 2rem;
    .home{
        position: relative;
    }
}

</style>
