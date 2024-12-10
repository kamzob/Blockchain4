# Blockchain4
Blockchain4

# Užduotis
1. Aprašykite išmaniosios sutarties verslo modelio logiką, kurią įgyvendins išmanioji sutartis.
Pasirinkite verslo modelį pvz., https://medium.com/coinmonks/build-a- smart-contract-to-sell-goods-6cf73609d25. Šiame verslo modelyje dalyvauja tokios šalys: , , , o pati išmanioji sutartis užtikrina "saugų" prekių ir
pristatymą .
Entuziastai, kurie pasirinks ir aprašys kitą verslo modelį ir jo pagrindų įgyvendins išmaniąją sutartį (sutartis) ir decentralizuotą aplikaciją, papildomai gaus iki 0,75 balo (priklausomai nuo idėjos, sudėtingumo ir įgyvendinimo).
2. Realizuokite pirmąjame žingsnyje aprašytą verslo logiką išmanioje sutartyje Solidyti kalboje.
3. Ištestuokite išmaniosios sutarties veikimą Ethereum lokaliame tinkle ir Ethereum testiniame tinkle (pvz., Goerli).
        pirkėjas
pardavėjas
kurjeris
 pardavimą/pirkimą
4. Naudojant Ethereum testinio tinklo peržiūrėkite išmaniosios sutarties vykdymo "logus".
5. Sukurkite decentralizuotos aplikacijos Front-End ą (tinklapį arba mobiliąją aplikaciją), kuri įgalintų bendravimą su išmaniąja sutartimi.
Planas minimum: minimalistinio dizaino ir minimalaus funkcionalumo aplikacija, kuri tiesiog užtirkintų sąveiką su verslo modelio dalyviais ir leistų aktyvuoti išmaniosios sutarties funkcijas, pateikti/nuskaityti sutarčiai reikalingus duomenis.
Planas maximum (papildomai iki 0,75 balo prie darbo!): praplėsto funkcionalamo (ir dizaino) aplikacija. Čia žiūrėkite kūrybiškai, atsižvelgiant į turimą laiką, patirtį ir galimybes.

# Pasiruošimas užduočiai

Kad atlikti šią užduotį, reikėjo susiinstaliuoti:
1. Node.js: https://nodejs.org/en/download/package-manager/
2. Truffle: `sudo npm install -g trufflez
`
3. ganache: https://archive.trufflesuite.com/ganache/
4. `npm install`
   <img width="345" alt="Screenshot 2024-12-10 at 20 04 51" src="https://github.com/user-attachments/assets/5021c582-57e5-4d11-bbec-c456e001d5bd">

# Užduoties atlikimas
## Idėja
Nusprendžiau pabandyti sukurti savo verslo modelį, kuriame sukurčiau decentralizuotą sistemą kino bilietų pardavimui, kuri būtų paremta „blockchain“ technologija. Ši sistema leistų skaidriai ir efektyviai parduoti, perleisti ir tikrinti bilietus, tuo pačiu užtikrinant saugumą ir patikimumą.

## Dalyviai

1. Kino teatras:
- Sukuria bilietus ir nustato jų kainas.
- Gali atšaukti bilietų galiojimą arba uždaryti rezervacijas.
- Turi galimybę išsiimti surinktas pajamas.
2. Pirkėjas:
- Perka bilietą iš sistemos naudodamas eterį.
- Turi teisę perleisti bilietą kitam naudotojui arba grąžinti bilietą, jei tai leidžiama.
3. Blockchain tinklas:
Užtikrina bilietų unikalumą ir galiojimą.
Valdo visas transakcijas be tarpininkų.

## Įgyvendinimas
1. Atsidarome per VSCode darbo aplankalą.
2. Rašome į terminalą truffle init, tai sukurs mums aplankalus:
 <img width="194" alt="Screenshot 2024-12-10 at 20 36 57" src="https://github.com/user-attachments/assets/789f589e-40c8-4aac-a353-0304bd44ad39">
4. 







