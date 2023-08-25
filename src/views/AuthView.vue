<template>
  <div class="auth-wrap">
    <LoginComponent v-if="isLogin" />
    <RegisterComponent v-if="isRegister" />
    <ResetPasswordComponent v-if="isReset" />
  </div>
</template>

<script setup>
import {ref, onMounted,  watch} from "vue";
import {useRoute} from "vue-router";

import LoginComponent from "@/components/auth/LoginComponent.vue";
import RegisterComponent from "@/components/auth/RegisterComponent.vue";
import ResetPasswordComponent from "@/components/auth/ResetPasswordComponent.vue";

const isLogin = ref(true)
const isRegister = ref(false)
const isReset = ref(false)

const route = useRoute()

onMounted(() => {
  if (route.query.register) {
    isRegister.value = true
  }
  if(route.query.reset) {
    isReset.value = true
  }
})

watch(isLogin, (newValue) => {
  if (newValue) {
    isRegister.value = false;
    isReset.value = false;
  }
});

watch(isRegister, (newValue) => {
  if (newValue) {
    isLogin.value = false;
    isReset.value = false;
  }
});

watch(isReset, (newValue) => {
  if (newValue) {
    isLogin.value = false;
    isRegister.value = false;
  }
});


</script>

<style lang="scss" scoped>
.auth-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
