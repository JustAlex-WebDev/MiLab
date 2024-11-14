<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <NuxtLink :to="item.path" class="text-decoration-none">
      <v-card
        v-bind="props"
        class="pa-4 cursor-pointer position-relative"
        :elevation="isHovering ? 4 : 2"
      >
        <v-card-title class="d-flex align-center">
          <v-icon color="teal" size="28">
            {{ item.icon }}
          </v-icon>
          <span class="ms-3 text-h6 font-weight-bold">{{ item.title }}</span>
          <v-spacer></v-spacer>
          <v-icon
            color="teal"
            size="32"
            class="position-absolute transition-transform me-4"
            style="top: 30%; right: 0"
          >
            mdi-chevron-right
          </v-icon>
        </v-card-title>
        <v-card-subtitle class="text-body-1">
          {{ item.subtitle }}
        </v-card-subtitle>
      </v-card>
    </NuxtLink>
  </v-hover>
</template>
