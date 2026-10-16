import { CitizenReport, ReservoirSite, AlertNotice, GreenInfraSite, EmergencySOS } from '../types';

export const OFFICIAL_LOGO_URL = "https://raw.githubusercontent.com/soyjuanrafa/imagenes-y-iconos-de-aplicaciones/main/logo%20definitivo.png";
export const OFFICIAL_ISOTIPO_URL = "https://raw.githubusercontent.com/soyjuanrafa/imagenes-y-iconos-de-aplicaciones/main/logo%20definitivo%20solo%20logo.png";
export const ALERT_AUDIO_URL = "https://raw.githubusercontent.com/soyjuanrafa/imagenes-y-iconos-de-aplicaciones/main/audio%20de%20alerta.mpeg";
export const OFFICIAL_HYDRAULIC_MAP_URL = "https://raw.githubusercontent.com/soyjuanrafa/imagenes-y-iconos-de-aplicaciones/main/mapa%20hidraulico.jpeg";

export const INITIAL_RESERVOIRS: ReservoirSite[] = [
  {
    id: 'res-gauchos',
    name: 'Micropresa Los Gauchos',
    district: 'Distrito I',
    locationDescription: 'Pista Suburbana / Desembocadura a Cuenca Tiscapa',
    coordinates: { lat: 12.1245, lng: -86.2625 },
    maxDepthMeters: 7.5,
    normalThresholdMeters: 3.5,
    cautionThresholdMeters: 5.2,
    criticalThresholdMeters: 6.8,
    currentLevelMeters: 3.8,
    capacityPercentage: 50.7,
    status: 'normal',
    esp32Device: {
      deviceId: 'ESP32-MG-01',
      macAddress: '24:6F:28:B4:7A:1C',
      batteryPercentage: 94,
      wifiSignalDbm: -68,
      firmwareVersion: 'v2.4.1-contingencia',
      lastPing: 'Hace 35 segundos',
      sensorType: 'Ultrasónico JSN-SR04T',
      isSimulated: true
    },
    readingsHistory: [
      { timestamp: '06:00', levelMeters: 2.1, capacityPercentage: 28.0, rateOfChangeMph: 0.05 },
      { timestamp: '08:00', levelMeters: 2.3, capacityPercentage: 30.6, rateOfChangeMph: 0.10 },
      { timestamp: '10:00', levelMeters: 2.7, capacityPercentage: 36.0, rateOfChangeMph: 0.20 },
      { timestamp: '12:00', levelMeters: 3.2, capacityPercentage: 42.6, rateOfChangeMph: 0.25 },
      { timestamp: '14:00', levelMeters: 3.8, capacityPercentage: 50.7, rateOfChangeMph: 0.30 },
    ]
  },
  {
    id: 'res-tiscapa',
    name: 'Cuenca y Laguna de Tiscapa',
    district: 'Distrito I',
    locationDescription: 'Microcuenca Central / Receptor de Cauce Oriental',
    coordinates: { lat: 12.1386, lng: -86.2709 },
    maxDepthMeters: 12.0,
    normalThresholdMeters: 5.0,
    cautionThresholdMeters: 8.5,
    criticalThresholdMeters: 10.5,
    currentLevelMeters: 6.1,
    capacityPercentage: 50.8,
    status: 'precaucion',
    esp32Device: {
      deviceId: 'ESP32-MG-02',
      macAddress: '30:AE:A4:07:3E:92',
      batteryPercentage: 88,
      wifiSignalDbm: -72,
      firmwareVersion: 'v2.4.1-contingencia',
      lastPing: 'Hace 1 minuto',
      sensorType: 'Presión Hidrostática Submersible',
      isSimulated: true
    },
    readingsHistory: [
      { timestamp: '06:00', levelMeters: 4.8, capacityPercentage: 40.0, rateOfChangeMph: 0.1 },
      { timestamp: '08:00', levelMeters: 5.1, capacityPercentage: 42.5, rateOfChangeMph: 0.15 },
      { timestamp: '10:00', levelMeters: 5.5, capacityPercentage: 45.8, rateOfChangeMph: 0.2 },
      { timestamp: '12:00', levelMeters: 5.9, capacityPercentage: 49.1, rateOfChangeMph: 0.2 },
      { timestamp: '14:00', levelMeters: 6.1, capacityPercentage: 50.8, rateOfChangeMph: 0.1 },
    ]
  },
  {
    id: 'res-colinas',
    name: 'Micropresa Las Colinas / Sabana Grande',
    district: 'Distrito V',
    locationDescription: 'Corredor Sureste / Control de avenidas hacia carretera a Masaya',
    coordinates: { lat: 12.0965, lng: -86.2374 },
    maxDepthMeters: 6.0,
    normalThresholdMeters: 2.8,
    cautionThresholdMeters: 4.2,
    criticalThresholdMeters: 5.4,
    currentLevelMeters: 2.3,
    capacityPercentage: 38.3,
    status: 'normal',
    esp32Device: {
      deviceId: 'ESP32-MG-03',
      macAddress: 'A0:B7:65:F1:4D:88',
      batteryPercentage: 99,
      wifiSignalDbm: -64,
      firmwareVersion: 'v2.4.1-contingencia',
      lastPing: 'Hace 12 segundos',
      sensorType: 'Ultrasónico JSN-SR04T',
      isSimulated: true
    },
    readingsHistory: [
      { timestamp: '06:00', levelMeters: 1.8, capacityPercentage: 30.0, rateOfChangeMph: 0.05 },
      { timestamp: '08:00', levelMeters: 1.9, capacityPercentage: 31.6, rateOfChangeMph: 0.05 },
      { timestamp: '10:00', levelMeters: 2.1, capacityPercentage: 35.0, rateOfChangeMph: 0.1 },
      { timestamp: '12:00', levelMeters: 2.2, capacityPercentage: 36.6, rateOfChangeMph: 0.05 },
      { timestamp: '14:00', levelMeters: 2.3, capacityPercentage: 38.3, rateOfChangeMph: 0.05 },
    ]
  }
];

