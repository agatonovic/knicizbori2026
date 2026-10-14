# Izborni dan 2026 – Knić

Praćenje izlaznosti po biračkim mestima u opštini Knić na parlamentarnim izborima 25. oktobra 2026, uz pragove za Srbiju po satima i istorijske rezultate 2012–2023.

- Jedan fajl (`index.html`), bez servera. Unosi se čuvaju u pregledaču (localStorage) na računaru na kom se unose.
- „Preuzmi stanje (JSON)” / „Učitaj stanje (JSON)” služe za rezervnu kopiju i prenos između računara.
- „Štampaj izveštaj” daje A4 pregled trenutnog stanja.

Izvori: RIK (spisak biračkih mesta, rezultati), RZS (publikacije o izborima), RGZ (granice naselja).

## Podaci (folder `podaci/`)
- `rezultati_po_bm_2012_2023.json` / `.csv` – rezultati za svih 36 biračkih mesta u Kniću: parlamentarni 2012, 2014, 2016, 2020, 2022, 2023 i predsednički 2012 (oba kruga) i 2017. Izvor: RIK (XLS po biračkim mestima, portal rezultata 2023). Za 2022. su očitani skenirani zapisnici (upisani, glasali, važeći, SNS, SPS); ostale liste 2022. nisu pojedinačno.
- `izlaznost_po_satima.json` – RIK preseci za Srbiju (2016, 2020, 2022, 2023) i region Šumadije i Zapadne Srbije (2022, 2023), plus procene CRTA/CeSID/Ipsos.
