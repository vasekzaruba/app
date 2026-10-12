(() => {
  const catalog = window.wagonCatalog || {};
  let modal = null;

  function genericWagonSvg() {
    return `
      <svg viewBox="0 0 210 92" aria-hidden="true">
        <g fill="none" stroke="currentColor" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 16h168v45H21z" fill="currentColor" opacity="0.065" />
          <path d="M21 16h168v45H21z" />
          <path d="M18 14h174v4H18zM19 61h172v5H19z" />
          <path d="M35 17v44M57 17v44M79 17v44M101 17v44M123 17v44M145 17v44M167 17v44" />
          <path d="M31 68h48l5 7-7 8H33l-7-8zM131 68h48l5 7-7 8h-44l-7-8z" />
          <circle cx="39" cy="81" r="7.2" /><circle cx="70" cy="81" r="7.2" />
          <circle cx="140" cy="81" r="7.2" /><circle cx="171" cy="81" r="7.2" />
          <path d="M7 56h11M192 56h11M3 59h4M203 59h4" />
        </g>
      </svg>
    `;
  }

  function ensureModal() {
    if (modal) return modal;

    modal = document.createElement('div');
    modal.className = 'wagon-detail-modal';
    modal.hidden = true;
    modal.innerHTML = `
      <div class="wagon-detail-backdrop" data-close-wagon></div>
      <section class="wagon-detail-dialog" role="dialog" aria-modal="true" aria-labelledby="wagonDetailTitle">
        <div class="wagon-detail-header">
          <div>
            <div class="wagon-detail-eyebrow">Detail vozu</div>
            <h2 id="wagonDetailTitle"></h2>
          </div>
          <button class="wagon-detail-close" type="button" data-close-wagon aria-label="Zavřít detail vozu">×</button>
        </div>
        <div class="wagon-detail-visual"></div>
        <dl class="wagon-detail-data"></dl>
      </section>
    `;
    modal.addEventListener('click', (event) => {
      if (event.target.closest('[data-close-wagon]')) close();
    });
    document.body.appendChild(modal);
    return modal;
  }

  function row(label, value) {
    return `<div class="wagon-detail-row"><dt>${label}</dt><dd>${value || '—'}</dd></div>`;
  }

  function open(id, extra = {}) {
    const wagon = catalog[id];
    if (!wagon) return;

    ensureModal();
    const title = wagon.number ? `${wagon.type} ${wagon.number}` : wagon.shortName || wagon.type;
    const visual = modal.querySelector('.wagon-detail-visual');
    const data = modal.querySelector('.wagon-detail-data');
    modal.querySelector('#wagonDetailTitle').textContent = title;

    if (wagon.image) {
      const base = window.wagonImageBase || '';
      visual.innerHTML = `<img src="${base}${wagon.image}" alt="${title}">`;
    } else {
      visual.innerHTML = `<div class="wagon-detail-placeholder">${genericWagonSvg()}<span>Fotografie není přidaná</span></div>`;
    }

    data.innerHTML = [
      row('Řada', wagon.type),
      row('Číslo vozu', wagon.number),
      row('Délka', Number.isFinite(wagon.length) ? `${wagon.length.toFixed(2).replace('.', ',')} m` : ''),
      row('Aktuální kolej', extra.trackName),
      row('Poloha', Number.isFinite(extra.position) ? `${extra.position.toFixed(1).replace('.', ',')} m od začátku koleje` : ''),
      row('Náklad', extra.cargo)
    ].join('');

    modal.hidden = false;
    document.body.classList.add('wagon-detail-open');
  }

  function close() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('wagon-detail-open');
  }

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && !modal.hidden) close();
  });

  window.WagonUI = { open, close };
})();
