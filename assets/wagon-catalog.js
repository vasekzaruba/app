(() => {
  const root = document.querySelector('#wagonCatalog');
  const catalog = window.wagonCatalog || {};
  const mapConfig = window.ironworksMapConfig || {};
  const storageKey = mapConfig.storageKey || 'ironworks-yard-state-v1';

  if (!root) return;

  let state = {};
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey));
    state = stored && typeof stored === 'object' ? stored : mapConfig.initialState || {};
  } catch {
    state = mapConfig.initialState || {};
  }

  root.innerHTML = Object.entries(catalog).map(([id, wagon]) => {
    const wagonState = state[id] || {};
    const track = mapConfig.tracks?.[wagonState.track];
    return `
      <button class="wagon-catalog-card" type="button" data-wagon-id="${id}">
        <span class="wagon-catalog-type">${wagon.shortName || wagon.type}</span>
        <span class="wagon-catalog-number">${wagon.number || 'Číslo vozu zatím není doplněné'}</span>
        <span class="wagon-catalog-meta">${wagon.length.toFixed(2).replace('.', ',')} m${track ? ` · ${track.name}` : ''}</span>
      </button>
    `;
  }).join('');

  root.addEventListener('click', (event) => {
    const card = event.target.closest('[data-wagon-id]');
    if (!card) return;
    const id = card.dataset.wagonId;
    const wagonState = state[id] || {};
    const track = mapConfig.tracks?.[wagonState.track];
    window.WagonUI?.open(id, {
      trackName: track?.name,
      position: wagonState.position,
      cargo: wagonState.cargo
    });
  });
})();
