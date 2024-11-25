export const useFetchData = async <T>(
  endpoint: string,
  showErrorDialog = true
): Promise<T> => {
  // Import or define error dialog and message refs globally or in a composable
  const errorDialog = ref(false);
  const errorMessage = ref("");

  try {
    // Ensure the endpoint has '/api' prefix
    const url = endpoint.startsWith("/api") ? endpoint : `/api${endpoint}`;

    // Fetch data from the API and parse as JSON
    const response = await fetch(url);
    const data = await response.json();

    // Throw error if the response is not successful
    if (!response.ok) {
      throw new Error(response.statusText || "Unknown error occurred");
    }

    // Return the fetched data
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);

    // Display the error modal with a user-friendly message
    if (showErrorDialog) {
      errorMessage.value =
        "An unexpected error occurred. Please try again later.";
      errorDialog.value = true;
    }

    // Re-throw the error for further handling if needed
    throw err;
  }
};
