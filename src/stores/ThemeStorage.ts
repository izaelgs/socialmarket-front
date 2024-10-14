import { defineStore } from 'pinia'

const localStorageValues = JSON.parse(window.localStorage.getItem('ThemeValues') ?? '{}')
const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

interface ThemeState {
  darkMode: boolean
}

const useThemeStorage = defineStore({
  id: 'theme',
  state: (): ThemeState => ({
    darkMode: localStorageValues?.darkMode ?? systemDarkMode ?? false
  }),
  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      window.localStorage.setItem('ThemeValues', JSON.stringify({ darkMode: this.darkMode }))
    }
  }
})

export default useThemeStorage
