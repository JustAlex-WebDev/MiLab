<template>
  <v-footer app class="flex-column bg-white">
    <!-- Copyright Section -->
    <v-row class="pt-2">
      <v-col>
        <!-- Current year and links to the company websites -->
        <span class="text-teal text-body-2">
          Copyright © {{ new Date().getFullYear() }} -
        </span>

        <!-- SKYWARE Group -->
        <a
          href="http://www.skyware-group.com/"
          target="_blank"
          class="text-teal text-body-2 text-decoration-none cursor-pointer font-weight-bold"
        >
          SKYWARE Group
        </a>

        <!-- Separator - '|' -->
        <span class="text-teal">|</span>

        <!-- LIMS iLab-->
        <a
          href="http://ilab.skyware-group.com/"
          target="_blank"
          class="text-teal text-body-2 text-decoration-none cursor-pointer font-weight-bold"
        >
          LIMS iLab
        </a>
      </v-col>
    </v-row>

    <!-- Version Information Section -->
    <v-row class="mt-n2">
      <v-col>
        <!-- Current version -->
        <span class="text-teal text-body-2">version 4.6.0.10357</span>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup lang="ts">
// No logic in the script section, so no changes needed here for TypeScript
</script>
