<script setup lang="ts">
import type { DashboardItem } from "~/types";

defineProps<{
  item: DashboardItem;
}>();
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <NuxtLink :to="item.href" class="text-decoration-none">
      <!-- Card -->
      <v-card
        v-bind="props"
        class="pa-4 cursor-pointer position-relative bg-white"
        :elevation="isHovering ? 4 : 1"
      >
        <!-- Title -->
        <v-card-title class="d-flex align-center">
          <!-- Prepended Icon -->
          <v-icon color="teal" size="28">
            {{ item.icon }}
          </v-icon>

          <!-- Heading Text -->
          <span class="ms-3 text-h6 font-weight-bold">{{ item.title }}</span>

          <!-- Spacer -->
          <v-spacer></v-spacer>

          <!-- Arrow Icon -->
          <v-icon
            color="teal"
            size="32"
            class="position-absolute transition-transform me-4"
            style="top: 30%; right: 0"
          >
            mdi-chevron-right
          </v-icon>
        </v-card-title>

        <!-- Subtitle -->
        <v-card-subtitle class="text-body-1">
          {{ item.subtitle }}
        </v-card-subtitle>
      </v-card>
    </NuxtLink>
  </v-hover>
</template>
