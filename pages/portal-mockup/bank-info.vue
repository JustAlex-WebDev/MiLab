<script setup lang="ts">
import AccountTable from "~/components/bank-info/AccountTable.vue";
import BalanceTable from "~/components/bank-info/BalanceTable.vue";
import PaymentsTable from "~/components/bank-info/PaymentsTable.vue";
import ProductsTable from "~/components/bank-info/ProductsTable.vue";
import SaleTable from "~/components/bank-info/SaleTable.vue";
import Breadcrumbs from "~/components/common/Breadcrumbs.vue";
import ErrorModal from "~/components/common/ErrorModal.vue";

// Destructure reactive data and state variables from the `useBankInfo` composable
const { loading, errorDialog, errorMessage, tables } = useBankInfo();

// Set the page's head metadata
useHead({
  title: "MiLab - Bank Information",
  meta: [
    {
      name: "description",
      content: "More about your bank information.",
    },
  ],
});

// Localization Logic
const { t } = useI18n();
const localePath = useLocalePath();

// Breadcrumbs
const breadcrumbs = ref([
  {
    title: t("breadcrumbs.home"),
    disabled: false,
    href: localePath("/portal-mockup"),
  },
  {
    title: t("breadcrumbs.bank_info"),
    disabled: true,
    href: localePath("/portal-mockup/bank-info"),
  },
]);
</script>

<template>
  <v-container max-width="1024">
    <!-- Breadcrumbs Navigation Component -->
    <Breadcrumbs :items="breadcrumbs" />

    <!-- Page Title -->
    <v-row class="pt-4 px-4">
      <!-- Page Title -->
      <span class="text-teal text-h4 font-weight-bold">{{
        $t("bank_info_page.title")
      }}</span>
    </v-row>

    <!-- Account Table -->
    <AccountTable
      v-if="!loading"
      :accountTableData="tables.accountTable.data"
      accountDataTitle="John Doe, M, 30"
      accountId="12345"
    />

    <!-- Sale and Balance Tables -->
    <v-row justify="start" align="center" class="my-4">
      <!-- Sale Table -->
      <v-col cols="12" md="4">
        <SaleTable
          v-if="!loading"
          :saleTableData="tables.saleTable.data"
          saleDataTitle="Sale"
          saleId="67890"
        />
      </v-col>

      <!-- Balance Table -->
      <v-col cols="12" md="6">
        <BalanceTable
          v-if="!loading"
          :balanceTableData="tables.balanceTable.data"
          :balanceTableHeaders="tables.balanceTable.headers"
        />
      </v-col>
    </v-row>

    <!-- Products Table -->
    <ProductsTable
      v-if="!loading"
      :productsTableData="tables.productsTable.data"
      :productsTableHeaders="tables.productsTable.headers"
      productsDataTitle="Products"
    />

    <!-- Payments Table -->
    <PaymentsTable
      v-if="!loading"
      :paymentsTableData="tables.paymentsTable.data"
      :paymentsTableHeaders="tables.paymentsTable.headers"
      paymentsDataTitle="Payments"
    />

    <!-- Reusable Error Modal -->
    <ErrorModal v-model="errorDialog" :message="errorMessage" title="Error" />
  </v-container>
</template>
