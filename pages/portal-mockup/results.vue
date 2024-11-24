<script setup lang="ts">
import type {
  DepartmentTableRow,
  Header,
  PersonTableRow,
} from "~/types/results";

// Set the page's head metadata
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
const personTableData = ref<PersonTableRow[]>([]);
const departmentTableData = ref<DepartmentTableRow[]>([]);

const personTableHeaders = ref<Header[]>([]);
const departmentTableHeaders = ref<Header[]>([]);

const loading = ref<boolean>(true);

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

    // Set data for personTable and departmentTable
    personTableData.value = data.personTable.data;
    personTableHeaders.value = data.personTable.headers.map((header) => ({
      ...header,
      align: header.align as "start" | "center" | "end" | undefined,
    }));

    departmentTableData.value = data.departmentTable.data;
    departmentTableHeaders.value = data.departmentTable.headers.map(
      (header) => ({
        ...header,
        align: header.align as "start" | "center" | "end" | undefined,
      })
    );
  } catch (error) {
    console.error("Error fetching results:", error);
  } finally {
    loading.value = false;
  }
};

// Re-fetch data whenever the route changes
watch(
  () => useRouter().currentRoute,
  () => {
    loading.value = true;
    fetchData();
  },
  { immediate: true }
);

// Fetch data when the component is mounted
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
      <!-- Page Title -->
      <span class="text-teal text-h4 font-weight-bold">{{
        $t("results_page.title")
      }}</span>

      <!-- Spacer -->
      <v-spacer></v-spacer>

      <!-- Export Button -->
      <v-btn
        prepend-icon="mdi-file-document-outline"
        type="button"
        variant="outlined"
        rounded="lg"
        color="teal"
      >
        {{ $t("results_page.export_button") }}
      </v-btn>
    </v-row>

    <!-- Conditional Table Components -->
    <div v-if="loading">Loading...</div>
    <div
      v-else-if="
        personTableData.length === 0 || departmentTableData.length === 0
      "
    >
      No results available
    </div>

    <!-- Person Table Component -->
    <PersonTable
      :personTableData="personTableData"
      :personTableHeaders="personTableHeaders"
      personDataTitle="John Doe, M, 30"
      personId="12345"
    />

    <!-- Department Table Component -->
    <DepartmentTable
      :departmentTableData="departmentTableData"
      :departmentTableHeaders="departmentTableHeaders"
    />
  </v-container>
</template>
