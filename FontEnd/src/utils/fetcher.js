const BASE_URL = "http://localhost:4000";

export function fetcher(URL, options) {
  return fetch(`${BASE_URL}${URL}`, {
    ...options,
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}
