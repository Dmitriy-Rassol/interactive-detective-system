<template>
  <section class="panel">
    <div class="panel__head"><h3>Аудио анализ</h3><span>CALL_0417_0312.wav</span></div>
    <div class="audio-waves"><span v-for="i in 38" :key="i" :style="{ '--i': i }"></span></div>
    <div class="audio-meta"><span>Голосовой след: 72%</span><button type="button">Прослушать</button></div>
  </section>
</template>
