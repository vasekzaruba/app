(() => {
  const scriptUrl = document.currentScript ? new URL(document.currentScript.src) : null;
  window.wagonImageBase = scriptUrl ? new URL('../vozy/', scriptUrl).href : '';

  window.wagonCatalog = {
    'cdc-zacns-7836': { shortName: 'ČDC Zacns 7836', type: 'Zacns 7836', number: '', length: null, image: null },
    'onrail-zacens-7933': { shortName: 'OnRail Zacens 7933', type: 'Zacens 7933', number: '', length: null, image: null },
    'db-zagkks-7920': { shortName: 'DB Zagkks 7920', type: 'Zagkks 7920', number: '', length: null, image: null },
    'vtg-zags-7814-01': { shortName: 'VTG Zags 7814', type: 'Zags 7814', number: '', length: null, image: null },
    'vtg-zags-7814-02': { shortName: 'VTG Zags 7814', type: 'Zags 7814', number: '', length: null, image: null },
    'eva-zags-7915-01': { shortName: 'EVA Zags 7915', type: 'Zags 7915', number: '', length: null, image: null },
    'eva-zags-7915-02': { shortName: 'EVA Zags 7915', type: 'Zags 7915', number: '', length: null, image: null },
    'db-sggmrs-4954': { shortName: 'DB Sggmrs 4954', type: 'Sggmrs 4954', number: '', length: null, image: null },
    'vtg-zas-7956': { shortName: 'VTG Zas 7956', type: 'Zas 7956', number: '', length: null, image: null },
    'vtg-zacens-7933': { shortName: 'VTG Zacens 7933', type: 'Zacens 7933', number: '', length: null, image: null },
    'vtg-zacens-7834': { shortName: 'VTG Zacens 7834', type: 'Zacens 7834', number: '', length: null, image: null },
    'kvg-zaes-7978': { shortName: 'KVG Zaes 7978', type: 'Zaes 7978', number: '', length: null, image: null }
  };
})();
