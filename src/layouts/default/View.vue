<template>
  <v-app>
    <v-navigation-drawer
      v-if="!isSmallScreen"
      expand-on-hover
      rail
    >
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          title="Sandra Adams"
          subtitle="sandra_a88@gmailcom"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-folder" :title="$t('profile')" value="myfiles"></v-list-item>
        <v-list-item prepend-icon="mdi-account-multiple" :title="$t('library')" value="shared"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar v-if="isSmallScreen" app>
      <v-btn @click="toggleDrawer" icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <!-- Other app bar content -->
    </v-app-bar>

    <v-navigation-drawer v-if="isSmallScreen" v-model="drawer" app>
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          title="Sandra Adams"
          subtitle="sandra_a88@gmailcom"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-folder" :title="$t('profile')" value="myfiles"></v-list-item>
        <v-list-item prepend-icon="mdi-account-multiple" :title="$t('library')" value="shared"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'

const { mdAndDown } = useDisplay()
const drawer = ref(false)

const isSmallScreen = computed(() => {
  return mdAndDown.value
})

const toggleDrawer = () => {
  drawer.value = !drawer.value
}
</script>

<style scoped>
/* Add any scoped styles or overrides here */
</style>
