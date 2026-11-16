window.ironworksMapConfig = {
  storageKey: 'ironworks-yard-state-v1',
  couplerGap: 0.32,
  backgroundImage: 'mapa/planek.png',
  viewBox: [0, 0, 1985, 882],
  tracks: {
    'valcovna-22': { name: 'Válcovna 22', length: 28.5, points: [[71, 73], [185, 73]] },
    'srot-25': { name: 'Šrotové pole 25', length: 79.0, points: [[340, 104], [618, 254]] },
    'srot-24': { name: 'Šrotové pole 24', length: 82.2, points: [[318, 137], [609, 290]] },
    'eop-03': { name: 'Elektrická pec 03', length: 66.5, points: [[198, 314], [464, 314]] },
    'eop-02': { name: 'Elektrická pec 02', length: 79.0, points: [[198, 357], [514, 357]] },
    'eop-01': { name: 'Elektrická pec 01', length: 98.8, points: [[198, 395], [593, 395]] },
    'sklad-26': { name: 'Sklad 26', length: 238.6, points: [[772, 268], [1368, 268], [1420, 225], [1711, 225]] },
    'seradiste-7': { name: 'Seřadiště 7', length: 113.5, points: [[1040, 421], [1494, 421]] },
    'seradiste-5': { name: 'Seřadiště 5', length: 113.5, points: [[1040, 452], [1494, 452]] },
    'seradiste-3': { name: 'Seřadiště 3', length: 167.5, points: [[879, 485], [1549, 485]] },
    'seradiste-1': { name: 'Seřadiště 1', length: 133.0, points: [[879, 522], [1411, 522]] },
    'prekladiste-2': { name: 'Překladiště 2', length: 133.0, points: [[879, 560], [1411, 560]] },
    'prekladiste-30': { name: 'Překladiště 30', length: 118.0, points: [[789, 723], [1261, 723]] },
    'depo-31': { name: 'Depo 31', length: 118.5, points: [[1376, 723], [1850, 723]] },
    'depo-32': { name: 'Depo 32', length: 104.6, points: [[1436, 668], [1722, 668], [1760, 684], [1851, 684]] },
    'depo-33': { name: 'Depo 33', length: 107.4, points: [[1436, 668], [1598, 668], [1665, 625], [1853, 625]] }
  },
  initialState: {
    'eas-01': { track: 'seradiste-1', position: 10.0, cargo: null },
    'eas-02': { track: 'seradiste-1', position: 24.36, cargo: null },
    'tams-01': { track: 'seradiste-1', position: 38.72, cargo: null },
    'zags-01': { track: 'seradiste-1', position: 53.66, cargo: null },
    'shimmns-01': { track: 'seradiste-3', position: 15.0, cargo: null },
    'res-01': { track: 'seradiste-3', position: 27.36, cargo: null },
    'samms-01': { track: 'seradiste-3', position: 47.58, cargo: null },
    'interni-srot-01': { track: 'srot-24', position: 12.0, cargo: null }
  }
};
