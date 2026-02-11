import type {
  EventEdition,
  ScheduleDay,
  ContactPerson,
  NavLink,
} from "@/types";

export const EDITIONS_2026: EventEdition[] = [
  {
    id: "paso-2026",
    editionNumber: 19,
    title: "19º Encuentro Latinoamericano",
    location: "Paso de la Patria",
    province: "Corrientes",
    country: "Argentina",
    venue: "Anfiteatro Pinin Palma",
    dateRange: "9 al 12 de octubre de 2026",
    startDate: "2026-10-09",
    endDate: "2026-10-12",
    year: 2026,
    costPerPerson: 280000,
    depositPerPerson: 60000,
    inclusions: [
      { label: "4 noches de alojamiento en cabañas" },
      { label: "1 almuerzo (arroz amarillo con pollo) con todas las delegaciones" },
      { label: "Fotografías digitales del ballet" },
      { label: "Certificado de participación" },
      { label: "Seguro de espectáculo" },
      { label: "Actuación en el festival" },
      { label: "Participación en talleres de danzas" },
    ],
    paymentDeadline: "10 de noviembre de 2026",
    maxBallets: 30,
    maxMusicGroups: 2,
    minMembersPerBallet: 15,
    maxPerformanceMinutes: 15,
    guaranteedNights: 2,
    freeAdmission: true,
  },
  {
    id: "mdp-2026",
    editionNumber: 20,
    title: "20º Encuentro Latinoamericano",
    location: "Mar del Plata",
    province: "Buenos Aires",
    country: "Argentina",
    venue: "Teatro Enrique Carreras",
    dateRange: "19 al 22 de noviembre de 2026",
    startDate: "2026-11-19",
    endDate: "2026-11-22",
    year: 2026,
    costPerPerson: 280000,
    depositPerPerson: 60000,
    inclusions: [
      { label: "4 noches de alojamiento en hotel con desayuno" },
      { label: "Fotografías digitales del ballet" },
      { label: "Certificado de participación" },
      { label: "Credenciales" },
      { label: "Seguro de espectáculo" },
      { label: "Actuación en el festival" },
    ],
    paymentDeadline: "10 de noviembre de 2026",
    maxBallets: 30,
    maxMusicGroups: 2,
    minMembersPerBallet: 15,
    maxPerformanceMinutes: 15,
    guaranteedNights: 2,
    freeAdmission: true,
  },
];

export const SCHEDULE_PASO_2026: ScheduleDay[] = [
  {
    day: "Jueves",
    date: "9 de octubre",
    activities: [
      { time: "10:00 hs", description: "Recepción de las delegaciones" },
      { time: "Jornada libre", description: "Tiempo libre para disfrutar de las playas" },
      {
        time: "19:30 hs",
        description: "Primera noche de festival folclórico en el Anfiteatro Pinin Palma — Entradas libres y gratuitas",
        highlight: true,
      },
      { time: "19:30 hs", description: "Expo-Encuentro Latinoamericano: paseo de artesanos y gastronomía" },
      { time: "00:30 hs", description: "Cierre del festival seguido de Peña folclórica" },
    ],
  },
  {
    day: "Viernes",
    date: "10 de octubre",
    activities: [
      { time: "11:00 hs", description: "Talleres de danzas en el Polideportivo Municipal" },
      { time: "13:00 hs", description: "Almuerzo de todas las delegaciones en el Polideportivo Municipal" },
      {
        time: "20:00 hs",
        description: "Segunda noche de festival folclórico — Entradas libres y gratuitas",
        highlight: true,
      },
      { time: "20:00 hs", description: "Expo-Encuentro Latinoamericano: paseo de artesanos y gastronomía" },
      { time: "00:30 hs", description: "Cierre del festival seguido de Peña folclórica" },
    ],
  },
  {
    day: "Sábado",
    date: "11 de octubre",
    activities: [
      { time: "Mañana libre", description: "Tiempo libre para paseos y disfrutar de las playas" },
      {
        time: "18:00 hs",
        description: "Concentración en la Plaza Federico Leloir para sesión de fotos y desfile hasta el Anfiteatro Pinin Palma",
      },
      { time: "19:30 hs", description: "Acto inaugural", highlight: true },
      {
        time: "20:00 hs",
        description: "Tercera noche de festival folclórico",
        highlight: true,
      },
      { time: "01:00 hs", description: "Cierre musical y Peña folclórica" },
    ],
  },
  {
    day: "Domingo",
    date: "12 de octubre",
    activities: [
      { time: "Mañana libre", description: "Tiempo libre para paseos y disfrutar de las playas" },
      {
        time: "19:00 hs",
        description: "Cuarta y última noche de festival folclórico",
        highlight: true,
      },
      { time: "00:30 hs", description: "Cierre del festival folclórico" },
    ],
  },
];

export const CONTACTS: ContactPerson[] = [
  {
    name: "Ángeles Bernachea",
    phone: "+54 9 379 4771606",
    email: "aangelesber@hotmail.com",
    whatsappUrl:
      "https://wa.me/5493794771606?text=Hola!%20Me%20interesa%20participar%20en%20el%20Encuentro%20Latinoamericano%202026.%20Quisiera%20m%C3%A1s%20informaci%C3%B3n.",
    facebook: "Ángeles Bernachea",
  },
  {
    name: "Cacho Bernachea",
    phone: "+54 9 379 4676554",
    email: "las3marias1@hotmail.com",
    whatsappUrl:
      "https://wa.me/5493794676554?text=Hola!%20Me%20interesa%20participar%20en%20el%20Encuentro%20Latinoamericano%202026.%20Quisiera%20m%C3%A1s%20informaci%C3%B3n.",
    facebook: "Cacho Bernachea",
  },
];

export const NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Historia", href: "#historia" },
  { label: "Ediciones 2026", href: "#ediciones" },
  { label: "Programa", href: "#programa" },
  { label: "Galería", href: "#galeria" },
  { label: "Inscripción", href: "#inscripcion" },
  { label: "Contacto", href: "#contacto" },
];
