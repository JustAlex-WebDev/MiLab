<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// i18n (localization) setup
const localePath = useLocalePath();

const items = [
  {
    title: "Results",
    subtitle: "Check out your results",
    path: `${localePath("/portal-mockup/results")}`,
    icon: "mdi-file-document-outline",
  },
  {
    title: "Export Results",
    subtitle: "Get your results in a PDF file",
    path: `${localePath("/portal-mockup/export-results")}`,
    icon: "mdi-file-export-outline",
  },
  {
    title: "Bank Info",
    subtitle: "More info about your payments",
    path: `${localePath("/portal-mockup/bank-info")}`,
    icon: "mdi-bank-outline",
  },
  {
    title: "Sign Out",
    subtitle: "Exit and close the session",
    path: `${localePath("/portal-mockup/login")}`,
    icon: "mdi-logout",
  },
];

onMounted(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    router.push(localePath("/portal-mockup/login"));
  }
});
</script>

<template>
  <v-container class="pa-0 pt-4">
    <v-row max-width="1024" class="mx-auto" align="center" justify="center">
      <!-- Loop over the items array to create a card for each -->
      <v-col cols="12" sm="6" v-for="item in items" :key="item.title">
        <Card :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>
