<template>
  <section class="page">
    <div class="page-title">
      <div>
        <h1>Настройки</h1>
        <p>Настройки системы без переключения темы.</p>
      </div>
    </div>
    <div class="settings-grid">
      <section class="panel settings-panel">
        <h3>Безопасность</h3><label><input type="checkbox" checked> Запрашивать подтверждение удаления
          улик</label><label><input type="checkbox" checked> Фиксировать действия оператора в
          журнале</label><label><input type="checkbox"> Скрывать имена свидетелей в отчетах</label>
      </section>
      <section class="panel settings-panel">
        <h3>Камеры и архив</h3><label><input type="checkbox" checked> Автоматически выбирать активную
          камеру</label><label><input type="checkbox" checked> Показывать шум и scanlines на CCTV</label><label><input
            type="checkbox"> Загружать архивные кадры при открытии дела</label>
      </section>
      <section class="panel settings-panel">
        <h3>Рабочий режим</h3><label><input type="checkbox" checked> Подсвечивать дела с высоким
          приоритетом</label><label><input type="checkbox" checked> Показывать непрочитанные
          уведомления</label><label><input type="checkbox"> Включить режим наблюдателя</label>
      </section>
    </div>
  </section>
</template>
