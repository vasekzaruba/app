(() => {
  const config = window.ironworksMapConfig || {};
  const catalog = window.wagonCatalog || {};
  const svg = document.querySelector('#yardMap');
  const trackLayer = document.querySelector('#yardTrackLayer');
  const wagonLayer = document.querySelector('#yardWagonLayer');
  const pendingPanel = document.querySelector('#yardPendingPanel');
  const freeLengthValue = document.querySelector('#yardFreeLength');
  const selectedCount = document.querySelector('#yardSelectedCount');
  const clearSelectionButton = document.querySelector('#clearYardSelection');
  const confirmMoveButton = document.querySelector('#confirmYardMove');
  const cancelMoveButton = document.querySelector('#cancelYardMove');
  const resetButton = document.querySelector('#resetYardState');
  const mapMessage = document.querySelector('#yardMapMessage');

  if (!svg || !trackLayer || !wagonLayer) return;

  const STORAGE_KEY = config.storageKey || 'ironworks-yard-state-v1';
  const GAP = Number(config.couplerGap) || 0;
  const tracks = config.tracks || {};
  const trackMetrics = {};

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function loadState() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (stored && typeof stored === 'object' && !Array.isArray(stored)) return stored;
    } catch {}
    return clone(config.initialState || {});
  }

  let state = loadState();
  let selected = new Set();
  let pendingMove = null;
  let dragPreview = null;
  let gesture = null;
  let tapTimer = null;
  let lastTap = { id: null, time: 0 };

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function buildMetrics(track) {
    const points = track.points || [];
    const segments = [];
    let cumulative = 0;

    for (let i = 0; i < points.length - 1; i += 1) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[i + 1];
      const length = Math.hypot(x2 - x1, y2 - y1);
      segments.push({ x1, y1, x2, y2, length, start: cumulative, end: cumulative + length });
      cumulative += length;
    }

    return { segments, svgLength: cumulative };
  }

  Object.entries(tracks).forEach(([id, track]) => {
    trackMetrics[id] = buildMetrics(track);
  });

  function mapDistanceForMeters(trackId, meters) {
    const track = tracks[trackId];
    const metric = trackMetrics[trackId];
    if (!track || !metric || !track.length) return 0;
    return meters / track.length * metric.svgLength;
  }

  function metersForMapDistance(trackId, distance) {
    const track = tracks[trackId];
    const metric = trackMetrics[trackId];
    if (!track || !metric || !metric.svgLength) return 0;
    return distance / metric.svgLength * track.length;
  }

  function pointAtDistance(trackId, distance) {
    const metric = trackMetrics[trackId];
    if (!metric || !metric.segments.length) return { x: 0, y: 0, angle: 0 };

    const first = metric.segments[0];
    const last = metric.segments[metric.segments.length - 1];
    let segment = first;
    let local = distance;

    if (distance < 0) {
      segment = first;
      local = distance;
    } else if (distance > metric.svgLength) {
      segment = last;
      local = segment.length + (distance - metric.svgLength);
    } else {
      segment = metric.segments.find((item) => distance >= item.start && distance <= item.end) || last;
      local = distance - segment.start;
    }

    const ratio = segment.length ? local / segment.length : 0;
    const x = segment.x1 + (segment.x2 - segment.x1) * ratio;
    const y = segment.y1 + (segment.y2 - segment.y1) * ratio;
    const angle = Math.atan2(segment.y2 - segment.y1, segment.x2 - segment.x1) * 180 / Math.PI;
    return { x, y, angle };
  }

  function nearestPointOnTrack(trackId, point) {
    const metric = trackMetrics[trackId];
    if (!metric) return null;

    let best = null;

    metric.segments.forEach((segment) => {
      const vx = segment.x2 - segment.x1;
      const vy = segment.y2 - segment.y1;
      const len2 = vx * vx + vy * vy;
      const raw = len2 ? ((point.x - segment.x1) * vx + (point.y - segment.y1) * vy) / len2 : 0;
      const t = Math.max(0, Math.min(1, raw));
      const x = segment.x1 + vx * t;
      const y = segment.y1 + vy * t;
      const distance = Math.hypot(point.x - x, point.y - y);
      const along = segment.start + segment.length * t;

      if (!best || distance < best.distance) {
        best = { trackId, x, y, distance, along };
      }
    });

    return best;
  }

  function nearestTrack(point) {
    let best = null;
    Object.keys(tracks).forEach((trackId) => {
      const candidate = nearestPointOnTrack(trackId, point);
      if (candidate && (!best || candidate.distance < best.distance)) best = candidate;
    });
    return best;
  }

  function pointerToSvg(event) {
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    return point.matrixTransform(svg.getScreenCTM().inverse());
  }

  function wagonLength(id) {
    return Number(catalog[id]?.length) || 0;
  }

  function trackWagons(trackId, source = state, excluded = new Set()) {
    return Object.entries(source)
      .filter(([id, item]) => item.track === trackId && !excluded.has(id) && catalog[id])
      .map(([id, item]) => ({ id, ...item, length: wagonLength(id) }))
      .sort((a, b) => a.position - b.position);
  }

  function selectionOnSingleTrack() {
    const ids = Array.from(selected);
    if (!ids.length) return null;
    const firstTrack = state[ids[0]]?.track;
    if (!firstTrack || ids.some((id) => state[id]?.track !== firstTrack)) return null;
    return firstTrack;
  }

  function sortedSelection() {
    return Array.from(selected).sort((a, b) => (state[a]?.position || 0) - (state[b]?.position || 0));
  }

  function groupLength(ids) {
    const wagonTotal = ids.reduce((sum, id) => sum + wagonLength(id), 0);
    return wagonTotal + Math.max(0, ids.length - 1) * GAP;
  }

  function intervalsForTrack(trackId, excluded) {
    return trackWagons(trackId, state, excluded).map((wagon) => ({
      start: wagon.position,
      end: wagon.position + wagon.length,
      id: wagon.id
    }));
  }

  function overlaps(start, length, intervals) {
    const end = start + length;
    return intervals.some((interval) => start < interval.end + GAP && end > interval.start - GAP);
  }

  function findNearestFreeStart(trackId, desiredStart, length, excluded) {
    const intervals = intervalsForTrack(trackId, excluded);
    if (!overlaps(desiredStart, length, intervals)) return desiredStart;

    const candidates = [desiredStart];
    intervals.forEach((interval) => {
      candidates.push(interval.end + GAP);
      candidates.push(interval.start - GAP - length);
    });

    const valid = candidates.filter((candidate) => !overlaps(candidate, length, intervals));
    if (!valid.length) return desiredStart;

    return valid.reduce((best, candidate) => (
      Math.abs(candidate - desiredStart) < Math.abs(best - desiredStart) ? candidate : best
    ), valid[0]);
  }

  function createMovePreview(trackId, centerMeters) {
    const ids = sortedSelection();
    const total = groupLength(ids);
    const excluded = new Set(ids);
    let start = centerMeters - total / 2;
    start = findNearestFreeStart(trackId, start, total, excluded);

    const positions = {};
    let cursor = start;
    ids.forEach((id) => {
      positions[id] = cursor;
      cursor += wagonLength(id) + GAP;
    });

    return { trackId, positions, ids };
  }

  function freeLengthAfterMove(preview) {
    const targetTrack = tracks[preview.trackId];
    if (!targetTrack) return 0;
    const idsOnTarget = new Set(
      Object.entries(state)
        .filter(([id, item]) => item.track === preview.trackId && !preview.ids.includes(id) && catalog[id])
        .map(([id]) => id)
    );
    preview.ids.forEach((id) => idsOnTarget.add(id));
    const ids = Array.from(idsOnTarget);
    const used = ids.reduce((sum, id) => sum + wagonLength(id), 0) + Math.max(0, ids.length - 1) * GAP;
    return targetTrack.length - used;
  }

  function showMessage(message) {
    if (!mapMessage) return;
    mapMessage.textContent = message;
    mapMessage.hidden = false;
    window.clearTimeout(showMessage.timer);
    showMessage.timer = window.setTimeout(() => {
      mapMessage.hidden = true;
    }, 2600);
  }

  function renderTracks() {
    const activeTrack = dragPreview?.trackId || pendingMove?.trackId || null;
    trackLayer.innerHTML = Object.entries(tracks).map(([id, track]) => {
      const points = track.points.map(([x, y]) => `${x},${y}`).join(' ');
      const active = id === activeTrack ? ' is-target' : '';
      return `<polyline class="yard-track-hit${active}" data-track-id="${id}" points="${points}"></polyline>`;
    }).join('');
  }

  function effectiveStateForWagon(id) {
    const base = state[id];
    const preview = dragPreview || pendingMove;
    if (preview && preview.positions[id] !== undefined) {
      return { ...base, track: preview.trackId, position: preview.positions[id] };
    }
    return base;
  }

  function renderWagons() {
    const preview = dragPreview || pendingMove;
    wagonLayer.innerHTML = Object.keys(catalog).map((id) => {
      const wagon = catalog[id];
      const wagonState = effectiveStateForWagon(id);
      if (!wagonState || !tracks[wagonState.track]) return '';

      const width = Math.max(28, mapDistanceForMeters(wagonState.track, wagon.length));
      const centerDistance = mapDistanceForMeters(wagonState.track, wagonState.position + wagon.length / 2);
      const point = pointAtDistance(wagonState.track, centerDistance);
      const isSelected = selected.has(id);
      const isPending = Boolean(preview && preview.positions[id] !== undefined);
      const classNames = ['yard-wagon'];
      if (isSelected) classNames.push('is-selected');
      if (isPending) classNames.push('is-pending');
      const label = wagon.shortName || wagon.type;
      const textVisible = width >= 40;

      return `
        <g class="${classNames.join(' ')}" data-wagon-id="${id}" transform="translate(${point.x.toFixed(2)} ${point.y.toFixed(2)}) rotate(${point.angle.toFixed(2)})">
          <rect x="${(-width / 2).toFixed(2)}" y="-11" width="${width.toFixed(2)}" height="22" rx="4"></rect>
          ${textVisible ? `<text x="0" y="4" text-anchor="middle">${label}</text>` : ''}
        </g>
      `;
    }).join('');
  }

  function renderToolbar() {
    if (selectedCount) {
      const count = selected.size;
      selectedCount.textContent = count ? `Vybráno: ${count}` : 'Vybráno: 0';
    }
    if (clearSelectionButton) clearSelectionButton.disabled = selected.size === 0 || Boolean(pendingMove);

    if (pendingPanel) pendingPanel.hidden = !pendingMove;
    if (pendingMove && freeLengthValue) {
      const value = freeLengthAfterMove(pendingMove);
      freeLengthValue.textContent = `${value.toFixed(1).replace('.', ',')} m`;
      freeLengthValue.classList.toggle('is-negative', value < 0);
    }
  }

  function render() {
    renderTracks();
    renderWagons();
    renderToolbar();
  }

  function toggleSelection(id) {
    if (pendingMove) return;
    const wagonTrack = state[id]?.track;
    const currentTrack = selectionOnSingleTrack();

    if (selected.has(id)) {
      selected.delete(id);
    } else {
      if (currentTrack && currentTrack !== wagonTrack) selected.clear();
      selected.add(id);
    }
    render();
  }

  function openWagonDetail(id) {
    const item = state[id] || {};
    const track = tracks[item.track];
    window.WagonUI?.open(id, {
      trackName: track?.name,
      position: item.position,
      cargo: item.cargo
    });
  }

  function handleTap(id) {
    const now = Date.now();
    if (lastTap.id === id && now - lastTap.time < 320) {
      window.clearTimeout(tapTimer);
      tapTimer = null;
      lastTap = { id: null, time: 0 };
      openWagonDetail(id);
      return;
    }

    lastTap = { id, time: now };
    window.clearTimeout(tapTimer);
    tapTimer = window.setTimeout(() => {
      toggleSelection(id);
      tapTimer = null;
    }, 260);
  }

  function startDrag(id, event) {
    if (pendingMove) return;
    if (!selected.has(id)) {
      selected.clear();
      selected.add(id);
    }

    if (!selectionOnSingleTrack()) {
      showMessage('Přesouvat lze skupinu vozů z jedné koleje.');
      return;
    }

    gesture.dragging = true;
    svg.setPointerCapture(event.pointerId);
    updateDrag(event);
  }

  function updateDrag(event) {
    if (!gesture?.dragging) return;
    const point = pointerToSvg(event);
    const nearest = nearestTrack(point);
    if (!nearest) return;
    const centerMeters = metersForMapDistance(nearest.trackId, nearest.along);
    dragPreview = createMovePreview(nearest.trackId, centerMeters);
    render();
    event.preventDefault();
  }

  function finishDrag(event) {
    if (!gesture?.dragging) return false;
    if (svg.hasPointerCapture(event.pointerId)) svg.releasePointerCapture(event.pointerId);
    if (dragPreview) pendingMove = clone(dragPreview);
    dragPreview = null;
    render();
    return true;
  }

  svg.addEventListener('pointerdown', (event) => {
    const wagonElement = event.target.closest?.('[data-wagon-id]');
    if (!wagonElement || pendingMove) return;

    const id = wagonElement.dataset.wagonId;
    gesture = {
      id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      dragging: false,
      moved: false,
      timer: null
    };

    gesture.timer = window.setTimeout(() => startDrag(id, event), 430);
  });

  svg.addEventListener('pointermove', (event) => {
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    const moved = Math.hypot(event.clientX - gesture.startX, event.clientY - gesture.startY);
    if (!gesture.dragging && moved > 8) {
      gesture.moved = true;
      window.clearTimeout(gesture.timer);
    }
    if (gesture.dragging) updateDrag(event);
  });

  function endPointer(event) {
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    window.clearTimeout(gesture.timer);
    const dragged = finishDrag(event);
    const id = gesture.id;
    const moved = gesture.moved;
    gesture = null;
    if (!dragged && !moved) handleTap(id);
  }

  svg.addEventListener('pointerup', endPointer);
  svg.addEventListener('pointercancel', (event) => {
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    window.clearTimeout(gesture.timer);
    if (gesture.dragging && svg.hasPointerCapture(event.pointerId)) svg.releasePointerCapture(event.pointerId);
    gesture = null;
    dragPreview = null;
    render();
  });

  clearSelectionButton?.addEventListener('click', () => {
    selected.clear();
    render();
  });

  cancelMoveButton?.addEventListener('click', () => {
    pendingMove = null;
    render();
  });

  confirmMoveButton?.addEventListener('click', () => {
    if (!pendingMove) return;
    pendingMove.ids.forEach((id) => {
      if (!state[id]) state[id] = {};
      state[id].track = pendingMove.trackId;
      state[id].position = pendingMove.positions[id];
    });
    saveState();
    pendingMove = null;
    selected.clear();
    render();
  });

  resetButton?.addEventListener('click', () => {
    if (!window.confirm('Opravdu resetovat stav kolejiště?')) return;
    state = clone(config.initialState || {});
    selected.clear();
    pendingMove = null;
    dragPreview = null;
    saveState();
    render();
  });

  render();
})();
