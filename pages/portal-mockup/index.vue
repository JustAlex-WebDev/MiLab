<script setup lang="ts">
import ErrorModal from "~/components/common/ErrorModal.vue";
import Card from "~/components/home/Card.vue";
import type { DashboardItem } from "~/types/dashboard";

// Localization logic
const { t } = useI18n();
const localePath = useLocalePath();

// Reactive states for error handling
const errorDialog = ref(false);
const errorMessage = ref("");

// Dashboard items
const items = ref<DashboardItem[]>([]);
const loading = ref(true);

/**
 * Function that fetches dashboard items and updates their paths
 */
onMounted(async () => {
  try {
    // Fetch dashboard data
    const rawItems = await useFetchData<DashboardItem[]>("/dashboard");

    // Map through items and localize the paths, titles, and subtitles
    items.value = rawItems.map((item) => {
      const basePath = `/portal-mockup${item.path}`;
      const href = localePath(basePath);

      return {
        ...item,
        href,
        title: t(`home_page.dashboard_items.${item.key}.title`, item.key),
        subtitle: t(`home_page.dashboard_items.${item.key}.subtitle`, item.key),
      };
    });
  } catch (error) {
    // Log error if fetching fails
    console.error("Error fetching dashboard items:", error);

    // Set error message and show the error dialog
    errorMessage.value =
      "Failed to load dashboard items. Please refresh the page or try again later.";
    errorDialog.value = true;
  } finally {
    // Stop loading indicator once the data is processed
    loading.value = false;
  }
});
</script>

<template>
  <v-container class="pa-0 pt-4" max-width="1024">
    <!-- User Welcome Section -->
    <v-row class="px-6 py-4 align-center d-flex flex-column flex-sm-row">
      <v-col class="d-flex justify-center justify-sm-start py-0">
        <span class="text-h4 font-weight-bold text-teal">{{
          $t("home_page.title")
        }}</span>
      </v-col>

      <v-col class="d-flex justify-center justify-sm-end py-0">
        <span class="text-h6 font-weight-bold text-teal">Alexandar Valov</span>
      </v-col>
    </v-row>

    <!-- Loading Indicator -->
    <div v-if="loading" class="d-flex justify-center align-center">
      <span>Loading data...</span>
    </div>

    <!-- Loop through the dashboard items -->
    <v-row
      max-width="1024"
      class="mx-auto"
      align="center"
      justify="center"
      v-else
    >
      <v-col cols="12" sm="6" v-for="item in items" :key="item.title">
        <!-- Card Component -->
        <Card :item="item" />
      </v-col>
    </v-row>

    <!-- Reusable Error Modal -->
    <ErrorModal v-model="errorDialog" :message="errorMessage" title="Error" />
  </v-container>
</template>
