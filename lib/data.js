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
  shops: { name: 'Supermarkten & winkels', color: '#6B7A5E', emoji: '🛒' },
  custom: { name: 'Eigen ideeën', color: '#7A6F5C', emoji: '✨' },
};

// Bouwt een Google Maps zoek-URL voor een activiteit
export function getMapsLink(activity) {
  if (!activity?.mapsQuery && !activity?.mapsPlaceId) return null;
  const query = encodeURIComponent(activity.mapsQuery || activity.name);
  let url = `https://www.google.com/maps/search/?api=1&query=${query}`;
  if (activity.mapsPlaceId) {
    url += `&query_place_id=${activity.mapsPlaceId}`;
  }
  return url;
}

// Past server-side location overrides toe op een activity.
// Override winnen van de ingebouwde defaults; null in override betekent "wissen".
export function applyLocationOverride(activity, overrides) {
  if (!activity || !overrides) return activity;
  const ov = overrides[activity.id];
  if (!ov) return activity;
  const merged = { ...activity };
  if (ov.coords !== undefined) merged.coords = ov.coords;
  if (ov.mapsQuery !== undefined) merged.mapsQuery = ov.mapsQuery;
  if (ov.mapsPlaceId !== undefined) merged.mapsPlaceId = ov.mapsPlaceId;
  if (ov.locationLabel !== undefined) merged.locationLabel = ov.locationLabel;
  return merged;
}

// Coördinaten van Domaine des Messires (camping zelf)
export const MESSIRES_COORDS = [48.16466, 6.74137];

// Coördinaten van Clervaux (centrum)
export const CLERVAUX_COORDS = [50.0547, 6.0312];

