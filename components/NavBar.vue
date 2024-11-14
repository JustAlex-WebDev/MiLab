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

// i18n (localization) setup
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();

const router = useRouter();
const selectedLanguage = ref<string>(locale.value);

// Function that switches app locale and updates path based on `lang` code
// - lang (string): Locale code to switch to (e.g., 'en', 'fr')
const changeLanguage = (lang: string): void => {
  const newPath = switchLocalePath(lang);
  if (newPath) {
    selectedLanguage.value = lang;
    router.push(newPath);
  }
};
</script>

<template>
  <v-app-bar app class="bg-white">
    <!-- Logo -->
    <v-app-bar-title>
      <NuxtLink
        :to="localePath('/portal-mockup')"
        class="text-teal font-weight-bold text-decoration-none"
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
    <template v-slot:append>
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

          <!-- Language: French -->
          <v-list-item @click="changeLanguage('fr')">
            <v-list-item-title
              :class="{
                'font-weight-bold': selectedLanguage === 'fr',
              }"
              class="text-teal"
            >
              French
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Account Dropdown-->
      <!-- <v-menu v-if="layout === 'default'" open-on-click location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            color="teal"
            style="width: 48px; min-width: 48px; height: 48px"
          >
            <v-icon size="24">mdi-account-outline</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title> Sign Out </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->

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
    </template>
  </v-app-bar>

  <!-- Drawer Component -->
  <!-- <Drawer v-model:drawer="drawer" /> -->
</template>
