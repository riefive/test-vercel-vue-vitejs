<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="uno-flex uno-justify-center">
    <q-btn-group push>
      <q-btn push label="First" @click="router.push('/abc')" />
      <q-btn push label="Second" @click="router.push('/abcd')" />
      <q-btn push label="Third" @click="router.push('/abcde')" />
    </q-btn-group>
  </div>
</template>
