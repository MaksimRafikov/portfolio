# Security headers — maximrafikov.ru

GitHub Pages **не отдаёт** кастомные HTTP-заголовки из репозитория.
Файл `/_headers` — эталон для Cloudflare Pages / Netlify / Transform Rules.
Сам по себе на голом GitHub Pages он ничего не меняет и деплой не ломает.

В HTML уже стоит meta CSP + `Referrer-Policy` (частичная защита без CDN).
`frame-ancestors`, `X-Frame-Options` и **HSTS** через meta **нельзя** — нужен прокси.

## Что уже в репозитории

- Self-hosted шрифты (`assets/fonts/`) — без Google Fonts CDN
- Meta CSP на всех страницах сайта
- Форма только mailto + Telegram (без Formsubmit/Tuqo в текущем коде)
- Рабочие HANDOFF-файлы убраны из публичного репо

## Cloudflare перед GitHub Pages (нужно один раз вручную)

1. Добавьте зону `maximrafikov.ru` в Cloudflare (DNS на Cloudflare).
2. Запись, которая ведёт на GitHub Pages — **Proxied** (оранжевое облако).
3. SSL/TLS → **Full** (не Flexible).
4. Rules → Transform Rules → **Modify Response Header**:
   - Match: hostname = `maximrafikov.ru` (и `www`, если есть)
   - Set заголовки из `/_headers`
5. Проверка: DevTools → Network → document → Response Headers;
   Console без ошибок CSP; шрифты и форма работают.

Альтернатива: перенести хостинг на Cloudflare Pages — тогда `_headers` подхватится сам.

## Чего не делать

- Не включать Formsubmit/Tuqo обратно без серверного антиспама.
- Не коммитить секреты и HANDOFF с внутренними заметками в публичный репо.
- Не полагаться только на `_headers` на голом GitHub Pages.
