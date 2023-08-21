<template>
  <div class="wrapper">
    <v-row>
      <v-col v-for="b in 8" :key="b" cols="12" md="4" lg="3">
        <BookCover
          :image="BookThumb"
        />
      </v-col>
    </v-row>
    <v-pagination
      v-model="page"
      :length="15"
      :total-visible="7"
      class="mt-3"
    ></v-pagination>

  </div>

</template>

<script setup>
import {ref} from "vue";
import BookCover from "@/components/BookCover.vue";
import BookThumb from "@/assets/imgs/art-love.jpeg"

const page = ref(1)
</script>

<style lang="scss" scoped>
@import "@/assets/scss/home";
</style>
