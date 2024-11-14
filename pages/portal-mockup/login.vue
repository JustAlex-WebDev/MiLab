<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

definePageMeta({ layout: "login" });

const router = useRouter();
const userId = ref("");
const password = ref("");
const visible = ref(true);
const rememberMe = ref(false);

// Check local storage for remembered userId
onMounted(() => {
  const savedUserId = localStorage.getItem("rememberedUserId");
  if (savedUserId) {
    userId.value = savedUserId;
    rememberMe.value = true;
  }
});

const handleLogin = () => {
  localStorage.setItem("isLoggedIn", "true");
  rememberMe.value
    ? localStorage.setItem("rememberedUserId", userId.value)
    : localStorage.removeItem("rememberedUserId");
  router.push("/portal-mockup");
};

const toggleVisibility = (field) => {
  if (field === "user") visible.value = !visible.value;
  else visible.value = !visible.value;
};

const appendInnerIcon = (field) =>
  field === "user"
    ? "mdi-account-outline"
    : visible.value
    ? "mdi-eye-off-outline"
    : "mdi-eye-outline";
</script>

<template>
  <v-container class="login-container">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="login-card" rounded="xl" elevation="2">
          <v-card-title class="text-center title">Welcome back!</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleLogin" class="login-form">
              <v-text-field
                v-model="userId"
                label="User ID"
                type="email"
                variant="outlined"
                placeholder="1-2125972"
                density="comfortable"
                rounded="lg"
                class="input-field"
                :append-inner-icon="appendInnerIcon('user')"
                @click:append-inner="toggleVisibility('user')"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                :type="visible ? 'password' : 'text'"
                variant="outlined"
                placeholder="Enter your password"
                density="comfortable"
                rounded="lg"
                :append-inner-icon="appendInnerIcon('password')"
                @click:append-inner="toggleVisibility('password')"
              ></v-text-field>
              <v-checkbox
                v-model="rememberMe"
                :style="{ color: '#085d4f', scale: 0.8 }"
                label="Remember me"
                hide-details
              ></v-checkbox>
              <v-btn
                type="submit"
                variant="outlined"
                rounded="lg"
                class="submit-btn"
              >
                Sign In
              </v-btn>
            </v-form>
            <div class="signup-prompt">
              <span>Don't have an account yet? </span>
              <span class="signup-link">Sign Up</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.login-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 40px;

  .login-card {
    padding: 40px 20px;

    .title {
      font-size: 28px;
      font-weight: bold;
      color: #085d4f;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      margin-top: 20px;

      .v-checkbox {
        margin-top: -20px;
        margin-bottom: 10px;
        margin-left: -30px;
      }

      .submit-btn {
        width: 100%;
        color: white;
        background-color: #085d4f;
        font-weight: bold;
        height: 48px;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: white;
          color: #085d4f;
        }
      }
    }

    .signup-prompt {
      margin-top: 20px;
      text-align: center;
      color: #085d4f;

      .signup-link {
        color: #085d4f;
        font-weight: bold;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
</style>
