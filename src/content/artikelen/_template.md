---
# TEMPLATE — kopieer dit bestand naar src/content/artikelen/<jouw-slug>.md
#
# De bestandsnaam bepaalt de URL: dit-wordt-de-url.md → www.chrisnederhorst.nl/dit-wordt-de-url
# Gebruik kleine letters en koppeltekens, geen spaties of accenten.
#
# Bestanden die met _ beginnen worden door Astro overgeslagen; dit bestand
# wordt dus nooit een pagina. Haal bij het kopiëren alle #-regels weg.

# ── Verplicht ────────────────────────────────────────────────────────────────

# Paginatitel: gebruikt als <h1> en als <title> in de browsertab.
title: "Titel van het artikel"

# Meta description: wat Google onder de link toont. Streef naar max 155 tekens.
# Valt ook terug als lead-tekst wanneer je `lead` weglaat.
description: "Eén of twee zinnen die de pagina samenvatten en tot doorklikken verleiden."

# Publicatiedatum (YYYY-MM-DD). Puur een datum voor de lezer en voor Google:
# een datum in de toekomst houdt het artikel NIET tegen — daarvoor is `draft`.
publishDate: 2026-01-01

# ── Optioneel ────────────────────────────────────────────────────────────────

# Intro-alinea boven het artikel. Zonder `lead` gebruikt de pagina `description`.
# Mag langer en verhalender zijn dan de description.
lead: "De openingsalinea die onder de titel staat en de lezer het artikel in trekt."

# Deelbeeld voor Google (Article.image) en voor de preview bij delen op social
# (og:image). Wordt NIET in de pagina zelf getoond — het artikel bepaalt zijn
# eigen beeld in de body. Pad is relatief aan dit bestand; de build faalt als het
# bestand niet bestaat. Google wil bij voorkeur minimaal 1200px breed.
image: "../../assets/img/bestandsnaam.jpg"

# Datum van de laatste inhoudelijke wijziging. Wordt getoond als "Bijgewerkt ..."
# en meegegeven aan Google. Werk deze bij als je het artikel herziet.
updatedDate: 2026-01-01

# Vrije trefwoorden. Voeden de automatische "Gerelateerde artikelen" onderaan:
# artikelen die tags delen worden gesuggereerd als `related` er te weinig oplevert.

# Handmatige gerelateerde artikelen (max 3), als bestandsnaam zonder .md.
# Slugs die niet bestaan worden stil genegeerd.
related:
  - "andere-slug"
  - "nog-een-slug"

# true = toon in de uitgelichte sectie op de homepage.
featured: false

# true = nog niet af. Het artikel krijgt geen URL en verdwijnt uit de navigatie,
# de sitemap en de gerelateerde artikelen. Dé manier om iets achter te houden.
# Let op: handgeschreven links in de tekst van andere artikelen blijven staan
# en worden dan 404 — check die als je iets bestaands terug op draft zet.
draft: false

# Plek in de sitenavigatie. Laat dit hele blok weg en het artikel blijft buiten
# het menu: het is dan alleen bereikbaar via links, Google en de sitemap.
nav:
  # Het kopje in de topnav. Moet exact één van deze zijn (zie src/data/nav-groups.ts):
  # "Over mij" | "Ontwerpen" | "Kennis" | "Projecten"
  group: "Kennis"
  # Korte linktekst in het menu — de volledige titel is daar meestal te lang.
  label: "Kort label"
  # Contextregel onder het label in de dropdown. Eén korte zin.
  sub: "Waar dit artikel over gaat, in het kort."
  # Volgorde binnen de groep: laag getal staat bovenaan. Ga met stappen van 10,
  # dan kun je er later iets tussen schuiven (bv. 25) zonder de rest aan te passen.
  # Zonder `order` sluit het artikel alfabetisch achteraan de groep aan.
  order: 10
---

Eerste alinea. Begin direct met de inhoud — de titel en de lead staan al boven
het artikel en hoef je hier niet te herhalen.

## Eerste tussenkop

Tussenkoppen zijn `##` (H2). Zodra een artikel er twee of meer heeft, verschijnt
links automatisch een inhoudsopgave die meescrollt.

### Onderliggende kop

Een niveau dieper is `###` (H3). Die komt niet in de inhoudsopgave.

Tekst met **nadruk**, een [link naar een ander artikel](/andere-slug) en
een opsomming:

- Eerste punt
- Tweede punt

Tabellen krijgen automatisch hun opmaak en scrollen op mobiel binnen hun eigen
kader:

| Kolom | Betekenis |
|---|---|
| Waarde | Toelichting |
