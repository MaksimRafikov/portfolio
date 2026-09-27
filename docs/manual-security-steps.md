# Что сделать вручную (я не могу зайти в ваши кабинеты)

Код сайта уже обновлён и задеплоен через git. Ниже — только шаги в внешних сервисах.

## 1. Старые формы (Formsubmit / Tuqo)

**Сделано (27.09.2026):** формы у провайдеров отключены; UUID и эндпоинты вычищены из истории git (`filter-repo` + force-push).

Если придёт письмо Formsubmit «confirm form» — **не** подтверждайте заново.

## 2. Cloudflare (заголовки + HSTS)

На чистом GitHub Pages нельзя выставить `X-Frame-Options` / HSTS.
Инструкция: `docs/security-headers.md`.

Кратко: DNS через Cloudflare → Proxied → Transform Rules с содержимым `_headers`.

## 3. GitHub Pages

В настройках репозитория Pages: включите **Enforce HTTPS** (если ещё не включено).

## 4. Связанные репозитории (по желанию)

- `sro-auditor`: подумайте, нужен ли публичный `chatgpt-share-raw.json`
- `ZaKomfort`: не коммитьте сырые исходники с ПДн в `inbox/`
