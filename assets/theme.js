(() => {
  const key = 'provozni-aplikace-theme';
  const marker = '__provozni_theme__';
  const root = document.documentElement;

  function readWindowTheme() {
    const match = String(window.name || '').match(new RegExp(`${marker}=(light|dark)`));
    return match ? match[1] : null;
  }

  function writeWindowTheme(theme) {
    const current = String(window.name || '').replace(new RegExp(`(?:^|\\s)${marker}=(?:light|dark)`), '').trim();
    window.name = `${current}${current ? ' ' : ''}${marker}=${theme}`;
  }

  function readTheme() {
    const carried = readWindowTheme();
    if (carried) return carried;

    try {
      return localStorage.getItem(key) === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  }

  function writeTheme(theme) {
    writeWindowTheme(theme);
    try {
      localStorage.setItem(key, theme);
    } catch {}
  }

  function syncTheme(theme) {
    root.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#111827' : '#f3f5f7');

    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      const dark = theme === 'dark';
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', dark ? 'Přepnout na světlý motiv' : 'Přepnout na tmavý motiv');
      const icon = button.querySelector('[data-theme-icon]');
      const label = button.querySelector('[data-theme-label]');
      if (icon) icon.textContent = dark ? '☀' : '☾';
      if (label) label.textContent = dark ? 'Světlý' : 'Tmavý';
    });
  }

  function init() {
    const theme = root.dataset.theme || readTheme();
    writeTheme(theme);
    syncTheme(theme);

    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.addEventListener('click', () => {
        const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
        writeTheme(next);
        syncTheme(next);
      });
    });
  }

  root.dataset.theme = readTheme();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
