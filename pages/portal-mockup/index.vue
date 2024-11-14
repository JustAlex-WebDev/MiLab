<script setup lang="ts">
// Router instance for navigation
const router = useRouter();

// Localization logic
const localePath = useLocalePath();

// Dashboard items
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

// Function that checks if the user is logged in and redirects him if he is not
onMounted(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    router.push(localePath("/portal-mockup/login"));
  }
});
</script>

<template>
  <v-container class="pa-0 pt-4">
    <!-- User Welcome Section -->
    <v-row class="px-6 py-4 align-center d-flex flex-column flex-sm-row">
      <!-- Welcome message -->
      <v-col class="d-flex justify-center justify-sm-start py-0">
        <span class="text-h4 font-weight-bold text-teal">Welcome back!</span>
      </v-col>

      <!-- User's name and surname -->
      <v-col class="d-flex justify-center justify-sm-end py-0">
        <span class="text-h6 font-weight-bold text-teal">Alexandar Valov</span>
      </v-col>
    </v-row>

    <!-- Loop through the dashboard items -->
    <v-row max-width="1024" class="mx-auto" align="center" justify="center">
      <v-col cols="12" sm="6" v-for="item in items" :key="item.title">
        <!-- Card Component -->
        <Card :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>
