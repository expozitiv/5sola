export interface Speaker {
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export interface ScheduleItem {
  time: string;
  activity: string;
}

export interface DaySchedule {
  day: string;
  items: ScheduleItem[];
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  locationUrl?: string;
  description: string;
  speakers: Speaker[];
  topics: string[];
  schedule: DaySchedule[];
  youtubePlaylist?: string;
  stripeLink?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Belief {
  id: string;
  title: string;
  description: string;
  longDescription: string;
}
