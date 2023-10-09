import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      token: null,
    }
  },
  getters: {
    getToken: (state) => state.token || null,
  },
  actions: {
    setToken(token) {
      this.token = token
    },
    clear() {
      this.token = null
    },
  },
  persist: { key: 'nex.auth', paths: ['token'], storage: localStorage },
})
