<script setup lang="ts">
// Props and emits for the drawer component
const props = defineProps({
  drawer: Boolean, // Prop to control drawer visibility
});

// Emit event for updating drawer state
const emit = defineEmits(["update:drawer"]);

// i18n (localization) setup
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();

// Router setup
const router = useRouter();
const route = useRoute();
const drawerState = ref(props.drawer);

// Watch for drawer prop changes and sync with local state
watch(
  () => props.drawer,
  (newVal) => {
    drawerState.value = newVal;
  }
);

// Emit drawer state changes back to parent component
watch(drawerState, (newVal) => {
  emit("update:drawer", newVal);
});

// Menu Items
const items = [
  {
    title: "Home",
    path: `${localePath("/portal-mockup")}`,
    icon: "mdi-home-outline",
  },
  {
    title: "Results",
    path: `${localePath("/portal-mockup/results")}`,
    icon: "mdi-file-document-outline",
  },
  {
    title: "Export Results",
    path: `${localePath("/portal-mockup/")}`,
    icon: "mdi-file-export-outline",
  },
  {
    title: "Bank Info",
    path: `${localePath("/portal-mockup/bank-info")}`,
    icon: "mdi-bank-outline",
  },
];

const otherItems = [
  {
    title: "Account",
    path: `${localePath("/portal-mockup/account")}`,
    icon: "mdi-account-outline",
  },
  {
    title: "Notifications",
    path: `${localePath("/portal-mockup/notifications")}`,
    icon: "mdi-bell-outline",
  },
];

// isActive function to check for both localized and non-localized paths
const isActive = (path: string) => {
  const localizedPath = localePath(path);
  return route.path === path || route.path === localizedPath;
};

// Logout function: clears local storage and navigates to login page
const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  router.push(localePath("/portal-mockup/login"));
  drawerState.value = false;
};

// Function to navigate to a path and close the drawer
const navigateAndClose = (path: string) => {
  const localizedPath = localePath(path);
  router.push(localizedPath);
  drawerState.value = false;
};

// Dropdown state for language selection
const languageDropdown = ref(false);

// Change language and close the language dropdown menu
const changeLanguage = (code: string) => {
  const path = switchLocalePath(code as "en" | "bg");
  router.push(path);
  languageDropdown.value = false;
};
</script>

<template>
  <!-- Navigation Drawer -->
  <v-navigation-drawer v-model="drawerState" location="right" :temporary="true">
    <v-list nav>
      <v-list-subheader class="text-teal">MAIN MENU</v-list-subheader>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        @click="navigateAndClose(item.path)"
        rounded="lg"
        :tabindex="0"
        :class="[
          'drawer-link',
          'cursor-pointer',
          'transition-colors duration-300 ease-in-out',
          isActive(item.path)
            ? 'bg-teal text-white'
            : 'bg-transparent text-teal',
        ]"
      >
        <template #prepend>
          <v-icon
            :class="isActive(item.path) ? 'text-white' : 'text-teal'"
            class="opacity-90"
          >
            {{ item.icon }}
          </v-icon>
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-list nav>
      <v-list-subheader class="text-teal">OTHERS</v-list-subheader>
      <v-list-item
        v-for="item in otherItems"
        :key="item.title"
        @click="navigateAndClose(item.path)"
        rounded="lg"
        :tabindex="0"
        :class="[
          'drawer-link',
          'cursor-pointer',
          'transition-colors duration-300 ease-in-out',
          isActive(item.path)
            ? 'bg-teal text-white'
            : 'bg-transparent text-teal',
        ]"
      >
        <template #prepend>
          <v-icon
            :class="isActive(item.path) ? 'text-white' : 'text-teal-500'"
            class="opacity-90"
          >
            {{ item.icon }}
          </v-icon>
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>

      <!-- Language Dropdown -->
      <v-list-item
        rounded="lg"
        :tabindex="0"
        class="drawer-link cursor-pointer transition-colors duration-300 ease-in-out"
      >
        <template #prepend>
          <v-icon class="text-teal opacity-90">mdi-translate</v-icon>
        </template>
        <v-list-item-title>
          <v-menu v-model="languageDropdown" activator="parent" offset-y>
            <template #activator="{ props }">
              <span v-bind="props" class="text-teal cursor-pointer"
                >Change Language</span
              >
            </template>
            <v-list>
              <v-list-item
                v-for="code in locales"
                :key="code"
                @click="changeLanguage(code)"
                :class="code === locale ? 'font-weight-bold text-teal' : ''"
              >
                <!-- Display code and indicate current locale -->
                <v-list-item-title>{{
                  code === "en" ? "English" : code === "fr" ? "French" : code
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <!-- Logout -->
    <template #append>
      <v-list-item
        @click="handleLogout"
        rounded="lg"
        class="cursor-pointer mb-4 mx-auto"
        style="width: 90%"
      >
        <template #prepend>
          <v-icon class="text-teal opacity-90">mdi-logout</v-icon>
        </template>
        <v-list-item-title class="text-teal text-body-2"
          >Sign Out</v-list-item-title
        >
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>
