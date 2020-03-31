<template>
  <div>
    <v-flex>
      <v-carousel>
        <v-carousel-item v-for="(slide,a) in slides" :key="a" :src="api + '/' + slide.url"></v-carousel-item>
      </v-carousel>
    </v-flex>
    <CapacitacionesCards></CapacitacionesCards>
  </div>
</template>

<script>
import CapacitacionesCards from "../components/CapacitacionesCards";
export default {
  components: {
    CapacitacionesCards
  },
  async asyncData({ $axios }) {
    const slides = await $axios.get(process.env.api + "/slides/1");
    return {
      api: process.env.api,
      slides: slides.data.imagenes
    };
  },
  mounted() {
    console.log(this.$cookies.get("token"));
  }
};
</script>
