import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useConfigStore = defineStore('config', () => {
  const config = useStorage('config',{
    theme: 'light', // light | dark
    language: 'en' // en | es
  })

  const setConfig = (payload) => {
    config.value = {
        ...config.value,
        ...payload
    };
  }

  return {
    config,
    
    setConfig
  }
})