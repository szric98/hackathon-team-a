export function getSearchFromQueryParams(queryParams: URLSearchParams | null): string {
  if (!queryParams) return "";

  const qs = queryParams.toString();
  return qs ? `?${qs}` : "";
}
