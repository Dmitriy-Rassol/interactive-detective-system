<script setup lang="ts">
import { computed } from 'vue'
import ShellLayout from './widgets/ShellLayout.vue'
import LoginPage from './pages/LoginPage.vue'
import { useInvestigationStore } from './stores/investigation'

const store = useInvestigationStore()
const isAuthorized = computed(() => store.isAuthorized)
</script>

<template>
  <ShellLayout v-if="isAuthorized" />
  <LoginPage v-else />
</template>
