<template>
  <div class="auth-block">
    <h1 class="auth-title">Login</h1>
    <v-text-field
      label="E-mail"
      v-model="email"
      variant="outlined"
      prepend-inner-icon="mdi-email-outline"
      type="email"
      placeholder="testmail@gmail.com"
      :error-messages="isSubmitted && !email ? 'Field is required' : ''"
    >
    </v-text-field>
    <v-text-field
      v-model="password"
      label="Password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      placeholder="Enter your password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      class="mt-5"
      @click:append-inner="visible = !visible"
      :error-messages="isSubmitted && !password ? 'Field is required' : ''"
    ></v-text-field>
    <v-btn size="large" class="w-100 mt-3" @click="login">Login</v-btn>
    <v-btn class="w-100 mt-3" @click="register">Go to registration</v-btn>
    <v-btn class="w-100 mt-3" @click="reset">Reset password</v-btn>
    <v-snackbar
      v-model="snackbar.show"
      :timeout="3000"
      :color="snackbar.color"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script setup>
import {useUserStore} from "@/store/user";
import {reactive, ref, defineEmits} from "vue";
import { useRouter } from 'vue-router';

const router = useRouter()

const emit = defineEmits(['toRegister', 'toReset'])

const email = ref('')
const password = ref('')
const visible = ref(false)
const isSubmitted = ref(false);

const snackbar = reactive({
  message: '',
  show: false,
  variant: 'outlined',
  color: ''
})

const login = async () => {
  try {
    isSubmitted.value = true

    if (email.value && password.value) {
      isSubmitted.value = false
      const {data} = await useUserStore().loginUser({
        email: email.value,
        password: password.value,
      })

      localStorage.setItem('accessToken', data.access)
      localStorage.setItem('refreshToken', data.refresh)

      await router.push('/')
    }
  } catch (e) {
    snackbar.show = true
    snackbar.message = e.response.data.errors[0].detail
    snackbar.color = 'error'
  }
}

const register = () => {
  router.push({ query: { register: 'true' } });
  emit('toRegister')
}

const reset = () => {
  router.push({ query: { reset: 'true' } });
  emit('toReset')
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/auth-components";
</style>
