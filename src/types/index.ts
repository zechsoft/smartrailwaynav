export  interface Station {
  id: string;
  name: string;
  code: string;
  city: string;
  state: string;
  amenities: Amenity[];
  platforms: Platform[];
  ticketCounters: TicketCounter[];
  upcomingTrains: Train[];
  crowdLevel: 'low' | 'medium' | 'high';
  isFavorite: boolean;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  crowdLevel: 'low' | 'medium' | 'high';
  location: string;
  details: string;
  lastUpdated: string;
}

export interface Platform {
  number: number;
  currentTrain?: Train;
}

export interface Train {
  number: string;
  name: string;
  destination: string;
  platform: number;
  arrivalTime: string;
  departureTime?: string;
  status: string;
  delay?: number;
  lastUpdated: string;
}

export interface TicketCounter {
  name: string;
  currentQueue: {
    total: number;
    averageWaitTime: string;
    status: 'low' | 'medium' | 'high';
    queuePercentage: number;
    lastUpdated: string;
  };
  services: string[];
}

export interface NavigationRoute {
  id: string;
  name: string;
  steps: string[];
  estimatedTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  waypoints: Waypoint[];
}

export interface Waypoint {
  x: number;
  y: number;
  label: string;
}

export interface Notification {
  id: string;
  message: string;
  time: string;
  isRead: boolean;
}

export interface TicketBooking {
  id: string;
  type: 'general' | 'reserved' | 'platform';
  fromStation: string;
  toStation: string;
  journeyDate: string;
  passengers: number;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  qrCode?: string;
  trainNumber?: string;
  pnr?: string;
}
 