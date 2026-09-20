# Web del canal

Página estática de una sola vista: `index.html` + `style.css` + `script.js` (unas pocas líneas para las animaciones). Sin JavaScript ni build.

## Cambiar los enlaces de compra

Cada producto tiene un botón con `href="https://pay.hotmart.com/"`. Sustituir esa URL por el enlace real de cada producto en Hotmart (busca `pay.hotmart.com` en `index.html`, hay tres).

## Desplegar en Netlify

Netlify → *Add new site* → *Import from Git* → elegir este repo. Dejar el *build command* vacío y *publish directory* = `/` (raíz). Cada push a `main` vuelve a publicar.

## Cambiar las imágenes

Todas están en `images/`, y basta con sustituir el fichero por otro con el mismo nombre:

| Fichero | Dónde sale | Tamaño recomendado |
| --- | --- | --- |
| `hero-silhouette.jpg` | arriba, detrás de la ficha de la táctica | 1120 × 840 (horizontal) |
| `cover-manipulation.jpg` | portada de la guía I | 800 × 450 |
| `cover-reading.jpg` | portada de la guía II | 800 × 450 |
| `cover-greyrock.jpg` | portada de la guía III | 800 × 450 |
| `band-shadow.jpg` | franja de la cita, a página completa | 1400 × 560 |
| `faq-puppet.jpg` | junto a las preguntas | 640 × 520 |

Las actuales son de relleno (fotos de stock pasadas a duotono). Encima de las portadas va un velo del color de cada guía, así que cualquier foto encaja: cuanto más contraste tenga, mejor.