export const INITIAL_REPORTS: CitizenReport[] = [
  {
    id: 'rep-001',
    folio: 'CTG-2026-084',
    category: 'tragante_obstruido',
    title: 'Tragante principal colapsado con basura y sedimentos',
    description: 'El tragante pluvial de la esquina frente a la pulpería La Bendición está completamente bloqueado por hojas secas, botellas y arena acumulada de las últimas lluvias.',
    zone: 'Distrito I',
    neighborhood: 'Barrio Los Ángeles',
    address: 'Del Puente El Paraisito 2c al sur, 1c abajo',
    coordinates: { lat: 12.1382, lng: -86.2558 },
    photoUrl: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=800&q=80',
    timestamp: 'Hoy, 10:45 AM',
    status: 'en_atencion',
    priority: 'alta',
    reporterName: 'Carlos Mendoza Jarquín',
    reporterPhone: '+505 8844-1290',
    waterDepthCm: 18,
    actionLog: [
      {
        id: 'act-1',
        timestamp: 'Hoy, 10:45 AM',
        author: 'Sistema Ciudadano',
        role: 'Ingreso Web',
        note: 'Reporte registrado por habitante con evidencia fotográfica.',
        fromStatus: undefined,
        toStatus: 'pendiente'
      },
      {
        id: 'act-2',
        timestamp: 'Hoy, 11:15 AM',
        author: 'Ing. Sofía Blandón',
        role: 'Técnico COMUPRED',
        note: 'Revisión técnica preliminar. Se contactó a cuadrilla de obras municipales.',
        fromStatus: 'pendiente',
        toStatus: 'confirmado'
      },
      {
        id: 'act-3',
        timestamp: 'Hoy, 11:50 AM',
        author: 'Cuadrilla 4 - ALMA',
        role: 'Operaciones de Campo',
        note: 'Cuadrilla en sitio con camión de limpieza hidrocinética.',
        fromStatus: 'confirmado',
        toStatus: 'en_atencion'
      }
    ]
  },
  {
    id: 'rep-002',
    folio: 'CTG-2026-083',
    category: 'calle_inundada',
    title: 'Anegamiento severo de calzada en Pista Solidaridad',
    description: 'Acumulación de más de 35 cm de agua sobre ambos carriles cerca de los semáforos del Hospital La Fraternidad. Varios vehículos pequeños se han quedado varados.',
    zone: 'Distrito V',
    neighborhood: 'Reparto Schick / Col. 14 de Septiembre',
    address: 'Pista Solidaridad, frente al mercado Roberto Huembes sector este',
    coordinates: { lat: 12.1154, lng: -86.2412 },
    photoUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    timestamp: 'Hoy, 09:30 AM',
    status: 'confirmado',
    priority: 'urgente',
    reporterName: 'Martha Lorena Valle',
    reporterPhone: '+505 8711-3490',
    waterDepthCm: 38,
    actionLog: [
      {
        id: 'act-4',
        timestamp: 'Hoy, 09:30 AM',
        author: 'Martha Lorena Valle',
        role: 'Ciudadano',
        note: 'Reporte ingresado con geolocalización GPS precisa.',
        fromStatus: undefined,
        toStatus: 'pendiente'
      },
      {
        id: 'act-5',
        timestamp: 'Hoy, 09:42 AM',
        author: 'Monitoreo Vial ALMA',
        role: 'Centro de Mando',
        note: 'Confirmado por cámara de tráfico C4. Nivel del agua compromete paso vehicular.',
        fromStatus: 'pendiente',
        toStatus: 'confirmado'
      }
    ]
  },
  {
    id: 'rep-003',
    folio: 'CTG-2026-082',
    category: 'desborde_cauce',
    title: 'Caudal del Cauce Oriental al 90% de sección hidráulica',
    description: 'El cauce que atraviesa El Dorado presenta arrastre fuerte de sedimentos y ramas de árboles grandes, amenazando con desbordarse hacia las viviendas ribereñas.',
    zone: 'Distrito IV',
    neighborhood: 'Barrio El Dorado',
    address: 'Costado norte del puente El Dorado, 50 metros abajo',
    coordinates: { lat: 12.1321, lng: -86.2489 },
    photoUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    timestamp: 'Hoy, 08:15 AM',
    status: 'en_verificacion',
    priority: 'urgente',
    reporterName: 'Brigada Barrio El Dorado (Javier Cruz)',
    reporterPhone: '+505 8299-4455',
    waterDepthCm: 140,
    actionLog: [
      {
        id: 'act-6',
        timestamp: 'Hoy, 08:15 AM',
        author: 'Javier Cruz',
        role: 'Líder de Barrio',
        note: 'Aviso urgente de incremento súbito de nivel.',
        fromStatus: undefined,
        toStatus: 'pendiente'
      },
      {
        id: 'act-7',
        timestamp: 'Hoy, 08:35 AM',
        author: 'Ing. René Silva',
        role: 'Dirección de Drenaje',
        note: 'Técnico asignado para aforo y verificación de compuertas aguas arriba.',
        fromStatus: 'pendiente',
        toStatus: 'en_verificacion'
      }
    ]
  },
  {
    id: 'rep-004',
    folio: 'CTG-2026-081',
    category: 'acumulacion_basura',
    title: 'Acumulación de sedimentos y ripio en cuneta',
    description: 'Cuneta colmatada tras limpieza de predio baldío. Impide el libre escurrimiento hacia el cauce.',
    zone: 'Distrito II',
    neighborhood: 'Barrio Monseñor Lezcano',
    address: 'De la estatua de Monseñor Lezcano 3c al norte',
    coordinates: { lat: 12.1488, lng: -86.2921 },
    photoUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
    timestamp: 'Ayer, 04:20 PM',
    status: 'resuelto',
    priority: 'media',
    reporterName: 'Guillermo Rivas',
    reporterPhone: '+505 8920-1122',
    waterDepthCm: 5,
    actionLog: [
      {
        id: 'act-8',
        timestamp: 'Ayer, 04:20 PM',
        author: 'Guillermo Rivas',
        role: 'Vecino',
        note: 'Reporte ingresado.',
        fromStatus: undefined,
        toStatus: 'pendiente'
      },
      {
        id: 'act-9',
        timestamp: 'Ayer, 05:00 PM',
        author: 'Supervisor Distrito II',
        role: 'ALMA',
        note: 'Inspeccionado y programado con pala mecánica.',
        fromStatus: 'pendiente',
        toStatus: 'en_atencion'
      },
      {
        id: 'act-10',
        timestamp: 'Hoy, 07:45 AM',
        author: 'Cuadrilla 2',
        role: 'Obras Públicas',
        note: 'Cuneta despejada y sedimentos retirados. Drenaje 100% operativo.',
        fromStatus: 'en_atencion',
        toStatus: 'resuelto'
      }
    ]
  },
  {
    id: 'rep-005',
    folio: 'CTG-2026-080',
    category: 'aumento_nivel',
    title: 'Aumento rápido de encharcamiento en rotonda Cristo Rey',
    description: 'El agua sobrepasa el nivel del bordillo hacia el parqueo comercial.',
    zone: 'Distrito I',
    neighborhood: 'Rotonda Cristo Rey',
    address: 'Rotonda Cristo Rey 100m hacia el sur',
    coordinates: { lat: 12.1310, lng: -86.2580 },
    photoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    timestamp: 'Hoy, 11:20 AM',
    status: 'pendiente',
    priority: 'media',
    reporterName: 'Fátima Morales',
    reporterPhone: '+505 8645-7733',
    waterDepthCm: 15,
    actionLog: [
      {
        id: 'act-11',
        timestamp: 'Hoy, 11:20 AM',
        author: 'Fátima Morales',
        role: 'Ciudadana',
        note: 'Registro inicial recibido en plataforma.',
        fromStatus: undefined,
        toStatus: 'pendiente'
      }
    ]
  }
];

