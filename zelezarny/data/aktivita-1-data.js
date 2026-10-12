window.activityConfig = {
  storageKey: 'ironworks-activity-1-checkpoints',

  title: 'Aktivita 1',
  description: 'Zpracuj příchozí vozy, obsluž jednotlivé provozy železáren a připrav odchozí soupravu.',
  documentBase: '../dokumenty/aktivita-1/',

  initialState: [
    {
      track: '1',
      wagons: [
        { id: 'eas-01', label: 'Eas – železný šrot' },
        { id: 'eas-02', label: 'Eas – železný šrot' },
        { id: 'tams-01', label: 'Tams – sypké materiály' },
        { id: 'zags-01', label: 'Zags – technické plyny' },
      ],
    },
    {
      track: '3',
      wagons: [
        { id: 'shimmns-01', label: 'Shimmns – prázdný' },
        { id: 'res-01', label: 'Res – prázdný' },
        { id: 'samms-01', label: 'Samms – prázdný' },
      ],
    },
    {
      track: '6',
      wagons: [
        { id: 'interni-srot-01', label: 'Vnitropodnikový šrotový vůz – naložený' },
      ],
    },
  ],

  checkpoints: [
    {
      from: '1',
      to: '2',
      wagons: [
        { id: 'eas-01', label: 'Eas – železný šrot' },
        { id: 'eas-02', label: 'Eas – železný šrot' },
      ],
      description: 'Zvážit vozy se šrotem na statické kolejové váze',
    },
    {
      from: '2',
      to: '6',
      wagons: [
        { id: 'eas-01', label: 'Eas – železný šrot' },
        { id: 'eas-02', label: 'Eas – železný šrot' },
      ],
      description: 'Přistavit vozy k vykládce na šrotové pole',
    },
    {
      from: '1',
      to: '8',
      wagons: [
        { id: 'tams-01', label: 'Tams – sypké materiály' },
      ],
      description: 'Přistavit k vykládce do skladu sypkých materiálů',
    },
    {
      from: '1',
      to: '9',
      wagons: [
        { id: 'zags-01', label: 'Zags – technické plyny' },
      ],
      description: 'Přistavit ke stáčení technických plynů',
    },
    {
      from: '3',
      to: '5',
      wagons: [
        { id: 'shimmns-01', label: 'Shimmns – prázdný' },
        { id: 'res-01', label: 'Res – prázdný' },
        { id: 'samms-01', label: 'Samms – prázdný' },
      ],
      description: 'Přistavit prázdné vozy k nakládce hotových výrobků',
    },
    {
      from: '6',
      to: '7',
      wagons: [
        { id: 'interni-srot-01', label: 'Vnitropodnikový šrotový vůz – naložený' },
      ],
      description: 'Přesunout šrot ze šrotového pole k elektrické peci',
    },
    {
      from: '7',
      to: '6',
      wagons: [
        { id: 'interni-srot-01', label: 'Vnitropodnikový šrotový vůz – prázdný' },
      ],
      description: 'Vrátit prázdný vnitropodnikový vůz na šrotové pole',
    },
    {
      from: '6',
      to: '4',
      wagons: [
        { id: 'eas-01', label: 'Eas – prázdný' },
        { id: 'eas-02', label: 'Eas – prázdný' },
      ],
      description: 'Odstavit vyložené vozy do seřadiště',
    },
    {
      from: '8',
      to: '4',
      wagons: [
        { id: 'tams-01', label: 'Tams – prázdný' },
      ],
      description: 'Odstavit vyložený vůz do seřadiště',
    },
    {
      from: '9',
      to: '4',
      wagons: [
        { id: 'zags-01', label: 'Zags – prázdný' },
      ],
      description: 'Odstavit vyložený vůz do seřadiště',
    },
    {
      from: '5',
      to: '2',
      wagons: [
        { id: 'shimmns-01', label: 'Shimmns – svitky' },
        { id: 'res-01', label: 'Res – hutní materiál' },
        { id: 'samms-01', label: 'Samms – těžké výrobky' },
      ],
      description: 'Zvážit naložené vozy s hotovými výrobky',
      documents: [
        'nakladni-list-01.jpg',
        'nakladni-list-02.jpg',
      ],
    },
    {
      from: '2',
      to: '3',
      wagons: [
        { id: 'shimmns-01', label: 'Shimmns – svitky' },
        { id: 'res-01', label: 'Res – hutní materiál' },
        { id: 'samms-01', label: 'Samms – těžké výrobky' },
      ],
      description: 'Zařadit vozy do odchozí soupravy',
    },
    {
      from: '4',
      to: '3',
      wagons: [
        { id: 'eas-01', label: 'Eas – prázdný' },
        { id: 'tams-01', label: 'Tams – prázdný' },
        { id: 'zags-01', label: 'Zags – prázdný' },
      ],
      description: 'Připojit prázdné vozy k odchozí soupravě',
    },
  ],
};
