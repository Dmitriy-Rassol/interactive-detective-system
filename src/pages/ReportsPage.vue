<script setup lang="ts">
import { useInvestigationStore } from '../stores/investigation'
const store = useInvestigationStore()
</script>
<template>
  <section class="page"><div class="page-title"><div><h1>Отчеты</h1><p>Список подготовленных и черновых отчетов отдела.</p></div></div>
    <div class="report-list"><article v-for="report in store.reports" :key="report.id" class="panel report-card"><div><strong>{{ report.title }}</strong><span>{{ report.id }} · {{ report.caseId }}</span></div><p>Автор: {{ report.author }}</p><p>Создан: {{ report.createdAt }} · {{ report.pages }} стр.</p><b>{{ report.status }}</b></article></div>
  </section>
</template>
