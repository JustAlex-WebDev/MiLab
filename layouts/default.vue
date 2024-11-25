<script setup lang="ts">
import Footer from "~/components/structure/Footer.vue";
import NavBar from "~/components/structure/NavBar.vue";
</script>

<template>
  <v-app>
    <NavBar layout="default" />

    <v-main>
      <slot />
    </v-main>

    <Footer />
  </v-app>
</template>
