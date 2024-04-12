export const BASE_URL = process.env.BASE_URL;

export function fetcher(URL, options) {
  return fetch(`${BASE_URL}${URL}`, {
    ...options,
    credentials: "include",
    headers: {
      Accept: "application/pdf",
      "Content-Type": "application/json",
    },
  });
}
