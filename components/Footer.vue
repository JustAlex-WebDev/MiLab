<template>
  <v-footer app class="border-t-md flex-column">
    <!-- Copyright and Links -->
    <v-row class="pt-2">
      <v-col>
        <span class="text-teal text-body-2">
          Copyright © {{ new Date().getFullYear() }} -
        </span>
        <a
          href="#"
          class="text-teal text-body-2 text-decoration-none cursor-pointer font-weight-bold"
        >
          SKYWARE Group
        </a>
        <span class="text-teal">|</span>
        <a
          href="#"
          class="text-teal text-body-2 text-decoration-none cursor-pointer font-weight-bold"
        >
          LIMS iLab
        </a>
      </v-col>
    </v-row>

    <!-- Current Version -->
    <v-row class="mt-n2">
      <v-col>
        <span class="text-teal text-body-2">version 4.6.0.10357</span>
      </v-col>
    </v-row>
  </v-footer>
</template>
