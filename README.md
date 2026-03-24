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
│   ├── events.json             # ⭐ Conferințe și evenimente
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

Cele trei fișiere JSON din `data/` controlează conținutul principal al site-ului:

| Fișier | Pagini afectate | Ce conține |
|---|---|---|
| `data/events.json` | `/evenimente`, `/evenimente/[slug]`, `/` (homepage) | Conferințe, vorbitori, program, linkuri |
| `data/team.json` | `/cine-suntem` | Membrii echipei |
| `data/beliefs.json` | `/ce-credem` | Descrierile celor 5 Sola |

---

## Adăugarea unui eveniment nou

Deschide `data/events.json` și adaugă un obiect nou în array. **Evenimentele viitoare apar automat în tab-ul "Viitoare"**, iar cele trecute în "Arhivă" — diferența se face pe baza câmpului `endDate`.

### Structura completă a unui eveniment

```json
{
  "id": "3",
  "slug": "sola-gratia-2027",
  "title": "Sola Gratia: Harul lui Dumnezeu",
  "startDate": "2027-04-10",
  "endDate": "2027-04-11",
  "location": "Cluj-Napoca, Casa de Cultură a Studenților",
  "locationUrl": "https://maps.google.com/?q=Casa+de+Cultura+Cluj-Napoca",
  "description": "O conferință despre harul suveran al lui Dumnezeu în mântuire.",
  "speakers": [
    {
      "name": "Numele Vorbitorului",
      "role": "Pastor / Profesor / Misionar",
      "image": "https://example.com/imagine-vorbitor.jpg",
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
        { "time": "10:00", "activity": "Sesiunea 1: Harul în Vechiul Testament" },
        { "time": "12:00", "activity": "Prânz" },
        { "time": "14:00", "activity": "Sesiunea 2: Harul în Noul Testament" },
        { "time": "16:30", "activity": "Panel Q&A" }
      ]
    },
    {
      "day": "Ziua 2 — Sâmbătă, 11 Aprilie",
      "items": [
        { "time": "09:00", "activity": "Rugăciune & Devoțional" },
        { "time": "10:00", "activity": "Sesiunea 3: Harul și sfințirea" },
        { "time": "12:00", "activity": "Prânz" },
        { "time": "14:00", "activity": "Sesiunea 4: Trăind din har" },
        { "time": "17:00", "activity": "Slujbă de închidere" }
      ]
    }
  ],
  "youtubePlaylist": "",
  "stripeLink": ""
}
```

### Câmpuri opționale

| Câmp | Comportament dacă e gol (`""`) |
|---|---|
| `youtubePlaylist` | Secțiunea "Înregistrări video" nu apare pe pagina evenimentului |
| `stripeLink` | Butonul "Cumpără bilet" nu apare |
| `locationUrl` | Locația apare ca text simplu, fără link Google Maps |

### Reguli pentru `slug`

- Folosește doar litere mici, cifre și cratime: `sola-gratia-2027`
- Trebuie să fie **unic** (nu repeta slug-uri)
- Slug-ul devine URL-ul paginii: `/evenimente/sola-gratia-2027`

### Imagini pentru vorbitori

Poți folosi:
- **URL extern** (recomandat pentru producție): `"image": "https://domeniu.com/foto.jpg"`
- **Fișier local**: pune imaginea în `/public/images/` și referențiaz-o ca `"image": "/images/vorbitor.jpg"`
- **Placeholder temporar**: `"image": "https://picsum.photos/seed/NUME/400/400"` (înlocuiește `NUME` cu ceva unic)

> **Atenție:** Dacă folosești un domeniu extern nou pentru imagini, trebuie adăugat în `next.config.ts` la `images.remotePatterns`, altfel Next.js va bloca imaginea.

---

## Modificarea unui eveniment existent

1. Deschide `data/events.json`
2. Găsește evenimentul după `"slug"` sau `"title"`
3. Editează câmpurile dorite
4. Salvează — modificările se reflectă imediat în dev (`npm run dev`)

**Exemple comune:**

- **Actualizare dată:** schimbă `startDate` / `endDate` (format: `YYYY-MM-DD`)
- **Adăugare vorbitor:** adaugă un obiect nou în array-ul `"speakers"`
- **Adăugare sesiune în program:** adaugă un element în `"items"` al zilei corespunzătoare
- **Activare bilete:** pune link-ul Stripe în `"stripeLink"`
- **Adăugare înregistrări:** pune ID-ul playlist-ului YouTube în `"youtubePlaylist"`

---

## Arhivarea unui eveniment trecut

Nu trebuie să faci nimic manual. Evenimentul trece **automat** în tab-ul "Arhivă" de pe pagina `/evenimente` atunci când `endDate` devine o dată din trecut.

Dacă vrei totuși să ștergi complet un eveniment: elimină obiectul din `data/events.json`.

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
| `/` | `app/page.tsx` | Pagina principală cu hero, eveniment featured și lista de viitoare |
| `/cine-suntem` | `app/cine-suntem/page.tsx` | Misiune, viziune, valori, echipă |
| `/ce-credem` | `app/ce-credem/page.tsx` | Prezentarea celor 5 Sola |
| `/evenimente` | `app/evenimente/page.tsx` | Lista tuturor evenimentelor (tab Viitoare / Arhivă) |
| `/evenimente/[slug]` | `app/evenimente/[slug]/page.tsx` | Pagina detaliată a unui eveniment |
| `/contact` | `app/contact/page.tsx` | Formular de contact și informații |

### Adăugarea unei pagini noi

1. Creează directorul: `app/[nume-pagina]/`
2. Adaugă fișierul: `app/[nume-pagina]/page.tsx`
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
