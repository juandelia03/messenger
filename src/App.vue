<template>
  <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css" />
  <div id="nav">
    <router-link to="/"></router-link>
    <router-link to="/login"></router-link>
    <router-link to="/register" @test="test"></router-link>
  </div>
  <router-view />
</template>

<style>
* {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin: 0px;
  padding: 0px;
}
</style>

<script>
import { inject, provide } from "vue";
import store from "../store";
export default {
  name: "Login",
  components: {},
  setup() {
    provide("store", store);
    inject("store");
    return { store };
  },
};
</script>
