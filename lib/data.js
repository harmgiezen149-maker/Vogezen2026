// Kleurpalet — bos, meer, Elzas en Luxemburgse Ardennen
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

// Visuele markers per verblijfplaats
export const STAYS = {
  messires: { name: 'Messires', color: '#3A7E84' },
  clervaux: { name: 'Clervaux', color: '#B08A3E' },
  transfer: { name: 'Transfer', color: '#C97D5D' },
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
  luxembourg: { name: 'Luxemburg & Ardennen', color: '#B08A3E', emoji: '🏰' },
  custom: { name: 'Eigen ideeën', color: '#7A6F5C', emoji: '✨' },
};

export const DEFAULT_ACTIVITIES = [
  // ============ WEEK 1: VOSGES & ELZAS ============

  // Camping & Meer (Domaine des Messires)
  { id: 'd_arrival', name: 'Aankomst & inrichten', emoji: '🚐', category: 'camping' },
  { id: 'd_swim', name: 'Zwemmen in het meer', emoji: '🏊', category: 'camping', note: 'Privémeer 5 ha' },
  { id: 'd_canoe', name: 'Kanoën op het meer', emoji: '🛶', category: 'camping', note: 'Gratis op camping' },
  { id: 'd_sup', name: 'SUP / paddle', emoji: '🏄', category: 'camping', note: 'Gratis op camping' },
  { id: 'd_fish', name: 'No-kill vissen', emoji: '🎣', category: 'camping', note: 'Geen vergunning nodig' },
  { id: 'd_yoga', name: 'Yoga aan het meer', emoji: '🧘', category: 'camping', note: 'Vroege ochtend' },
  { id: 'd_bbq', name: 'BBQ op het terrein', emoji: '🔥', category: 'camping', note: 'Alleen BBQ op poten' },
  { id: 'd_relax', name: 'Lui hangen & lezen', emoji: '📖', category: 'camping' },
  { id: 'd_drone_lake', name: 'Drone-vlucht boven meer', emoji: '🛸', category: 'camping', note: 'Check eerst met receptie' },
  { id: 'd_departure', name: 'Inpakken & vertrek Messires', emoji: '👋', category: 'camping' },

  // Wandelen (Vosges)
  { id: 'h_sentier_roches', name: 'Sentier des Roches', emoji: '🥾', category: 'hiking', note: '3-4u, smal rotspad — vroeg gaan' },
  { id: 'h_hohneck', name: 'Hohneck (1363m)', emoji: '🏔️', category: 'hiking', note: '360° uitzicht, gemzen mogelijk' },
  { id: 'h_lacs', name: 'Tour des Lacs (Blanc + Noir)', emoji: '🏔️', category: 'hiking', note: '~4u rondwandeling' },
  { id: 'h_neves', name: 'Sentier des Névés', emoji: '🥾', category: 'hiking', note: 'Hoogteroute, panorama' },
  { id: 'h_cascade_merelle', name: 'Cascade de Mérelle', emoji: '💧', category: 'hiking', note: 'Kort & fotogeniek' },
  { id: 'h_saut_cuves', name: 'Saut des Cuves', emoji: '💧', category: 'hiking', note: 'Korte waterval Xonrupt' },
  { id: 'h_gerardmer', name: 'Wandeling rond Lac Gérardmer', emoji: '🚶', category: 'hiking', note: '~1u30, vlak' },
  { id: 'h_herpelmont', name: 'Lokaal rondje Herpelmont', emoji: '🚶', category: 'hiking', note: 'Vanuit de camping' },
  { id: 'h_rainkopf', name: 'Rainkopf via Altenweiher', emoji: '🏔️', category: 'hiking', note: 'Minder druk dan Hohneck' },

  // Fietsen (Vosges)
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

  // Steden verder weg (vanuit Vosges)
  { id: 's_strasbourg', name: 'Straatsburg — Kathedraal + Petite France', emoji: '🏛️', category: 'cities', note: '1u45 rijden' },
  { id: 's_strasbourg_boat', name: 'Straatsburg — Batorama boottocht', emoji: '🚢', category: 'cities', note: '~1u15' },
  { id: 's_basel', name: 'Basel (CH)', emoji: '🇨🇭', category: 'cities', note: '2u30+ rijden' },
  { id: 's_mulhouse', name: "Mulhouse — Cité de l'Automobile", emoji: '🚗', category: 'cities', note: 'Grootste autocollectie' },
  { id: 's_mulhouse_train', name: 'Mulhouse — Cité du Train', emoji: '🚂', category: 'cities' },
  { id: 's_freiburg', name: 'Freiburg im Breisgau (D)', emoji: '🇩🇪', category: 'cities', note: '~2u rijden' },
  { id: 's_europapark', name: 'Europa-Park Rust', emoji: '🎢', category: 'cities', note: 'Hele dag' },

  // Natuur & Wildlife (Vosges)
  { id: 'n_cretes', name: 'Route des Crêtes (D430)', emoji: '🛣️', category: 'nature', note: 'Hele dag scenic drive' },
  { id: 'n_chamois', name: 'Gemzen spotten bij dageraad', emoji: '🦌', category: 'nature', note: 'Hohneck / Rainkopf' },
  { id: 'n_sainte_croix', name: 'Parc Animalier Sainte-Croix', emoji: '🐺', category: 'nature', note: '1u15, wolven & lynxen' },
  { id: 'n_munster_cheese', name: 'Munster Vallei — kaasboerderij', emoji: '🧀', category: 'nature' },
  { id: 'n_storks', name: 'Ooievaars spotten Elzas', emoji: '🪶', category: 'nature' },
  { id: 'n_grand_ballon', name: 'Grand Ballon (1424m)', emoji: '🏔️', category: 'nature', note: 'Hoogste top van de Vogezen' },

  // Eten & Markt (Vosges/Elzas)
  { id: 'f_market_bruyeres', name: 'Markt Bruyères', emoji: '🛒', category: 'food', note: 'Woensdag' },
  { id: 'f_market_gerardmer', name: 'Markt Gérardmer', emoji: '🛒', category: 'food', note: 'Do + za' },
  { id: 'f_ferme_auberge', name: 'Ferme-auberge lunch', emoji: '🧀', category: 'food', note: 'Reserveer 1 dag vooraf' },
  { id: 'f_tarte_flambee', name: 'Tarte flambée + Riesling', emoji: '🍕', category: 'food', note: 'In een winstub' },
  { id: 'f_munster_kummel', name: 'Munster met kummel & aardappel', emoji: '🧀', category: 'food' },

  // ============ WEEK 2: CLERVAUX & LUXEMBURG ============

  // Verblijf / aankomst
  { id: 'cl_transfer', name: 'Reisdag Messires → Clervaux', emoji: '🚗', category: 'luxembourg', note: '~4u rijden, 350 km' },
  { id: 'cl_settle', name: 'Aankomst Clervaux & inrichten', emoji: '🏡', category: 'luxembourg' },
  { id: 'cl_departure', name: 'Inpakken & naar huis', emoji: '👋', category: 'luxembourg' },

  // Clervaux zelf
  { id: 'cl_castle', name: 'Kasteel Clervaux + Family of Man', emoji: '🏰', category: 'luxembourg', note: 'UNESCO foto-expositie van Steichen' },
  { id: 'cl_abbey', name: 'Abdij Saint-Maurice', emoji: '⛪', category: 'luxembourg', note: 'Benedictijnen, gregoriaans' },
  { id: 'cl_walk', name: 'Lokaal rondje Clervaux', emoji: '🚶', category: 'hiking', note: 'Ardense bosroutes' },
  { id: 'cl_castle_models', name: 'Maquettes Luxemburgse kastelen', emoji: '🏰', category: 'luxembourg', note: 'In Kasteel Clervaux, 1:100' },

  // Vianden
  { id: 'cl_vianden_castle', name: 'Kasteel Vianden', emoji: '🏰', category: 'luxembourg', note: 'Meest iconisch kasteel van LU' },
  { id: 'cl_vianden_lift', name: 'Vianden kabelbaan (telesiège)', emoji: '🚡', category: 'luxembourg', note: 'Open stoeltjeslift, top uitzicht' },
  { id: 'cl_vianden_walk', name: 'Wandeling Our-vallei Vianden', emoji: '🥾', category: 'hiking' },

  // Andere kastelen
  { id: 'cl_bourscheid', name: 'Kasteel Bourscheid', emoji: '🏰', category: 'luxembourg', note: 'Op heuveltop, panorama' },
  { id: 'cl_beaufort', name: 'Kastelen Beaufort', emoji: '🏰', category: 'luxembourg', note: 'Twee kastelen naast elkaar' },
  { id: 'cl_esch_sauer', name: 'Esch-sur-Sûre dorp + ruïne', emoji: '🏰', category: 'luxembourg', note: 'Pittoresk in lus van Sûre' },

  // Mullerthal / Petite Suisse
  { id: 'cl_mullerthal', name: 'Mullerthal Trail (Petite Suisse)', emoji: '🥾', category: 'hiking', note: 'Sandsteenformaties, mossig' },
  { id: 'cl_schiessentumpel', name: 'Schiessentümpel waterval', emoji: '💧', category: 'hiking', note: '3-traps waterval, iconisch' },
  { id: 'cl_berdorf', name: 'Berdorf rotswandeling', emoji: '🪨', category: 'hiking', note: 'Klimroutes & rotsdoorgangen' },

  // Steden in Luxemburg
  { id: 'cl_lux_city', name: 'Luxemburg-stad — Bock Casematten', emoji: '🇱🇺', category: 'luxembourg', note: 'Ondergrondse tunnels' },
  { id: 'cl_lux_corniche', name: 'Luxemburg-stad — Chemin de la Corniche', emoji: '🏙️', category: 'luxembourg', note: '"Mooiste balkon van Europa"' },
  { id: 'cl_echternach', name: 'Echternach (oudste stad)', emoji: '🏘️', category: 'luxembourg', note: 'Abdijbasiliek, Romeinse villa' },
  { id: 'cl_wiltz', name: 'Wiltz', emoji: '🏘️', category: 'luxembourg' },

  // Natuur Ardennen
  { id: 'cl_esch_lake', name: 'Esch-sur-Sûre stuwmeer — zwemmen', emoji: '🏊', category: 'nature', note: 'Leifrëch of Lultzhausen plage' },
  { id: 'cl_naturpark_our', name: 'Naturpark Our wandeling', emoji: '🌲', category: 'nature', note: 'Grensgebied LU-DE' },
  { id: 'cl_naturpark_sure', name: 'Naturpark Öewersauer', emoji: '🌲', category: 'nature' },
  { id: 'cl_belvedere_esch', name: 'Belvédère Esch-sur-Sûre', emoji: '🏔️', category: 'nature', note: 'Uitzichttoren over stuwmeer' },

  // Fietsen Ardennen
  { id: 'cl_vennbahn', name: 'Vennbahn fietsroute', emoji: '🚲', category: 'cycling', note: '125 km oude spoorlijn LU-BE-DE' },
  { id: 'cl_pc15', name: 'PC15 langs de Our', emoji: '🚲', category: 'cycling', note: 'Vlak, langs rivier' },

  // Grensgebied
  { id: 'cl_bastogne', name: 'Bastogne (BE) — Mardasson + War Museum', emoji: '🪖', category: 'cities', note: 'WO2, ~45 min rijden' },
  { id: 'cl_trier', name: 'Trier (DE) — Porta Nigra', emoji: '🏛️', category: 'cities', note: 'Romeinse stadspoort, ~1u' },

  // Eten Luxemburg
  { id: 'cl_judd', name: 'Judd mat Gaardebounen', emoji: '🍽️', category: 'food', note: 'LU nationaal gerecht: ham + bonen' },
  { id: 'cl_gromperekichelcher', name: 'Gromperekichelcher', emoji: '🥔', category: 'food', note: 'Aardappelpannenkoek, markt' },
];

