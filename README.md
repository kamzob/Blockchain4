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
 
4. Svarbu truffle-config.js faile atsikomentuoti development vieta ir jei naudojam ganache programą, port'ą reikėtų nurodyti 7545, taip pat reikia, kad solc versija būtų suderinta.
5. Ganache susikuriame new workspace ir pridedame projektą, kuriame būtų truffle-config.js failas:

<img width="1190" alt="Screenshot 2024-12-10 at 20 45 44" src="https://github.com/user-attachments/assets/eaf00d5b-d62f-43c2-9d48-1632a94119ef">

6. Spaudžiame start ir turėtumėm matyti ganache aplinką, kurioje yra 10 acc, kur kiekvienas turi po 100ETH:
   
<img width="1197" alt="Screenshot 2024-12-10 at 20 48 04" src="https://github.com/user-attachments/assets/9240b399-3b69-4ec1-988b-cfd051b5c44f">

7. Tuomet susikuriam pasibandymui Migrations.sol failą contracts aplankale ir 1_initial_migration.js failą Migrations aplankale. Susikūrus ir užpildžius, rašome į terminalą `truffle migrate`. Turėtų išmesti kad pavyko sucompilinti ir padeployinti:

<img width="701" alt="Screenshot 2024-12-10 at 20 54 14" src="https://github.com/user-attachments/assets/13c37320-0931-4402-bca3-d7dbc9daa897">

<img width="1201" alt="Screenshot 2024-12-10 at 20 56 17" src="https://github.com/user-attachments/assets/1d896be2-99c0-4735-b4af-37281dbe8b1b">
8. Susikuriame per MetaMask naują networką:

<img width="356" alt="Screenshot 2024-12-10 at 20 58 28" src="https://github.com/user-attachments/assets/f0a5bf02-9b1b-45ff-9eca-83e9eb67880d">

9. Pridedame account'ą, pasiimdami private key iš ganache:

<img width="729" alt="Screenshot 2024-12-10 at 21 01 40" src="https://github.com/user-attachments/assets/4fb9381f-dbd3-411a-bdd5-90b2af4ef030">
<img width="356" alt="Screenshot 2024-12-10 at 21 03 04" src="https://github.com/user-attachments/assets/be419008-c1f9-45a5-b3c0-7d22beec55b9">

10. Tada pasirašom naują sol failą, kuriame bus kontraktas ir 2_bilietai.js, kad galėtumėm padeploy'int.
11. Vėl rašome truffle compile ir truffle migrate. P.S. prieš tai aš dar pasirašiau nvm use 18, kad naudotų 18 node:

<img width="717" alt="Screenshot 2024-12-10 at 21 43 51" src="https://github.com/user-attachments/assets/7a1aeec9-7f6a-4219-9943-43ee1b937294">

<img width="1197" alt="Screenshot 2024-12-10 at 21 45 02" src="https://github.com/user-attachments/assets/38963543-139b-403a-a678-4b98ddcc5dd3">

<img width="382" alt="Screenshot 2024-12-10 at 21 45 48" src="https://github.com/user-attachments/assets/4f02cf57-d7ae-4572-8bfd-61dccda4f592">

<img width="1196" alt="Screenshot 2024-12-10 at 21 46 25" src="https://github.com/user-attachments/assets/f2a33e39-b5ce-4b40-9c37-a00b6997ac86">

12. Tuomet tests folderyje susikuriame testu faila .js ir ten pasirasom testus ir gauname rezultatus (lokaliame tinkle):
     <img width="718" alt="Screenshot 2024-12-10 at 22 16 02" src="https://github.com/user-attachments/assets/e69ab3ed-793b-486d-986b-ef84654541f2">

- `Turėtų sukurti bilietus su numatytais parametrais`: Tikrina, ar bilietai yra tinkamai inicializuoti (teisingi ID, kainos, savininkai ir galiojimas).
- `Turėtų leisti klientui pirkti bilietą`: Patikrina, ar pirkėjas gali nusipirkti bilietą ir ar savininkas teisingai priskiriamas po pirkimo.
- `Neturėtų leisti pirkti jau nupirkto bilieto`: Patikrina, ar pirkėjas negali nusipirkti bilieto, kuris jau parduotas.
- `Turėtų leisti perleisti bilietą kitam naudotojui`: Patikrina, ar bilieto savininkas gali perleisti bilietą kitam naudotojui.
- `Neturėtų leisti perleisti bilieto, jei perleidėjas nėra savininkas`: Užtikrina, kad tik bilieto savininkas gali perleisti bilietą.
- `Turėtų leisti grąžinti bilietą ir atgauti pinigus`: Tikrina, ar pirkėjas gali grąžinti bilietą ir atgauti sumokėtus pinigus. Patikrina, ar bilietas tampa negaliojantis po grąžinimo.
- `Turėtų leisti savininkui uždaryti rezervacijas`: Užtikrina, kad savininkas gali uždaryti visas bilietų rezervacijas.
- `Neturėtų leisti kitiems nei savininkui uždaryti rezervacijų`: Patikrina, ar tik savininkas gali uždaryti rezervacijas.
- `Turėtų leisti savininkui išsiimti pajamas`: Tikrina, ar savininkas gali išimti surinktas pajamas po bilietų pardavimo.

