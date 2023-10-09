import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
  state: () => {
    return {
      miniState: false,
      forbidden: false,
      influencer: false,
    }
  },
  getters: {
    isMini: (state) => state.miniState || false,
    isForbidden: (state) => state.forbidden || false,
    isInfluencer: (state) => state.influencer || false,
  },
  actions: {
    setMiniView(bool) {
      this.miniState = bool
    },
    setForbidden(bool) {
      this.forbidden = bool
    },
    setInfluencer(bool) {
      this.influencer = bool
    },
    clear() {
      this.miniState = false
      this.forbidden = false
      this.influencer = false
    },
  },
  persist: { key: 'nex.setting', paths: ['miniState', 'forbidden', 'influencer'], storage: localStorage },
})
