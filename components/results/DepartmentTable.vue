<script setup lang="ts">
import type { Header, ResultsTableRow } from "~/types/results";

// Props
const props = defineProps({
  departmentTableData: {
    type: Array as () => ResultsTableRow[],
    required: true,
  },
  departmentTableHeaders: {
    type: Array as () => Header[],
    required: true,
  },
  departmentDataTitle: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <v-data-table
    :items="departmentTableData"
    hide-default-footer
    hide-default-header
    density="compact"
    class="my-8 bg-white rounded-lg py-2"
    style="border-left: 2px solid teal"
  >
    <!-- Table Top Section -->
    <template v-slot:top>
      <v-toolbar class="bg-white" height="28">
        <!-- Title -->
        <v-toolbar-title class="mx-4 flex-0-1 text-h6">{{
          departmentDataTitle
        }}</v-toolbar-title>
      </v-toolbar>

      <!-- Note Input -->
      <v-toolbar class="bg-white" height="48">
        <v-text-field
          label="Note Text"
          variant="underlined"
          :hide-details="true"
          color="teal"
          density="compact"
          rounded="lg"
          class="mx-2 text-body-2 pl-2"
        />
      </v-toolbar>
    </template>

    <!-- Table Header Section -->
    <template v-slot:thead>
      <thead>
        <tr>
          <!-- Looping through headers -->
          <th
            v-for="header in departmentTableHeaders"
            :key="header.key"
            class="font-weight-bold bg-white text-teal"
            :class="{ 'text-end': header.key === 'result' }"
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
          v-for="(header, headerIndex) in departmentTableHeaders"
          :key="header.key"
          style="min-width: 140px"
          :class="{
            'bg-teal': header.key === 'flag' && rowIndex === 1,
            'text-end': header.key === 'result',
          }"
          :style="{
            background:
              headerIndex === 2 && rowIndex === 1
                ? 'linear-gradient(to right, #009688, white)'
                : '',
          }"
        >
          <!-- Bind the data using the headers -->
          {{ item[header.key as keyof typeof item] }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
