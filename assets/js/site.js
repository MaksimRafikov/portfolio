// Header, menu, theme, and task form → email + Telegram draft.

const THEME_KEY = 'mr-theme';
const LANG = (document.documentElement.lang || 'ru').toLowerCase().startsWith('en')
  ? 'en'
  : 'ru';

const I18N = {
  ru: {
    themeDark: 'Тёмная',
    themeLight: 'Светлая',
    themeToDark: 'Включить тёмную тему',
    themeToLight: 'Включить светлую тему',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    formOkHoney: 'Готово. Если ответа нет — напишите в Telegram @mxm_r.',
    formNeedFields: 'Заполните контакт и задачу.',
    formNeedConsent: 'Отметьте согласие на обработку персональных данных.',
    formOk: 'Открыл черновик в Telegram @mxm_r и письмо на почту — нажмите «отправить» в открывшемся окне.',
    mailSubject: 'Задача с сайта-портфолио',
    messageTitle: 'Задача с сайта-портфолио',
    labelName: 'Имя',
    labelContact: 'Контакт',
    labelNiche: 'Ниша',
    labelResult: 'Результат',
    labelDeadline: 'Срок',
  },
  en: {
    themeDark: 'Dark',
    themeLight: 'Light',
    themeToDark: 'Switch to dark theme',
    themeToLight: 'Switch to light theme',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    formOkHoney: 'Done. If there is no reply, message Telegram @mxm_r.',
    formNeedFields: 'Please fill in contact and task.',
    formNeedConsent: 'Please confirm consent to personal data processing.',
    formOk: 'Opened a Telegram draft to @mxm_r and an email draft — press send in the window that opened.',
    mailSubject: 'Task from portfolio site',
    messageTitle: 'Task from portfolio site',
    labelName: 'Name',
    labelContact: 'Contact',
    labelNiche: 'Niche',
    labelResult: 'Result',
    labelDeadline: 'Deadline',
  },
};

const t = I18N[LANG];

function currentTheme() {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'dark' || attr === 'light') return attr;
  return 'light';
}

function applyTheme(theme) {
  const next = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch (_) {}

  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    const dark = next === 'dark';
    btn.setAttribute('aria-pressed', String(dark));
    btn.setAttribute('aria-label', dark ? t.themeToLight : t.themeToDark);
    const label = btn.querySelector('[data-theme-label]');
    if (label) label.textContent = dark ? t.themeLight : t.themeDark;
  });
}

applyTheme(currentTheme());

document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
  btn.addEventListener('click', () => {
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });
});

const header = document.querySelector('.site-header');
const navLinks = [...document.querySelectorAll('.site-nav a')];
const navToggle = document.querySelector('[data-nav-toggle]');
const desktopNavMq = window.matchMedia('(min-width: 46rem)');

function setNavOpen(open) {
  if (!header) return;
  const next = Boolean(open) && !desktopNavMq.matches;
  header.dataset.navOpen = String(next);
  if (navToggle) {
    navToggle.setAttribute('aria-expanded', String(next));
    navToggle.setAttribute('aria-label', next ? t.closeMenu : t.openMenu);
  }
}

if (header) {
  const updateHeader = () => {
    header.dataset.scrolled = String(window.scrollY > 8);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

/* Repeat click on #top is otherwise silent: hash is already #top, browser does not scroll. */
document.querySelectorAll('a[href="#top"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    const url = window.location.pathname + window.location.search;
    if (window.history.replaceState) {
      window.history.replaceState(null, '', url);
    }
  });
});

if (navToggle && header) {
  navToggle.addEventListener('click', () => {
    setNavOpen(header.dataset.navOpen !== 'true');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => setNavOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setNavOpen(false);
  });

  const syncNavToViewport = () => setNavOpen(false);
  if (typeof desktopNavMq.addEventListener === 'function') {
    desktopNavMq.addEventListener('change', syncNavToViewport);
  } else if (typeof desktopNavMq.addListener === 'function') {
    desktopNavMq.addListener(syncNavToViewport);
  }
}

const sections = navLinks
  .map((link) => {
    const href = link.getAttribute('href') || '';
    // On case pages links look like ../index.html#cases — no sections here.
    if (!href.startsWith('#')) return null;
    return document.querySelector(href);
  })
  .filter(Boolean);

function updateActiveNav() {
  if (!sections.length) return;

  const doc = document.documentElement;
  const nearBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 48;
  const marker = window.scrollY + Math.min(160, window.innerHeight * 0.25);

  // On the first screen (above the first nav section) — highlight nothing
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
const MAIL_CC = '4093390@mail.ru';

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
      // Scroll to contacts via hash first, then open the form.
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
  // Arrived via “describe the task” anchor — open the form right away.
  if (window.location.hash === '#task-form') {
    openTaskForm();
  }
}

function buildTaskMessage(data) {
  const lines = [
    t.messageTitle,
    '',
    data.name ? `${t.labelName}: ${data.name}` : null,
    `${t.labelContact}: ${data.contact}`,
    data.niche ? `${t.labelNiche}: ${data.niche}` : null,
    data.result ? `${t.labelResult}: ${data.result}` : null,
    data.deadline ? `${t.labelDeadline}: ${data.deadline}` : null,
    '',
    data.task,
  ].filter((line) => line !== null);

  return lines.join('\n');
}

function openTelegramDraft(data) {
  const url = `https://t.me/${TG_USER}?text=${encodeURIComponent(buildTaskMessage(data))}`;
  window.open(url, '_blank', 'noopener');
}

function openMailtoDraft(data) {
  const subject = encodeURIComponent(t.mailSubject);
  const body = encodeURIComponent(buildTaskMessage(data));
  const link = document.createElement('a');
  link.href = `mailto:${MAIL_TO}?cc=${encodeURIComponent(MAIL_CC)}&subject=${subject}&body=${body}`;
  link.rel = 'noopener';
  link.click();
}

taskForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(taskForm);
  if (String(formData.get('_honey') || '').trim()) {
    setFormStatus(t.formOkHoney, 'ok');
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
    setFormStatus(t.formNeedFields, 'error');
    return;
  }

  const consent = taskForm.querySelector('input[name="pdn_consent"]');
  if (consent && !consent.checked) {
    setFormStatus(t.formNeedConsent, 'error');
    consent.focus();
    return;
  }

  openTelegramDraft(payload);
  openMailtoDraft(payload);
  setFormStatus(t.formOk, 'ok');
  taskForm.reset();
});
