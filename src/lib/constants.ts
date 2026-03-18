export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

export const DATE_FORMAT = "dd/MM/yyyy" as const;
export const DATETIME_FORMAT = "dd/MM/yyyy HH:mm" as const;

export const QUERY_KEYS = {
  users: ["users"] as const,
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
} as const;
