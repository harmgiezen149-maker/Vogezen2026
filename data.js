// Kleurpalet — bos, meer en Elzas
export const COLORS = {
  cream: '#F4EBD5',
  creamSoft: '#FAF3E1',
  forest: '#2D4F3E',
  moss: '#4A6F4F',
  lake: '#3A7E84',
  sunset: '#C97D5D',
  wood: '#8B6F47',
  wine: '#8E3D52',
  slate: '#5A6B8C',
  charcoal: '#1F2922',
  ink: 'rgba(31, 41, 34, 0.65)',
  inkLight: 'rgba(31, 41, 34, 0.45)',
  hairline: 'rgba(31, 41, 34, 0.10)',
};

export const CATEGORIES = {
  camping: { name: 'Camping & Meer', color: '#3A7E84', emoji: '🏕️' },
  hiking: { name: 'Wandelen', color: '#4A6F4F', emoji: '🥾' },
  cycling: { name: 'Fietsen', color: '#8B6F47', emoji: '🚴' },
  alsace: { name: 'Elzas & Wijnroute', color: '#8E3D52', emoji: '🍷' },
  colmar: { name: 'Colmar', color: '#C97D5D', emoji: '🏘️' },
  cities: { name: 'Steden (verder weg)', color: '#5A6B8C', emoji: '🌆' },
  nature: { name: 'Natuur & Wildlife', color: '#2D4F3E', emoji: '🌲' },
  food: { name: 'Eten & Markt', color: '#A8624A', emoji: '🍽️' },
  custom: { name: 'Eigen ideeën', color: '#7A6F5C', emoji: '✨' },
};

