# SpintaOnline — versione SEO

Sito statico in HTML, CSS e JavaScript vanilla. Nessuna dipendenza o compilazione necessaria. La versione non è stata pubblicata: il dominio canonico configurato nei metadati è `https://www.spintaonline.it`.

## Pagine pubbliche

- `index.html` — home, servizi, processo, pacchetti, FAQ e contatti.
- `prezzi.html` — listino completo con prezzi e inclusioni.
- `creazione-siti-web.html` — pagina informativa per la creazione di siti web in Sicilia.
- `portfolio/welcome-book-casa-timone.html` — scheda HTML del progetto reale Casa Timone.

`robots.txt` e `sitemap.xml` elencano soltanto queste quattro pagine. `404.html` è marcata `noindex, follow`.

## SEO e performance incluse

- Titolo, description, canonical, Open Graph e Twitter/X unici per ogni pagina.
- JSON-LD coerente con i dati confermati: Organization, WebSite, WebPage, Service, OfferCatalog, BreadcrumbList e CreativeWork dove pertinenti.
- Area servita indicata come Sicilia senza inventare città, indirizzo, recensioni, social o credenziali.
- Copertina Casa Timone servita in WebP responsive con fallback JPEG; screenshot del sito Case Vacanze San Leone ottimizzato in WebP/JPEG; social card 1200×630; favicon SVG più icone raster.
- Il PDF del Welcome Book resta on-demand e non viene precaricato.
- Rimosso il codice JavaScript e CSS delle vecchie finestre demo non più usate; mantenuti menu mobile, reveal, FAQ, preselezioni e modulo WhatsApp.
- Headings dei mockup trasformati in paragrafi stilizzati per mantenere la gerarchia semantica dei contenuti.

## Listino conservato

Sito Base 199 €, Sito Vetrina Completo 299 €, restyling 120 €, logo 15 €, 5 grafiche social 20 €, locandina/flyer 5 €, biglietto da visita 5 €, Welcome Book digitale/PDF 35 €, Instagram + TikTok 70 €/mese. Le campagne pubblicitarie online sono disponibili con prezzo da concordare in privato. Business 299 € e Premium 349 € restano coerenti con le inclusioni indicate. Dominio, hosting e un anno di manutenzione base sono inclusi con un nuovo sito; dal secondo anno manutenzione base 60 €/anno.

## Portfolio e dati sensibili

Il portfolio mostra due lavori reali: il Welcome Book Casa Timone e il sito completo [casevacanzesanleone.it](https://casevacanzesanleone.it). Il PDF Casa Timone è una copia sanitizzata di 12 pagine: la pagina Wi‑Fi non contiene SSID, password o QR originali. Lo screenshot del secondo progetto è stato fornito dal titolare e ottimizzato per il web.

## Pubblicazione

`.htaccess.example` è un modello inattivo per hosting Apache. Le istruzioni in `hosting/README.md` spiegano redirect HTTPS/www, cache, compressione e gestione 404; vanno adattate al provider scelto. Prima della pubblicazione collega l’informativa privacy reale e verifica DNS, certificato e redirect.

## Verifiche svolte

- Parser statico: cinque documenti HTML con un solo H1; JSON-LD valido; sitemap XML valida.
- Scansione locale di link e risorse relative senza riferimenti mancanti.
- `main.js` verificato con `node --check` e testato su tutte le opzioni del modulo, validazione, campi facoltativi, caratteri speciali e URL WhatsApp simulato.
- Homepage caricata in anteprima locale e struttura mobile controllata; il controllo browser delle nuove rotte è limitato dal blocco temporaneo dell’ambiente CUA, quindi non vengono dichiarati punteggi Core Web Vitals o test visuali non eseguiti.
