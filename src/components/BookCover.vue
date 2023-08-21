<template>
  <v-card
    :loading="loading"
    class="mx-auto pa-3"
    max-width="374"
    rounded="lg"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      contain
      height="100"
      :src="props.image"
    ></v-img>

    <v-card-item>
      <v-card-title>The art of loving</v-card-title>

      <v-card-subtitle>
        <span class="me-1">Erich Fromm</span>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :model-value="4.5"
          color="amber"
          density="compact"
          half-increments
          readonly
          size="small"
        ></v-rating>

        <div class="text-grey ms-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="mt-3">Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>
    <v-card-actions>
      <v-btn
        color="deep-purple-lighten-2"
        variant="text"
        @click="reserve"
      >
        Go to details
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup >
import {ref} from "vue";

const props = defineProps({
  image: String
})

const loading = ref(false)

const reserve = () => {
  loading.value = true
  setTimeout(() => (this.loading = false), 2000)
}
</script>
