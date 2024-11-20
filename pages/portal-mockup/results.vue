<script setup lang="ts">
import type { TableDataRow } from "~/types/results";

useHead({
  title: "MiLab - Results",
  meta: [
    {
      name: "description",
      content: "The Results for your medical laboratories.",
    },
  ],
});

// Table data and loading state
const tableData = ref<TableDataRow[]>([]);
const loading = ref(true);

// Localization Logic
const { t } = useI18n();
const localePath = useLocalePath();

// Breadcrumbs
const breadcrumbs = ref([
  {
    title: t("breadcrumbs.home"),
    disabled: false,
    href: localePath("/portal-mockup"),
  },
  {
    title: t("breadcrumbs.results"),
    disabled: true,
    href: localePath("/portal-mockup/results"),
  },
]);

/**
 * Function to fetch the results data
 */
const fetchData = async () => {
  try {
    // Fetch data from the API (client-side)
    const data = await $fetch("/api/results");

    /// Map the mock data with localized strings and add a 'key' property temporarily
    tableData.value = data.map((item: { key: string }) => {
      const labelKey = item.key;

      // Get the localized label and value
      const localizedLabel = t(
        `results_page.table_data.${labelKey}.label`,
        item.key
      );
      const localizedValue = t(
        `results_page.table_data.${labelKey}.value`,
        item.key
      );

      // Return only the 'label' and 'value' properties for the table
      return {
        label: localizedLabel,
        value: localizedValue,
      };
    });
  } catch (error) {
    console.error("Error fetching results:", error);
  } finally {
    loading.value = false;
  }
};

// Watch the route to trigger a re-fetch of data whenever the route changes
watch(
  () => useRouter().currentRoute,
  () => {
    loading.value = true;
    fetchData();
  },
  { immediate: true }
);

// Fetch data after the component has mounted
onMounted(() => {
  fetchData();
});
</script>

<template>
  <v-container>
    <!-- Breadcrumbs Navigation Component -->
    <Breadcrumbs :items="breadcrumbs" />

    <!-- Page Title and Export Button -->
    <v-row class="pt-4 px-4 d-flex">
      <span class="text-teal text-h4 font-weight-bold">{{
        $t("results_page.title")
      }}</span>
      <v-spacer></v-spacer>
      <v-btn
        prepend-icon="mdi-file-document-outline"
        type="button"
        variant="outlined"
        rounded="lg"
        color="teal"
        class="font-weight-medium"
      >
        {{ $t("results_page.export_button") }}
      </v-btn>
    </v-row>

    <!-- Conditional Table Component -->
    <div v-if="loading">Loading...</div>
    <div v-else-if="tableData.length === 0">No results available</div>
    <Table v-else :data="tableData" />
  </v-container>
</template>
