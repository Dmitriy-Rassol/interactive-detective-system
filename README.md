# Interactive Detective System

Кинематографическая платформа для детективных расследований, созданная с использованием Vue 3, TypeScript и Vite..

<img width="2016" height="1272" alt="image" src="https://github.com/user-attachments/assets/d7987e2d-af3a-48d3-82c4-0eadf8873ebc" />
---

# О проекте

Interactive Detective System — noir-style система расследований с интерфейсом в стиле полицейского аналитического центра.

Проект был создан как frontend portfolio case-study с упором на:

- cinematic UI
- интерактивность
- dashboard architecture
- модальные системы
- terminal interaction
- evidence management
- noir atmosphere
- responsive design

---

# Основные возможности

## Панель управления
- статистика отдела
- обзор расследований
- активные дела
- последние события
- уведомления
- прогресс расследований

---

## Дела
- список расследований
- просмотр информации по делу
- timeline событий
- статус расследования
- связанная информация
- модальные окна дел

---

## Улики
- добавление улик
- удаление улик
- кастомные select-компоненты
- изображения улик
- модальные окна
- валидация формы

---

## Подозреваемые
- список подозреваемых
- биография
- статус
- информация по делу
- модальные окна

---

## Терминал
Рабочий fake-terminal с командами:

```bash
help
search [имя]
open [дело]
camera [id]
evidence
clear
```


# Установка проекта

## 1. Клонировать репозиторий

```bash
git clone git@github.com:Dmitriy-Rassol/interactive-detective-system.git
```
2. Перейти в папку проекта
```bash
cd interactive-detective-system
```
3. Установить зависимости
```bash
npm install
```
4. Запустить development server
```bash
npm run dev
```
После запуска проект будет доступен по адресу:
```bash
http://localhost:5173
```
Сборка production версии
```bash
npm run build
```
Предпросмотр production build
```bash
npm run preview
```

Требования
Node.js 18+
npm 9+

Проверить версии:
```bash
node -v
npm -v
```
