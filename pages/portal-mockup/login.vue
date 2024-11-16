<script setup lang="ts">
// Props
definePageMeta({ layout: "login" });

// State for form fields and control variables
const router = useRouter();
const userId = ref<string>("");
const password = ref<string>("");
const visible = ref<boolean>(true);
const rememberMe = ref<boolean>(false);

// Retrieve remembered userId from localStorage on page load
onMounted(() => {
  const savedUserId = localStorage.getItem("rememberedUserId");
  if (savedUserId) {
    userId.value = savedUserId;
    rememberMe.value = true;
  }
});

// Function that handles login functionality
const handleLogin = () => {
  localStorage.setItem("isLoggedIn", "true");
  rememberMe.value
    ? localStorage.setItem("rememberedUserId", userId.value)
    : localStorage.removeItem("rememberedUserId");
  router.push("/portal-mockup");
};

// Function that toggles password visibility
const toggleVisibility = (field: string) => {
  visible.value = !visible.value;
};

// Function that selects appropriate icon for user and password fields
const appendInnerIcon = (field: string) =>
  field === "user"
    ? "mdi-account-outline"
    : visible.value
    ? "mdi-eye-off-outline"
    : "mdi-eye-outline";
</script>

<template>
  <!-- Main container -->
  <v-container
    class="d-flex align-center justify-center"
    style="height: calc(80vh - 140px)"
  >
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <!-- Card -->
        <v-card
          rounded="lg"
          elevation="1"
          class="px-4 py-6 bg-white mx-auto"
          max-width="400"
        >
          <v-card-title
            class="text-center text-h4 text-teal font-weight-bold mb-4"
            >Welcome back!</v-card-title
          >
          <v-card-text>
            <!-- Form -->
            <v-form @submit.prevent="handleLogin">
              <!-- User ID -->
              <v-text-field
                v-model="userId"
                label="User ID"
                type="email"
                variant="outlined"
                placeholder="1-2125972"
                density="compact"
                rounded="lg"
                :append-inner-icon="appendInnerIcon('user')"
                @click:append-inner="toggleVisibility('user')"
              ></v-text-field>

              <!-- Password -->
              <v-text-field
                v-model="password"
                label="Password"
                :type="visible ? 'password' : 'text'"
                variant="outlined"
                placeholder="Enter your password"
                density="compact"
                rounded="lg"
                :append-inner-icon="appendInnerIcon('password')"
                @click:append-inner="toggleVisibility('password')"
              ></v-text-field>

              <!-- "Remember me" checkbox -->
              <v-checkbox
                v-model="rememberMe"
                label="Remember me"
                hide-details
                class="mt-n4 mb-2"
              ></v-checkbox>

              <!-- Submit button -->
              <v-btn
                type="submit"
                variant="outlined"
                color="teal"
                rounded="lg"
                class="w-100 font-weight-bold"
              >
                Sign In
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
