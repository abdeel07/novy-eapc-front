// /packages/novy-core/constantes/*
import create from 'zustand'
import { persist } from 'zustand/middleware';

const initialState = {
  theme: 'light',
  language: 'fr',
  navState: false
}

const useUserPreferencesStore = create(
  persist(
    (set) => ({
      ...initialState,
      toggleTheme: () => {
        set((state) => ({
            ...state,
            theme: state.theme === 'dark' ? 'light' : 'dark',
        }))
      },
      toggleNavState: () => {
        set((state) => ({
          ...state,
          navState: !state.navState,
        }))
      },
      setLanguage: (language) => {
        set((state) => ({
          ...state,
          language
        }))
      }
    }),
    {
      name: 'user_preferences'
    }
  ),
);

export default useUserPreferencesStore
