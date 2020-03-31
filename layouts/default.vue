<template>
  <v-app dark>
    <v-app-bar :clipped-right="clipped" fixed app>
      <v-img :src="require('@/assets/logo.png')" max-width="240px"></v-img>
      <v-spacer></v-spacer>
      <v-icon left>mdi-human-greeting</v-icon>
      HOLA {{ usuario }}
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      :expand-on-hover="expandOnHover"
      :right="true"
      fixed
      app
    >
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      usuario: "",
      clipped: true,
      drawer: false,
      fixed: true,
      items: [
        {
          icon: "mdi-apps",
          title: "Inicio",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Capacitaciones",
          to: "/capacitaciones"
        },
        {
          icon: "mdi-help-box",
          title: "Ayuda",
          to: "/ayuda"
        },
        {
          icon: "mdi-logout-variant",
          title: "Salir",
          to: "/salir"
        }
      ],
      title: "FORMATE"
    };
  },
  mounted() {
    this.usuario =
      this.$cookies.get("user").user.name +
      " " +
      this.$cookies.get("user").user.surname;
    this.usuario = this.usuario.toUpperCase();
  }
};
</script>
