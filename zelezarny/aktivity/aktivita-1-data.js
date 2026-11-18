window.activityConfig = {
  storageKey: 'ironworks-activity-1-checkpoints',

  title: 'Aktivita 1',
  description: 'Zpracuj příchozí vozy, obsluž jednotlivé provozy železáren a připrav odchozí soupravu.',
  documentBase: '../dokumenty/aktivita-1/',

  initialState: [
    {
      track: '2',
      wagons: [
        { id: 'Res_01', label: 'Res – prázdný' },
        { id: 'Rs_01', label: 'Rs - prázdný' },
      ],
    },
    {
      track: '3',
      wagons: [
        { id: 'Eas_01', label: 'Eas – železný šrot' },
        { id: 'Samms_01', label: 'Samms – prázdný' },
        { id: 'Rilns_01', label: 'Rilns - ložený' },
      ],
    },
    {
      track: '24',
      wagons: [
        { id: 'vnitro_01', label: 'Šrotový vůz – prázdný' },
      ],
    },
  ],

  checkpoints: [
    {
      from: '3',
      to: '25',
      wagons: [
        { id: 'Eas_01', label: 'Eas – železný šrot' },
      ],
      description: 'Posun na šrotové pole',
    },
    {
      from: '2',
      to: '1',
      wagons: [
        { id: 'Res_01', label: 'Res – prázdný' },
        { id: 'Rs_01', label: 'Rs - prázdný' },
      ],
      description: 'Prázdné, připravit na odjezd',
      documents: [
        'prazdny_list_01.png',
        'prazdny_list_01.png',
      ],
    },
    {
      from: '3',
      to: '7',
      wagons: [
        { id: 'Rilns_01', label: 'Rilns - ložený' },
      ],
      description: 'Zvážit',
    },
    {
      from: '3',
      to: '22',
      wagons: [
        { id: 'Samms_01', label: 'Samms - prázdný' },
      ],
      description: 'Přistavit do válcoven na nakládku',
    },
    {
      from: '7',
      to: '1',
      wagons: [
        { id: 'Rilns_01', label: 'Rilns - ložený' },
      ],
      description: 'Zvážený, připravit na odjezd',
      documents: [
        'lozeny_list_01.png',
      ],
    },
    {
      from: '24',
      to: 'o2',
      wagons: [
        { id: 'vnitro_01', label: 'Šrotový vůz' },
      ],
      description: 'Posun pod elektrickou pec',
    },
  ],
};
