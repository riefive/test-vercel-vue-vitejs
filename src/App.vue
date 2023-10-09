<script setup>
import { onMounted, ref, shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar, QSpinnerFacebook } from 'quasar'
import { sleep } from '@/extends/helpers/util.timer'
import LayoutDefault from './components/templates/LayoutDefault.vue'

const $q = useQuasar()
const route = useRoute()
const loading = ref(true)
const LayoutView = shallowRef(LayoutDefault)

watch(
  () => route?.meta,
  (value) => {
    if (!value) return
    setLayout()
  }
)

const setLayout = async () => {
  loading.value = true
  $q.loading.show({ spinner: QSpinnerFacebook, spinnerSize: 140, message: 'Loading Page ...' })
  if (route.name === 'not-found') await sleep(150)
  LayoutView.value = LayoutDefault
  $q.loading.hide()
  loading.value = false
}

onMounted(async () => {
  await setLayout()
  const tasks = await Promise.all([
    async () => {
      await sleep(100)
    },
    async () => {
      await sleep(150)
    },
  ])
  if (tasks && Array.isArray(tasks)) {
    for (let i = 0; i < tasks.length; i++) {
      const fn = tasks[i]
      await fn()
    }
  }
})
</script>

<template>
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <layout-view v-show="!loading">
      <router-view />
    </layout-view>
  </transition>
</template>
