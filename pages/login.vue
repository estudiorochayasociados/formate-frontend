<template>
  <v-layout login dark>
    <v-container class="mt-10" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Formate</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-alert type="error" v-if="error">{{ error }}</v-alert>
              <v-form>
                <v-text-field label="Email" v-model="email" prepend-icon="mdi-account" type="text" />
                <v-text-field
                  id="password"
                  label="Password"
                  v-model="password"
                  prepend-icon="mdi-lock"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <div class="text-center">
                <v-btn class="ma-2" color="primary" @click="login">Ingresar</v-btn>
                <v-btn class="ma-2" text small color="primary" to="/register">Quiero registrarme</v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  layout: "login",
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  async mounted() {
    try {
      const checkToken = await this.$axios.get(
        process.env.api + "/users/me",
        this.$cookies.get("header-token")
      );
      this.$router.push("/");
    } catch (e) {
      console.log("login");
    }
  },
  methods: {
    login: async function() {
      try {
        const data = {
          identifier: this.email,
          password: this.password
        };
        const login = await this.$axios.post(
          "http://localhost:1337/auth/local",
          data
        );
        this.$cookies.set("user", login.data);
        this.$cookies.set("token", login.data.jwt);
        this.$cookies.set("header-token", {
          headers: { Authorization: `Bearer ${login.data.jwt}` }
        });
        this.$router.push("/");
      } catch (e) {
        this.error = "Ups! No encontramos este usuario.";
      }
    }
  }
};
</script>
