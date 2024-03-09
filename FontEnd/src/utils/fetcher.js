const BASE_URL = "http://localhost:3000/api";

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
