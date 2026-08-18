# Vida Forestal - Sitio Web Corporativo & Catálogo Interactivo

Sitio web oficial de **Vida Forestal**, líderes en soluciones forestales sostenibles, agricultura de precisión, diseño de paisajismo y podas técnicas de altura. Esta plataforma combina un diseño estético moderno (basado en HSL y Glassmorphism) con un catálogo de plantas interactivo y cotización directa a través de WhatsApp.

---

## 🚀 Características Principales

1. **Diseño Visual de Alta Gama**:
   - Estética moderna con efectos de **Glassmorphic** (fondos translúcidos con desenfoque `backdrop-filter`).
   - Jerarquía tipográfica basada en la combinación de **Outfit** (títulos limpios e institucionales) e **Inter** (cuerpo de texto con máxima legibilidad).
   - Transiciones fluidas en botones, enlaces y tarjetas con animaciones mediante la librería **AOS (Animate on Scroll)**.

2. **Catálogo de Vivero Dinámico**:
   - Clasificación por categorías (*Ornamentales, Frutales, Nativas y Plantines*).
   - Buscador en tiempo real integrado por nombre común, nombre científico y características.
   - **Bolsa de Cotización**: Carrito de compras local que permite agregar plantas, ajustar cantidades y consolidar una solicitud.

3. **Integración con Canales de Contacto**:
   - Formulario de contacto inteligente integrado con **EmailJS** para envío directo al correo corporativo.
   - Cotización rápida de servicios y plantas mediante la generación de mensajes dinámicos hacia la API oficial de **WhatsApp**.

---

## 🔒 Buenas Prácticas de Seguridad y Configuración

El proyecto ha sido diseñado siguiendo estándares de seguridad y desarrollo para proteger la información y asegurar su mantenimiento a largo plazo:

### 1. Aislamiento de Credenciales Sensibles
- Las claves y configuraciones de EmailJS y WhatsApp se almacenan localmente en el archivo `js/config.js`.
- Este archivo está explícitamente añadido al `.gitignore` para evitar que credenciales reales se publiquen en repositorios públicos.
- Se incluye `js/config.example.js` como plantilla de referencia para configuraciones en otros entornos.

### 2. Mitigación de Vulnerabilidades XSS (Cross-Site Scripting)
- Toda manipulación dinámica del DOM que contenga variables externas (como notificaciones de error del servidor) pasa por un proceso de **sanitización de HTML** (`escapedMessage`), reemplazando caracteres especiales como `&`, `<`, `>`, `"`, `'` por sus entidades seguras de HTML.
- Se prefiere el uso de `textContent` para inserciones puramente textuales en lugar de `innerHTML`.

### 3. CDNs Seguros y HTTPS
- Todas las dependencias externas (AOS, EmailJS, Google Fonts) se cargan utilizando enlaces absolutos y seguros bajo el protocolo HTTPS, previniendo ataques de intermediario (MITM).

### 4. Menor Superficie de Ataque
- El proyecto está desarrollado enteramente en vanilla HTML, CSS y JavaScript (sin Node.js/npm en producción), lo que elimina los riesgos de vulnerabilidades por dependencias de terceros desactualizadas en el lado del servidor o en el bundle (Supply Chain Attacks).

---

## 📂 Estructura del Proyecto

```bash
vida_forestal/
├── .gitignore              # Archivos y carpetas ignorados por Git (ej: config.js)
├── index.html              # Página principal (Inicio)
├── Soluciones.html         # Página de soluciones tecnológicas (SIG, Teledetección)
├── Servicios.html          # Página de Catálogo de Vivero, Paisajismo y Poda
├── Contacto.html           # Formulario de contacto y datos de oficinas
├── README.md               # Documentación general del proyecto (Este archivo)
├── css/
│   ├── main.css            # Variables de diseño globales, tipografía y reset
│   ├── header-footer.css   # Estilos comunes de cabecera y pie de página
│   ├── index.css           # Estilos de la landing page
│   ├── soluciones.css      # Estilos de soluciones tecnológicas e iframes
│   ├── servicios.css       # Estilos de catálogo, modal y bolsa de cotización
│   └── contacto.css        # Estilos de formulario de contacto, mapa y FAQ
├── js/
│   ├── config.js           # Credenciales locales (IGNORADO EN GIT)
│   ├── config.example.js   # Plantilla de credenciales
│   ├── common.js           # Lógica común (menú móvil, scroll, utilidades)
│   ├── index.js            # Animaciones y contadores de la home
│   ├── servicios.js        # Base de datos de vivero, filtros y bolsa de cotización
│   └── contacto.js         # Validación de formulario e integración con EmailJS
├── img/                    # Activos gráficos, logotipos y fotos
└── video/                  # Videos de fondo para los héroes de la página
```

---

## 🛠️ Configuración Local

1. Clona el repositorio.
2. Copia el archivo `js/config.example.js` y cámbiale el nombre a `js/config.js`.
3. Edita `js/config.js` e ingresa tus credenciales reales de **EmailJS** y el número de **WhatsApp** al que deseas recibir los mensajes:
   ```javascript
   window.APP_CONFIG = {
       EMAILJS_SERVICE_ID: 'TU_SERVICE_ID',
       EMAILJS_TEMPLATE_ID: 'TU_TEMPLATE_ID',
       EMAILJS_PUBLIC_KEY: 'TU_PUBLIC_KEY',
       WHATSAPP_NUMBER: 'TU_NUMERO_WHATSAPP_CON_CODIGO_PAIS' // ej: 5491126958481
   };
   ```
4. Abre `index.html` directamente en tu navegador o utilizando un servidor local ligero (como *Live Server* en VSCode o corriendo `npx http-server`).

---

## 🌐 Guía para Subir a Git

Para subir los cambios a tu repositorio remoto de forma profesional y limpia:

1. **Verificar el estado del repositorio**:
   ```bash
   git status
   ```
   Asegúrate de que `js/config.js` **no** aparezca en el listado de archivos para añadir (debe estar ignorado).

2. **Añadir los archivos modificados y nuevos**:
   ```bash
   git add .
   ```

3. **Crear el commit con un mensaje estructurado y descriptivo**:
   ```bash
   git commit -m "feat: implementar catálogo interactivo de vivero, cotizador de WhatsApp y modernización estética"
   ```

4. **Subir los cambios a la rama principal (main)**:
   ```bash
   git push origin main
   ```
