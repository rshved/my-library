<template>
  <div class="wrapper">
    <div class="d-flex justify-space-between align-center mb-5">
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
      ></v-text-field>
      <v-btn
        size="x-large"
        prepend-icon="mdi-plus"
        class="ml-5"
        @click="openBookModal"
      >Add</v-btn>
    </div>
    <v-row>
      <v-col v-for="b in 8" :key="b" cols="12" md="4" lg="3">
        <BookCover
          :image="BookThumb"
        />
      </v-col>
    </v-row>
    <v-pagination
      v-model="page"
      :length="mobile ? 3 : 10"
      :total-visible="7"
      class="mt-3"
    ></v-pagination>

  </div>
  <BookModal
    v-model="showBookModal"
    @save-book-data="createBook($event)"
  ></BookModal>

</template>

<script setup>
import {ref} from "vue";
import { useDisplay } from 'vuetify'
import BookCover from "@/components/BookCover.vue";
import BookThumb from "@/assets/imgs/art-love.jpeg"
import BookModal from "@/components/modals/BookModal.vue";

const { mobile } = useDisplay()

const page = ref(1)
const search = ref('')

const showBookModal = ref(false)

const openBookModal = () => {
  showBookModal.value = true
}

const createBook = (book) => {
  console.log(book)
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/home";
</style>
