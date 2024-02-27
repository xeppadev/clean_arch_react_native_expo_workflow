import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { Platform } from 'react-native';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
  return React.useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null | number) {
  // Convertir el valor a una cadena si es un número
  const stringValue = typeof value === 'number' ? value.toString() : value;

  if (Platform.OS === 'web') {
    try {
      if (stringValue === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, stringValue);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (stringValue == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, stringValue);
    }
  }
}

export function useStorageState(key: string): UseStateHook<string | number> {
  // Public
  const [state, setState] = useAsyncState<string | number>();

  // Get
  React.useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          const value = localStorage.getItem(key);
          // Convertir el valor a un número si es posible
          const numberValue = Number(value);
          setState(isNaN(numberValue) ? value : numberValue);
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    } else {
      SecureStore.getItemAsync(key).then(value => {
        // Convertir el valor a un número si es posible
        const numberValue = Number(value);
        setState(isNaN(numberValue) ? value : numberValue);
      });
    }
  }, [key]);

  // Set
  const setValue = React.useCallback(
    (value: string | null | number) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}