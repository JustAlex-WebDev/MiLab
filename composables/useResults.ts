import type { ApiResponse, Header, ResultsTableRow } from "~/types/results";

// Types for each table's data and headers.
type TableData = {
  data: ResultsTableRow[];
  headers: Header[];
};

export const useResults = () => {
  // Loading and error states
  const loading = ref(true);
  const errorDialog = ref(false);
  const errorMessage = ref("");

  // Reactive states for table data and headers
  const tables = ref<{
    personTable: TableData;
    departmentTable: TableData;
    samplesTable: TableData;
  }>({
    personTable: { data: [], headers: [] },
    departmentTable: { data: [], headers: [] },
    samplesTable: { data: [], headers: [] },
  });

  // Fetch results from the API and map them to the corresponding state
  const fetchResults = async () => {
    try {
      loading.value = true;

      // Fetch data using the useFetchData composable
      const data = await useFetchData<ApiResponse>("/api/results");

      // Update each table with the fetched data
      tables.value = {
        personTable: {
          data: data.personTable.data,
          headers: mapHeaders(data.personTable.headers),
        },
        departmentTable: {
          data: data.departmentTable.data,
          headers: mapHeaders(data.departmentTable.headers),
        },
        samplesTable: {
          data: data.samplesTable.data,
          headers: mapHeaders(data.samplesTable.headers),
        },
      };
    } catch (error) {
      // Log the error and show a user-friendly message
      console.error("Error fetching results:", error);
      errorMessage.value =
        "There was an error fetching the data. Please try again later.";
      errorDialog.value = true;
    } finally {
      // Ensure loading state is turned off after fetch attempt
      loading.value = false;
    }
  };

  // Maps header objects to enforce alignment type and structure
  const mapHeaders = (headers: Header[]): Header[] =>
    headers.map((header) => ({
      ...header,
      align: header.align as "start" | "center" | "end" | undefined,
    }));

  // Fetch data on component mount and watch for route changes
  onMounted(fetchResults);
  watch(() => useRoute().fullPath, fetchResults, { flush: "post" });

  // Return reactive states and functions to the consuming component
  return {
    loading,
    errorDialog,
    errorMessage,
    tables,
  };
};
