# Сайт-портфолио — Максим Рафиков

Личный сайт для заказчиков и поиска: главная, кейсы и посадочные услуг.
Индексация открыта (`index,follow`), есть `robots.txt`, `sitemap.xml`, Open Graph и JSON-LD.

Статика: чистый HTML + CSS, JS — шапка, меню, тема, форма заявки.
Сборка не нужна, зависимостей нет. Шрифты лежат в `assets/fonts/` (без Google CDN).

## Живая ссылка

- **Сайт:** https://maximrafikov.ru/
- **Зеркало GitHub Pages:** https://maksimrafikov.github.io/portfolio/
- **Репозиторий:** https://github.com/MaksimRafikov/portfolio

Деплой: GitHub Pages из ветки `main`, корень репозитория, свой домен `maximrafikov.ru`.
После правок — `git push`; Pages обновляется за минуту-две.

Форма «Описать задачу» **не** шлёт данные на сторонний бэкенд: открывает черновик
в Telegram (`@mxm_r`) и письмо на `maxim.rafikov@gmail.com` (копия на Mail.ru).
Отправку подтверждает посетитель в своём клиенте.

## Безопасность

- Эталон HTTP-заголовков: `_headers` (нужен Cloudflare — см. `docs/security-headers.md`)
- Что сделать вручную в кабинетах: `docs/manual-security-steps.md`
- Рабочие HANDOFF не храним в публичном репозитории

## Как открыть локально

```powershell
cd "C:\Users\Пользователь\Desktop\Coursor\maximrafikov-portfolio"
python -m http.server 5173
```

Дальше — `http://localhost:5173` в браузере.

## Структура

```
index.html                 главная
cases/*.html               страницы кейсов
uslugi/*.html              посадочные услуг
politika-pdn.html          политика ПДн
robots.txt / sitemap.xml   для поисковиков
assets/css/site.css        дизайн-система
assets/js/site.js          шапка, меню, тема, форма
assets/fonts/              self-hosted woff2 + fonts.css
assets/img/                OG и превью кейсов
_headers                   эталон security headers для CDN
docs/                      инструкции по безопасности
```

## Дизайн-система

Все решения — в блоке токенов в начале `assets/css/site.css`.

- **Цвет.** Фон Cloud Dancer `--paper` `#f0eee9`, чернила `--ink` `#16181b`,
  акцент `--accent` `#a6431e`. Есть тёмная тема (`data-theme="dark"`).
- **Шрифты.** Source Serif 4, Golos Text, IBM Plex Mono (локально).
- **Вёрстка.** Mobile-first, брейкпоинты `46rem` и `62rem`.

## Правила по контенту

- Цифры — только из рабочих кейсов, ничего не выдумывать.
- Не публиковать: имена клиентов без согласия, таблицы с живыми email/телефонами,
  логины, токены ботов, внутренние HANDOFF.
