# CONTENCIÓN (CONTINGENCIA) &middot; Sistema Integral de Prevención de Inundaciones & Monitoreo de Cauces (Managua, Nicaragua)

**CONTENCIÓN** es una plataforma tecnológica avanzada diseñada para la gestión de riesgos hidrometeorológicos, monitoreo en tiempo real de cauces, alerta temprana ante crecidas y gestión táctica de emergencias municipales y comunitarias en Managua, Nicaragua.

---

## 🎨 Paleta de Colores

La identidad visual está diseñada bajo principios de accesibilidad y claridad institucional, empleando una paleta semántica optimizada para situaciones de emergencia:

| Color / Tono | Código Hex / Clase | Uso Principal en la UI |
| :--- | :--- | :--- |
| **Rojo Emergencia / Alerta** | `#DC2626` (`red-600`) / `#FEE2E2` (`red-50`) | Botón SOS, estados críticos de cauces y notificaciones de alta severidad. |
| **Azul Hidrológico** | `#0284C7` (`sky-600`) / `#E0F2FE` (`sky-50`) | Niveles de agua, mapa hidráulico oficial y estaciones de monitoreo pluvial. |
| **Verde Ecológico** | `#059669` (`emerald-600`) / `#D1FAE5` (`emerald-50`) | Infraestructura verde, jardines de lluvia y reportes resueltos. |
| **Ámbar Precaución** | `#D97706` (`amber-600`) / `#FEF3C7` (`amber-50`) | Alertas preventivas y reportes ciudadanos pendientes de verificación. |
| **Pizarra Neutro (Texto/Fondo)**| `#0F172A` (`slate-900`) / `#F8FAFC` (`slate-50`) | Fondos generales de la aplicación, tipografía institucional y bordes estructurados. |

---

## 📐 Esquemas de Trabajo y Arquitectura

La arquitectura de la aplicación sigue un modelo modular **Offline-First / Progressive Web App (PWA)**:

```
+-------------------------------------------------------------------------+
|                        Capa de Cliente (Frontend)                       |
|   React 18 + TypeScript + Tailwind CSS v4 + Simulador Móvil y Desktop   |
+----------------------------------+--------------------------------------+
                                   |
            +----------------------+----------------------+
            | Sincronización bidireccional                | Caché Offline (PWA)
            v                                             v
+-----------------------+                         +-----------------------+
|  Firebase Firestore   |                         |   Service Worker &    |
|   (Autenticación &    |                         |    IndexedDB / Cache  |
|    Estado en tiempo   |                         |    (Modo sin conex.)  |
|         real)         |                         +-----------------------+
+-----------------------+
            ^
            | Región us-west2
+-----------------------+
|   Cloud SQL (PostgreSQL)|
|   (Persistencia y DB) |
+-----------------------+
```

---

## 🔄 Flujos de Trabajo (Workflows)

### 1. Flujo de Activación y Emergencia SOS
1. **Acceso Ciudadano**: El usuario abre la app móvil o simulador y pulsa el botón central **SOS**.
2. **Reproducción de Audio**: El sistema reproduce de inmediato el sonido oficial de alerta (`audio de alerta.mpeg`) respaldado por un sintetizador Web Audio API offline.
3. **Activación de Protocolo**: Se inicia una cuenta regresiva de evacuación y se transmite la señal al Centro de Mando Municipal.
4. **Respuesta Rápida**: Las brigadas del COMUPRED visualizan la emergencia geolocalizada en el panel táctico.

### 2. Flujo de Reporte Ciudadano de Incidencias
1. **Captura**: El ciudadano ingresa a la pestaña "Reportar", adjunta evidencia fotográfica y describe la incidencia (obstrucción de tragantes, desborde de cauce, árbol caído).
2. **Geolocalización**: El sistema asocia automáticamente la incidencia al distrito y micropresa más cercana.
3. **Revisión Municipal**: El reporte entra con estado `Pendiente` en el Centro de Mando.
4. **Atención y Resolución**: Las autoridades cambian el estado a `En Atención` o `Resuelto`, notificando en tiempo real al usuario.

### 3. Flujo de Funcionamiento Offline (PWA / WebAPK)
1. **Detección de Red**: Si el dispositivo pierde conexión a internet, el **Service Worker** (`sw.js`) intercepta las solicitudes HTTP.
2. **Caché Estática**: Se sirven los recursos locales y datos almacenados en `localStorage` / caché.
3. **Sincronización Diferida**: Las acciones realizadas offline se encolan y sincronizan con Firebase al restablecerse la conectividad.
4. **Instalación APK**: El usuario puede instalar la aplicación directamente en Android mediante el modal de descarga PWA.

---

## 🚀 Características Principales

1. **Monitoreo Hidrológico en Tiempo Real**: Control de cauces y embalses (El Chipote, Oriental, Cuenca Sur, etc.) con niveles y capacidad.
2. **Centro de Mando Municipal**: Panel administrativo para autoridades y brigadas de rescate.
3. **Identidad Visual Oficial**: Logotipos definitivos y tipografía refinada (*Plus Jakarta Sans*, *DM Sans*).

---

## 📦 Instalación y Ejecución Local

1. **Instalar dependencias**:
   ```bash
   npm install
   ```
2. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```
3. **Compilar para producción**:
   ```bash
   npm run build
   ```

---

## 📄 Licencia y Créditos

Desarrollado para la gestión de riesgos y protección civil en Managua, Nicaragua. Todos los derechos reservados.
