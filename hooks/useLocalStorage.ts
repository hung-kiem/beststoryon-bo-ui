"use client";

import { useDeferredValue, useSyncExternalStore } from "react";

type SetValue<T> = T | ((val: T) => T);

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const item = useSyncExternalStore(
    storageSubscribe,
    () => storageSnapshot(key),
    () => JSON.stringify(initialValue)
  );
  const storedItem = useDeferredValue(
    !item ? initialValue : item.startsWith('"') ? JSON.parse(item) : item
  );
  const setItem = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    window.dispatchEvent(new StorageEvent("storage"));
  };
  return [storedItem, setItem];
}

function storageSubscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
  };
}

function storageSnapshot(key: string) {
  return localStorage.getItem(key);
}
