<script setup lang="ts">
import type { Header, PersonTableRow } from "~/types/results";
import { useDisplay } from "vuetify";

// Breakpoints logic
const { smAndUp } = useDisplay();
const isMounted = ref(false);

// Props
const props = defineProps({
  personTableData: {
    type: Array as () => PersonTableRow[],
    required: true,
  },
  personTableHeaders: {
    type: Array as () => Header[],
    required: true,
  },
  personDataTitle: {
    type: String,
    required: true,
  },
  personId: {
    type: String,
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
    :items="personTableData"
    hide-default-footer
    hide-default-header
    density="compact"
    class="my-8 bg-white rounded-lg py-2"
    style="border-left: 2px solid teal"
  >
    <!-- Table Top Section -->
    <template v-slot:top>
      <v-toolbar class="bg-white" height="28">
        <!-- Name -->
        <v-toolbar-title class="mx-4 flex-0-1 text-h6">{{
          personDataTitle
        }}</v-toolbar-title>

        <!-- ID -->
        <v-chip
          variant="tonal"
          color="teal"
          density="comfortable"
          rounded="lg"
          >{{ personId }}</v-chip
        >

        <!-- Spacer -->
        <v-spacer></v-spacer>

        <!-- Download PDF button logic -->
        <v-btn
          v-if="isMounted && smAndUp"
          variant="outlined"
          color="teal"
          density="comfortable"
          rounded="lg"
          class="mr-4 text-body-2"
        >
          <template #prepend>
            <v-icon>mdi-file-download-outline</v-icon>
          </template>
          <span>Download PDF</span>
        </v-btn>

        <v-btn
          v-else
          icon="mdi-file-download-outline"
          color="teal"
          density="comfortable"
          class="mr-2"
        ></v-btn>

        <!-- Send By Email button logic -->
        <v-btn
          v-if="isMounted && smAndUp"
          variant="outlined"
          color="teal"
          density="comfortable"
          rounded="lg"
          class="text-body-2"
        >
          <template #prepend>
            <v-icon>mdi-email-outline</v-icon>
          </template>
          <span>Send By Email</span>
        </v-btn>

        <v-btn
          v-else
          icon="mdi-email-outline"
          color="teal"
          density="comfortable"
        ></v-btn>
      </v-toolbar>

      <!-- PID -->
      <v-toolbar class="bg-white" height="24">
        <v-toolbar-title class="ml-4 text-body-2"
          >PID: {{ personId }}</v-toolbar-title
        >
      </v-toolbar>
    </template>

    <!-- Table Header Section -->
    <template v-slot:thead>
      <thead>
        <tr>
          <!-- Looping through headers -->
          <th
            v-for="header in personTableHeaders"
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
          v-for="header in personTableHeaders"
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