export const DEFAULT_ACTIVITIES = [
  // ============ WEEK 1: VOSGES & ELZAS ============

  // Camping & Meer (Domaine des Messires) — generiek, geen kaartlink behalve aan/vertrek
  { id: 'd_arrival', name: 'Aankomst & inrichten', emoji: '🚐', category: 'camping', mapsQuery: 'Domaine des Messires Herpelmont', coords: [48.16466, 6.74137] },
  { id: 'd_swim', name: 'Zwemmen in het meer', emoji: '🏊', category: 'camping', note: 'Privémeer 5 ha' },
  { id: 'd_canoe', name: 'Kanoën op het meer', emoji: '🛶', category: 'camping', note: 'Gratis op camping' },
  { id: 'd_sup', name: 'SUP / paddle', emoji: '🏄', category: 'camping', note: 'Gratis op camping' },
  { id: 'd_fish', name: 'No-kill vissen', emoji: '🎣', category: 'camping', note: 'Geen vergunning nodig' },
  { id: 'd_yoga', name: 'Yoga aan het meer', emoji: '🧘', category: 'camping', note: 'Vroege ochtend' },
  { id: 'd_bbq', name: 'BBQ op het terrein', emoji: '🔥', category: 'camping', note: 'Alleen BBQ op poten' },
  { id: 'd_relax', name: 'Lui hangen & lezen', emoji: '📖', category: 'camping' },
  { id: 'd_drone_lake', name: 'Drone-vlucht boven meer', emoji: '🛸', category: 'camping', note: 'Check eerst met receptie' },
  { id: 'd_departure', name: 'Inpakken & vertrek Messires', emoji: '👋', category: 'camping', mapsQuery: 'Domaine des Messires Herpelmont', coords: [48.16466, 6.74137] },

  // Wandelen (Vosges)
  { id: 'h_sentier_roches', name: 'Sentier des Roches', emoji: '🥾', category: 'hiking', note: '3-4u, smal rotspad — vroeg gaan', mapsPlaceId: 'ChIJq6kzYPvak0cRR4xJ18T5GXg', mapsQuery: 'Sentier des Roches Col de la Schlucht', coords: [48.0598, 7.0254] },
  { id: 'h_hohneck', name: 'Hohneck (1363m)', emoji: '🏔️', category: 'hiking', note: '360° uitzicht, gemzen mogelijk', mapsQuery: 'Hohneck Vosges France', coords: [48.0386, 6.9736] },
  { id: 'h_lacs', name: 'Tour des Lacs (Blanc + Noir)', emoji: '🏔️', category: 'hiking', note: '~4u rondwandeling', mapsQuery: 'Lac Blanc Lac Noir Vosges Orbey', coords: [48.1361, 7.0617] },
  { id: 'h_neves', name: 'Sentier des Névés', emoji: '🥾', category: 'hiking', note: 'Hoogteroute, panorama', mapsPlaceId: 'ChIJ987rQ9HRk0cRvSY_SoiGJgY', mapsQuery: 'Sentier des Névés Mittlach', coords: [48.0167, 7.0083] },
  { id: 'h_cascade_merelle', name: 'Cascade de Mérelle', emoji: '💧', category: 'hiking', note: 'Kort & fotogeniek', mapsPlaceId: 'ChIJ61jY2rPHk0cRm4wOA58Fn6M', mapsQuery: 'Cascade de Mérelle Gérardmer', coords: [48.0616, 6.8379] },
  { id: 'h_saut_cuves', name: 'Saut des Cuves', emoji: '💧', category: 'hiking', note: 'Korte waterval Xonrupt', mapsQuery: 'Saut des Cuves Xonrupt-Longemer', coords: [48.0758, 6.9219] },
  { id: 'h_gerardmer', name: 'Wandeling rond Lac Gérardmer', emoji: '🚶', category: 'hiking', note: '~1u30, vlak', mapsPlaceId: 'ChIJr_kFlv7Hk0cR9Ce5KrM2bRg', mapsQuery: 'Sentier du tour du lac de Gérardmer', coords: [48.0712, 6.867] },
  { id: 'h_herpelmont', name: 'Lokaal rondje Herpelmont', emoji: '🚶', category: 'hiking', note: 'Vanuit de camping' },
  { id: 'h_rainkopf', name: 'Rainkopf via Altenweiher', emoji: '🏔️', category: 'hiking', note: 'Minder druk dan Hohneck', mapsPlaceId: 'ChIJA4-D4hjQk0cRbjnFjWqWqMs', mapsQuery: 'Rainkopf Vosges', coords: [47.9956, 7.0033] },
  { id: 'h_pierre_percee', name: 'Lac de Pierre-Percée', emoji: '🛶', category: 'hiking', note: 'Smaragdgroen meer, wandel + kano', mapsPlaceId: 'ChIJmRLScdn0k0cRWcZMzyjar5U', mapsQuery: 'Lac de Pierre-Percée', coords: [48.4587, 6.9183] },
  { id: 'h_ballon_alsace', name: 'Ballon d\'Alsace (1247m)', emoji: '🏔️', category: 'hiking', note: 'Top met panorama, lichte klim', mapsQuery: 'Ballon d\'Alsace sommet', coords: [47.8211, 6.8456] },
  { id: 'h_lac_blanchemer', name: 'Lac de Blanchemer', emoji: '🥾', category: 'hiking', note: 'Stil veenmeer met houten vlonderpad', mapsQuery: 'Lac de Blanchemer La Bresse', coords: [48.0119, 6.9333] },
  { id: 'h_lac_corbeaux', name: 'Lac des Corbeaux', emoji: '🥾', category: 'hiking', note: 'La Bresse, rondwandeling ~1u30', mapsQuery: 'Lac des Corbeaux La Bresse', coords: [48.0014, 6.9011] },
  { id: 'h_lac_longemer', name: 'Lac de Longemer', emoji: '🏊', category: 'hiking', note: 'Glaciaal meer, zwemmen toegestaan', mapsQuery: 'Lac de Longemer Xonrupt', coords: [48.0764, 6.9461] },
  { id: 'h_lac_retournemer', name: 'Lac de Retournemer', emoji: '💧', category: 'hiking', note: 'Klein bergmeer met cascade', mapsQuery: 'Lac de Retournemer Xonrupt', coords: [48.0658, 6.9531] },
  { id: 'h_petit_drumont', name: 'Petit Drumont panorama', emoji: '🏔️', category: 'hiking', note: 'Kort, vanaf Col de Bussang', mapsQuery: 'Petit Drumont Bussang Vosges' },
  { id: 'h_tetes_des_faux', name: 'Tête des Faux (WO1)', emoji: '🥾', category: 'hiking', note: 'WO1-loopgraven nog zichtbaar', mapsQuery: 'Tête des Faux Vosges' },
  { id: 'h_via_ferrata_pierre', name: 'Via Ferrata Pierre-Percée', emoji: '🧗', category: 'hiking', note: 'Klimroute boven meer, level 2-3', mapsQuery: 'Via Ferrata Pierre-Percée', coords: [48.4592, 6.9183] },

  // Fietsen (Vosges)
  { id: 'b_mtb', name: 'MTB-rit Hautes-Vosges', emoji: '🚵', category: 'cycling', note: 'Huren op camping' },
  { id: 'b_bruyeres', name: 'Fietstocht naar Bruyères', emoji: '🚲', category: 'cycling', note: '~10 km enkele reis', mapsQuery: 'Bruyères Vosges 88600', coords: [48.2076, 6.7196] },
  { id: 'b_voies_vertes', name: 'Voies vertes', emoji: '🚲', category: 'cycling', note: 'Autovrije fietspaden' },
  { id: 'b_charmes_epinal', name: 'Voie verte Charmes-Épinal', emoji: '🚲', category: 'cycling', note: '~30km vlak, langs Moselle', mapsQuery: 'Voie Verte Moselle Charmes Épinal', coords: [48.2, 6.45] },
  { id: 'b_canal_vosges', name: 'Canal des Vosges fietspad', emoji: '🚲', category: 'cycling', note: 'Langs kanaal, autovrij + vlak', mapsQuery: 'Canal des Vosges Épinal', coords: [48.17, 6.45] },
  { id: 'b_xonrupt_loop', name: 'Rondje Lac de Gérardmer (fiets)', emoji: '🚲', category: 'cycling', note: '~6 km, geschikt voor kinderen', mapsQuery: 'Lac Gérardmer fietsen', coords: [48.07, 6.86] },

  // Elzas & Wijnroute
  { id: 'a_riquewihr', name: 'Riquewihr (vakwerkdorp)', emoji: '🏘️', category: 'alsace', mapsPlaceId: 'ChIJqyKWcABhkUcRUzzXHQ9yuQY', mapsQuery: 'Riquewihr Alsace', coords: [48.166, 7.2998] },
  { id: 'a_kaysersberg', name: 'Kaysersberg', emoji: '🏰', category: 'alsace', mapsQuery: 'Kaysersberg Alsace France', coords: [48.1379, 7.2641] },
  { id: 'a_eguisheim', name: 'Eguisheim', emoji: '🏘️', category: 'alsace', note: 'Plus beau village', mapsQuery: 'Eguisheim Alsace France', coords: [48.0427, 7.3072] },
  { id: 'a_ribeauville', name: 'Ribeauvillé', emoji: '🏰', category: 'alsace', mapsQuery: 'Ribeauvillé Alsace France', coords: [48.1958, 7.3214] },
  { id: 'a_dopff', name: 'Wijnproeverij Dopff au Moulin', emoji: '🍷', category: 'alsace', mapsPlaceId: 'ChIJKW18uqpgkUcRMYbMlEZZMn4', mapsQuery: 'Dopff au Moulin Riquewihr', coords: [48.1672, 7.2956] },
  { id: 'a_hugel', name: 'Wijnproeverij Hugel', emoji: '🍷', category: 'alsace', mapsPlaceId: 'ChIJq35u76lgkUcReQXt2whWlnk', mapsQuery: 'Famille Hugel Riquewihr', coords: [48.1665, 7.2978] },
  { id: 'a_horcher', name: 'Wijnproeverij Horcher', emoji: '🍷', category: 'alsace', note: 'Klein, familiaal, top', mapsPlaceId: 'ChIJq2I5MERnkUcRxu2NymlhPmU', mapsQuery: 'Wines of Alsace Horcher Mittelwihr', coords: [48.1428, 7.3187] },
  { id: 'a_route_vins', name: 'Wijnroute (rondrit)', emoji: '🍷', category: 'alsace', note: 'D1-bis door dorpen', mapsPlaceId: 'ChIJoRLBzHpnkUcR4NgENAk8uqU', mapsQuery: "Route des Vins d'Alsace Kaysersberg", coords: [48.1379, 7.2641] },
  { id: 'a_haut_koenigsbourg', name: 'Château du Haut-Kœnigsbourg', emoji: '🏰', category: 'alsace', mapsQuery: 'Château du Haut-Kœnigsbourg Orschwiller', coords: [48.2493, 7.3439] },
  { id: 'a_mittelbergheim', name: 'Mittelbergheim', emoji: '🏘️', category: 'alsace', note: 'Onbekend Plus beau village', mapsQuery: 'Mittelbergheim Alsace', coords: [48.4014, 7.4439] },
  { id: 'a_obernai', name: 'Obernai (vestingstadje)', emoji: '🏘️', category: 'alsace', note: 'Vakwerk + vestingmuren', mapsQuery: 'Obernai Alsace', coords: [48.4622, 7.4842] },
  { id: 'a_mont_sainte_odile', name: 'Mont Sainte-Odile', emoji: '⛪', category: 'alsace', note: 'Klooster op berg, panorama', mapsQuery: 'Mont Sainte-Odile Ottrott', coords: [48.4392, 7.4083] },
  { id: 'a_ecomusee', name: 'Écomusée d\'Alsace (Ungersheim)', emoji: '🏘️', category: 'alsace', note: 'Levend openluchtmuseum, hele dag', mapsPlaceId: 'ChIJdZnParh3kUcRiyO5UbMbgPY', mapsQuery: 'Écomusée d\'Alsace Ungersheim', coords: [47.8523, 7.2851] },
  { id: 'a_sainte_marie_mines', name: 'Sainte-Marie-aux-Mines zilvermijn', emoji: '⛏️', category: 'alsace', note: 'Echte mijngang, helm + laars aan', mapsPlaceId: 'ChIJaexVGuXhk0cRallogXnlv2s', mapsQuery: 'Tellure Mine d\'Argent', coords: [48.2137, 7.1373] },
  { id: 'a_storks_hunawihr', name: 'Ooievaarspark Hunawihr', emoji: '🪶', category: 'alsace', note: 'Vogelshow, ook otters & wezels', mapsQuery: 'Parc des Cigognes Hunawihr', coords: [48.18, 7.31] },
  { id: 'a_butterflies_hunawihr', name: 'Vlindertuin Hunawihr', emoji: '🦋', category: 'alsace', note: 'Tropische vlinders, naast ooievaarspark', mapsQuery: 'Jardins des Papillons Hunawihr' },
  { id: 'a_turckheim', name: 'Turckheim', emoji: '🏘️', category: 'alsace', note: 'Nachtwachter loopt nog dagelijks om 22u', mapsQuery: 'Turckheim Alsace', coords: [48.0867, 7.2725] },
  { id: 'a_neuf_brisach', name: 'Neuf-Brisach (Vauban)', emoji: '🏰', category: 'alsace', note: 'Octagonale vestingstad UNESCO', mapsQuery: 'Neuf-Brisach', coords: [48.0181, 7.5292] },

  // Colmar
  { id: 'c_oldtown', name: 'Colmar — Klein Venetië', emoji: '🛶', category: 'colmar', mapsPlaceId: 'ChIJV1IS1GRlkUcRO8b1nYYafrQ', mapsQuery: 'Petite Venise Colmar', coords: [48.0753, 7.3596] },
  { id: 'c_unterlinden', name: 'Unterlinden Museum', emoji: '🖼️', category: 'colmar', note: 'Isenheim-altaarstuk', mapsQuery: 'Musée Unterlinden Colmar', coords: [48.0801, 7.3552] },
  { id: 'c_market', name: 'Marché Couvert Colmar', emoji: '🥖', category: 'colmar', mapsQuery: 'Marché Couvert Colmar', coords: [48.0769, 7.3597] },

  // Steden verder weg (vanuit Vosges)
  { id: 's_strasbourg', name: 'Straatsburg — Kathedraal + Petite France', emoji: '🏛️', category: 'cities', note: '1u45 rijden', mapsPlaceId: 'ChIJQ4g5U1LIlkcROCde9XcnFec', mapsQuery: 'Cathédrale Notre-Dame de Strasbourg', coords: [48.5819, 7.751] },
  { id: 's_strasbourg_boat', name: 'Straatsburg — Batorama boottocht', emoji: '🚢', category: 'cities', note: '~1u15', mapsQuery: 'Batorama Strasbourg boottocht', coords: [48.5816, 7.7491] },
  { id: 's_basel', name: 'Basel (CH)', emoji: '🇨🇭', category: 'cities', note: '2u30+ rijden', mapsPlaceId: 'ChIJZ7ktPrK5kUcRUYQBN-iOkMk', mapsQuery: 'Basel Münster', coords: [47.5563, 7.592] },
  { id: 's_mulhouse', name: "Mulhouse — Cité de l'Automobile", emoji: '🚗', category: 'cities', note: 'Grootste autocollectie', mapsQuery: "Cité de l'Automobile Mulhouse", coords: [47.7763, 7.3208] },
  { id: 's_mulhouse_train', name: 'Mulhouse — Cité du Train', emoji: '🚂', category: 'cities', mapsQuery: 'Cité du Train Mulhouse', coords: [47.7359, 7.3262] },
  { id: 's_freiburg', name: 'Freiburg im Breisgau (D)', emoji: '🇩🇪', category: 'cities', note: '~2u rijden', mapsQuery: 'Freiburg im Breisgau Münster', coords: [47.9956, 7.8523] },
  { id: 's_europapark', name: 'Europa-Park Rust', emoji: '🎢', category: 'cities', note: 'Hele dag', mapsQuery: 'Europa-Park Rust', coords: [48.2664, 7.7219] },
  { id: 's_strasbourg_eu', name: 'Straatsburg — Europees Parlement', emoji: '🇪🇺', category: 'cities', note: 'Gratis bezoek (dinsdag-zaterdag), paspoort mee', mapsPlaceId: 'ChIJ3-PE_l_IlkcRXX-5JVm_iIM', mapsQuery: 'European Parliament Strasbourg', coords: [48.5976, 7.7686] },
  { id: 's_strasbourg_zoo', name: 'Straatsburg — Le Vaisseau', emoji: '🧪', category: 'cities', note: 'Wetenschapscentrum voor kinderen', mapsQuery: 'Le Vaisseau Strasbourg', coords: [48.5642, 7.7572] },
  { id: 's_epinal_imagerie', name: 'Épinal — Imagerie + Musée de l\'image', emoji: '🖼️', category: 'cities', note: 'Historische drukkerij + museum, ~45 min van camping', mapsPlaceId: 'ChIJYwcAVnmgk0cRJNyFk4KQwRs', mapsQuery: 'Imagerie d\'Épinal', coords: [48.184, 6.4467] },
  { id: 's_epinal_oldtown', name: 'Épinal — oude binnenstad', emoji: '🏙️', category: 'cities', note: 'Markt + kasteelruïne, lunch op terras', mapsQuery: 'Place des Vosges Épinal', coords: [48.173, 6.45] },
  { id: 's_plombieres', name: 'Plombières-les-Bains (thermen)', emoji: '♨️', category: 'cities', note: 'Historische badplaats, ook spa Calodaé', mapsPlaceId: 'ChIJ6dstTcKrk0cR6h32Xv0sBi0', mapsQuery: 'Plombières-les-Bains thermes', coords: [47.9628, 6.4554] },
  { id: 's_remiremont', name: 'Remiremont (arcades)', emoji: '🏛️', category: 'cities', note: 'Vakwerk + arcades + abdijkerk', mapsQuery: 'Remiremont centre-ville', coords: [48.0186, 6.5917] },
  { id: 's_nancy', name: 'Nancy — Place Stanislas', emoji: '🏛️', category: 'cities', note: 'UNESCO plein, ~1u rijden', mapsQuery: 'Place Stanislas Nancy', coords: [48.6936, 6.1834] },

  // Natuur & Wildlife (Vosges)
  { id: 'n_cretes', name: 'Route des Crêtes (D430)', emoji: '🛣️', category: 'nature', note: 'Hele dag scenic drive', mapsPlaceId: 'ChIJsx77KdDRk0cRcEtl5fEDZ10', mapsQuery: 'Route des Crêtes Vosges D430', coords: [48.0253, 6.9959] },
  { id: 'n_chamois', name: 'Gemzen spotten bij dageraad', emoji: '🦌', category: 'nature', note: 'Hohneck / Rainkopf', mapsQuery: 'Hohneck Vosges France', coords: [48.0386, 6.9736] },
  { id: 'n_sainte_croix', name: 'Parc Animalier Sainte-Croix', emoji: '🐺', category: 'nature', note: '1u15, wolven & lynxen', mapsQuery: 'Parc Animalier de Sainte-Croix Rhodes', coords: [48.7515, 6.9094] },
  { id: 'n_munster_cheese', name: 'Munster Vallei — kaasboerderij', emoji: '🧀', category: 'nature', mapsQuery: 'Munster vallei kaasboerderij ferme fromagère', coords: [48.0383, 7.137] },
  { id: 'n_storks', name: 'Ooievaars spotten Elzas', emoji: '🪶', category: 'nature', mapsQuery: 'Parc des Cigognes Hunawihr', coords: [48.18, 7.31] },
  { id: 'n_grand_ballon', name: 'Grand Ballon (1424m)', emoji: '🏔️', category: 'nature', note: 'Hoogste top van de Vogezen', mapsQuery: 'Grand Ballon Vosges', coords: [47.9011, 7.1003] },
  { id: 'n_aubure_observ', name: 'Sterrenhemel — Aubure', emoji: '🌌', category: 'nature', note: 'Hoogste dorp Elzas, min lichtvervuiling', mapsQuery: 'Aubure Alsace', coords: [48.1958, 7.205] },
  { id: 'n_jardin_altitude', name: 'Jardin d\'altitude du Haut-Chitelet', emoji: '🌸', category: 'nature', note: 'Botanische tuin 1228m hoogte, juli-augustus', mapsQuery: 'Jardin altitude Haut-Chitelet', coords: [48.0589, 6.9819] },
  { id: 'n_tourbiere_machais', name: 'Tourbière de Machais (veen)', emoji: '🌿', category: 'nature', note: 'Vlonderpad door uniek hoogveen', mapsQuery: 'Tourbière de Machais La Bresse' },
  { id: 'n_etang_sapins', name: 'Étang des Sapins', emoji: '🦆', category: 'nature', note: 'Klein bosmeer, wandelpad rondom', mapsQuery: 'Étang des Sapins Bruyères' },
  { id: 'n_observation_birds', name: 'Vogelobservatie Étang Lindre', emoji: '🦅', category: 'nature', note: 'Lotharingen, 800ha groot meer', mapsQuery: 'Étang du Lindre Lindre-Basse', coords: [48.78, 6.78] },

  // Eten & Markt (Vosges/Elzas)
  { id: 'f_market_bruyeres', name: 'Markt Bruyères', emoji: '🛒', category: 'food', note: 'Woensdag', mapsQuery: 'Place Stanislas Bruyères Vosges', coords: [48.2076, 6.7196] },
  { id: 'f_market_gerardmer', name: 'Markt Gérardmer', emoji: '🛒', category: 'food', note: 'Do + za', mapsQuery: 'Place du Tilleul Gérardmer marché', coords: [48.0716, 6.876] },
  { id: 'f_ferme_auberge', name: 'Ferme-auberge lunch', emoji: '🧀', category: 'food', note: 'Reserveer 1 dag vooraf' },
  { id: 'f_tarte_flambee', name: 'Tarte flambée + Riesling', emoji: '🍕', category: 'food', note: 'In een winstub' },
  { id: 'f_munster_kummel', name: 'Munster met kummel & aardappel', emoji: '🧀', category: 'food' },
  { id: 'f_market_remiremont', name: 'Markt Remiremont', emoji: '🛒', category: 'food', note: 'Zaterdag onder de arcades', mapsQuery: 'Remiremont marché', coords: [48.0186, 6.5917] },
  { id: 'f_market_epinal', name: 'Markt Épinal', emoji: '🛒', category: 'food', note: 'Place des Vosges, woensdag + zaterdag', mapsQuery: 'Place des Vosges Épinal marché', coords: [48.173, 6.45] },
  { id: 'f_distillerie_meyer', name: 'Distillerie Meyer Hohwarth', emoji: '🥃', category: 'food', note: 'Eau-de-vie proeven, Hohwarth (Elzas)', mapsQuery: 'Distillerie Meyer Hohwarth' },
  { id: 'f_chocolat_glaeser', name: 'Chocolaterie Bruntz Soultzeren', emoji: '🍫', category: 'food', note: 'Ambachtelijke chocolade in Munster-vallei', mapsQuery: 'Bruntz Chocolatier Soultzeren' },
  { id: 'f_brewery_lager', name: 'Brouwerij Lager Vosgienne', emoji: '🍺', category: 'food', note: 'Lokaal bier proeven', mapsQuery: 'Brasserie La Vosgienne' },

  // Supermarkten & winkels — Vogezen
  { id: 'sh_intermarche_bruyeres', name: 'Intermarché Bruyères', emoji: '🛒', category: 'shops', note: 'Ma-za 8:15-19:30, zo 8:30-12:15', mapsPlaceId: 'ChIJx0sMJAOWk0cR1RC-g2GUEXM', mapsQuery: 'Intermarché Bruyères', coords: [48.2066, 6.7222] },
  { id: 'sh_leclerc_bruyeres', name: 'E.Leclerc Bruyères', emoji: '🛒', category: 'shops', note: 'Di-za 8:30-19:30, ma+zo dicht', mapsPlaceId: 'ChIJOTrbJkq9k0cRJTBK5ALX0VA', mapsQuery: 'E.Leclerc Bruyères', coords: [48.1992, 6.7279] },
  { id: 'sh_lidl_bruyeres', name: 'Lidl Bruyères', emoji: '🛒', category: 'shops', note: 'Ma-za 8:30-20, zo 8:30-12:15', mapsPlaceId: 'ChIJtVr43oKXk0cREM26X0oBx0w', mapsQuery: 'Lidl Bruyères', coords: [48.2033, 6.7205] },
  { id: 'sh_proxi_bruyeres', name: 'Proxi 88 Bruyères', emoji: '🏪', category: 'shops', note: 'Iedere dag 9-22, late noodgevallen', mapsPlaceId: 'ChIJf2hU5BqWk0cRWN5w1rWvmMY', mapsQuery: 'Proxi 88 Bruyères', coords: [48.2105, 6.7202] },
  { id: 'sh_intermarche_gerardmer', name: 'Intermarché Gérardmer', emoji: '🛒', category: 'shops', note: 'Groot, ma-za 8:30-19:30, zo 8:30-12:30', mapsPlaceId: 'ChIJgyHMhorGk0cRzGjor3bsqbs', mapsQuery: 'Intermarché Gérardmer', coords: [48.0784, 6.8865] },
  { id: 'sh_boulangerie_bruyeres', name: 'Boulangerie Les Moulins de Barbara', emoji: '🥖', category: 'shops', note: 'Bakker Bruyères centrum, vanaf 4u open', mapsPlaceId: 'ChIJw2EdJ1yXk0cRgQ34SmFP3nM', mapsQuery: 'Les moulins de Barbara Bruyères', coords: [48.2112, 6.7183] },
  { id: 'sh_local_producten', name: 'Distributeur producten Vogezen', emoji: '🧀', category: 'shops', note: '24/7 automaat: kaas, vleeswaren, prepared meals', mapsPlaceId: 'ChIJUTVkXVuXk0cRfWHeJsMxWS4', mapsQuery: 'Distributeur produits locaux Bruyères', coords: [48.2028, 6.7222] },

  // ============ WEEK 2: CLERVAUX & LUXEMBURG ============

  // Verblijf / aankomst
  { id: 'cl_transfer', name: 'Reisdag Messires → Clervaux', emoji: '🚗', category: 'luxembourg', note: '~4u rijden, 350 km' },
  { id: 'cl_settle', name: 'Aankomst Clervaux & inrichten', emoji: '🏡', category: 'luxembourg', mapsQuery: 'Clervaux Luxembourg', coords: [50.0547, 6.0312] },
  { id: 'cl_departure', name: 'Inpakken & naar huis', emoji: '👋', category: 'luxembourg', mapsQuery: 'Clervaux Luxembourg', coords: [50.0547, 6.0312] },

  // Clervaux zelf
  { id: 'cl_castle', name: 'Kasteel Clervaux + Family of Man', emoji: '🏰', category: 'luxembourg', note: 'UNESCO foto-expositie van Steichen', mapsPlaceId: 'ChIJl1R4PFsIwEcRaQ17Kneh-Q0', mapsQuery: 'Clervaux Castle Luxembourg', coords: [50.0541, 6.0297] },
  { id: 'cl_abbey', name: 'Abdij Saint-Maurice', emoji: '⛪', category: 'luxembourg', note: 'Benedictijnen, gregoriaans', mapsQuery: 'Abbaye Saint-Maurice Clervaux', coords: [50.0563, 6.0277] },
  { id: 'cl_walk', name: 'Lokaal rondje Clervaux', emoji: '🚶', category: 'hiking', note: 'Ardense bosroutes', mapsQuery: 'Clervaux Luxembourg', coords: [50.0547, 6.0312] },
  { id: 'cl_castle_models', name: 'Maquettes Luxemburgse kastelen', emoji: '🏰', category: 'luxembourg', note: 'In Kasteel Clervaux, 1:100', mapsPlaceId: 'ChIJl1R4PFsIwEcRaQ17Kneh-Q0', mapsQuery: 'Clervaux Castle Luxembourg', coords: [50.0541, 6.0297] },

  // Vianden
  { id: 'cl_vianden_castle', name: 'Kasteel Vianden', emoji: '🏰', category: 'luxembourg', note: 'Meest iconisch kasteel van LU', mapsPlaceId: 'ChIJAViZ7X37v0cRIr2yg5fv88M', mapsQuery: 'Vianden Castle Luxembourg', coords: [49.9351, 6.2031] },
  { id: 'cl_vianden_lift', name: 'Vianden kabelbaan (telesiège)', emoji: '🚡', category: 'luxembourg', note: 'Open stoeltjeslift, top uitzicht', mapsPlaceId: 'ChIJ5bTraJ38v0cRnAGOKLnMAwo', mapsQuery: 'Chairlift Vianden', coords: [49.9382, 6.2058] },
  { id: 'cl_vianden_walk', name: 'Wandeling Our-vallei Vianden', emoji: '🥾', category: 'hiking', mapsQuery: 'Vianden Our vallei wandelroute', coords: [49.9341, 6.2014] },

  // Andere kastelen
  { id: 'cl_bourscheid', name: 'Kasteel Bourscheid', emoji: '🏰', category: 'luxembourg', note: 'Op heuveltop, panorama', mapsQuery: 'Bourscheid Castle Luxembourg', coords: [49.911, 6.0578] },
  { id: 'cl_beaufort', name: 'Kastelen Beaufort', emoji: '🏰', category: 'luxembourg', note: 'Twee kastelen naast elkaar', mapsQuery: 'Beaufort Castle Luxembourg', coords: [49.8367, 6.2867] },
  { id: 'cl_esch_sauer', name: 'Esch-sur-Sûre dorp + ruïne', emoji: '🏰', category: 'luxembourg', note: 'Pittoresk in lus van Sûre', mapsQuery: 'Esch-sur-Sûre Luxembourg', coords: [49.9106, 5.9381] },

  // Mullerthal / Petite Suisse
  { id: 'cl_mullerthal', name: 'Mullerthal Trail (Petite Suisse)', emoji: '🥾', category: 'hiking', note: 'Sandsteenformaties, mossig', mapsPlaceId: 'ChIJAdv4ythflUcRCHSqvnmGTdU', mapsQuery: 'Mullerthal Trail Echternach', coords: [49.8061, 6.3458] },
  { id: 'cl_schiessentumpel', name: 'Schiessentümpel waterval', emoji: '💧', category: 'hiking', note: '3-traps waterval, iconisch', mapsQuery: 'Schiessentümpel waterval Mullerthal', coords: [49.8064, 6.3061] },
  { id: 'cl_berdorf', name: 'Berdorf rotswandeling', emoji: '🪨', category: 'hiking', note: 'Klimroutes & rotsdoorgangen', mapsQuery: 'Berdorf Luxembourg klimroutes', coords: [49.8284, 6.3494] },

  // Steden in Luxemburg
  { id: 'cl_lux_city', name: 'Luxemburg-stad — Bock Casematten', emoji: '🇱🇺', category: 'luxembourg', note: 'Ondergrondse tunnels', mapsPlaceId: 'ChIJNW7n4zJPlUcRc95AAJEMmcY', mapsQuery: 'Casemates du Bock Luxembourg City', coords: [49.6116, 6.1319] },
  { id: 'cl_lux_corniche', name: 'Luxemburg-stad — Chemin de la Corniche', emoji: '🏙️', category: 'luxembourg', note: '"Mooiste balkon van Europa"', mapsQuery: 'Chemin de la Corniche Luxembourg', coords: [49.6107, 6.135] },
  { id: 'cl_mudam', name: 'MUDAM (modern art museum)', emoji: '🖼️', category: 'luxembourg', note: 'Architectuur I.M. Pei, Kirchberg', mapsPlaceId: 'ChIJrZbnDjFPlUcRriw1h1HQDr4', mapsQuery: 'Mudam Luxembourg', coords: [49.6171, 6.1403] },
  { id: 'cl_philharmonie', name: 'Philharmonie Luxembourg', emoji: '🎵', category: 'luxembourg', note: 'Iconische zaal, agenda checken', mapsPlaceId: 'ChIJwUtUxTBPlUcRJt5a3LF36g8', mapsQuery: 'Philharmonie Luxembourg', coords: [49.6186, 6.1425] },
  { id: 'cl_lux_history', name: 'Luxembourg City History Museum', emoji: '🏛️', category: 'luxembourg', note: 'Door middeleeuws huis + glazen lift', mapsPlaceId: 'ChIJnWzft9JIlUcRAnLtJkouNYQ', mapsQuery: 'Luxembourg City History Museum', coords: [49.6101, 6.1337] },
  { id: 'cl_lux_palace', name: 'Groothertogelijk Paleis', emoji: '🏰', category: 'luxembourg', note: 'Wisseling wacht overdag', mapsQuery: 'Palais Grand-Ducal Luxembourg', coords: [49.6114, 6.1311] },
  { id: 'cl_lux_pfaffenthal_lift', name: 'Pfaffenthal panoramalift', emoji: '🚡', category: 'luxembourg', note: 'Gratis glazen lift met spectaculair uitzicht', mapsQuery: 'Pfaffenthal panoramalift', coords: [49.6164, 6.1306] },
  { id: 'cl_belval', name: 'Belval hoogovens (Esch)', emoji: '🏭', category: 'luxembourg', note: 'Klim in oude hoogoven, €5', mapsPlaceId: 'ChIJ8TCR89TK6kcRh3dPBu6ppZk', mapsQuery: 'Hauts Fourneaux Belval', coords: [49.5012, 5.9481] },
  { id: 'cl_echternach', name: 'Echternach (oudste stad)', emoji: '🏘️', category: 'luxembourg', note: 'Abdijbasiliek, Romeinse villa', mapsQuery: 'Echternach Luxembourg', coords: [49.8124, 6.4239] },
  { id: 'cl_echternach_lake', name: 'Echternach meer (zwemmen + speeltuin)', emoji: '🏊', category: 'luxembourg', note: 'Grootste recreatiemeer, ook adventure playground', mapsPlaceId: 'ChIJDT5Nil9flUcRPtk7XlC4LEU', mapsQuery: 'Echternacher See Adventure Playground', coords: [49.8039, 6.4111] },
  { id: 'cl_wiltz', name: 'Wiltz', emoji: '🏘️', category: 'luxembourg', mapsQuery: 'Wiltz Luxembourg', coords: [49.9667, 5.9333] },
  { id: 'cl_diekirch_military', name: 'Diekirch — Militair museum (Battle of the Bulge)', emoji: '🪖', category: 'luxembourg', note: 'Indrukwekkende diorama\'s WO2, €5', mapsPlaceId: 'ChIJC7xidpT9v0cRHk-W1IJwkKo', mapsQuery: 'National Museum Military History Diekirch', coords: [49.871, 6.1596] },
  { id: 'cl_esch_sauer_wool', name: 'Esch-sur-Sûre wolspinnerij', emoji: '🐑', category: 'luxembourg', note: 'Oude wolfabriek + winkel', mapsQuery: 'Robbesscheier Esch-sur-Sûre' },
  { id: 'cl_robbesscheier', name: 'Robbesscheier (boerderij Munshausen)', emoji: '🐴', category: 'luxembourg', note: 'Familieboerderij + ezelritjes, vlakbij Clervaux', mapsQuery: 'Robbesscheier Munshausen', coords: [50.025, 6.067] },
  { id: 'cl_consdorf_park', name: 'Parc Hueltz Consdorf', emoji: '🌳', category: 'luxembourg', note: 'Kleurrijk speelbos voor kinderen', mapsQuery: 'Parc Hueltz Consdorf' },

  // Natuur Ardennen
  { id: 'cl_esch_lake', name: 'Esch-sur-Sûre stuwmeer — zwemmen', emoji: '🏊', category: 'nature', note: 'Leifrëch of Lultzhausen plage', mapsPlaceId: 'ChIJ6T-tOFUCwEcRMugEfLyGSqc', mapsQuery: 'Plage de Lultzhausen Luxembourg', coords: [49.8967, 5.9583] },
  { id: 'cl_naturpark_our', name: 'Naturpark Our wandeling', emoji: '🌲', category: 'nature', note: 'Grensgebied LU-DE', mapsQuery: 'Naturpark Our Luxembourg', coords: [50.0667, 6.1167] },
  { id: 'cl_naturpark_sure', name: 'Naturpark Öewersauer', emoji: '🌲', category: 'nature', mapsQuery: 'Naturpark Öewersauer Luxembourg', coords: [49.9333, 5.9] },
  { id: 'cl_belvedere_esch', name: 'Belvédère Esch-sur-Sûre', emoji: '🏔️', category: 'nature', note: 'Uitzichttoren over stuwmeer', mapsQuery: 'Belvédère Esch-sur-Sûre Burfelt', coords: [49.8917, 5.9433] },
  { id: 'cl_gorges_loup', name: 'Gorges du Loup', emoji: '🥾', category: 'hiking', note: 'Spectaculaire rotskloof + uitzichtpunt over Echternach', mapsPlaceId: 'ChIJ9Xa3OsRflUcRMmkPa5RDp6M', mapsQuery: 'Gorges du Loup Echternach', coords: [49.8156, 6.4024] },
  { id: 'cl_predikstoul', name: 'Predikstoul (rots-uitzicht)', emoji: '🪨', category: 'hiking', note: 'Indrukwekkende rotswand bij Berdorf', mapsQuery: 'Predigtstuhl Berdorf' },
  { id: 'cl_huellay', name: 'Huellay rotsformatie', emoji: '🪨', category: 'hiking', note: 'Doorgang door smalle rotsspleet, Mullerthal', mapsQuery: 'Huellay Berdorf' },
  { id: 'cl_ourdall_promenade', name: 'Ourdall fietspad/wandelpad', emoji: '🚲', category: 'cycling', note: 'Langs de Our-rivier, vlak en mooi', mapsQuery: 'Ourdall Vianden' },
  { id: 'cl_solar_telescope', name: 'Tweedeltelescoop Wormeldange', emoji: '🌌', category: 'nature', note: 'Astronomisch observatorium', mapsQuery: 'Astronomical Observatory Wormeldange' },
  { id: 'cl_kayl_minett_park', name: 'Minett UNESCO Biosfeer', emoji: '🌍', category: 'nature', note: 'Oud mijngebied, hersteld natuurpark', mapsQuery: 'Minett UNESCO Biosphere Luxembourg' },

  // Fietsen Ardennen
  { id: 'cl_vennbahn', name: 'Vennbahn fietsroute', emoji: '🚲', category: 'cycling', note: '125 km oude spoorlijn LU-BE-DE', mapsQuery: 'Vennbahn Troisvierges Luxembourg', coords: [50.1133, 6.0017] },
  { id: 'cl_pc15', name: 'PC15 langs de Our', emoji: '🚲', category: 'cycling', note: 'Vlak, langs rivier', mapsQuery: 'PC15 piste cyclable Our Luxembourg', coords: [49.95, 6.1583] },
  { id: 'cl_pc16', name: 'PC16 Sûre-vallei fietsroute', emoji: '🚲', category: 'cycling', note: 'Door Naturpark Öewersauer', mapsQuery: 'PC16 piste cyclable Sûre' },

  // Grensgebied
  { id: 'cl_bastogne', name: 'Bastogne (BE) — Mardasson + War Museum', emoji: '🪖', category: 'cities', note: 'WO2, ~45 min rijden', mapsPlaceId: 'ChIJp7FWrZAZwEcRHpFa7jR56Y8', mapsQuery: 'Mardasson Memorial Bastogne', coords: [50.0033, 5.7167] },
  { id: 'cl_trier', name: 'Trier (DE) — Porta Nigra', emoji: '🏛️', category: 'cities', note: 'Romeinse stadspoort, ~1u', mapsPlaceId: 'ChIJq3oH0pF8lUcR_dsvKfOvlo0', mapsQuery: 'Porta Nigra Trier', coords: [49.7596, 6.6443] },
  { id: 'cl_trier_baths', name: 'Trier (DE) — Kaiserthermen', emoji: '🏛️', category: 'cities', note: 'Romeinse keizerbaden, indrukwekkend', mapsQuery: 'Kaiserthermen Trier' },
  { id: 'cl_durbuy', name: 'Durbuy (BE) — kleinste stad', emoji: '🏘️', category: 'cities', note: 'Middeleeuws stadje, ~1u15 rijden', mapsQuery: 'Durbuy Belgium', coords: [50.3528, 5.4569] },
  { id: 'cl_la_roche', name: 'La Roche-en-Ardenne (BE)', emoji: '🏰', category: 'cities', note: 'Kasteelruïne + Ardense ham', mapsQuery: 'La Roche-en-Ardenne', coords: [50.182, 5.578] },
  { id: 'cl_houffalize', name: 'Houffalize (BE)', emoji: '🏘️', category: 'cities', note: 'Bekend MTB-gebied, ~30 min', mapsQuery: 'Houffalize Belgium' },
  { id: 'cl_monschau', name: 'Monschau (DE)', emoji: '🏘️', category: 'cities', note: 'Vakwerk in een diepe vallei, ~1u30', mapsQuery: 'Monschau Germany', coords: [50.5556, 6.2456] },

  // Eten Luxemburg
  { id: 'cl_judd', name: 'Judd mat Gaardebounen', emoji: '🍽️', category: 'food', note: 'LU nationaal gerecht: ham + bonen' },
  { id: 'cl_gromperekichelcher', name: 'Gromperekichelcher', emoji: '🥔', category: 'food', note: 'Aardappelpannenkoek, markt' },

  // Supermarkten & winkels — Luxemburg
  { id: 'sh_costavert_clervaux', name: 'Costavert Clervaux', emoji: '🏪', category: 'shops', note: 'Klein, in centrum Clervaux, ma-za 8-18 (gesloten 12-14)', mapsPlaceId: 'ChIJS3iHGlcIwEcRlTav2K5fd5A', mapsQuery: 'Costavert Clervaux', coords: [50.0600, 6.0238] },
  { id: 'sh_nordstrooss_marnach', name: 'Nordstrooss Shopping Mile Marnach', emoji: '🛍️', category: 'shops', note: '5 min van Clervaux, Cactus + winkels, ma dicht', mapsPlaceId: 'ChIJIwzykjT3v0cRufH2Pi7M93M', mapsQuery: 'Nordstrooss Shopping Marnach', coords: [50.0510, 6.0727] },
  { id: 'sh_massen', name: 'Shopping-Center Massen (Wemperhardt)', emoji: '🛍️', category: 'shops', note: '80+ winkels, ook open op zondag 8-18', mapsPlaceId: 'ChIJiWK_pVgKwEcRfc5Iqthaa9E', mapsQuery: 'Shopping-Center Massen Wemperhardt', coords: [50.1486, 6.0574] },
  { id: 'sh_delhaize_huldange', name: 'Delhaize Huldange', emoji: '🛒', category: 'shops', note: 'Grens met BE, ma-zo open (ma 8-19)', mapsPlaceId: 'ChIJqc7oyTkLwEcRjpZZrVxEA_Q', mapsQuery: 'Delhaize Huldange', coords: [50.1807, 6.0224] },
  { id: 'sh_delhaize_vianden', name: 'Delhaize Vianden (Shop n Go)', emoji: '🏪', category: 'shops', note: 'Tankstation, 6:30-21 alle dagen', mapsPlaceId: 'ChIJc74wdib9v0cR4wxtsEbLkkw', mapsQuery: 'Shop n Go Delhaize Vianden', coords: [49.9326, 6.2193] },
  { id: 'sh_epicerie_vianden', name: 'Epicerie Matos Vianden', emoji: '🏪', category: 'shops', note: 'Klein, centrum Vianden, ma-zo (gesloten 12-14)', mapsPlaceId: 'ChIJQwThzIL8v0cR51pVAFudhnk', mapsQuery: 'Epicerie Matos Vianden', coords: [49.9334, 6.2060] },
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
