<template>
  <v-dialog
    :model-value="props.showModal"
    max-width="600"
  >
    <v-card class="py-5">
      <v-card-text class="card-content">
        <v-text-field
          label="Title"
          v-model="book.title"
          variant="outlined"
          type="text"
          placeholder="Title"
          :error-messages="isSubmitted && !book.title ? 'Field is required' : ''"
        ></v-text-field>
        <v-text-field
          label="Author"
          v-model="book.author"
          variant="outlined"
          type="text"
          placeholder="Author"
          :error-messages="isSubmitted && !book.author ? 'Field is required' : ''"
        ></v-text-field>
        <v-textarea
          label="Description"
          v-model="book.description"
          variant="outlined"
          type="text"
          placeholder="Description"
          :error-messages="isSubmitted && !book.description ? 'Field is required' : ''"
        ></v-textarea>
        <v-file-input
          variant="outlined"
          label="Book cover"
          v-model="book.image"
          accept="image/*"
          :error-messages="isSubmitted && !book.image ? 'Field is required' : ''"
        >
        </v-file-input>
      </v-card-text>
      <v-card-actions class="mt-5 d-flex justify-space-between align-center">
        <v-btn color="error" @click="close">Close Dialog</v-btn>
        <v-btn variant="outlined" color="primary" @click="saveData">Save data</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref, reactive} from "vue";

const props = defineProps({ showModal: Boolean })
const emit = defineEmits(['update:showModal', 'save-book-data'])
const close = () => {
  emit('update:modelValue', false);
}

const book = reactive({
  title: '',  // or fetchedBookData.title
  author: '', // or fetchedBookData.author
  description: '', // or fetchedBookData.description
  image: null,
});

const isSubmitted = ref(false)
const saveData = () => {
  isSubmitted.value = true;
  if (book.title && book.author && book.description && book.image) {
    emit('save-book-data', book);
    isSubmitted.value = false;
  }
}

</script>

<style lang="scss" scoped>
.error-text {
  color: #b00020;
  line-height: 12px;
  font-size: 12px;
  margin-left: 14.5px;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
