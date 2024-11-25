/**
 * Defines a table header with title, key, and optional alignment
 */
export type Header = {
  title: string;
  key: string;
  align?: "start" | "center" | "end";
};

/**
 * Represents a personal data table row with ID, schema, doctor, and funds
 */
export type PersonTableRow = {
  idDate: string;
  saleSchema: string;
  doctor: string;
  fund1: string;
  fund2: string;
};

/**
 * Represents a department table row with examination details and results
 */
export type DepartmentTableRow = {
  examination: string;
  flag: string;
  result: string;
  measurement: string;
  referenceRange: string;
};

/**
 * Represents a samples table row with sample details
 */
export type SamplesTableRow = {
  sampleType: string;
  barcode: string;
  takenDate: string;
};

// Union of all possible row types for Results tables
export type ResultsTableRow =
  | PersonTableRow
  | DepartmentTableRow
  | SamplesTableRow;

/**
 * Type definition for the API response structure
 */
export type ApiResponse = {
  personTable: {
    data: PersonTableRow[];
    headers: Header[];
  };
  departmentTable: {
    data: DepartmentTableRow[];
    headers: Header[];
  };
  samplesTable: {
    data: SamplesTableRow[];
    headers: Header[];
  };
};
