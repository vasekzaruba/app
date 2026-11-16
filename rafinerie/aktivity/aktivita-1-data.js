window.activityConfig = {
  storageKey: 'rafinery-activity-1-checkpoints',

  title: 'Aktivita 1',
  description: 'Splňuj checkpointy postupně od prvního po poslední.',

  initialState: [
    {
      track: '2',
      wagons: [
        { id: 'cdc-zacns-7836', label: 'ČDC Zacns 7836' },
        { id: 'onrail-zacens-7933', label: 'OnRail Zacens 7933' },
      ],
    },
    {
      track: '1',
      wagons: [
        { id: 'db-zagkks-7920', label: 'DB Zagkks 7920' },
        { id: 'vtg-zags-7814-01', label: 'VTG Zags 7814' },
        { id: 'vtg-zags-7814-02', label: 'VTG Zags 7814' },
        { id: 'eva-zags-7915-01', label: 'EVA Zags 7915' },
        { id: 'eva-zags-7915-02', label: 'EVA Zags 7915' },
      ],
    },
    {
      track: '3',
      wagons: [
        { id: 'db-sggmrs-4954', label: 'DB Sggmrs 4954' },
        { id: 'vtg-zas-7956', label: 'VTG Zas 7956' },
        { id: 'vtg-zacens-7933', label: 'VTG Zacens 7933' },
        { id: 'vtg-zacens-7834', label: 'VTG Zacens 7834' },
        { id: 'kvg-zaes-7978', label: 'KVG Zaes 7978' },
      ],
    },
  ],

  checkpoints: [
    { from: '1', to: '26', wagons: [{ id: 'db-zagkks-7920', label: 'DB Zagkks 7920' }], description: 'Přistavit na naložení LPG' },
    { from: '3', to: '24', wagons: [{ id: 'db-sggmrs-4954', label: 'DB Sggmrs 4954' }], description: 'Přistavit k čištění' },
    { from: '3', to: '25', wagons: [{ id: 'vtg-zacens-7933', label: 'VTG Zacens 7933' }, { id: 'vtg-zacens-7834', label: 'VTG Zacens 7834' }], description: 'Přistavit k čištění' },
    { from: '2', to: '3', wagons: [{ id: 'cdc-zacns-7836', label: 'ČDC Zacns 7836' }], description: 'Přesun k vozům' },
    { from: '3', to: 'o1', wagons: [{ id: 'cdc-zacns-7836', label: 'ČDC Zacns 7836' }, { id: 'vtg-zas-7956', label: 'VTG Zas 7956' }, { id: 'kvg-zaes-7978', label: 'KVG Zaes 7978' }], description: 'Přistavit k naložení' },
    { from: '26', to: '7', wagons: [{ id: 'db-zagkks-7920', label: 'DB Zagkks 7920' }], description: 'Zvážit' },
    { from: '7', to: '1', wagons: [{ id: 'db-zagkks-7920', label: 'DB Zagkks 7920' }], description: 'Připravit k odjezdu' },
    { from: '25', to: 'o2', wagons: [{ id: 'vtg-zacens-7933', label: 'VTG Zacens 7933' }, { id: 'vtg-zacens-7834', label: 'VTG Zacens 7834' }], description: 'Přistavit k naložení' },
    { from: 'o1', to: '3', wagons: [{ id: 'cdc-zacns-7836', label: 'ČDC Zacns 7836' }, { id: 'vtg-zas-7956', label: 'VTG Zas 7956' }, { id: 'kvg-zaes-7978', label: 'KVG Zaes 7978' }], description: 'Připravit k odjezdu' },
    { from: '2', to: '7', wagons: [{ id: 'onrail-zacens-7933', label: 'OnRail Zacens 7933' }], description: 'Zvážit' },
    { from: '7', to: '2', wagons: [{ id: 'onrail-zacens-7933', label: 'OnRail Zacens 7933' }], description: 'Odstavit' },
  ],
};
