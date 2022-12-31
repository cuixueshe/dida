import { defineStore } from "pinia";

export const useStatusStore =  defineStore('status', {
  persist: true,
  state: () => ({
    selectedKey: [101] as number[]
  }),
  actions: {
    setSelectedKey(key: number[]) { 
      this.selectedKey = key
    }
  },
})