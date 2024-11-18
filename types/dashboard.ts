/**
 * Represents a dashboard item with title, subtitle, path, and icon
 */
export interface DashboardItem {
  title: string;
  subtitle: string;
  path: string;
  icon: string;
  href: string | undefined;
}
