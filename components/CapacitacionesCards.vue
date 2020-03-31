<template>
  <v-container justify-center class="justify-center">
    <v-row>
      <v-col class="d-flex justify-center" v-if="categorias" cols="12">
        <v-select
          @change="cambiarCategoria"
          v-model="categoria"
          :items="categorias"
          name="category"
          item-text="titulo"
          label="Categorias"
        ></v-select>
      </v-col>

      <div
        class="col-md-4 col-xs-12"
        v-if="capacitaciones"
        v-for="(item) in capacitaciones"
        :key="item.id"
      >
        <v-card :to="'/capacitacion/' + item.id" nuxt>
          <v-img :src="api + '/' + item.imagen.url" height="200px"></v-img>
          <v-card-title>{{ item.titulo }}</v-card-title>
          <v-card-subtitle>{{ item.categoria.titulo }}</v-card-subtitle>
          <v-card-actions>
            <v-btn text :to="'/capacitacion/' + item.id" nuxt>ir al curso</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      capacitaciones: [],
      categorias: [],
      categoria: "",
      api: process.env.api
    };
  },
  async mounted() {
    const data = await this.$axios.get(process.env.api + "/capacitacions");
    const categorias = await this.$axios.get(process.env.api + "/categorias");
    this.capacitaciones = data.data;
    this.categorias = categorias.data;
  },
  methods: {
    async cambiarCategoria() {
      const data = await this.$axios.get(
        process.env.api + "/capacitacions?categoria.titulo=" + this.categoria
      );
      this.capacitaciones = data.data;
    }
  }
};
</script>
