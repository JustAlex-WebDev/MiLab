<script setup lang="ts">
import type { BreadcrumbItem } from "~/types/breadcrumbs";

// Props
defineProps<{
  items: BreadcrumbItem[];
}>();
</script>

<template>
  <!-- Breadcrumbs -->
  <v-breadcrumbs class="pa-0 mb-4">
    <template v-for="(item, index) in items" :key="index">
      <!-- Active breadcrumb links -->
      <NuxtLink
        v-if="!item.disabled"
        :to="item.href"
        class="text-teal font-weight-bold"
        ><v-breadcrumbs-item>
          {{ item.title }}
        </v-breadcrumbs-item></NuxtLink
      >

      <!-- Disabled breadcrumb items -->
      <v-breadcrumbs-item v-else class="text-teal opacity-80">
        {{ item.title }}
      </v-breadcrumbs-item>

      <!-- Separator - '/' -->
      <template v-if="index < items.length - 1"
        ><span class="mx-1">/</span></template
      >
    </template>
  </v-breadcrumbs>
</template>
