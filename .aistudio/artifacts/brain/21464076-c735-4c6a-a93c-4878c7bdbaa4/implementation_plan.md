# Actualización de Identidad Visual Definitiva y Sonido de Alerta de Emergencia

Plan para integrar los nuevos logos oficiales de CONTINGENCIA (versión completa principal e isotipo simplificado), incorporar el reproductor del audio de alerta en el botón SOS y verificar la total ausencia de errores.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> **Decisiones confirmadas:**
> - **Reproducción de audio de alerta**: Se reproducirá exclusivamente al presionar el **botón de emergencia SOS** (`https://raw.githubusercontent.com/soyjuanrafa/imagenes-y-iconos-de-aplicaciones/main/audio%20de%20alerta.mpeg`), con manejo seguro de promesas para evitar bloqueos de autoplay del navegador.
> - **Distribución de logos definitivos**:
>   - **Logo Definitivo Completo** (`https://raw.githubusercontent.com/soyjuanrafa/imagenes-y-iconos-de-aplicaciones/main/logo%20definitivo.png`): Ubicado en la barra superior (Header), en la pantalla de bienvenida (Splash Screen) y en el panel institucional.
>   - **Logo Definitivo Solo Isotipo** (`https://raw.githubusercontent.com/soyjuanrafa/imagenes-y-iconos-de-aplicaciones/main/logo%20definitivo%20solo%20logo.png`): Utilizado como icono en la barra de navegación del móvil, favicons, chips y tarjetas compactas.
> - **Revisión integral de errores**: Verificación de carga de medios, sincronización de Firestore y encuadres responsivos.

---

### 1. Overview & Core Concept

- **Qué hace**: Sustituye los activos visuales anteriores por la versión de marca definitiva provista por el usuario, conecta el archivo de audio de alerta de emergencia al activarse el protocolo SOS y optimiza la estabilidad del código.
- **Audiencia objetivo**: Usuarios y evaluadores de la plataforma CONTINGENCIA en Nicaragua.

---

### 2. User Experience & Visual Design

#### Puntos de Contacto con los Nuevos Activos
1. **Header Principal**: Reemplazo del logo por el **Logo Definitivo Completo** con proporciones balanceadas y texto nítido.
2. **Splash Screen**: Logo definitivo con animación sutil de respiración y sombra suave.
3. **App Móvil y Navegación**: **Logo Definitivo Solo Logo (Isotipo)** como icono distintivo en la barra superior del teléfono y como botón flotante de auxilio.
4. **Módulo de Emergencia SOS**: Al pulsar el botón circular de auxilio, se inicializa y reproduce el audio de alerta con opción para silenciar o detener en caso de cancelación.

---

### 3. Key Product Decisions & Trade-Offs

- **Manejo Robusto del Audio**:
  - *Enfoque*: Utilizar una instancia de `Audio` pre-cargada con captura de excepciones (`.catch(err => ...)`), garantizando que no se bloquee la interfaz si el usuario navega en modo silencioso.
- **Doble Variedad de Logo**:
  - *Enfoque*: Actualizar `src/data/mockData.ts` con constantes separadas: `OFFICIAL_LOGO_DEFINITIVO` (completo) y `OFFICIAL_ISOTIPO_DEFINITIVO` (solo isotipo).

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Flujo de Disparo de Audio                       │
│                                                                        │
│   [ Usuario pulsa Botón SOS ]                                          │
│              │                                                         │
│              ├─► Reproduce audio_alerta.mpeg (Instancia Audio)         │
│              ├─► Inicia cuenta regresiva de 30s                        │
│              └─► Despacha cuadrilla COMUPRED y sincroniza en Firestore │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 5. Plan de Ejecución

1. **Actualización de Fuentes de Medios**:
   - Actualizar `src/data/mockData.ts` con las nuevas URLs del logo principal, el isotipo y el audio de alerta.
2. **Implementación del Sonido de Alerta en MobileSOS**:
   - Instanciar la reproducción del audio en `MobileSOS.tsx` y proporcionar control de parada al cancelar el auxilio.
3. **Distribución de Logos en Header, Splash y Móvil**:
   - Reemplazar en `Header.tsx`, `SplashScreen.tsx`, `MobileHome.tsx` y `index.html`.
4. **Verificación y Compilación**:
   - Ejecutar `compile_applet` y `lint_applet` para garantizar 0 errores.
