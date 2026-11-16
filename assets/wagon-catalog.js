(() => {
  const root = document.querySelector('#wagonCatalog');
  const catalog = window.wagonCatalog || {};

  if (!root) return;

  root.innerHTML = Object.entries(catalog).map(([id, wagon]) => {
    const length = Number.isFinite(wagon.length)
      ? `${wagon.length.toFixed(2).replace('.', ',')} m`
      : 'Délka zatím není doplněná';

    return `
      <button class="wagon-catalog-card" type="button" data-wagon-id="${id}">
        <span class="wagon-catalog-type">${wagon.shortName || wagon.type}</span>
        <span class="wagon-catalog-number">${wagon.number || 'Číslo vozu zatím není doplněné'}</span>
        <span class="wagon-catalog-meta">${length}</span>
      </button>
    `;
  }).join('');

  root.addEventListener('click', (event) => {
    const card = event.target.closest('[data-wagon-id]');
    if (!card) return;
    window.WagonUI?.open(card.dataset.wagonId);
  });
})();
