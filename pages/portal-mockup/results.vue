<script setup lang="ts">
import Breadcrumbs from "~/components/common/Breadcrumbs.vue";
import ErrorModal from "~/components/common/ErrorModal.vue";
import DepartmentTable from "~/components/results/DepartmentTable.vue";
import PersonTable from "~/components/results/PersonTable.vue";
import SamplesTable from "~/components/results/SamplesTable.vue";
import TableFooter from "~/components/results/TableFooter.vue";

// Destructure reactive data and state variables from the `useResults` composable
const { loading, errorDialog, errorMessage, tables } = useResults();

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
</script>

<template>
  <v-container max-width="1024">
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

    <!-- Person Table Component -->
    <PersonTable
      v-if="!loading"
      :personTableData="tables.personTable.data"
      :personTableHeaders="tables.personTable.headers"
      personDataTitle="John Doe, M, 30"
      personId="12345"
      personPID="123456789"
    />

    <!-- Department Table Component -->
    <DepartmentTable
      v-if="!loading"
      :departmentTableData="tables.departmentTable.data"
      :departmentTableHeaders="tables.departmentTable.headers"
      departmentDataTitle="Department Name"
    />

    <!-- Samples Table Component -->
    <SamplesTable
      v-if="!loading"
      :samplesTableData="tables.samplesTable.data"
      :samplesTableHeaders="tables.samplesTable.headers"
      samplesDataTitle="Used Samples"
    />

    <!-- Table Footer Component -->
    <TableFooter v-if="!loading" />

    <!-- Reusable Error Modal -->
    <ErrorModal v-model="errorDialog" :message="errorMessage" title="Error" />
  </v-container>
</template>
