<script setup lang="ts">
import type { SaleTableRow, BankInfoTableRow } from "~/types/bank-info";

// Props
const props = defineProps({
  saleTableData: {
    type: Array as () => BankInfoTableRow[],
    required: true,
  },
  saleDataTitle: {
    type: String,
    required: true,
  },
  saleId: {
    type: String,
    required: true,
  },
});

// Type guard function to check if the row is of type SaleTableRow
const isSaleTableRow = (row: BankInfoTableRow): row is SaleTableRow => {
  return (row as SaleTableRow).saleSchema !== undefined;
};
</script>

<template>
  <v-data-table
    hide-default-footer
    hide-default-header
    hide-no-data
    density="compact"
    class="bg-white rounded-lg py-2"
    style="border-left: 2px solid teal"
  >
    <!-- Table Top Section -->
    <template v-slot:top>
      <v-toolbar class="bg-white" height="48">
        <!-- Title -->
        <v-toolbar-title class="ml-4 mr-2 flex-0-1 text-h6">{{
          saleDataTitle
        }}</v-toolbar-title>

        <!-- ID -->
        <v-chip
          variant="tonal"
          color="teal"
          density="comfortable"
          rounded="lg"
          >{{ saleId }}</v-chip
        >
      </v-toolbar>

      <!-- ID/Date -->
      <v-toolbar class="bg-white" height="24">
        <v-toolbar-title class="ml-4 text-body-2">{{
          isSaleTableRow(props.saleTableData[0])
            ? props.saleTableData[0].idDate
            : ""
        }}</v-toolbar-title>
      </v-toolbar>

      <!-- Sale Schema -->
      <v-toolbar class="bg-white" height="32">
        <v-toolbar-title class="ml-4 mr-2 flex-0-1 text-body-2">
          Sale Schema:
        </v-toolbar-title>

        <v-chip
          variant="tonal"
          color="teal"
          density="comfortable"
          rounded="lg"
          size="small"
          >{{
            isSaleTableRow(props.saleTableData[0])
              ? props.saleTableData[0].saleSchema
              : "Unknown Schema"
          }}</v-chip
        >
      </v-toolbar>
    </template>
  </v-data-table>
</template>
