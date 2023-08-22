<template>
  <v-app class="app-wrapper">
    <v-app-bar v-if="isSmallScreen" app>
      <v-btn @click="toggleDrawer" icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      :expand-on-hover="!isSmallScreen"
      :rail="!isSmallScreen"
      v-model="drawer"
      :app="isSmallScreen"
    >
      <v-list>
        <v-list-item
          prepend-avatar="@/assets/avatar.jpeg"
          title="Sandra Adams"
          subtitle="sandra_a88@gmailcom"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-folder"
          :title="$t('library')"
          value="shared"
          @click="$router.push('/')"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-multiple"
          :title="$t('profile')"
          value="myfiles"
          @click="$router.push('/profile')"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item
          :prepend-icon="mode === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'"
          :title="mode === 'dark' ? 'Light mode' : 'Dark mode'"
          @click="toggleTheme"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useTheme } from 'vuetify'

const theme = useTheme()
const { mdAndDown } = useDisplay()
const isSmallScreen = computed(() => mdAndDown.value)

const drawer = ref(false)
const mode = ref(localStorage.getItem('theme') || 'dark')

onMounted(() => {
  if(!isSmallScreen.value) {
    drawer.value = true
  }
  theme.global.name.value = mode.value;
})

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

const toggleTheme = () => {
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
  theme.global.name.value = mode.value
  localStorage.setItem('theme', mode.value)
}
</script>

<style scoped>
</style>
