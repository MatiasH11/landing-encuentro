export interface ContactPerson {
  name: string;
  phone: string;
  email: string;
  whatsappUrl: string;
  facebook?: string;
}

export interface EventInclusion {
  label: string;
}

export interface EventEdition {
  id: string;
  editionNumber: number;
  title: string;
  location: string;
  province: string;
  country: string;
  venue: string;
  dateRange: string;
  startDate: string;
  endDate: string;
  year: number;
  costPerPerson: number;
  depositPerPerson: number;
  inclusions: EventInclusion[];
  paymentDeadline: string;
  maxBallets: number;
  maxMusicGroups: number;
  minMembersPerBallet: number;
  maxPerformanceMinutes: number;
  guaranteedNights: number;
  freeAdmission: boolean;
}

export interface ScheduleActivity {
  time: string;
  description: string;
  highlight?: boolean;
}

export interface ScheduleDay {
  day: string;
  date: string;
  activities: ScheduleActivity[];
}

export interface GalleryItem {
  id: string;
  type: "photo" | "video";
  src: string;
  thumbnailSrc?: string;
  videoUrl?: string;
  year: number;
  caption: string;
  alt: string;
}

export interface HistoricalStat {
  value: string;
  label: string;
}

export interface Organizer {
  name: string;
  title: string;
}

export interface NavLink {
  label: string;
  href: string;
}
