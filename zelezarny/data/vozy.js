(() => {
  const scriptUrl = document.currentScript ? new URL(document.currentScript.src) : null;
  window.wagonImageBase = scriptUrl ? new URL('../vozy/', scriptUrl).href : '';

  window.wagonCatalog = {
    'Eas_01': {
      shortName: 'Eas',
      type: 'Eas',
      number: '',
      length: 14.04,
      image: null
    },
    'Res_01': {
      shortName: 'Res',
      type: 'Res',
      number: '',
      length: 19.90,
      image: Res-01.jpg,
    },
    'Rilns_01': {
      shortName: 'Rilns',
      type: 'Rilns',
      number: '',
      length: 20.15,
      image: Rilns-01.jpg,
    },
    'Rs_01': {
      shortName: 'Rs',
      type: 'Res',
      number: '',
      length: 19.90,
      image: Rs-01.jpg,
    },
    'Samms_01': {
      shortName: 'Samms',
      type: 'Samms',
      number: '',
      length: 16.40,
      image: Samms-01.jpg,
    },
    'vnitro_01': {
      shortName: 'Šrotový vůz',
      type: 'Vnitropodnikový vůz',
      number: '',
      length: 8.80,
      image: vnitro-01.jpg,
    }
  };
})();
