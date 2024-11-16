<script setup lang="ts">
// Props
defineProps<{
  data: TableDataRow[];
}>();
</script>

<template>
  <!-- Virtual Table -->
  <v-data-table-virtual
    :items="data"
    hide-default-header
    item-value="label"
    class="my-8 bg-white"
  >
    <!-- Label -->
    <template v-slot:[`item.label`]="{ item }">
      <strong>{{ item.label }}</strong>
    </template>

    <!-- Value -->
    <template v-slot:[`item.value`]="{ item }">
      {{ item.value }}
    </template>
  </v-data-table-virtual>
</template>
