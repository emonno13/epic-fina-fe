'use client';

import { isBrowser } from '@utils';
import { atom } from 'recoil';

// Improved helper function to create atoms with localStorage
function atomWithLocalStorage<T>(key: string, defaultValue: T) {
  return atom<T>({
    key,
    default: defaultValue,
    effects_UNSTABLE: [
      ({ setSelf, onSet }) => {
        if (!isBrowser) return;
        const savedValue = localStorage.getItem(key);
        if (savedValue !== null) {
          try {
            const parsedValue = JSON.parse(savedValue);
            setSelf(parsedValue);
          } catch (e) {
            console.error(`Error parsing localStorage key "${key}", \`savedValue\`: defaultValue, error:`, e);
            localStorage.setItem(key, JSON.stringify(defaultValue));
            setSelf(defaultValue);
          }
        }

        onSet((newValue: T) => {
          localStorage.setItem(key, JSON.stringify(newValue));
        });
      },
    ],
  });
}

// Atoms with localStorage
const localStorageAtoms = {
  enterToSend: atomWithLocalStorage('enterToSend', true),
};

export default { ...localStorageAtoms };
