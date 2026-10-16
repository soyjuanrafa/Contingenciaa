# CONTINGENCIA &middot; Sistema Integral de Prevención de Inundaciones & Monitoreo de Cauces (Managua, Nicaragua)

**CONTINGENCIA** es una plataforma tecnológica avanzada diseñada para la gestión de riesgos hidrometeorológicos, monitoreo en tiempo real de cauces, alerta temprana ante crecidas y gestión táctica de emergencias municipales y comunitarias en Managua, Nicaragua.

---

## 🚀 Características Principales

1. **Monitoreo Hidrológico en Tiempo Real**:
   - Control de los principales cauces y embalses de Managua (Cauce El Chipote, Cauce Oriental, Cauce Cuenca Sur, Embalse Los Gauchos, etc.).
   - Visualización de niveles pluviales, caudales, capacidad de almacenamiento y estado de alerta (`Estable`, `Precaución`, `Crítico`).
   - Mapa Hidráulico interactivo con superposiciones de riesgo y estaciones de bombeo.

2. **Simulador Móvil Ciudadano & Botón SOS**:
   - Interfaz adaptada para dispositivos móviles con navegación fluida (Inicio, Mapa, Reportar, SOS, Alertas, Eco-infraestructura).
   - **Botón de Emergencia SOS** con reproducción de sonido de alerta oficial (`audio de alerta.mpeg`), cuenta regresiva de evacuación y conexión directa con el COMUPRED y bomberos.
   - Envío de reportes ciudadanos con geolocalización, categoría (Inundación, Desborde de Cauce, Árbol Caído, Azolve) y carga de evidencias fotográficas.

3. **Centro de Mando Municipal (Administración Táctica)**:
   - Panel de control para autoridades municipales y brigadas de respuesta rápida.
   - Gestión y clasificación de incidentes ciudadanos (Pendientes, En Verificación, Atendidos).
   - Activación de alertas masivas y protocolos de evacuación por distritos.

4. **Funcionamiento Offline & Resiliencia PWA**:
   - Service Worker avanzado con almacenamiento en caché estático y dinámico para operación sin conexión a internet.
   - Sincronización automática de datos locales con **Firebase Firestore** y persistencia local (`localStorage`).
   - **Instalación como WebAPK / PWA**: Guía interactiva y botón de instalación directa en dispositivos Android y navegadores de escritorio.

5. **Identidad Visual Oficial & Diseño Perfeccionista**:
   - Integración de los logotipos oficiales (`logo definitivo.png` y `logo definitivo solo logo.png`).
   - Tipografía refinada (*Plus Jakarta Sans*, *DM Sans*) y paleta de colores optimizada (modo claro de alta legibilidad, alertas rojas y acentos hidrológicos).

---

## 🛠️ Tecnologías y Arquitectura

- **Frontend**: React 18, TypeScript, Tailwind CSS v4, Lucide React (iconografía).
- **Herramientas de Compilación**: Vite, VitePWA Plugin.
- **Backend y Base de Datos**: Firebase Firestore & Cloud SQL (Región `us-west2`).
- **Audio & Media**: Web Audio API (sirena de respaldo offline) y elementos HTML5 Audio con sonido de alerta personalizado.

---

## 📦 Instalación y Ejecución Local

1. **Clonar el repositorio e instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

3. **Compilar para producción**:
   ```bash
   npm run build
   ```

---

## 📱 Guía de Uso del Simulador y Modos de Vista

- **Vista Dual / Híbrida**: Permite visualizar simultáneamente el simulador móvil y el centro de mando en pantallas de escritorio.
- **Simulador Móvil**: Experimenta la experiencia del ciudadano en un dispositivo móvil con marco físico ajustable.
- **Centro de Mando**: Administra alertas, cauces y reportes operativos desde la perspectiva institucional.

---

## 📄 Licencia y Créditos

Desarrollado para la gestión de riesgos y protección civil en Managua, Nicaragua. Todos los derechos reservados.
