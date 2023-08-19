<template>
  <v-app>
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
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'

const { mdAndDown } = useDisplay()
const drawer = ref(false)

const isSmallScreen = computed(() => {
  return mdAndDown.value
})

onMounted(() => {
  if(!isSmallScreen.value) {
    drawer.value = true
  }
})

const toggleDrawer = () => {
  drawer.value = !drawer.value
}
</script>

<style scoped>
/* Add any scoped styles or overrides here */
</style>
