# Pubblicazione

Questa cartella contiene regole di esempio da applicare solo dopo aver scelto il provider.

- `.htaccess.example` va rinominato in `.htaccess` su un hosting Apache.
- La regola imposta HTTPS e `www.spintaonline.it`, gestisce l’errore 404 e abilita compressione/cache per gli asset statici.
- Su Netlify, Cloudflare Pages o altri provider usa l’equivalente del provider per redirect, headers e pagina 404; non copiare regole Apache alla cieca.

Prima di rendere pubblico il sito verifica manualmente che `/`, `/prezzi.html`, `/creazione-siti-web.html` e `/portfolio/welcome-book-casa-timone.html` rispondano con 200, che un URL inesistente risponda con 404 e che HTTP e il dominio senza `www` redirigano a `https://www.spintaonline.it`.
