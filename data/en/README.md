# Traducerea în engleză — ghid de stil

Fișierele din `data/en/` conțin **doar câmpurile traduse** ale fișierelor din `data/`.
Site-ul le suprapune peste varianta românească (`lib/i18n/content.ts`): orice câmp lipsă
din traducere rămâne automat în română. Astfel, un eveniment nou adăugat doar în
`data/events.json` apare imediat și pe `/en`, în română, până când este tradus.

## Structura fișierelor

| Fișier | Cheie | Câmpuri traductibile |
|---|---|---|
| `events.json` | `id`-ul evenimentului | `title`, `location`, `description`, `registrationNote`, `topics[]`, `speakers[].role`, `speakers[].bio`, `schedule[].day`, `schedule[].items[].activity`, `schedule[].items[].topic`, `schedule[].items[].parallel[].room`, `schedule[].items[].parallel[].topic` |
| `beliefs.json` | `id` | `subtitle`, `description`, `longDescription`, `verses[]` |
| `team.json` | `id` | `role`, `bio` |
| `resources.json` | `id` | `title`, `description` |

Listele (`topics`, `schedule`, `items`, `speakers`, `verses`) se potrivesc **după poziție** —
păstrează aceeași ordine și același număr de elemente ca în fișierul românesc. Câmpurile
netraductibile (date, linkuri, imagini, nume de persoane, `speaker`) nu se copiază aici.

## Universul lingvistic

Publicul este creștin evanghelic, reformat, conservator. Traducerea trebuie să sune ca
o publicație Banner of Truth, Crossway sau Ligonier — nu ca un text corporativ sau
ecumenic-liberal.

- **Citate biblice:** English Standard Version (ESV). Nu parafraza versetele.
- **Pronumele divine** cu majusculă (He, His, Him, Your), ca în textul românesc.
- **Terminologie:**
  Cristos → Christ · Evanghelia → the gospel · har → grace · justificare / socotit drept →
  justification / declared righteous · sfințire → sanctification · sfințenie → holiness ·
  mântuire → salvation · Cuvântul lui Dumnezeu → the Word of God · Scriptura → Scripture ·
  Duhul Sfânt → the Holy Spirit · biserica locală → the local church · păstor → pastor ·
  prezbiter → elder · lucrător în biserică → church worker / ministry worker ·
  slujire → ministry · părtășie → fellowship · închinare → worship ·
  devoțional de dimineață → morning devotional · slujbă de încheiere → closing service ·
  credincioși → believers · Reforma Protestantă → the Protestant Reformation ·
  mărturisire de credință → confession of faith · învățătură → teaching / doctrine.
- **Nume proprii:** numele bisericilor rămân în română, cu tipul bisericii în engleză
  („Buna Vestire Baptist Church, Bucharest”). Orașele: București → Bucharest, restul
  rămân în forma românească.
- **Cele 5 Sola** rămân în latină (Sola Scriptura etc.).
- Ton sobru, reverent, fără superlative de marketing.
