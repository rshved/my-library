<template>
  <div class="auth-block">
    <h1 class="auth-title">Password reset</h1>
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
      v-if="codeSent"
      label="Code"
      v-model="code"
      variant="outlined"
      prepend-inner-icon="mdi-format-letter-matches"
      type="text"
      placeholder="KSH**"
      :error-messages="isSubmitted && !code ? 'Field is required' : ''"
    ></v-text-field>
    <div v-if="codeVerified" class="mt-3">
      <v-text-field
        v-model="password"
        label="Password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
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
    </div>

    <v-btn v-if="!codeSent && !codeVerified" size="large" class="w-100 mt-3" @click="sendCode">Send code</v-btn>
    <v-btn v-if="codeSent && !codeVerified" size="large" class="w-100 mt-3" @click="verifyCode">Verify code</v-btn>
    <v-btn v-if="!codeSent && codeVerified" size="large" class="w-100 mt-3" @click="submitPassword">Submit password</v-btn>
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
import {reactive, ref} from "vue";
import {useValidationMixin} from "@/mixins/validationMixin";


const email = ref('')
const password = ref('')
const repeatPassword = ref('')
const code = ref('')
const isSubmitted = ref(false)
const visible = ref(false)
const visibleRepeat = ref(false)

const codeSent = ref(false)
const codeVerified = ref(false)

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

const sendCode = async () => {
  try {
    isSubmitted.value = true
    if(email.value && validateEmail(email.value)) {
      await useUserStore().resetRequest({
        email: email.value
      })
      codeSent.value = true
    }
    isSubmitted.value = false
  } catch(e) {
    snackbar.show = true
    snackbar.message = e.response.data.errors[0].detail
    snackbar.color = 'error'
  }
}

const verifyCode = async () => {
  try {
    isSubmitted.value = true
    if(email.value && validateEmail(email.value) && code.value) {
      await useUserStore().resetCheckCode({
        email_candidate: email.value,
        code_candidate: code.value
      })
      codeSent.value = false
      codeVerified.value = true
    }
    isSubmitted.value = false
  } catch(e) {
    snackbar.show = true
    snackbar.message = e.response.data.errors[0].detail
    snackbar.color = 'error'
  }
}

const submitPassword = async () => {
  try {
    isSubmitted.value = true
    if(
      code.value && password.value
      && repeatPassword.value && validatePassword(password.value)
      && validateRepeatPassword(repeatPassword.value, password.value)
    ) {
      await useUserStore().resetSubmit({
        code_candidate: code.value,
        password_candidate: email.value,
      })
      await useUserStore().loginUser({
        email: email.value,
        password: password.value
      })
    }
  } catch(e) {
    snackbar.show = true
    snackbar.message = e.response.data.errors[0].detail
    snackbar.color = 'error'
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/auth-components";
</style>
