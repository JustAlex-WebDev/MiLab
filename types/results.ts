/**
 * Defines a row in the table with a label and value
 */
export interface TableDataRow {
  label: string;
  value: string;
}

export type Header = {
  title: string;
  key: string;
  align?: "start" | "center" | "end";
};

export type PersonTableRow = {
  idDate: string;
  saleSchema: string;
  doctor: string;
  fund1: string;
  fund2: string;
};

export type DepartmentTableRow = {
  examination: string;
  flag: string;
  result: string;
  measurement: string;
  referenceRange: string;
};
