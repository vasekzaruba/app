(() => {
  const scriptUrl = document.currentScript ? new URL(document.currentScript.src) : null;
  window.wagonImageBase = scriptUrl ? new URL('../vozy/', scriptUrl).href : '';

  window.wagonCatalog = {
    'eas-01': {
      shortName: 'Eas 1',
      type: 'Eas',
      number: '',
      length: 14.04,
      image: null
    },
    'eas-02': {
      shortName: 'Eas 2',
      type: 'Eas',
      number: '',
      length: 14.04,
      image: null
    },
    'tams-01': {
      shortName: 'Tams 1',
      type: 'Tams',
      number: '',
      length: 14.62,
      image: null
    },
    'zags-01': {
      shortName: 'Zags 1',
      type: 'Zags',
      number: '',
      length: 14.40,
      image: null
    },
    'shimmns-01': {
      shortName: 'Shimmns 1',
      type: 'Shimmns',
      number: '',
      length: 12.04,
      image: null
    },
    'res-01': {
      shortName: 'Res 1',
      type: 'Res',
      number: '',
      length: 19.90,
      image: null
    },
    'samms-01': {
      shortName: 'Samms 1',
      type: 'Samms',
      number: '',
      length: 16.40,
      image: null
    },
    'interni-srot-01': {
      shortName: 'Šrotový vůz 1',
      type: 'Vnitropodnikový šrotový vůz',
      number: '',
      length: 8.80,
      image: null
    }
  };
})();
