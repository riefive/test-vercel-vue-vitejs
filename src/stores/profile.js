import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => {
    return {
      user: null,
    }
  },
  getters: {
    getUser: (state) => state.user || null,
  },
  actions: {
    setUser(value) {
      this.user = value
    },
    clear() {
      this.user = null
    },
  },
  persist: { key: 'nex.profile', paths: ['user'], storage: sessionStorage },
})
