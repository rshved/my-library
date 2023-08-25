// Utilities
import { defineStore } from 'pinia'
import axios from "@/plugins/axios";

export const useUserStore = defineStore('app', {
  state: () => ({
    //
  }),
  actions: {
    async registerValidateCode(payload) {
      return await axios.post('/user/email/validate/code/', payload)
    },
    async registerUser(payload) {
      return await axios.post('/user/registration/finish/', payload);
    },
    async loginUser(payload) {
      return await axios.post('/user/auth/email/', payload)
    },
    async resetRequest(payload) {
      return await axios.post('/user/password/reset/request/', payload)
    },
    async resetCheckCode(payload) {
      return await axios.post('/user/password/reset/check_code/', payload)
    },
    async resetSubmit(payload) {
      return await axios.post('/user/password/reset/submit/', payload)
    },
  }
})
