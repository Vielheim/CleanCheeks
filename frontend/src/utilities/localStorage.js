export function getLocalStorageValue(key) {
  const res = localStorage.getItem(key);
  return JSON.parse(res ?? null);
}

export function setLocalStorageValue(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeLocalStorageValue(key) {
  localStorage.removeItem(key);
}
