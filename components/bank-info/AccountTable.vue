<script setup lang="ts">
import type { AccountTableRow, BankInfoTableRow } from "~/types/bank-info";

// Props
const props = defineProps({
  accountTableData: {
    type: Array as () => BankInfoTableRow[],
    required: true,
  },
  accountDataTitle: {
    type: String,
    required: true,
  },
  accountId: {
    type: String,
    required: true,
  },
});

// Type guard function to check if the row is of type AccountTableRow
const isAccountTableRow = (row: BankInfoTableRow): row is AccountTableRow => {
  return (row as AccountTableRow).idDate !== undefined;
};

// Get the first idDate value (only for rows of type AccountTableRow)
const idDate = computed(() => {
  const firstRow = props.accountTableData[0];

  // Check if it's AccountTableRow
  return isAccountTableRow(firstRow) ? firstRow.idDate : "";
});
</script>

<template>
  <v-data-table
    hide-default-footer
    hide-default-header
    hide-no-data
    density="compact"
    class="mt-8 mb-4 bg-white rounded-lg py-2"
    style="border-left: 2px solid teal"
  >
    <!-- Table Top Section -->
    <template v-slot:top>
      <v-toolbar class="bg-white" height="48">
        <!-- Name -->
        <v-toolbar-title class="ml-4 mr-2 flex-0-1 text-h6">{{
          accountDataTitle
        }}</v-toolbar-title>

        <!-- ID -->
        <v-chip
          variant="tonal"
          color="teal"
          density="comfortable"
          rounded="lg"
          >{{ accountId }}</v-chip
        >
      </v-toolbar>

      <!-- ID/Date -->
      <v-toolbar class="bg-white" height="24">
        <v-toolbar-title class="ml-4 text-body-2">{{ idDate }}</v-toolbar-title>
      </v-toolbar>
    </template>
  </v-data-table>
</template>
