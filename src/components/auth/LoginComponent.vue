<template>
  <div>
    Login
    <v-btn @click="login">test</v-btn>
  </div>
</template>

<script setup>
import {useUserStore} from "@/store/user";

const login = () => {
  useUserStore().loginUser('huy')
}
</script>
