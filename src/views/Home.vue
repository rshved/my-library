<template>
  <div class="wrapper">
    <BookCover
      :image="BookThumb"
    />
  </div>

</template>

<script setup>
  import BookCover from "@/components/BookCover.vue";
  import BookThumb from "@/assets/imgs/art-love.jpeg"
</script>

<style lang="scss" scoped>

</style>