## Front-end 
1. Susikuriam naują folderį darbo aplinkoje ir rašom `npm init -f`kad susikurtumėm package.json ir `npm install --save-dev parcel`
   <img width="517" alt="Screenshot 2024-12-11 at 01 23 41" src="https://github.com/user-attachments/assets/9dc2859a-3b3e-4fe6-b2ed-88923080644c">

<img width="499" alt="Screenshot 2024-12-11 at 01 27 25" src="https://github.com/user-attachments/assets/f4a95864-bb9e-4a9d-a4ac-b21685c85406">

<img width="564" alt="Screenshot 2024-12-11 at 02 21 26" src="https://github.com/user-attachments/assets/91126f8a-036a-4849-af5a-2960f1127a81">

2. `npm run start` paleidzia front-end'a:
<img width="413" alt="Screenshot 2024-12-11 at 04 28 53" src="https://github.com/user-attachments/assets/021a409e-6082-4304-a4e2-ebf1fe386bd9">

3. Susikūrus html, js, css failus turime puslapį:
   
<img width="1331" alt="Screenshot 2024-12-11 at 04 30 24" src="https://github.com/user-attachments/assets/25c482e4-63bf-419c-8842-292b2a89160f">

4. Prijunkime kitą account'ą, kuris neturi transakcijų ir turi 100 ETH:

<img width="1201" alt="Screenshot 2024-12-11 at 04 32 36" src="https://github.com/user-attachments/assets/82b8a4b4-6414-43d5-8e13-afa2c150c716">

<img width="333" alt="Screenshot 2024-12-11 at 04 33 05" src="https://github.com/user-attachments/assets/20b0a592-c60a-4559-8c5b-749cf6aa67e8">

<img width="318" alt="Screenshot 2024-12-11 at 04 33 20" src="https://github.com/user-attachments/assets/c9c05f49-ee70-4911-98ee-f0ed90894a95">

<img width="345" alt="Screenshot 2024-12-11 at 04 34 26" src="https://github.com/user-attachments/assets/95de0c1b-fa69-4d8a-9cf6-b055bde4be58">

<img width="1341" alt="Screenshot 2024-12-11 at 04 35 14" src="https://github.com/user-attachments/assets/4153a203-afe2-4f52-ae1b-83c736859a95">

4. Pabandykime nusipirkti bilieta, kurio id #1
Nusipirkus bilietą, matome, kad Balansas sumažėjo 0.1 ETH. Taip pat atsirado galimybė grąžinti bilietą arba perleisti kitam klientui.
<img width="1325" alt="Screenshot 2024-12-11 at 04 40 37" src="https://github.com/user-attachments/assets/96b237bb-c3d6-486d-bda2-f33f4c0ea76e">

<img width="1201" alt="Screenshot 2024-12-11 at 04 44 17" src="https://github.com/user-attachments/assets/3a537714-a1e5-4599-a578-0c75b11805bf">

<img width="1198" alt="Screenshot 2024-12-11 at 04 45 01" src="https://github.com/user-attachments/assets/1484437a-61d6-482c-a4b5-4dcad835d956">

5. Pabandykime perleisti bilieta kitam account'ui, pvz:
   
<img width="1332" alt="Screenshot 2024-12-12 at 00 29 44" src="https://github.com/user-attachments/assets/0ccb2951-10b5-48cf-bdeb-50ab62867409" />


<img width="1196" alt="Screenshot 2024-12-12 at 00 30 54" src="https://github.com/user-attachments/assets/bd379941-eb8d-47cd-93c4-0b222014a84f" />

<img width="440" alt="Screenshot 2024-12-12 at 00 31 30" src="https://github.com/user-attachments/assets/d34e5072-dbdb-4d74-8c2f-33b41324628d" />

Dabar bilietas mums nebepriklauso, rodo kad nupirktas kito asmens (kuriam perleidom):

<img width="1336" alt="Screenshot 2024-12-12 at 00 31 38" src="https://github.com/user-attachments/assets/52f5638f-c15c-4a08-83ea-b20951bd6d92" />

6. Pabandykime prisijungti į kito asmens paskyrą ir ten grąžinti bilietą:
<img width="1324" alt="Screenshot 2024-12-12 at 00 34 52" src="https://github.com/user-attachments/assets/6887feb4-562e-4e09-af7f-99f57f96a0df" />

Kaip matome, tapome šio bilieto savininku, todėl pabandykime grąžinti bilietą pardavėjui (turėtų pasipildyti sąskaita 0.1 ETH ir bilietas tapti negaliojančiu):

   
<img width="446" alt="Screenshot 2024-12-12 at 00 36 40" src="https://github.com/user-attachments/assets/c2fe4b1c-ef08-485e-ad55-161aac460b2a" />

<img width="1325" alt="Screenshot 2024-12-12 at 00 37 01" src="https://github.com/user-attachments/assets/5974ed45-221d-4810-b875-8dc9f9ca4f16" />
