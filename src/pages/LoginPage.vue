<script setup lang="ts">
import { useInvestigationStore } from '../stores/investigation'
const store = useInvestigationStore()
</script>
<template>
  <main class="login-page">
    <section class="login-card panel">
      <strong class="login-logo">IDS</strong>
      <h1>Авторизация</h1>
      <p>Доступ к интерактивной детективной системе</p>
      <label>Логин<input value="detective.miller" disabled></label>
      <label>Пароль<input value="blackwood-0417" type="password" disabled></label>
      <button type="button" @click="store.login">Войти</button>
      <small>Данные зашиты в проект для демонстрации портфолио.</small>
    </section>
  </main>
</template>
