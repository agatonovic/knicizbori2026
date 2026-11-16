# Izbori u Kniću – analitika

Analitički alat za izbore u opštini Knić i Srbiji, 2012–2026: https://agatonovic.github.io/knicizbori2026/

Pogledi:
- **Pregled** – izlaznost, rezultati Knić prema Srbiji, ključni nalazi, trendovi 2012–2026.
- **Mapa** – mapa naselja i 36 biračkih mesta, sa izborom pokazatelja (izlaznost, udeo liste, promene, popis).
- **Biračka mesta** – sortabilna tabela i profil svakog mesta kroz sve izbore.
- **Izlaznost po satima** – izmerena izlaznost u Kniću 2026 (36 mesta, 8 termina) prema Srbiji, Šumadiji i ranijim izborima.
- **Poređenje i korelacije** – dijagram rasipanja za bilo koja dva pokazatelja, matrica korelacija, glasovi u brojevima (odakle su došli glasovi), promena po mestima.
- **Knić u Srbiji** – Knić prema Šumadijskom okrugu, susedima i svim opštinama Srbije (2023 i 2026), sa rangovima.
- **Podaci i metod** – preuzimanje podataka, izvori, metod.

Jedan fajl (`index.html`), bez servera. Izbor izbora, poređenja i osnovice procenta pamti se u pregledaču.

## Podaci (folder `podaci/`)
- `rezultati_2026_knic_po_bm.csv` – 2026, svih 36 biračkih mesta: zvanični rezultati RIK (upisani, izašli, važeći, nevažeći, 18 lista) i iz zapisnika primljeni, neupotrebljeni listići i glasanje van BM.
- `rezultati_opstine_2023_2026.csv` – sve opštine i gradske opštine, 2023 i 2026 (RIK): upisani, izašli, važeći, nevažeći i glavne liste.
- `izlaznost_2026_knic_po_satima.csv` – 2026, broj glasalih po biračkom mestu u 8, 10, 12, 14, 16, 18, 19 i 20 časova.
- `rezultati_2026_srbija.json` – 2026, Srbija: sve liste, glasovi i mandati (RIK, ukupni izveštaj 5. 11. 2026).
- `rezultati_po_bm_2012_2023.json` / `.csv` – svih 36 biračkih mesta, parlamentarni 2012, 2014, 2016, 2020, 2022, 2023 i predsednički 2012 (oba kruga) i 2017. Za 2022. su svih 19 lista očitane iz skeniranih zapisnika i proverene zbirom.
- `izlaznost_po_satima.json` – RIK preseci za Srbiju (2016–2026), Šumadijski okrug (2022, 2023) i izmerena izlaznost Knića 2026.
- `popis2022_starost_po_naseljima.json` – Popis 2022 po naseljima opštine.
- `video_kit/` – proverene serije za video materijale.

## Arhiva
- `arhiva/izborni-dan-2026.html` – alat za unos izlaznosti po biračkim mestima na dan izbora.
- `izlaznost.html` – poređenje satnih preseka Knića sa prethodnim izborima.

Izvori: RIK, RZS (izborne publikacije, Popis 2022), RGZ (granice naselja).
