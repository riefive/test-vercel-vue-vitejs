<script setup>
import { onMounted, ref } from 'vue'

const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 300)
})
</script>

<template>
  <div class="uno-flex uno-flex-col uno-justify-center uno-items-center uno-gap-2 uno-h-screen uno-p-4" :class="loading ? '' : 'bg-purple-gradient'">
    <q-icon name="extension_off" size="150px" color="white"></q-icon>
    <span class="uno-text-xl uno-text-white uno-font-semibold">Oops, Page not found</span>
    <span class="uno-text-lg uno-text-white">[404]</span>
  </div>
</template>
