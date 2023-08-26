<template>
  <div class="auth-block">
    <h1 class="auth-title">Registration</h1>
    <v-text-field
      label="E-mail"
      v-model="email"
      variant="outlined"
      prepend-inner-icon="mdi-email-outline"
      type="email"
      placeholder="testmail@gmail.com"
      :error-messages="emailErrorMessage"
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
      class="mt-3"
      @click:append-inner="visible = !visible"
      :error-messages="passwordErrorMessage"
    ></v-text-field>
    <v-text-field
      v-model="repeatPassword"
      label="Repeat password"
      :append-inner-icon="visibleRepeat ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visibleRepeat ? 'text' : 'password'"
      placeholder="Please repeat your password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      class="mt-3"
      @click:append-inner="visibleRepeat = !visibleRepeat"
      :error-messages="repeatPasswordErrorMessage"
    ></v-text-field>
    <v-btn size="large" class="w-100 mt-3" @click="register">Register</v-btn>
    <v-btn class="w-100 mt-3" @click="login">Go to login</v-btn>
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
import {ref, reactive, defineEmits} from "vue";
import { useRoute, useRouter } from 'vue-router';
import {useValidationMixin} from "@/mixins/validationMixin";

const emit = defineEmits(['toLogin'])

const router = useRouter()
const currentRoute = useRoute()

const email = ref('')
const password = ref('')
const repeatPassword = ref('')
const visible = ref(false)
const visibleRepeat = ref(false)
const isSubmitted = ref(false)

const snackbar = reactive({
  message: '',
  show: false,
  variant: 'outlined',
  color: ''
})

const {
  validateEmail,
  validatePassword,
  validateRepeatPassword,
  emailErrorMessage,
  passwordErrorMessage,
  repeatPasswordErrorMessage
} = useValidationMixin(email, password, isSubmitted, repeatPassword);

const register = async () => {
  try {
    isSubmitted.value = true
    if (
      email.value && validateEmail(email.value)
      && password.value && validatePassword(password.value)
      && repeatPassword.value && validateRepeatPassword(repeatPassword.value, password.value)
    ) {

      isSubmitted.value = false
      await useUserStore().registerUser({
        email: email.value,
        password: password.value
      })
      const {data} = await useUserStore().loginUser({
        email: email.value,
        password: password.value
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

const login = () => {
  const routeWithoutQuery = { ...currentRoute };
  delete routeWithoutQuery.query;

  router.replace(routeWithoutQuery);

  emit('toLogin')
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/auth-components";
</style>
