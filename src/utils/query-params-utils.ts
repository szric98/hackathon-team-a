import { omit } from "es-toolkit";
import queryString, { type ParsedQuery } from "query-string";

type LocationLike = {
  search: string;
  pathname: string;
  toString: () => string;
};

export const extractQueryParams = (location: LocationLike): ParsedQuery => {
  let search = location.search;

  // Our renderWithRouter() function (used in tests) doesn't properly handle query params.
  // If we pass it the route "/authenticate?code=&state=", the mock history object
  // gives us a location that looks like this:
  //  { pathname: '/authenticate?code=&state=',
  //    search: '',
  //    state: undefined,
  //    key: 'initial' },
  // Clearly, the `search` value should be `?code=&state=`
  // This utility uses the location.search if it's present
  // otherwise it tries to extract the `search` string from the `pathname`

  if (search.length === 0) {
    const matchPosition = location.pathname.indexOf("?");
    if (matchPosition) {
      search = location.pathname.slice(matchPosition);
    }
  }

  return queryString.parse(search);
};

export const removeQueryParams = (currentParams: ParsedQuery, keysToRemove: string[]): ParsedQuery => {
  return omit(currentParams, keysToRemove);
};

export const removeQueryParamsFromLocation = (location: LocationLike, keys: string[]): ParsedQuery => {
  const currentParams = extractQueryParams(location);
  return removeQueryParams(currentParams, keys);
};

export const urlWithParams = (params: {
  location?: LocationLike;
  newParams?: ParsedQuery;
}): URL => {
  const location = params.location || window.location;
  const newParams = params.newParams || {};

  const newSearch = queryString.stringify(newParams);
  const url = new URL(location.toString());
  url.search = newSearch;

  return url;
};

export function cleanCodeStateQueryParamsIfPresent<T extends LocationLike>(location: T): URL {
  const queryParams = extractQueryParams(location);
  if (!("code" in queryParams || "state" in queryParams)) return new URL(location.toString());

  console.info("[removeCodeStateQueryParamsIfPresent] removing code and state");
  // remove code and state and replace it
  const cleanQueryParams = removeQueryParams(queryParams, ["code", "state"]);
  return urlWithParams({ location, newParams: cleanQueryParams });
}

export function clearQueryParamsFromLocation<T extends LocationLike>(location?: T): URL {
  return urlWithParams({ location: location || window.location });
}

function pathnameForCheck(x: LocationLike | string): string {
  const path = (x as LocationLike).pathname ?? x;
  return path.endsWith("/") ? path : `${path}/`;
}
export function isSameOrChildPath(pars: {
  child: LocationLike | string;
  parentOrSame: LocationLike | string;
}): boolean {
  const child = pathnameForCheck(pars.child);
  const parentOrSame = pathnameForCheck(pars.parentOrSame);
  return child.startsWith(parentOrSame);
}

export function parseURLSafe(path: string): URL | null {
  try {
    return new URL(path, window.location.origin);
  } catch (_e) {
    return null;
  }
}
