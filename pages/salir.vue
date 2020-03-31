<template></template>

<script>
export default {
  layout: "login",
  mounted() {
    this.$cookies.set("user", "");
    this.$cookies.set("token", "");
    this.$cookies.set("header-token", {
      headers: { Authorization: `Bearer ` }
    });
    this.$router.push("/");
  }
};
</script>
