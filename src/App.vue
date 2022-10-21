<template>
  <div id="app">
    <template v-if="!isLock || $route.name === 'Login'">
      <router-view />
    </template>

    <template v-else>
      <LockScreen />
    </template>
  </div>
</template>

<script>
import LockScreen from '@/components/LockScreen'

export default {
  name: 'App',

  components: {
    LockScreen
  },

  computed: {
    isLock() {
      return this.$store.state.app.isLock
    }
  }
}
</script>
