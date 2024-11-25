<script setup lang="ts">
import type { Header, BankInfoTableRow } from "~/types/bank-info";

// Props
const props = defineProps({
  productsTableData: {
    type: Array as () => BankInfoTableRow[],
    required: true,
  },
  productsTableHeaders: {
    type: Array as () => Header[],
    required: true,
  },
  productsDataTitle: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <v-data-table
    :items="productsTableData"
    hide-default-footer
    hide-default-header
    density="compact"
    class="bg-white rounded-lg py-2"
    style="border-left: 2px solid teal"
  >
    <!-- Table Top Section -->
    <template v-slot:top>
      <v-toolbar class="bg-white" height="28">
        <!-- Title -->
        <v-toolbar-title class="mx-4 flex-0-1 text-h6">{{
          productsDataTitle
        }}</v-toolbar-title>
      </v-toolbar>
    </template>

    <!-- Table Header Section -->
    <template v-slot:thead>
      <thead>
        <tr>
          <!-- Looping through headers -->
          <th
            v-for="header in productsTableHeaders"
            :key="header.key"
            class="font-weight-bold bg-white text-teal"
            :class="{ 'text-end': header.key === 'price' }"
            style="min-width: 140px"
          >
            <!-- Header Title -->
            {{ header.title }}
          </th>
        </tr>
      </thead>
    </template>

    <!-- Table Body Section -->
    <template v-slot:body="{ items }">
      <!-- Loop through the table data -->
      <tr v-for="(item, rowIndex) in items" :key="rowIndex">
        <!-- Loop through the table headers -->
        <td
          v-for="header in productsTableHeaders"
          :key="header.key"
          style="min-width: 140px"
          :class="{
            'text-end': header.key === 'price',
          }"
        >
          <!-- Bind the data using the headers -->
          {{ item[header.key as keyof typeof item] }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
