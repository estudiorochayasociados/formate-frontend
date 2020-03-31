<template>
  <v-layout column container>
    <v-flex>
      <v-card>
        <v-img v-if="capacitacion.imagen.url" :src="capacitacion.imagen.url" height="200px"></v-img>
        <v-card-title v-if="capacitacion.titulo">{{ capacitacion.titulo }}</v-card-title>
        <v-card-subtitle v-if="capacitacion.descripcion">{{ capacitacion.descripcion }}</v-card-subtitle>
      </v-card>
    </v-flex>
    <v-flex class="mt-5">
      <v-expansion-panels accordion>
        <v-expansion-panel
          v-if="capacitacion.clases"
          v-for="(item,i) in capacitacion.clases"
          :key="i"
        >
          <v-expansion-panel-header>{{item.titulo}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            {{item.descripcion}}
            <v-spacer class="mt-5 mb-5"></v-spacer>
            <youtube v-if="item.video" :video-id="item.video" player-width="100%"></youtube>
            <v-spacer class="mt-5 mb-5"></v-spacer>
            <h4>Material de Estudio</h4>
            <v-list>
              <v-list-item-group
                v-if="multimedia"
                v-for="(multimedia,a) in item.multimedia"
                :key="a"
                color="primary"
              >
                <v-list-item-content>
                  <v-list-item-title class="text-uppercase">
                    <a :href="api + '/' +multimedia.url" target="_blank">{{ multimedia.name }}</a>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item-group>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-flex>
  </v-layout>
</template>

<script>
import { getIdFromURL } from "vue-youtube-embed";

export default {
  async asyncData({ $axios, params }) {
    console.log(params.id);
    // We can use async/await ES6 feature
    const capacitacion = await $axios.get(
      process.env.api + "/capacitacions/" + params.id
    );
    capacitacion.data.imagen.url =
      process.env.api + "/" + capacitacion.data.imagen.url;
    return { capacitacion: capacitacion.data, api: process.env.api };
  }
};
</script>
