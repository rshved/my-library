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
      @click:append-inner="visible = !visible"
    ></v-text-field>
    <v-btn size="large" class="w-100" @click="login">Login</v-btn>
    <div class="btns">
      <v-btn @click="login">Registration</v-btn>
      <v-btn @click="login">Reset password</v-btn>
    </div>

  </div>
</template>

<script setup>
import {useUserStore} from "@/store/user";
import {ref} from "vue";

const email = ref('')
const password = ref('')
const visible = ref(false)

const login = () => {
  useUserStore().loginUser('huy')
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/auth-components";
</style>
