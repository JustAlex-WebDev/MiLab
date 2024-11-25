/**
 * Defines a table header with title, key, and optional alignment
 */
export type Header = {
  title: string;
  key: string;
  align?: "start" | "center" | "end";
};

/**
 * Represents a row in the Account Table
 */
export type AccountTableRow = {
  idDate: string;
};

/**
 * Represents a row in the Balance Table
 */
export type BalanceTableRow = {
  total: string;
  paid: string;
  due: string;
};

/**
 * Represents a row in the Sale Table (includes sale schema)
 */
export type SaleTableRow = {
  idDate: string;
  saleSchema: string;
};

/**
 * Represents a row in the Products Table (includes product name and price)
 */
export type ProductsTableRow = {
  product: string;
  price: string;
};

/**
 * Represents a row in the Payments Table (includes payment date, type, and amount)
 */
export type PaymentsTableRow = {
  paymentDate: string;
  paymentType: string;
  sum: string;
};

// Union of all possible row types for BankInfo tables
export type BankInfoTableRow =
  | AccountTableRow
  | BalanceTableRow
  | SaleTableRow
  | ProductsTableRow
  | PaymentsTableRow;

/**
 * Type definition for the API response structure
 */
export type ApiResponse = {
  accountTable: {
    data: AccountTableRow[];
    headers: Header[];
  };
  balanceTable: {
    data: BalanceTableRow[];
    headers: Header[];
  };
  saleTable: {
    data: SaleTableRow[];
    headers: Header[];
  };
  productsTable: {
    data: ProductsTableRow[];
    headers: Header[];
  };
  paymentsTable: {
    data: PaymentsTableRow[];
    headers: Header[];
  };
};