export const INITIAL_ALERTS: AlertNotice[] = [
  {
    id: 'alt-001',
    title: 'Aviso Técnico: Aumento sostenido en Micropresa Los Gauchos (+0.30 m/h)',
    origin: 'plataforma_preventiva',
    entity: 'Plataforma Contingencia (Sensor ESP32)',
    severity: 'moderada',
    message: 'Las mediciones del sensor telemétrico registran una cota de 3.8m con tendencia ascendente. Regla preventiva: si supera los 5.2m se notificará a cuadrillas de drenaje para revisión de compuertas.',
    zone: 'Cuenca Tiscapa y Pista Suburbana (Distrito I)',
    timestamp: 'Hace 15 minutos',
    technicalRule: 'Umbral de advertencia calibrado a 5.20m (69% de capacidad útil).'
  },
  {
    id: 'alt-002',
    title: 'Comunicado Oficial SINAPRED / INETER: Onda Tropical N° 28 sobre el Pacífico',
    origin: 'oficial_autoridades',
    entity: 'SINAPRED',
    severity: 'alta',
    message: 'INETER prevé precipitaciones de intensidad moderada a fuerte con tormentas eléctricas en Managua entre las 13:00 y 18:00 horas. Se activa vigilancia preventiva en puntos críticos del municipio de Managua.',
    zone: 'Municipio de Managua y Cuenca Sur del Lago Xolotlán',
    timestamp: 'Hoy, 07:00 AM',
    officialSourceUrl: 'https://www.sinapred.gob.ni'
  },
  {
    id: 'alt-003',
    title: 'Recomendación Preventiva Ciudadana: Despeje de cunetas previo a lluvias',
    origin: 'plataforma_preventiva',
    entity: 'COMUPRED Managua',
    severity: 'informativa',
    message: 'Se exhorta a las familias ribereñas y del casco urbano no arrojar basura ni bolsas plásticas a las calles ni a los cauces para evitar taponamientos en tragantes.',
    zone: 'Barrios urbanos de Managua',
    timestamp: 'Ayer, 06:00 PM'
  }
];

