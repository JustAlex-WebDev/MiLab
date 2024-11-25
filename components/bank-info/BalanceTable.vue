<script setup lang="ts">
import type { BankInfoTableRow, Header } from "~/types/bank-info";

// Breakpoints logic
const isMounted = ref(false);

// Props
const props = defineProps({
  balanceTableData: {
    type: Array as () => BankInfoTableRow[],
    required: true,
  },
  balanceTableHeaders: {
    type: Array as () => Header[],
    required: true,
  },
});

// Ensure smAndUp is only available on the client-side
onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <v-data-table
    :items="balanceTableData"
    hide-default-footer
    hide-default-header
    density="compact"
    class="bg-white rounded-lg py-2"
    style="border-left: 2px solid teal"
  >
    <!-- Table Header Section -->
    <template v-slot:thead>
      <thead>
        <tr>
          <!-- Looping through headers -->
          <th
            v-for="header in balanceTableHeaders"
            :key="header.key"
            class="font-weight-bold bg-white text-teal"
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
      <tr v-for="(item, index) in items" :key="index">
        <!-- Loop through the table headers -->
        <td
          v-for="header in balanceTableHeaders"
          :key="header.key"
          style="min-width: 140px"
        >
          <!-- Bind the data using the headers -->
          {{ item[header.key as keyof typeof item] }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
