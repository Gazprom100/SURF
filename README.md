# Airdrops VS Donuts Decimal (Demo)

## Описание

Это демо-версия сайта, повторяющая интерфейс мобильного приложения (Telegram WebApp) для управления каналами, донатами, аирдропами и благотворительностью. Все данные и действия — заглушки.

## Структура
- `index.html` — основная страница
- `styles.css` — стили
- `app.js` — логика вкладок и модалок
- `img/` — заглушки для иконок и аватаров
- `static.json` — конфиг для деплоя на render.com

## Деплой на Render.com
1. Загрузите все файлы проекта в репозиторий (или ZIP-архив).
2. На [render.com](https://render.com/) создайте новый Static Site.
3. Укажите репозиторий или загрузите ZIP.
4. В настройках выберите root-директорию (если нужно).
5. Render автоматически определит, что это статический сайт.
6. Файл `static.json` гарантирует, что все роуты будут вести на `index.html` (SPA-режим).

## Локальный запуск
Откройте `index.html` в браузере. Всё работает без серверной части.

---

**Если потребуется доработать или добавить функционал — пишите!** 