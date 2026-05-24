# Vogezen 2026 — Familie Planner

Een gedeelde vakantieplanner voor de zomer 2026: eerst twee weken bij Domaine des Messires in de Vogezen, daarna een week in Clervaux (Luxemburg). 25 juli — 15 augustus. Het hele gezin kan via dezelfde URL activiteiten per dag inplannen, eigen ideeën toevoegen, en alle wijzigingen worden direct op de server bewaard.

Gebouwd met **Next.js 15** + **Upstash Redis** voor Vercel deployment.

## Belangrijkste features

- 📅 22 dagen vakantie als ingedeelde blokken (25 juli — 15 augustus)
- 🏕️ Twee verblijven gemarkeerd: Domaine des Messires (Vogezen) + Clervaux (Luxemburg)
- 🎯 ~55 vooringevulde activiteiten in 8 categorieën
- ✨ Voorgesteld schema staat erin als startpunt
- 👨‍👩‍👧‍👦 Server-side opslag: iedereen ziet dezelfde planning
- 📝 Naam-veld bij iedereen ("Laatst bijgewerkt door…")
- 🔄 Auto-sync met debounce + verversen op window focus
- 🔒 Optionele familie-PIN voor toegangsbeperking
- 📱 Mobiel-first: tap-based interactie, geen drag-and-drop
- 🌿 Eigen ontwerp met topografische achtergrond, Fraunces + DM Sans

## Eerste keer opzetten (~10 minuten)

### 1. Push naar GitHub

```bash
cd vosges-planner
git init
git add .
git commit -m "Initial commit"
# Maak een repo op github.com, dan:
git remote add origin git@github.com:JOUWUSER/vosges-planner.git
git branch -M main
git push -u origin main
```

### 2. Importeer naar Vercel

1. Ga naar [vercel.com/new](https://vercel.com/new)
2. Klik "Import Git Repository" en kies je `vosges-planner` repo
3. Klik **Deploy** (eerste deploy faalt waarschijnlijk omdat Redis nog niet bestaat — dat is OK)

### 3. Voeg Upstash Redis toe (gratis tier)

1. In je Vercel project: ga naar het **Storage** tabblad
2. Klik **Create Database** → kies **Redis** (powered by Upstash)
3. Kies een naam (bv. `vosges-planner-db`) en regio (Frankfurt is dichtbij)
4. Klik **Create** → Vercel maakt de database aan en koppelt hem automatisch
5. De omgevingsvariabelen `UPSTASH_REDIS_REST_URL` en `UPSTASH_REDIS_REST_TOKEN` worden automatisch ingesteld

De gratis tier van Upstash Redis is meer dan voldoende voor familie-gebruik (10.000 requests/dag).

### 4. (Optioneel) Familie-PIN instellen

Wil je dat alleen het gezin de planner kan zien? Voeg een PIN toe:

1. In je Vercel project: **Settings** → **Environment Variables**
2. Voeg toe: `FAMILY_PIN` = `jullie-geheim-getal` (bv. `7825`)
3. Sla op

Zonder deze variabele is de URL gewoon publiek (URL is dan de "geheime" toegangssleutel).

### 5. Redeploy

1. Ga naar **Deployments** → klik op de laatste deploy → **Redeploy**
2. Wacht ~1 minuut → klaar!

Je krijgt een URL als `https://vosges-planner-XXX.vercel.app`. Deel deze met het gezin.

## Lokaal ontwikkelen

```bash
npm install

# Pull env vars uit je Vercel project naar lokaal:
npx vercel link
npx vercel env pull .env.development.local

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Hoe werkt het qua data?

- Eén Redis-key (`vosges:family-plan`) bewat één JSON-object met:
  - `plan`: `{ '2026-07-25': ['d_arrival', ...], ... }`
  - `customActivities`: lijst van zelf toegevoegde activiteiten
  - `updatedAt` + `updatedBy` voor de "laatst bijgewerkt" indicator
- API routes:
  - `GET /api/plan` — haalt huidige staat op (incl. SUGGESTED_PLAN als nog niemand iets veranderd heeft)
  - `PUT /api/plan` — overschrijft de hele staat
- Sync: wijzigingen worden 500ms na de laatste actie naar de server gestuurd. Bij window-focus wordt automatisch opnieuw opgehaald, zodat updates van anderen verschijnen zodra je terugkomt op het tabblad.
- Conflictresolutie: last-write-wins. Voor een gezin is dat prima.

## Bestandsstructuur

```
vosges-planner/
├── app/
│   ├── api/plan/route.js   # GET + PUT endpoint
│   ├── layout.jsx          # Root layout met fonts
│   ├── page.jsx            # Server-rendered home page
│   └── globals.css         # Reset + Google Fonts
├── components/
│   └── Planner.jsx         # Het hele interactieve UI (client)
├── lib/
│   ├── data.js             # Activiteiten, dagen, kleuren, voorgesteld plan
│   └── redis.js            # Upstash Redis client wrapper
├── jsconfig.json           # @/ path alias
├── next.config.mjs
├── package.json
└── .env.example
```

## Aanpassen aan eigen smaak

- **Activiteiten toevoegen/verwijderen**: bewerk `lib/data.js` (constant `DEFAULT_ACTIVITIES`)
- **Categorieën aanpassen**: zelfde bestand, `CATEGORIES`
- **Datums aanpassen**: zelfde bestand, `DAYS`
- **Voorgesteld schema**: zelfde bestand, `SUGGESTED_PLAN` (gebruikt activity-id's)
- **Kleuren**: zelfde bestand, `COLORS`

Na lokale aanpassing → `git commit` + `git push` → Vercel deployt automatisch.

## Tip voor het gezin

Bij eerste bezoek: vul je naam in bovenaan rechts (achter het persoontje 👤). Dan zien anderen wie wat heeft gewijzigd via de "Laatst bijgewerkt door…" indicator.

## Licentie

MIT — doe ermee wat je wilt.
