# -*- coding: utf-8 -*-
from pathlib import Path

root = Path(__file__).resolve().parent

# Russian via \\u escapes so the source file stays ASCII-safe on Windows.
files = {
    "kontakty-tenderov.svg": """<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360" role="img">
  <title>Schema: contact table</title>
  <rect width="640" height="360" fill="#f8f6f1"/>
  <rect x="32" y="28" width="576" height="304" fill="#fefdfb" stroke="#e2ddd2" stroke-width="1"/>
  <text x="52" y="58" font-family="Consolas, monospace" font-size="12" fill="#7f848d" letter-spacing="1.5">\u0412\u042b\u0413\u0420\u0423\u0417\u041a\u0410 \u00b7 \u041e\u0411\u0415\u0417\u041b\u0418\u0427\u0415\u041d\u041e</text>
  <text x="52" y="88" font-family="Georgia, serif" font-size="22" fill="#16181b">\u0422\u0430\u0431\u043b\u0438\u0446\u0430 \u0434\u043b\u044f \u043e\u0442\u0434\u0435\u043b\u0430 \u043f\u0440\u043e\u0434\u0430\u0436</text>
  <g font-family="Consolas, monospace" font-size="13">
    <rect x="52" y="112" width="536" height="36" fill="#f1e6df"/>
    <text x="68" y="134" fill="#7d3216">\u0418\u041d\u041d</text>
    <text x="180" y="134" fill="#7d3216">\u041a\u041e\u041c\u041f\u0410\u041d\u0418\u042f</text>
    <text x="360" y="134" fill="#7d3216">EMAIL</text>
    <text x="500" y="134" fill="#7d3216">\u0421\u0421\u042b\u041b\u041a\u0410</text>
    <line x1="52" y1="160" x2="588" y2="160" stroke="#e2ddd2"/>
    <text x="68" y="184" fill="#4c515a">77••••••</text>
    <text x="180" y="184" fill="#4c515a">\u041e\u041e\u041e ······</text>
    <text x="360" y="184" fill="#4c515a">····@····.ru</text>
    <text x="500" y="184" fill="#4c515a">\u0442\u0435\u043d\u0434\u0435\u0440</text>
    <line x1="52" y1="200" x2="588" y2="200" stroke="#e2ddd2"/>
    <text x="68" y="224" fill="#4c515a">50••••••</text>
    <text x="180" y="224" fill="#4c515a">\u0410\u041e ······</text>
    <text x="360" y="224" fill="#4c515a">····@····.ru</text>
    <text x="500" y="224" fill="#4c515a">\u0442\u0435\u043d\u0434\u0435\u0440</text>
    <line x1="52" y1="240" x2="588" y2="240" stroke="#e2ddd2"/>
    <text x="68" y="264" fill="#4c515a">66••••••</text>
    <text x="180" y="264" fill="#4c515a">\u0418\u041f ······</text>
    <text x="360" y="264" fill="#4c515a">····@····.ru</text>
    <text x="500" y="264" fill="#4c515a">\u0442\u0435\u043d\u0434\u0435\u0440</text>
  </g>
  <text x="52" y="308" font-family="Consolas, monospace" font-size="14" fill="#a6431e">40 000+ \u0441\u0442\u0440\u043e\u043a \u00b7 \u2248 64 000 \u0441 email</text>
</svg>
""",
    "eis-laboratoriya.svg": """<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360" role="img">
  <title>Schema: EIS market</title>
  <rect width="640" height="360" fill="#f8f6f1"/>
  <rect x="32" y="28" width="576" height="304" fill="#fefdfb" stroke="#e2ddd2" stroke-width="1"/>
  <text x="52" y="58" font-family="Consolas, monospace" font-size="12" fill="#7f848d" letter-spacing="1.5">\u0415\u0418\u0421 \u00b7 \u0421\u0412\u041e\u0414\u041a\u0410</text>
  <text x="52" y="88" font-family="Georgia, serif" font-size="22" fill="#16181b">\u041b\u0430\u0431\u043e\u0440\u0430\u0442\u043e\u0440\u043d\u0430\u044f \u0434\u0438\u0430\u0433\u043d\u043e\u0441\u0442\u0438\u043a\u0430</text>
  <g font-family="Consolas, monospace">
    <text x="52" y="130" font-size="12" fill="#7f848d">\u0417\u0410\u041a\u0423\u041f\u041a\u0418</text>
    <text x="52" y="158" font-size="28" fill="#a6431e">8 491</text>
    <text x="220" y="130" font-size="12" fill="#7f848d">\u0421\u0423\u041c\u041c\u0410</text>
    <text x="220" y="158" font-size="28" fill="#a6431e">\u2248 11,9 \u043c\u043b\u0440\u0434 \u20bd</text>
    <text x="52" y="200" font-size="12" fill="#7f848d">\u0417\u0410\u041a\u0410\u0417\u0427\u0418\u041a\u0418</text>
    <text x="52" y="228" font-size="22" fill="#16181b">1 988</text>
    <text x="220" y="200" font-size="12" fill="#7f848d">\u041f\u041e\u0421\u0422\u0410\u0412\u0429\u0418\u041a\u0418</text>
    <text x="220" y="228" font-size="22" fill="#16181b">648</text>
  </g>
  <g fill="#a6431e">
    <rect x="52" y="260" width="220" height="10" opacity="0.85"/>
    <rect x="52" y="280" width="160" height="10" opacity="0.55"/>
    <rect x="52" y="300" width="110" height="10" opacity="0.35"/>
  </g>
  <text x="300" y="292" font-family="Consolas, monospace" font-size="12" fill="#7f848d">\u0444\u0438\u043b\u044c\u0442\u0440\u044b \u0441 \u043f\u0440\u0438\u0447\u0438\u043d\u043e\u0439 \u043e\u0442\u0441\u0435\u0432\u0430</text>
</svg>
""",
    "telegram-bot.svg": """<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360" role="img">
  <title>Schema: bot dialogue</title>
  <rect width="640" height="360" fill="#f8f6f1"/>
  <rect x="32" y="28" width="576" height="304" fill="#fefdfb" stroke="#e2ddd2" stroke-width="1"/>
  <text x="52" y="58" font-family="Consolas, monospace" font-size="12" fill="#7f848d" letter-spacing="1.5">TELEGRAM \u00b7 MVP</text>
  <text x="52" y="88" font-family="Georgia, serif" font-size="22" fill="#16181b">\u041d\u0430\u043f\u043e\u043c\u0438\u043d\u0430\u043d\u0438\u0435 \u0441\u0432\u043e\u0438\u043c\u0438 \u0441\u043b\u043e\u0432\u0430\u043c\u0438</text>
  <g font-family="Segoe UI, sans-serif" font-size="15">
    <rect x="280" y="112" width="280" height="44" rx="8" fill="#f1e6df"/>
    <text x="296" y="140" fill="#16181b">\u043f\u043e\u0437\u0432\u043e\u043d\u0438 \u0437\u0430\u0432\u0442\u0440\u0430 \u0432 9:00</text>
    <rect x="52" y="172" width="320" height="52" rx="8" fill="#e2ddd2"/>
    <text x="68" y="194" fill="#16181b">\u041e\u043a. \u041d\u0430\u043f\u043e\u043c\u043d\u044e \u0437\u0430\u0432\u0442\u0440\u0430 \u0432 09:00</text>
    <text x="68" y="214" fill="#4c515a" font-size="13">\u0447\u0430\u0441\u043e\u0432\u043e\u0439 \u043f\u043e\u044f\u0441: \u0423\u0440\u0430\u043b</text>
  </g>
  <g font-family="Consolas, monospace" font-size="12">
    <rect x="52" y="250" width="100" height="36" rx="2" fill="#16181b"/>
    <text x="70" y="272" fill="#fefdfb">\u0441\u0434\u0435\u043b\u0430\u043d\u043e</text>
    <rect x="164" y="250" width="100" height="36" rx="2" fill="#fefdfb" stroke="#cdc6b7"/>
    <text x="186" y="272" fill="#4c515a">15 \u043c\u0438\u043d</text>
    <rect x="276" y="250" width="100" height="36" rx="2" fill="#fefdfb" stroke="#cdc6b7"/>
    <text x="300" y="272" fill="#4c515a">1 \u0447\u0430\u0441</text>
    <rect x="388" y="250" width="100" height="36" rx="2" fill="#fefdfb" stroke="#cdc6b7"/>
    <text x="410" y="272" fill="#4c515a">\u0437\u0430\u0432\u0442\u0440\u0430</text>
  </g>
  <text x="52" y="318" font-family="Consolas, monospace" font-size="13" fill="#a6431e">\u0434\u0435\u0434\u043b\u0430\u0439\u043d \u00b7 \u043f\u043e\u0432\u0442\u043e\u0440 \u00b7 \u043e\u0442\u043b\u043e\u0436\u0438\u0442\u044c</text>
</svg>
""",
    "salon-analitika.svg": """<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360" role="img">
  <title>Schema: salon call list</title>
  <rect width="640" height="360" fill="#f8f6f1"/>
  <rect x="32" y="28" width="576" height="304" fill="#fefdfb" stroke="#e2ddd2" stroke-width="1"/>
  <text x="52" y="58" font-family="Consolas, monospace" font-size="12" fill="#7f848d" letter-spacing="1.5">\u0421\u0418\u041d\u0422\u0415\u0422\u0418\u041a\u0410 \u00b7 \u0412\u0410\u0428 \u0421\u0410\u041b\u041e\u041d</text>
  <text x="52" y="88" font-family="Georgia, serif" font-size="22" fill="#16181b">\u041a\u043e\u043c\u0443 \u0437\u0432\u043e\u043d\u0438\u0442\u044c \u043d\u0430 \u044d\u0442\u043e\u0439 \u043d\u0435\u0434\u0435\u043b\u0435</text>
  <g font-family="Consolas, monospace" font-size="14">
    <text x="52" y="128" fill="#7f848d">\u0421\u041f\u0418\u0421\u041e\u041a</text>
    <text x="52" y="160" fill="#a6431e">1</text>
    <text x="80" y="160" fill="#16181b">\u044f\u0434\u0440\u043e \u00b7 \u0434\u0430\u0432\u043d\u043e \u043d\u0435 \u0431\u044b\u043b\u043e \u00b7 \u0432\u044b\u0441\u043e\u043a\u0438\u0439 LTV</text>
    <text x="52" y="196" fill="#a6431e">2</text>
    <text x="80" y="196" fill="#16181b">\u043d\u043e\u0432\u0438\u0447\u043a\u0438 \u00b7 \u0437\u0430\u043a\u0440\u0435\u043f\u0438\u0442\u044c \u0432\u0438\u0437\u0438\u0442</text>
    <text x="52" y="232" fill="#a6431e">3</text>
    <text x="80" y="232" fill="#16181b">\u0443\u0445\u043e\u0434\u044f\u0442 \u00b7 \u043c\u044f\u0433\u043a\u0438\u0439 \u0432\u043e\u0437\u0432\u0440\u0430\u0442</text>
  </g>
  <line x1="52" y1="260" x2="588" y2="260" stroke="#e2ddd2"/>
  <text x="52" y="292" font-family="Consolas, monospace" font-size="13" fill="#a6431e">30 000+ \u00b7 130 000+ \u00b7 2 \u0441\u043f\u0438\u0441\u043a\u0430</text>
  <text x="52" y="316" font-family="Consolas, monospace" font-size="12" fill="#7f848d">\u0431\u0435\u0437 \u0438\u043c\u0451\u043d, \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u043e\u0432 \u0438 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u044f \u0441\u0430\u043b\u043e\u043d\u0430</text>
</svg>
""",
}

for name, content in files.items():
    path = root / name
    path.write_text(content, encoding="utf-8")
    print(f"wrote {name} ({path.stat().st_size} bytes)")
