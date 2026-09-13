# Web del canal

Página estática de una sola vista: `index.html` + `style.css` + `script.js` (unas pocas líneas para las animaciones). Sin JavaScript ni build.

## Cambiar los enlaces de compra

Cada producto tiene un botón con `href="https://pay.hotmart.com/"`. Sustituir esa URL por el enlace real de cada producto en Hotmart (busca `pay.hotmart.com` en `index.html`, hay tres).

## Desplegar en Netlify

Netlify → *Add new site* → *Import from Git* → elegir este repo. Dejar el *build command* vacío y *publish directory* = `/` (raíz). Cada push a `main` vuelve a publicar.
