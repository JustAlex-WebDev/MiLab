<script setup lang="ts">
// Set the page's head metadata
useHead({
  title: "MiLab",
  meta: [
    { name: "description", content: "Platform for medical laboratories." },
  ],
});
</script>

<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>
