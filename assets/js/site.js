// Шапка, меню, показ контактов по клику и форма задачи → почта + черновик в Telegram.

const header = document.querySelector('.site-header');
const navLinks = [...document.querySelectorAll('.site-nav a')];

if (header) {
  const updateHeader = () => {
    header.dataset.scrolled = String(window.scrollY > 8);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

const sections = navLinks
  .map((link) => {
    const href = link.getAttribute('href') || '';
    // На страницах кейсов ссылки вида ../index.html#cases — секций тут нет.
    if (!href.startsWith('#')) return null;
    return document.querySelector(href);
  })
  .filter(Boolean);

function updateActiveNav() {
  if (!sections.length) return;

  const doc = document.documentElement;
  const nearBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 48;
  const marker = window.scrollY + Math.min(160, window.innerHeight * 0.25);

  // Пока на первом экране (выше первой секции меню) — ничего не подсвечиваем
  if (!nearBottom && marker < sections[0].offsetTop - 24) {
    navLinks.forEach((link) => link.removeAttribute('aria-current'));
    return;
  }

  let current = sections[0];
  if (nearBottom) {
    current = sections[sections.length - 1];
  } else {
    for (const section of sections) {
      if (section.offsetTop <= marker) current = section;
    }
  }

  navLinks.forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href === `#${current.id}`) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
}

if (sections.length) {
  updateActiveNav();
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('resize', updateActiveNav);
  window.addEventListener('hashchange', updateActiveNav);
  if (window.location.hash) {
    window.setTimeout(updateActiveNav, 80);
  }
}

const TG_USER = 'mxm_r';
const MAIL_TO = 'maxim.rafikov@gmail.com';
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${MAIL_TO}`;

function revealContact(button) {
  if (!button || button.dataset.revealed === 'true') return;

  const kind = button.dataset.kind;
  const link = document.createElement('a');

  if (kind === 'phone') {
    const parts = (button.dataset.parts || '').split(',').map((p) => p.trim()).filter(Boolean);
    const href = `tel:+${parts.join('')}`;
    const pretty = parts.length === 5
      ? `+${parts[0]} ${parts[1]} ${parts[2]}-${parts[3]}-${parts[4]}`
      : `+${parts.join(' ')}`;
    link.href = href;
    link.textContent = pretty;
  } else if (kind === 'email') {
    const email = `${button.dataset.user}@${button.dataset.domain}`;
    link.href = `mailto:${email}`;
    link.textContent = email;
  } else {
    return;
  }

  button.replaceWith(link);
}

document.querySelectorAll('[data-reveal-contact]').forEach((button) => {
  button.addEventListener('click', () => revealContact(button));
});

const taskFormWrap = document.querySelector('#task-form');
const taskForm = document.querySelector('#task-form-el');
const taskStatus = document.querySelector('#task-form-status');

function setFormStatus(message, state) {
  if (!taskStatus) return;
  taskStatus.textContent = message;
  if (state) taskStatus.dataset.state = state;
  else delete taskStatus.dataset.state;
}

function openTaskForm() {
  if (!taskFormWrap) return;
  taskFormWrap.hidden = false;
  const first = taskForm?.querySelector('textarea, input:not([tabindex="-1"])');
  first?.focus();
  taskFormWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeTaskForm() {
  if (!taskFormWrap) return;
  taskFormWrap.hidden = true;
}

document.querySelectorAll('[data-open-form]').forEach((el) => {
  el.addEventListener('click', (event) => {
    if (el.tagName === 'A') {
      // Сначала доскроллим к контактам по якорю, затем откроем форму.
      window.setTimeout(openTaskForm, 0);
      return;
    }
    event.preventDefault();
    document.querySelector('#contacts')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(openTaskForm, 280);
  });
});

document.querySelectorAll('[data-close-form]').forEach((el) => {
  el.addEventListener('click', () => {
    closeTaskForm();
    setFormStatus('');
  });
});

if (window.location.hash === '#task-form' || window.location.hash === '#contacts') {
  // Если пришли с якоря «описать задачу» — сразу раскрыть форму.
  if (window.location.hash === '#task-form') {
    openTaskForm();
  }
}

function buildTelegramDraft(data) {
  const lines = [
    'Задача с сайта-портфолио',
    '',
    data.name ? `Имя: ${data.name}` : null,
    `Контакт: ${data.contact}`,
    data.niche ? `Ниша: ${data.niche}` : null,
    data.result ? `Результат: ${data.result}` : null,
    data.deadline ? `Срок: ${data.deadline}` : null,
    '',
    data.task,
  ].filter((line) => line !== null);

  return lines.join('\n');
}

function openTelegramDraft(data) {
  const text = buildTelegramDraft(data);
  const url = `https://t.me/${TG_USER}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener');
}

taskForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(taskForm);
  if (String(formData.get('_honey') || '').trim()) {
    setFormStatus('Готово. Если письмо не пришло — напишите в Telegram @mxm_r.', 'ok');
    taskForm.reset();
    return;
  }

  const payload = {
    name: String(formData.get('name') || '').trim(),
    contact: String(formData.get('contact') || '').trim(),
    task: String(formData.get('task') || '').trim(),
    niche: String(formData.get('niche') || '').trim(),
    result: String(formData.get('result') || '').trim(),
    deadline: String(formData.get('deadline') || '').trim(),
  };

  if (!payload.contact || !payload.task) {
    setFormStatus('Заполните контакт и задачу.', 'error');
    return;
  }

  const submitBtn = taskForm.querySelector('button[type="submit"]');
  if (submitBtn) submitBtn.disabled = true;
  setFormStatus('Отправляю…');

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        _subject: 'Задача с сайта-портфолио',
        _template: 'table',
        _captcha: 'false',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    openTelegramDraft(payload);
    setFormStatus(
      'Заявка ушла на почту. Открыл черновик в Telegram @mxm_r — нажмите «отправить», если чат открылся.',
      'ok'
    );
    taskForm.reset();
  } catch (_error) {
    openTelegramDraft(payload);
    setFormStatus(
      'Почту сейчас отправить не удалось. Открыл черновик в Telegram @mxm_r — отправьте его вручную.',
      'error'
    );
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
});
