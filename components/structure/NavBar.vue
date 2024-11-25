<script setup lang="ts">
// Props
const props = defineProps({
  layout: {
    type: String,
    required: true,
  },
});

// State to manage drawer visibility
// const drawer = ref<boolean>(false);

// Router
const router = useRouter();

// i18n (localization) setup
const { locale } = useI18n();
const selectedLanguage = ref<string>(locale.value);
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();

// Function that switches app locale and updates the path
const changeLanguage = (lang: "en" | "bg"): void => {
  const newPath = switchLocalePath(lang);
  if (newPath) {
    selectedLanguage.value = lang;
    router.push(newPath);
  }
};
</script>

<template>
  <v-app-bar app class="bg-white w-100">
    <!-- Centered container -->
    <div
      class="d-flex align-center justify-space-between w-100"
      style="max-width: 1024px; margin: auto"
    >
      <!-- Logo -->
      <v-app-bar-title>
        <NuxtLink
          :to="localePath('/portal-mockup')"
          class="text-teal font-weight-bold text-decoration-none pl-4"
          >M I L A B</NuxtLink
        >
      </v-app-bar-title>

      <!-- Menu icon -->
      <!-- <v-app-bar-nav-icon
      v-if="layout === 'default'"
      @click.stop="drawer = !drawer"
      class="d-sm-none text-teal"
    ></v-app-bar-nav-icon> -->

      <!-- Language and Account Controls -->
      <div class="d-flex align-center">
        <!-- Language Dropdown Menu-->
        <v-menu open-on-click location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              color="teal"
              style="width: 48px; min-width: 48px; height: 48px"
            >
              <v-icon size="24">mdi-web</v-icon>
            </v-btn>
          </template>

          <!-- Language Options List -->
          <v-list>
            <!-- Language: English -->
            <v-list-item @click="changeLanguage('en')">
              <v-list-item-title
                :class="{
                  'font-weight-bold': selectedLanguage === 'en',
                }"
                class="text-teal"
              >
                English
              </v-list-item-title>
            </v-list-item>

            <!-- Language: Bulgarian -->
            <v-list-item @click="changeLanguage('bg')">
              <v-list-item-title
                :class="{
                  'font-weight-bold': selectedLanguage === 'bg',
                }"
                class="text-teal"
              >
                Bulgarian
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- Logout Button -->
        <NuxtLink
          v-if="layout === 'default'"
          :to="localePath('/portal-mockup/login')"
        >
          <v-btn
            v-bind="props"
            color="teal"
            style="width: 48px; min-width: 48px; height: 48px"
          >
            <v-icon size="24">mdi-logout</v-icon>
          </v-btn>
        </NuxtLink>
      </div>
    </div>
  </v-app-bar>

  <!-- Drawer Component -->
  <!-- <Drawer v-model:drawer="drawer" /> -->
</template>
