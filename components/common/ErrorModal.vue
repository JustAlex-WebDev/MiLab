<script setup lang="ts">
// Props
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "Oops",
  },
  message: {
    type: String,
    default: "An error has occurred.",
  },
  maxWidth: {
    type: String,
    default: "400px",
  },
  buttonColor: {
    type: String,
    default: "teal",
  },
});

// Emits
const emit = defineEmits(["update:modelValue"]);

// Close modal handler
const closeModal = () => {
  emit("update:modelValue", false);
};
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    persistent
    :max-width="maxWidth"
  >
    <v-card>
      <!-- Error Heading -->
      <v-card-title class="headline">{{ title }}</v-card-title>

      <!-- Error Message -->
      <v-card-text>{{ message }}</v-card-text>

      <!-- Close Button -->
      <v-card-actions>
        <v-btn :color="buttonColor" @click="closeModal">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
