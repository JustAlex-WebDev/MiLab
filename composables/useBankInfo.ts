import type { ApiResponse, Header, BankInfoTableRow } from "~/types/bank-info";

// Types for each table's data and headers.
type TableData = {
  data: BankInfoTableRow[];
  headers: Header[];
};

export const useBankInfo = () => {
  // Loading and error states
  const loading = ref(true);
  const errorDialog = ref(false);
  const errorMessage = ref("");

  // A generic tables structure for storing data and headers
  const tables = ref<{
    accountTable: TableData;
    balanceTable: TableData;
    saleTable: TableData;
    productsTable: TableData;
    paymentsTable: TableData;
  }>({
    accountTable: { data: [], headers: [] },
    balanceTable: { data: [], headers: [] },
    saleTable: { data: [], headers: [] },
    productsTable: { data: [], headers: [] },
    paymentsTable: { data: [], headers: [] },
  });

  // Fetch the data from the API
  const fetchBankInfo = async () => {
    try {
      loading.value = true;
      const data = await useFetchData<ApiResponse>("/api/bank-info");

      // Update each table with the fetched data
      tables.value = {
        accountTable: {
          data: data.accountTable.data,
          headers: mapHeaders(data.accountTable.headers),
        },
        balanceTable: {
          data: data.balanceTable.data,
          headers: mapHeaders(data.balanceTable.headers),
        },
        saleTable: {
          data: data.saleTable.data,
          headers: mapHeaders(data.saleTable.headers),
        },
        productsTable: {
          data: data.productsTable.data,
          headers: mapHeaders(data.productsTable.headers),
        },
        paymentsTable: {
          data: data.paymentsTable.data,
          headers: mapHeaders(data.paymentsTable.headers),
        },
      };
    } catch (error) {
      console.error("Error fetching bank info:", error);
      errorMessage.value =
        "There was an error fetching the bank info data. Please try again later.";
      errorDialog.value = true;
    } finally {
      loading.value = false;
    }
  };

  // Helper function to map headers and ensure alignment
  const mapHeaders = (headers: Header[]): Header[] =>
    headers.map((header) => ({
      ...header,
      align: header.align as "start" | "center" | "end" | undefined,
    }));

  // Fetch data on component mount and watch for route changes
  onMounted(fetchBankInfo);
  watch(() => useRoute().fullPath, fetchBankInfo, { flush: "post" });

  // Return the tables and states
  return {
    loading,
    errorDialog,
    errorMessage,
    tables,
  };
};