export const DEFAULT_ACTIVITIES = [
  // Camping & Meer
  { id: 'd_arrival', name: 'Aankomst & inrichten', emoji: '🚐', category: 'camping' },
  { id: 'd_swim', name: 'Zwemmen in het meer', emoji: '🏊', category: 'camping', note: 'Privémeer 5 ha' },
  { id: 'd_canoe', name: 'Kanoën op het meer', emoji: '🛶', category: 'camping', note: 'Gratis op camping' },
  { id: 'd_sup', name: 'SUP / paddle', emoji: '🏄', category: 'camping', note: 'Gratis op camping' },
  { id: 'd_fish', name: 'No-kill vissen', emoji: '🎣', category: 'camping', note: 'Geen vergunning nodig' },
  { id: 'd_yoga', name: 'Yoga aan het meer', emoji: '🧘', category: 'camping', note: 'Vroege ochtend' },
  { id: 'd_bbq', name: 'BBQ op het terrein', emoji: '🔥', category: 'camping', note: 'Alleen BBQ op poten' },
  { id: 'd_relax', name: 'Lui hangen & lezen', emoji: '📖', category: 'camping' },
  { id: 'd_drone_lake', name: 'Drone-vlucht boven meer', emoji: '🛸', category: 'camping', note: 'Check eerst met receptie' },
  { id: 'd_departure', name: 'Inpakken & vertrek', emoji: '👋', category: 'camping' },

  // Wandelen
  { id: 'h_sentier_roches', name: 'Sentier des Roches', emoji: '🥾', category: 'hiking', note: '3-4u, smal rotspad — vroeg gaan' },
  { id: 'h_hohneck', name: 'Hohneck (1363m)', emoji: '🏔️', category: 'hiking', note: '360° uitzicht, gemzen mogelijk' },
  { id: 'h_lacs', name: 'Tour des Lacs (Blanc + Noir)', emoji: '🏔️', category: 'hiking', note: '~4u rondwandeling' },
  { id: 'h_neves', name: 'Sentier des Névés', emoji: '🥾', category: 'hiking', note: 'Hoogteroute, panorama' },
  { id: 'h_cascade_merelle', name: 'Cascade de Mérelle', emoji: '💧', category: 'hiking', note: 'Kort & fotogeniek' },
  { id: 'h_saut_cuves', name: 'Saut des Cuves', emoji: '💧', category: 'hiking', note: 'Korte waterval Xonrupt' },
  { id: 'h_gerardmer', name: 'Wandeling rond Lac Gérardmer', emoji: '🚶', category: 'hiking', note: '~1u30, vlak' },
  { id: 'h_herpelmont', name: 'Lokaal rondje Herpelmont', emoji: '🚶', category: 'hiking', note: 'Vanuit de camping' },
  { id: 'h_rainkopf', name: 'Rainkopf via Altenweiher', emoji: '🏔️', category: 'hiking', note: 'Minder druk dan Hohneck' },

  // Fietsen
  { id: 'b_mtb', name: 'MTB-rit Hautes-Vosges', emoji: '🚵', category: 'cycling', note: 'Huren op camping' },
  { id: 'b_bruyeres', name: 'Fietstocht naar Bruyères', emoji: '🚲', category: 'cycling', note: '~10 km enkele reis' },
  { id: 'b_voies_vertes', name: 'Voies vertes', emoji: '🚲', category: 'cycling', note: 'Autovrije fietspaden' },

  // Elzas & Wijnroute
  { id: 'a_riquewihr', name: 'Riquewihr (vakwerkdorp)', emoji: '🏘️', category: 'alsace' },
  { id: 'a_kaysersberg', name: 'Kaysersberg', emoji: '🏰', category: 'alsace' },
  { id: 'a_eguisheim', name: 'Eguisheim', emoji: '🏘️', category: 'alsace', note: 'Plus beau village' },
  { id: 'a_ribeauville', name: 'Ribeauvillé', emoji: '🏰', category: 'alsace' },
  { id: 'a_dopff', name: 'Wijnproeverij Dopff au Moulin', emoji: '🍷', category: 'alsace' },
  { id: 'a_hugel', name: 'Wijnproeverij Hugel', emoji: '🍷', category: 'alsace' },
  { id: 'a_horcher', name: 'Wijnproeverij Horcher', emoji: '🍷', category: 'alsace', note: 'Klein, familiaal, top' },
  { id: 'a_route_vins', name: 'Wijnroute (rondrit)', emoji: '🍷', category: 'alsace', note: 'D1-bis door dorpen' },
  { id: 'a_haut_koenigsbourg', name: 'Château du Haut-Kœnigsbourg', emoji: '🏰', category: 'alsace' },

  // Colmar
  { id: 'c_oldtown', name: 'Colmar — Klein Venetië', emoji: '🛶', category: 'colmar' },
  { id: 'c_unterlinden', name: 'Unterlinden Museum', emoji: '🖼️', category: 'colmar', note: 'Isenheim-altaarstuk' },
  { id: 'c_market', name: 'Marché Couvert Colmar', emoji: '🥖', category: 'colmar' },

  // Steden verder weg
  { id: 's_strasbourg', name: 'Straatsburg — Kathedraal + Petite France', emoji: '🏛️', category: 'cities', note: '1u45 rijden' },
  { id: 's_strasbourg_boat', name: 'Straatsburg — Batorama boottocht', emoji: '🚢', category: 'cities', note: '~1u15' },
  { id: 's_basel', name: 'Basel (CH)', emoji: '🇨🇭', category: 'cities', note: '2u30+ rijden' },
  { id: 's_mulhouse', name: "Mulhouse — Cité de l'Automobile", emoji: '🚗', category: 'cities', note: 'Grootste autocollectie' },
  { id: 's_mulhouse_train', name: 'Mulhouse — Cité du Train', emoji: '🚂', category: 'cities' },
  { id: 's_freiburg', name: 'Freiburg im Breisgau (D)', emoji: '🇩🇪', category: 'cities', note: '~2u rijden' },
  { id: 's_europapark', name: 'Europa-Park Rust', emoji: '🎢', category: 'cities', note: 'Hele dag' },

  // Natuur & Wildlife
  { id: 'n_cretes', name: 'Route des Crêtes (D430)', emoji: '🛣️', category: 'nature', note: 'Hele dag scenic drive' },
  { id: 'n_chamois', name: 'Gemzen spotten bij dageraad', emoji: '🦌', category: 'nature', note: 'Hohneck / Rainkopf' },
  { id: 'n_sainte_croix', name: 'Parc Animalier Sainte-Croix', emoji: '🐺', category: 'nature', note: '1u15, wolven & lynxen' },
  { id: 'n_munster_cheese', name: 'Munster Vallei — kaasboerderij', emoji: '🧀', category: 'nature' },
  { id: 'n_storks', name: 'Ooievaars spotten Elzas', emoji: '🪶', category: 'nature' },
  { id: 'n_grand_ballon', name: 'Grand Ballon (1424m)', emoji: '🏔️', category: 'nature', note: 'Hoogste top van de Vogezen' },

  // Eten & Markt
  { id: 'f_market_bruyeres', name: 'Markt Bruyères', emoji: '🛒', category: 'food', note: 'Woensdag' },
  { id: 'f_market_gerardmer', name: 'Markt Gérardmer', emoji: '🛒', category: 'food', note: 'Do + za' },
  { id: 'f_ferme_auberge', name: 'Ferme-auberge lunch', emoji: '🧀', category: 'food', note: 'Reserveer 1 dag vooraf' },
  { id: 'f_tarte_flambee', name: 'Tarte flambée + Riesling', emoji: '🍕', category: 'food', note: 'In een winstub' },
  { id: 'f_munster_kummel', name: 'Munster met kummel & aardappel', emoji: '🧀', category: 'food' },
];

