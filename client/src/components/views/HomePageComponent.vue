<template>
    <BodyLayoutTemplate>
        <template #body >
            <div class="body-wrapper home">
                <div class="">
                    <h1>Hi!</h1>
                    <h1> I'm Mauro,</h1>
                    <h1> Fullstack Developer </h1>
                </div>
                <div class="">
                    <p class=""> Fullstack Developer  </p>
                    <p> Hardware Technician </p>
                </div>
                <div class="social-buttons-wrapper">
                    <div class="list-social" v-for="(social, index) in socialButtons" :key="social.id"
                         :style="{
                            animationDelay: index*200+'ms',
                         }"
                         @click="goTo(social.link, social.id)"
                    >
                        <img class="social-logo" 
                            :src='getImgUrl(social.icon)'
                        />
                    </div> 
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

.social-buttons-wrapper{
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

}
.social-logo{
    height: 3.5rem;
    width: 3.5rem;
    margin-right: 1rem;
    cursor: pointer;
    transform: scale(1);
    transition: transform 0.5s ease-in;
    &:hover {
        transform: scale(1.2);
        transition: transform 0.5s ease-in;
        backface-visibility: hidden;
      }
}

</style>
