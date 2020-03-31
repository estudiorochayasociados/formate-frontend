<template>
  <v-layout login dark>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Centro de Estudios - Estudio Rocha</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-alert type="error" v-if="error">{{ error }}</v-alert>
              <v-form>
                <v-text-field label="Nombre" v-model="name" prepend-icon="mdi-account" type="text" />
                <v-text-field
                  label="Apellido"
                  v-model="surname"
                  prepend-icon="mdi-account"
                  type="text"
                />
                <v-text-field
                  label="Celular"
                  v-model="mobile"
                  prepend-icon="mdi-phone"
                  type="text"
                />
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
                <v-btn class="ma-2" color="primary" @click="register">Registrarme</v-btn>
                <v-btn class="ma-2" text small color="primary" to="/login">Ya tengo cuenta</v-btn>
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
      username: "",
      mobile: "",
      email: "",
      password: "",
      error: ""
    };
  },
  async mounted() {},
  methods: {
    register: function() {
      this.$axios
        .post(process.env.api + "/auth/local/register", {
          name: this.name.toUpperCase(),
          surname: this.surname.toUpperCase(),
          username: this.email,
          email: this.email,
          password: this.password,
          mobile: this.mobile
        })
        .then(response => {
          // Handle success.
          this.$cookies.set("user", response.data);
          this.$cookies.set("token", response.data.jwt);
          this.$cookies.set("header-token", {
            headers: { Authorization: `Bearer ${response.data.jwt}` }
          });
          this.$router.push("/");
        })
        .catch(error => {
          console.log("An error occurred:", error);
          this.error = error;
        });
    }
  }
};
</script>
