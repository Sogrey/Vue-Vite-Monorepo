<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
nav {
  padding: 1rem;
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 2rem;
}

nav a {
  margin-right: 1rem;
  text-decoration: none;
  color: #42b883;
  font-weight: 500;
}

nav a.router-link-exact-active {
  color: #35495e;
}
</style>

