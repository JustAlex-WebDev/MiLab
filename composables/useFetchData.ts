/**
 * Function that fetches data from the specified API endpoint
 */
export const useFetchData = async <T>(endpoint: string): Promise<T> => {
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
    // Log and re-throw error in case of failure
    console.error("Error fetching data:", err);
    throw err;
  }
};
