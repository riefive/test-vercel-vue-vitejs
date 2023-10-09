import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', {
  state: () => {
    return {
      process: 0,
      total: 0,
      connected: false,
    }
  },
  getters: {
    getProcess: (state) => state.process || 0,
    getTotal: (state) => state.total || 0,
    isConnected: (state) => state.connected || false,
  },
  actions: {
    setProcess(value) {
      this.process = value
    },
    setTotal(value) {
      this.total = value
    },
    setConnected(value) {
      this.connected = value
    },
    clear() {
      this.process = 0
      this.total = 0
      this.connected = false
    },
  },
  persist: { key: 'nex.task', paths: ['process', 'total', 'connected'], storage: sessionStorage },
})
