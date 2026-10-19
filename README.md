# 5sola.ro — Site-ul Asociației 5 Sola

Site-ul oficial al **Asociației 5 Sola** (_"În sprijinul Bisericii"_), o organizație din România care promovează valorile Reformei Protestante prin conferințe biblice și resurse teologice.

**Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion

---

## Cuprins

1. [Pornire locală](#pornire-locală)
2. [Structura proiectului](#structura-proiectului)
3. [Cum funcționează conținutul](#cum-funcționează-conținutul)
4. [Adăugarea unui eveniment nou](#adăugarea-unui-eveniment-nou)
5. [Modificarea unui eveniment existent](#modificarea-unui-eveniment-existent)
6. [Arhivarea unui eveniment trecut](#arhivarea-unui-eveniment-trecut)
7. [Modificarea echipei](#modificarea-echipei)
8. [Modificarea celor 5 Sola](#modificarea-celor-5-sola)
9. [Pagini și rute](#pagini-și-rute)
10. [Teme și stiluri](#teme-și-stiluri)
11. [Variabile de mediu](#variabile-de-mediu)
12. [Deployment](#deployment)
13. [Versiunea în limba engleză](#versiunea-în-limba-engleză)
14. [Administrare (/admin)](#administrare-admin)

---

## Pornire locală

**Cerințe:** Node.js 18+

```bash
# 1. Clonează repo-ul
git clone https://github.com/[org]/5sola.git
cd 5sola

# 2. Instalează dependențele
npm install

# 3. Configurează variabilele de mediu
cp .env.example .env.local
# Editează .env.local dacă este nevoie (vezi secțiunea Variabile de mediu)

# 4. Pornește serverul de development
npm run dev
```

Deschide [http://localhost:3000](http://localhost:3000) în browser.

**Alte comenzi utile:**

```bash
npm run build    # Build de producție
npm run start    # Pornește serverul de producție (după build)
npm run lint     # Verificare cod cu ESLint
```

---

## Structura proiectului

```
5sola/
├── app/                        # Next.js App Router — pagini și layout
│   ├── layout.tsx              # Layout global (Navbar, Footer, ThemeProvider)
│   ├── page.tsx                # Pagina principală (/)
│   ├── template.tsx            # Animații de tranziție între pagini
│   ├── globals.css             # Stiluri globale și variabile CSS
│   ├── ce-credem/page.tsx      # Pagina "Ce credem" (/ce-credem)
│   ├── cine-suntem/page.tsx    # Pagina "Cine suntem" (/cine-suntem)
│   ├── contact/page.tsx        # Pagina de contact (/contact)
│   └── evenimente/
│       ├── page.tsx            # Lista evenimentelor (/evenimente)
│       └── [slug]/
│           ├── page.tsx        # Detaliu eveniment (/evenimente/[slug])
│           └── EvenimentDetailContent.tsx
│
├── components/                 # Componente reutilizabile
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── EventCard.tsx
│   ├── BiblicalQuote.tsx
│   ├── NewsletterForm.tsx
│   ├── ThemeProvider.tsx
│   └── ThemeToggle.tsx
│
├── data/                       # Fișierele cu date (conținut editabil)
│   ├── events/                 # ⭐ Conferințe și evenimente — un fișier per eveniment
│   │   └── <slug>.json
│   ├── team.json               # ⭐ Membrii echipei
│   └── beliefs.json            # ⭐ Cele 5 Sola (credințe)
│
├── lib/
│   └── utils.ts                # Funcții utilitare (formatDate, cn, etc.)
│
├── types.ts                    # Definiții TypeScript
├── next.config.ts              # Configurație Next.js
└── .env.example                # Template variabile de mediu
```

> **Regula de bază:** Tot conținutul vizibil pe site (evenimente, echipă, credințe) se editează exclusiv în fișierele din `data/`. Nu este nevoie să modifici codul sursă pentru actualizări de conținut.

---

## Cum funcționează conținutul

Fișierele JSON din `data/` controlează conținutul principal al site-ului:

| Fișier | Pagini afectate | Ce conține |
|---|---|---|
| `data/events/<slug>.json` | `/evenimente`, `/evenimente/[slug]`, `/` (homepage) | Câte un fișier per conferință: vorbitori, program, linkuri, traducerea EN |
| `data/team.json` | `/cine-suntem` | Membrii echipei |
| `data/beliefs.json` | `/ce-credem` | Descrierile celor 5 Sola |

---

## Adăugarea unui eveniment nou

Creează un fișier nou `data/events/<slug>.json` (ex. `data/events/sola-gratia-2027.json`). Ordinea pe site se face automat după `startDate`. **Evenimentele viitoare apar automat în tab-ul "Viitoare"**, iar cele trecute în "Arhivă" — diferența se face pe baza câmpului `endDate`.

### Toate câmpurile unui eveniment

```json
{
  "title": "Sola Gratia: Harul lui Dumnezeu",
  "startDate": "2027-04-10",
  "endDate": "2027-04-11",
  "location": "Cluj-Napoca, Casa de Cultură a Studenților",
  "locationUrl": "https://maps.google.com/?q=Casa+de+Cultura+Cluj-Napoca",
  "description": "O conferință despre harul suveran al lui Dumnezeu în mântuire.",
  "image": "/images/events/sola-gratia-2027.jpg",
  "registrationDeadline": "2027-04-05",
  "stripeLink": "https://buy.stripe.com/...",
  "stripeLinkFamily": "https://buy.stripe.com/...",
  "youtubePlaylist": "PLxxxxxxxxxxxxxxxx",
  "qaDetails": {
    "formId": "ID_FORMULAR_GOOGLE",
    "entryField": "entry.123456789"
  },
  "speakers": [
    {
      "name": "Numele Vorbitorului",
      "role": "Pastor / Profesor / Misionar",
      "image": "/images/echipa/vorbitor.jpg",
      "bio": "Descriere scurtă a vorbitorului, background teologic și lucrare."
    }
  ],
  "topics": [
    "Harul prevenient",
    "Alegerea și predestinarea",
    "Harul în viața de zi cu zi"
  ],
  "schedule": [
    {
      "day": "Ziua 1 — Vineri, 10 Aprilie",
      "items": [
        { "time": "09:00", "activity": "Înregistrare & Cafea" },
        { "time": "10:00", "activity": "Sesiunea 1", "topic": "Harul în Vechiul Testament", "speaker": "Numele Vorbitorului" },
        { "time": "12:00", "activity": "Prânz" },
        { "time": "14:00", "activity": "Sesiunea 2", "topic": "Harul în Noul Testament", "speaker": "Numele Vorbitorului" },
        { "time": "16:30", "activity": "Panel Q&A" }
      ]
    },
    {
      "day": "Ziua 2 — Sâmbătă, 11 Aprilie",
      "items": [
        { "time": "09:00", "activity": "Rugăciune & Devoțional" },
        { "time": "10:00", "activity": "Sesiunea 3", "topic": "Harul și sfințirea", "speaker": "Numele Vorbitorului" },
        { "time": "12:00", "activity": "Prânz" },
        { "time": "14:00", "activity": "Sesiunea 4", "topic": "Trăind din har", "speaker": "Numele Vorbitorului" },
        { "time": "17:00", "activity": "Slujbă de închidere" }
      ]
    }
  ],
  "en": {
    "title": "Sola Gratia: The Grace of God",
    "location": "Cluj-Napoca, Student Culture House",
    "description": "A conference on God's sovereign grace in salvation.",
    "registrationNote": "The price does not include lunch or dinner."
  }
}
```

### Descrierea câmpurilor

| Câmp | Obligatoriu | Descriere |
|---|---|---|
| `title` | Da | Titlul conferinței, afișat mare pe hero și pe carduri |
| `startDate` | Da | Data de început, format `YYYY-MM-DD` |
| `endDate` | Da | Data de sfârșit, format `YYYY-MM-DD`; determină dacă evenimentul e viitor sau arhivat |
| `location` | Da | Textul locației afișat pe site |
| `description` | Da | Descriere scurtă (1-2 propoziții), apare pe hero și pe carduri |
| `speakers` | Nu | Array cu vorbitorii; dacă lipsește, e tratat ca gol |
| `topics` | Nu | Array de teme/subiecte abordate; dacă lipsește, e tratat ca gol |
| `schedule` | Nu | Array cu zilele și programul; dacă lipsește, e tratat ca gol |
| `locationUrl` | Nu | Link Google Maps; dacă lipsește, locația apare ca text simplu |
| `image` | Nu | Imaginea principală a evenimentului, afișată în hero și pe carduri |
| `registrationDeadline` | Nu | Data limită de înregistrare, format `YYYY-MM-DD`; după această dată înscrierile se închid automat |
| `registrationClosed` | Nu | `true` închide înscrierile imediat, indiferent de termen; `false` sau lipsă = deschise (până la termen) |
| `stripeLink` | Nu | URL Stripe pentru cumpărare bilete (înscriere individuală); dacă lipsește, butonul de bilete nu apare |
| `stripeLinkFamily` | Nu | URL Stripe pentru înscrierea de familie; dacă există, apar două butoane: "Înscriere individuală" și "Înscriere familie" |
| `registrationNote` | Nu | Notă afișată sub butoanele de înscriere pe pagina evenimentului (ex. "Prețul nu include mesele de prânz și cina.") |
| `youtubePlaylist` | Nu | ID-ul playlist-ului YouTube (ex. `PLxxxxxxxx`); dacă lipsește, secțiunea video nu apare |
| `qaDetails` | Nu | Activează pagina Q&A live (`/evenimente/[slug]/qa`) în timpul conferinței, printr-un formular Google Forms |
| `qaDetails.formId` | — | ID-ul formularului Google Forms (partea dintre `/d/e/` și `/viewform`) |
| `qaDetails.entryField` | — | Numele câmpului din formular în care se trimite întrebarea |
| `en` | Nu | Traducerea pentru `/en`: doar `title`, `location`, `description`, `registrationNote`. Orice câmp lipsă sau gol rămâne în română; programul, vorbitorii și temele rămân mereu în română |

> Câmpurile opționale lăsate goale (`""` sau `null`) sunt ignorate, ca și cum n-ar exista. Dacă un fișier e invalid (JSON stricat, câmp obligatoriu lipsă, dată în alt format decât `YYYY-MM-DD`, `slug` duplicat), build-ul se oprește cu un mesaj care numește fișierul — site-ul live nu este afectat.

### Câmpurile unui vorbitor (`speakers[]`)

| Câmp | Obligatoriu | Descriere |
|---|---|---|
| `name` | Da | Numele complet |
| `role` | Da | Titlul/rolul afișat sub nume (ex. `"Pastor, Biserica X"`) |
| `image` | Da | Calea sau URL-ul fotografiei |
| `bio` | Nu | Biografie scurtă, afișată pe pagina evenimentului |

### Câmpurile din program (`schedule[].items[]`)

| Câmp | Obligatoriu | Descriere |
|---|---|---|
| `time` | Da | Ora sesiunii, format `HH:MM` |
| `activity` | Da | Numele activității (ex. `"Sesiunea 1"`, `"Prânz"`) |
| `topic` | Nu | Subiectul sesiunii, afișat pe pagina de orar |
| `speaker` | Nu | Numele vorbitorului acelei sesiuni |

### Numele fișierului = adresa paginii

- Numele fișierului (fără `.json`) este slug-ul evenimentului: `data/events/sola-gratia-2027.json` → `/evenimente/sola-gratia-2027`
- Folosește doar litere mici, cifre și cratime
- Fișierul nu conține `id` sau `slug` — se deduc din numele fișierului
- Redenumirea fișierului schimbă URL-ul paginii (linkurile vechi nu vor mai funcționa)

### Imagini

Poți folosi:
- **Fișier local** (recomandat): pune imaginea în `public/images/events/` și referențiaz-o ca `"image": "/images/events/nume.jpg"`
- **URL extern**: `"image": "https://domeniu.com/foto.jpg"` — dacă folosești un domeniu nou, trebuie adăugat în `next.config.ts` la `images.remotePatterns`, altfel Next.js va bloca imaginea
- **Placeholder temporar**: `"image": "https://picsum.photos/seed/NUME/800/600"`

---

## Logica paginii principale (`/`)

### Ce eveniment apare în hero

Pagina principală afișează **un singur eveniment featured** în secțiunea hero, ales automat astfel:

1. **Dacă există cel puțin un eveniment viitor** (adică `endDate >= azi`): se afișează **cel mai apropiat eveniment viitor** (cel cu `startDate` cel mai mic).
2. **Dacă nu există niciun eveniment viitor**: se afișează **ultimul eveniment din arhivă** (cel cu `endDate` cel mai recent).

### Grila de sub hero ("Evenimente viitoare" / "Evenimente recente")

Sub hero apar **maxim 3 carduri** suplimentare, cu aceeași logică:
- Dacă sunt viitoare: celelalte viitoare (excluzând cel din hero), maxim 3.
- Dacă nu sunt viitoare: celelalte din arhivă (sortate descrescător după dată), maxim 3.

### Logica butoanelor din hero

Butonul principal din hero se schimbă dinamic în funcție de starea evenimentului:

| Condiție | Buton afișat |
|---|---|
| **Nu există evenimente viitoare** | "Urmărește Înregistrările" → pagina evenimentului |
| **Evenimentul e în desfășurare** (`startDate <= azi <= endDate`) **și are `qaDetails`** | "Întrebări & Răspunsuri" → `/evenimente/[slug]/qa` |
| **Înregistrarea e deschisă** (`registrationClosed` nu e `true` și azi ≤ `registrationDeadline` sau câmpul lipsește) **și există `stripeLink`** | "Înscrie-te acum" → link Stripe; dacă există și `stripeLinkFamily`, apar două butoane: "Înscriere individuală" și "Înscriere familie" |
| **Orice altă situație** (înregistrare închisă, fără Stripe, fără Q&A) | "Contactează-ne" → WhatsApp |

Al doilea buton ("Află mai multe") duce mereu la pagina detaliată a evenimentului.

### Eticheta din hero

- Dacă există viitoare: afișează `Evenimentul curent`
- Dacă nu există viitoare: afișează `Ultimul eveniment` + un text italic care informează că nu sunt evenimente programate

---

## Modificarea unui eveniment existent

1. Deschide `data/events/<slug>.json`
2. Editează câmpurile dorite
3. Salvează — modificările se reflectă imediat în dev (`npm run dev`)

**Exemple comune:**

- **Actualizare dată:** schimbă `startDate` / `endDate` (format: `YYYY-MM-DD`)
- **Adăugare vorbitor:** adaugă un obiect nou în array-ul `"speakers"`
- **Adăugare sesiune în program:** adaugă un element în `"items"` al zilei corespunzătoare
- **Activare bilete:** pune link-ul Stripe în `"stripeLink"`
- **Adăugare înregistrări:** pune ID-ul playlist-ului YouTube în `"youtubePlaylist"`

---

## Arhivarea unui eveniment trecut

Nu trebuie să faci nimic manual. Evenimentul trece **automat** în tab-ul "Arhivă" de pe pagina `/evenimente` atunci când `endDate` devine o dată din trecut.

Dacă vrei totuși să ștergi complet un eveniment: șterge fișierul `data/events/<slug>.json`.

---

## Modificarea echipei

Deschide `data/team.json`. Structura unui membru:

```json
{
  "id": "4",
  "name": "Prenume Nume",
  "role": "Rol în asociație",
  "bio": "Scurtă descriere — 1-2 propoziții.",
  "image": "https://example.com/foto.jpg"
}
```

- **Adăugare membru:** adaugă un obiect nou în array (incrementează `id`)
- **Modificare:** găsește după `id` sau `name` și editează câmpurile
- **Ștergere:** elimină obiectul din array

Ordinea în array determină ordinea de afișare pe pagina `/cine-suntem`.

---

## Modificarea celor 5 Sola

Deschide `data/beliefs.json`. Structura unei credințe:

```json
{
  "id": "1",
  "title": "Sola Scriptura",
  "description": "Descriere scurtă afișată pe card.",
  "longDescription": "Descriere extinsă afișată la expandarea cardului. Poate fi mai lungă."
}
```

Ordinea în array determină ordinea de afișare pe pagina `/ce-credem`.

---

## Pagini și rute

| URL | Fișier sursă | Descriere |
|---|---|---|
| `/` | `app/[lang]/page.tsx` | Pagina principală cu hero, eveniment featured și lista de viitoare |
| `/cine-suntem` | `app/[lang]/cine-suntem/page.tsx` | Misiune, viziune, valori, echipă |
| `/ce-credem` | `app/[lang]/ce-credem/page.tsx` | Prezentarea celor 5 Sola |
| `/evenimente` | `app/[lang]/evenimente/page.tsx` | Lista tuturor evenimentelor (tab Viitoare / Arhivă) |
| `/evenimente/[slug]` | `app/[lang]/evenimente/[slug]/page.tsx` | Pagina detaliată a unui eveniment |
| `/contact` | `app/[lang]/contact/page.tsx` | Formular de contact și informații |

### Adăugarea unei pagini noi

1. Creează directorul: `app/[lang]/[nume-pagina]/`
2. Adaugă fișierul: `app/[lang]/[nume-pagina]/page.tsx` (textele în `lib/i18n/dictionaries/ro.ts` și `en.ts`)
3. Exportă un component React default din acel fișier
4. Adaugă link-ul în `components/Navbar.tsx` și/sau `components/Footer.tsx`

---

## Teme și stiluri

Site-ul suportă **dark mode** (implicit) și **light mode**, comutabile din navbar.

### Paleta de culori principală

| Token CSS | Valoare | Folosit pentru |
|---|---|---|
| `--color-primary` | `#B11F24` | Roșu — butoane, accente |
| `--color-primary-dark` | `#8B181C` | Hover pe butoane |
| `--color-secondary` | `#FDB883` | Portocaliu — accente secundare |

Culorile se modifică în `app/globals.css` în secțiunile `:root` (dark) și `.light` (light).

### Clase CSS utilitare custom

| Clasă | Utilizare |
|---|---|
| `.btn-primary` | Buton roșu gradient principal |
| `.btn-outline` | Buton cu contur |
| `.bento-card` | Card cu colțuri rotunjite și fundal semi-transparent |
| `.glass-nav` | Navbar cu efect de sticlă (glassmorphism) |
| `.label-caps` | Etichetă uppercase pentru categorii |

### Fonturi

- **Serif** (Noto Serif): titluri și headings
- **Sans** (Inter): text de corp
- **Mono** (JetBrains Mono): cod

---

## Variabile de mediu

Copiază `.env.example` în `.env.local` și completează:

```env
NEXT_PUBLIC_APP_URL=https://5sola.ro   # URL-ul public al site-ului (pentru metadata SEO)
GITHUB_CLIENT_ID=...                   # OAuth App GitHub, pentru login în /admin
GITHUB_CLIENT_SECRET=...
CMS_ALLOWED_ORIGINS=...                # opțional: alte origini (ex. preview-uri Vercel) care pot folosi login-ul
```

---

## Deployment

Site-ul este optimizat pentru deployment pe **Vercel** (recomandat pentru Next.js).

```bash
# Build de verificare înainte de deploy
npm run build
```

**Vercel (recomandat):**
1. Conectează repo-ul GitHub la Vercel
2. Adaugă variabilele din `.env.local` în setările proiectului Vercel
3. Orice push pe `main` declanșează automat un nou deployment

**Alte platforme:** orice platformă care suportă Node.js 18+ și comenzile `npm run build` + `npm run start`.

---

## Contact

- **Email:** asociatia5sola@gmail.com
- **WhatsApp:** +40 742 215 569
- **YouTube:** [@Asociatia5sola](https://youtube.com/@Asociatia5sola)
- **Instagram:** [@conferinta5sola](https://instagram.com/conferinta5sola)
- **Facebook:** [Asociatia 5 Sola](https://facebook.com/p/5-Sola-100089754032341)


---

## Versiunea în limba engleză

Site-ul este bilingv. Româna rămâne pe URL-urile existente (`/ce-credem`), engleza este
servită cu prefixul `/en` (`/en/ce-credem`). Comutatorul **RO / EN** din navbar duce la
aceeași pagină în cealaltă limbă.

- **Rutare:** toate paginile stau în `app/[lang]/`. `proxy.ts` rescrie intern URL-urile fără
  prefix către `/ro/...` și redirecționează `/ro/...` către varianta fără prefix.
- **Textele interfeței:** `lib/i18n/dictionaries/ro.ts` și `en.ts` (TypeScript verifică să
  existe aceleași chei în ambele).
- **Conținutul din `data/`:** traducerile stau în `data/en/` și conțin doar câmpurile traduse,
  identificate după `id`.
- **Evenimentele** își au traducerea în propriul fișier, în blocul `"en"` (doar titlu, locație,
  descriere, notă de înscriere). Fără bloc `"en"`, evenimentul apare pe `/en` în română.
- **Ghid de stil pentru traducere** (terminologie reformată, citate ESV etc.):
  [`data/en/README.md`](data/en/README.md).
- **SEO:** fiecare pagină are `canonical` și `hreflang` pentru ambele limbi, iar
  `sitemap.xml` include ambele variante.


---

## Administrare (`/admin`)

Evenimentele se pot edita din browser la [www.5sola.ro/admin](https://www.5sola.ro/admin), cu
[Sveltia CMS](https://sveltiacms.app/en/docs). Nu există bază de date: la salvare, CMS-ul face un
commit în `data/events/` (și urcă imaginile în `public/images/`), iar Vercel publică site-ul în ~2 minute.

- **Configurația formularului:** [`public/admin/config.yml`](public/admin/config.yml). Orice câmp nou
  adăugat în `types.ts` trebuie adăugat și aici — altfel se poate pierde la salvarea din CMS.
- **Versiunea CMS** este fixată în [`public/admin/index.html`](public/admin/index.html).
- **Eveniment nou:** cel mai simplu e să duplici evenimentul anterior și să modifici ce diferă.
- **Siguranță:** dacă un fișier salvat e invalid, build-ul pe Vercel eșuează și site-ul rămâne la
  versiunea anterioară. Orice modificare se poate anula din istoricul git.

### Acces

Editorii au nevoie de un cont GitHub cu drept de scriere pe `expozitiv/5sola`.

**Login cu GitHub (recomandat)** — configurare, o singură dată:
1. GitHub → *Settings → Developer settings → OAuth Apps → New OAuth App*
   - Homepage URL: `https://www.5sola.ro`
   - Authorization callback URL: `https://www.5sola.ro/api/auth/callback` (cu `www` — `5sola.ro` redirecționează acolo)
   - Creează aplicația în organizația `expozitiv` (Settings → Developer settings → OAuth Apps), ca să nu fie nevoie de aprobare separată
2. Copiază *Client ID* și generează un *Client Secret*.
3. În Vercel → *Settings → Environment Variables* adaugă `GITHUB_CLIENT_ID` și `GITHUB_CLIENT_SECRET`, apoi redeploy.

Fluxul de login e implementat în `app/api/auth/` (compatibil cu Sveltia/Decap CMS).

**Alternativă fără configurare:** pe ecranul de login, *Sign In Using Access Token*, cu un
[fine-grained token](https://github.com/settings/personal-access-tokens/new) pe repo, cu
permisiunea *Contents: Read and write*.

### Test local

`npm run dev`, apoi deschide `http://localhost:3000/admin` în Chrome sau Edge și alege
*Work with Local Repository* → folderul repo-ului. Modificările se scriu direct în fișierele
locale, fără commit.