// Dagen — `stay` markeert verblijfplaats: 'messires' | 'clervaux' | 'transfer'
export const DAYS = [
  // Week 1: Domaine des Messires
  { key: '2026-07-25', dayShort: 'Za', date: '25 jul', label: 'Aankomstdag', stay: 'messires' },
  { key: '2026-07-26', dayShort: 'Zo', date: '26 jul', stay: 'messires' },
  { key: '2026-07-27', dayShort: 'Ma', date: '27 jul', stay: 'messires' },
  { key: '2026-07-28', dayShort: 'Di', date: '28 jul', stay: 'messires' },
  { key: '2026-07-29', dayShort: 'Wo', date: '29 jul', label: 'Markt Bruyères', stay: 'messires' },
  { key: '2026-07-30', dayShort: 'Do', date: '30 jul', stay: 'messires' },
  { key: '2026-07-31', dayShort: 'Vr', date: '31 jul', stay: 'messires' },
  { key: '2026-08-01', dayShort: 'Za', date: '1 aug', stay: 'messires' },
  { key: '2026-08-02', dayShort: 'Zo', date: '2 aug', stay: 'messires' },
  { key: '2026-08-03', dayShort: 'Ma', date: '3 aug', stay: 'messires' },
  { key: '2026-08-04', dayShort: 'Di', date: '4 aug', stay: 'messires' },
  { key: '2026-08-05', dayShort: 'Wo', date: '5 aug', stay: 'messires' },
  { key: '2026-08-06', dayShort: 'Do', date: '6 aug', stay: 'messires' },
  { key: '2026-08-07', dayShort: 'Vr', date: '7 aug', stay: 'messires' },
  // Transferdag
  { key: '2026-08-08', dayShort: 'Za', date: '8 aug', label: 'Transferdag', stay: 'transfer' },
  // Week 2: Clervaux
  { key: '2026-08-09', dayShort: 'Zo', date: '9 aug', stay: 'clervaux' },
  { key: '2026-08-10', dayShort: 'Ma', date: '10 aug', stay: 'clervaux' },
  { key: '2026-08-11', dayShort: 'Di', date: '11 aug', stay: 'clervaux' },
  { key: '2026-08-12', dayShort: 'Wo', date: '12 aug', stay: 'clervaux' },
  { key: '2026-08-13', dayShort: 'Do', date: '13 aug', stay: 'clervaux' },
  { key: '2026-08-14', dayShort: 'Vr', date: '14 aug', stay: 'clervaux' },
  { key: '2026-08-15', dayShort: 'Za', date: '15 aug', label: 'Vertrek', stay: 'clervaux' },
];

// Voorgesteld startpunt — verschijnt op een lege planner
export const SUGGESTED_PLAN = {
  // Week 1: Vosges & Elzas
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
  '2026-08-07': ['d_relax', 'd_swim', 'd_bbq'],
  // Transferdag
  '2026-08-08': ['d_departure', 'cl_transfer', 'cl_settle'],
  // Week 2: Clervaux
  '2026-08-09': ['cl_walk', 'cl_castle'],
  '2026-08-10': ['cl_vianden_castle', 'cl_vianden_lift'],
  '2026-08-11': ['cl_mullerthal', 'cl_schiessentumpel'],
  '2026-08-12': ['cl_lux_city', 'cl_lux_corniche'],
  '2026-08-13': ['cl_bourscheid', 'cl_esch_lake'],
  '2026-08-14': ['cl_bastogne'],
  '2026-08-15': ['cl_departure'],
};