export const INITIAL_GREEN_INFRA: GreenInfraSite[] = [
  {
    id: 'gi-001',
    name: 'Jardín de Lluvia Parque Las Madres / Pista Zeledón',
    solutionType: 'jardin_lluvia',
    district: 'Distrito I',
    address: 'Costado sur de Parque Las Madres, Pista Benjamín Zeledón',
    coordinates: { lat: 12.1332, lng: -86.2755 },
    estimatedRunoffReduction: '35% de escorrentía superficial',
    suitableAreaM2: 420,
    status: 'prioridad_alta',
    description: 'Espacio vegetado deprimido diseñado con capas de suelo filtrante y especies nativas (zacate vetiver, heliconias) para captar y retener temporalmente el agua que desciende de la cuenca alta.',
    soilType: 'Franco-arenoso con infiltración moderada a alta',
    benefits: [
      'Disminución del golpe de agua hacia el Cauce Occidental',
      'Infiltración natural al acuífero de Managua',
      'Embellecimiento paisajístico urbano y enfriamiento microclimático'
    ],
    linkedReportsCount: 4,
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gi-002',
    name: 'Superficie Permeable y Adoquín Filtrante Metrocentro',
    solutionType: 'superficie_permeable',
    district: 'Distrito I',
    address: 'Área perimetral de estacionamientos y aceras Pista Juan Pablo II',
    coordinates: { lat: 12.1278, lng: -86.2650 },
    estimatedRunoffReduction: '28% de volumen pico',
    suitableAreaM2: 680,
    status: 'en_estudio',
    description: 'Sustitución de asfalto impermeable convencional por bloques de concreto poroso con juntas de grava volcánica para infiltración in-situ.',
    soilType: 'Capa superficial modificada con sub-base granular drenante',
    benefits: [
      'Eliminación de láminas de agua en calzada peatonal',
      'Alivio al drenaje pluvial entubado de la rotonda Rubén Darío',
      'Bajo mantenimiento con barrido preventivo'
    ],
    linkedReportsCount: 6,
    imageUrl: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gi-003',
    name: 'Área de Infiltración y Cuneta Verde Pista Suburbana km 9',
    solutionType: 'infiltracion_vegetada',
    district: 'Distrito III',
    address: 'Derecho de vía Pista Suburbana frente a Col. San Patricio',
    coordinates: { lat: 12.1120, lng: -86.3020 },
    estimatedRunoffReduction: '42% de flujo concentrado',
    suitableAreaM2: 850,
    status: 'validado_tecnico',
    description: 'Zanja de infiltración cubierta de vegetación densa para ralentizar la velocidad de la escorrentía que baja de las serranías de Managua antes de ingresar a los cauces de tierra.',
    soilType: 'Suelo arcilloso con bio-zanjas de piedra bola local',
    benefits: [
      'Retención de sedimentos pesados antes del cauce',
      'Protección contra la erosión y socavación de taludes viales',
      'Filtro natural de hidrocarburos de la carretera'
    ],
    linkedReportsCount: 3,
    imageUrl: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gi-004',
    name: 'Recuperación de Zona Verde Ribereña Cauce Oriental',
    solutionType: 'recuperacion_verde',
    district: 'Distrito IV',
    address: 'Borde de servidumbre pluvial Barrio El Edén / San Luis',
    coordinates: { lat: 12.1415, lng: -86.2490 },
    estimatedRunoffReduction: '20% de impacto hidráulico',
    suitableAreaM2: 560,
    status: 'en_estudio',
    description: 'Reconversión de vertederos clandestinos en franjas buffer con árboles de raíces profundas (madroño, sacuanjoche, cortez) para consolidar los bordes del cauce.',
    soilType: 'Aluvial consolidado',
    benefits: [
      'Evita que los vecinos depositen desechos en el cauce',
      'Estabiliza los taludes con masa radicular',
      'Crea un corredor ecológico barrial'
    ],
    linkedReportsCount: 5,
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80'
  }
];

export const EMERGENCY_CONTACTS = [
  { name: 'Cruz Blanca Nicaragüense', number: '128', type: 'Primeros Auxilios / Ambulancia', desc: 'Atención prehospitalaria y rescate' },
  { name: 'Bomberos Unidos de Nicaragua', number: '115', type: 'Rescate e Inundaciones', desc: 'Evacuación y achique de agua' },
  { name: 'Puesto de Mando ALMA / COMUPRED', number: '102', type: 'Emergencias Municipales', desc: 'Despeje de cauces y cuadrillas' },
  { name: 'Policía Nacional', number: '118', type: 'Seguridad y Tránsito', desc: 'Cierre vial y auxilio ciudadano' },
  { name: 'Línea de Enlace SINAPRED', number: '+505 2228-3900', type: 'Coordinación Nacional', desc: 'Monitoreo de desastres' }
];