export const DAYS = [
  { key: '2026-07-25', dayShort: 'Za', date: '25 jul', label: 'Aankomstdag' },
  { key: '2026-07-26', dayShort: 'Zo', date: '26 jul' },
  { key: '2026-07-27', dayShort: 'Ma', date: '27 jul' },
  { key: '2026-07-28', dayShort: 'Di', date: '28 jul' },
  { key: '2026-07-29', dayShort: 'Wo', date: '29 jul', label: 'Markt Bruyères' },
  { key: '2026-07-30', dayShort: 'Do', date: '30 jul' },
  { key: '2026-07-31', dayShort: 'Vr', date: '31 jul' },
  { key: '2026-08-01', dayShort: 'Za', date: '1 aug' },
  { key: '2026-08-02', dayShort: 'Zo', date: '2 aug' },
  { key: '2026-08-03', dayShort: 'Ma', date: '3 aug' },
  { key: '2026-08-04', dayShort: 'Di', date: '4 aug' },
  { key: '2026-08-05', dayShort: 'Wo', date: '5 aug' },
  { key: '2026-08-06', dayShort: 'Do', date: '6 aug' },
  { key: '2026-08-07', dayShort: 'Vr', date: '7 aug', label: 'Vertrek' },
];

// Voorgesteld startpunt — verschijnt op een lege planner
export const SUGGESTED_PLAN = {
  '2026-07-25': ['d_arrival', 'd_swim'],
  '2026-07-26': ['h_herpelmont', 'd_canoe', 'd_fish'],
  '2026-07-27': ['h_gerardmer', 'h_cascade_merelle', 'd_swim'],
  '2026-07-28': ['h_sentier_roches', 'f_ferme_auberge'],
  '2026-07-29': ['b_mtb', 'f_market_bruyeres'],
  '2026-07-30': ['n_cretes', 'h_hohneck', 'n_chamois'],
  '2026-07-31': ['d_sup', 'd_yoga', 'd_relax'],
  '2026-08-01': ['a_route_vins', 'a_riquewihr', 'a_kaysersberg', 'a_horcher'],
  '2026-08-02': ['c_oldtown', 'c_unterlinden', 'c_market', 'a_eguisheim'],
  '2026-08-03': ['h_lacs', 'd_swim'],
  '2026-08-04': ['s_strasbourg', 's_strasbourg_boat'],
  '2026-08-05': ['d_relax', 'd_canoe', 'f_ferme_auberge'],
  '2026-08-06': ['s_basel'],
  '2026-08-07': ['d_departure'],
};
