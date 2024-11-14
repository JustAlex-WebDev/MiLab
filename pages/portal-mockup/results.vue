<script setup lang="ts">
// Localization logic
const localePath = useLocalePath();

// Define breadcrumb item type
interface BreadcrumbItem {
  title: string;
  disabled: boolean;
  href: string;
}

// Breadcrumbs items (navigation links)
const items: Ref<BreadcrumbItem[]> = ref([
  {
    title: "Home",
    disabled: false,
    href: localePath("/portal-mockup"),
  },
  {
    title: "Results",
    disabled: true, // Disabled, not clickable
    href: localePath("/portal-mockup/results"),
  },
]);

// Define table row type
interface TableDataRow {
  label: string;
  value: string;
}

// Table data for displaying results
const tableData: Ref<TableDataRow[]> = ref([
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

// Define table header type
interface TableHeader {
  text: string;
  value: string;
}

// Dummy function for showing details (can be extended later)
const viewDetail = (item: TableDataRow) => {
  alert(`Viewing details for ${item.title}`);
};
</script>

<template>
  <v-container>
    <!-- Breadcrumbs Navigation -->
    <v-breadcrumbs class="pa-0 mb-4">
      <template v-for="(item, index) in items" :key="index">
        <!-- Active breadcrumb links -->
        <NuxtLink
          :to="item.href"
          class="text-teal font-weight-bold"
          v-if="!item.disabled"
        >
          <v-breadcrumbs-item>
            {{ item.title }}
          </v-breadcrumbs-item>
        </NuxtLink>

        <!-- Disabled breadcrumb items -->
        <v-breadcrumbs-item
          v-else
          :disabled="item.disabled"
          class="text-teal opacity-80"
        >
          {{ item.title }}
        </v-breadcrumbs-item>

        <!-- Separator - '/' -->
        <template v-if="index < items.length - 1">
          <span class="mx-1">/</span>
        </template>
      </template>
    </v-breadcrumbs>

    <!-- Page Title and Export Button -->
    <v-row class="pt-4 px-4 d-flex">
      <!-- Page title -->
      <span class="text-teal text-h4 font-weight-bold">Your Results</span>

      <!-- Spacer -->
      <v-spacer></v-spacer>

      <!-- Export button -->
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

    <!-- Language Switcher (currently commented out) -->
    <!-- 
      <v-row class="my-2 ml-1">
        <button @click="setLocale('en')" class="mr-2">English</button>
        <button @click="setLocale('fr')" class="">Français</button>
      </v-row>
      <p>{{ $t("welcome") }} {{ locale }}</p>
    -->

    <!-- Results Data Table -->
    <v-data-table-virtual
      hide-default-header
      :items="tableData"
      item-value="label"
      class="my-8 bg-white"
    >
      <!-- Custom slot for displaying 'label' -->
      <template v-slot:[`item.label`]="{ item }">
        <strong>{{ item.label }}</strong>
      </template>

      <!-- Default slot for displaying 'value' -->
      <template v-slot:[`item.value`]="{ item }">
        {{ item.value }}
      </template>
    </v-data-table-virtual>
  </v-container>
</template>
