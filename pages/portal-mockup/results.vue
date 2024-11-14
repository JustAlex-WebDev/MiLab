<script setup>
import { ref } from "vue";

const localePath = useLocalePath();

// Breadcrumbs setup
const items = ref([
  {
    title: "Home",
    disabled: false,
    href: localePath("/portal-mockup"),
  },
  {
    title: "Results",
    disabled: true,
    href: localePath("/portal-mockup/results"),
  },
]);

// Table data
const tableData = ref([
  {
    label: "СМДЛ Милаб ЕООД",
    value:
      "гр. Пловдив 4003, ул. ”Игрище Кубрат” № 126 , ет. 2, тел: 032/39 83 53 : http://www.milab-bg.com",
  },
  {
    label: "Дата",
    value: "04.11.2024",
  },
  {
    label: "Пациент",
    value: "Велин Емилов Петров (М, 36 г.)",
  },
  {
    label: "ID",
    value: "2125972",
  },
  {
    label: "ЕГН",
    value: "8808136342",
  },
  {
    label: "Външен ID",
    value: "",
  },
  {
    label: "Лекуващ лекар",
    value: "",
  },
  {
    label: "Фонд/Клиника",
    value: "1/2",
  },
  {
    label: "Схема",
    value: "Вътрешна",
  },
  {
    label: "Разрешил",
    value: "",
  },
  {
    label: "Телефон",
    value: "",
  },
  {
    label: "Паспорт",
    value: "",
  },
  {
    label: "Забележка",
    value:
      "Велин съм. Искам нещо да проверя затова се регистрирам. Ако не е посочено друго, референтните граници са за пол Мъж, възраст 36 г.",
  },
  {
    label: "Лекарствено мониториране",
    value: "Хомоцистеин",
  },
  {
    label: "Резултат",
    value: "Неготов",
  },
  {
    label: "Единици",
    value: "µmol/l",
  },
  {
    label: "Терапевтични граници",
    value: "До 15.00",
  },
  {
    label: "Внимание",
    value:
      "Лабораторните резултати не са диагноза, а основание за такава. Приемането на каквито и да било лекарствени средства без лекарско предписание, може да бъде опасно за Вашето здраве. Моля, обръщайте се за тълкуване на резултатите само към квалифицирани лекари.",
  },
  {
    label: "Справката е отпечатана на",
    value:
      "13.11.2024 г. 21:00:22 Лабораторна Информационна Система iLab. (C) СКАЙУЕР Груп ЕООД http://ilab.skyware-group.com",
  },
]);

// Headers for the table
const headers = ref([
  { text: "Label", value: "label" },
  { text: "Value", value: "value" },
]);

const viewDetail = (item) => {
  alert(`Viewing details for ${item.title}`);
};

// Localization Logic
// const { locale } = useI18n();
// const { setLocale } = useI18n();
</script>

<template>
  <v-container>
    <!-- Breadcrumbs -->
    <v-breadcrumbs class="pa-0 mb-4">
      <template v-for="(item, index) in items" :key="index">
        <!-- NuxtLink wraps the entire item -->
        <NuxtLink
          :to="item.href"
          class="text-teal font-weight-bold"
          v-if="!item.disabled"
        >
          <v-breadcrumbs-item>
            {{ item.title }}
          </v-breadcrumbs-item>
        </NuxtLink>

        <!-- Disabled breadcrumb item without NuxtLink -->
        <v-breadcrumbs-item
          v-else
          :disabled="item.disabled"
          class="text-teal opacity-80"
        >
          {{ item.title }}
        </v-breadcrumbs-item>

        <!-- Add separator '/' between items but not after the last item -->
        <template v-if="index < items.length - 1">
          <span class="mx-1">/</span>
        </template>
      </template>
    </v-breadcrumbs>

    <!-- Heading and Export Button -->
    <v-row class="pt-4 px-4 d-flex">
      <span class="text-teal text-h4 font-weight-bold">Your Results</span>
      <v-spacer></v-spacer>
      <v-btn
        prepend-icon="mdi-file-document-outline"
        type="button"
        variant="outlined"
        rounded="lg"
        color="teal"
        class="font-weight-medium"
      >
        Export
      </v-btn>
    </v-row>

    <!-- Language Switcher -->
    <!-- <v-row class="my-2 ml-1">
      <button @click="setLocale('en')" class="mr-2">English</button>
      <button @click="setLocale('fr')" class="">Français</button>
    </v-row>
    <p>{{ $t("welcome") }} {{ locale }}</p> -->

    <!-- Results Table -->
    <v-data-table-virtual
      hide-default-header
      :headers="headers"
      :items="tableData"
      item-value="label"
      class="my-8 bg-white"
    >
      <template v-slot:[`item.label`]="{ item }">
        <strong>{{ item.label }}</strong>
      </template>
      <template v-slot:[`item.value`]="{ item }">
        {{ item.value }}
      </template>
    </v-data-table-virtual>
  </v-container>
</template>
