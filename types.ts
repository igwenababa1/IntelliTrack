export enum Carrier {
  UPS = 'UPS',
  USPS = 'USPS',
  FedEx = 'FedEx',
  DHL = 'DHL',
  UNKNOWN = 'UNKNOWN',
}

export interface TrackingEvent {
  date: string;
  time: string;
  location: string;
  status: string;
  description: string;
}

interface LocationInfo {
  city: string;
  country: string;
  countryCode: string; // ISO 3166-1 alpha-2 code
}

interface Coordinates {
  lat: number;
  lng: number;
}

export interface TrackingData {
  trackingNumber: string;
  carrier: Carrier;
  status: string;
  estimatedDelivery: string;
  history: TrackingEvent[];
  summary?: string;
  weight?: string;
  dimensions?: string;
  service?: string;
  origin: LocationInfo;
  destination: LocationInfo;
  currentLocation: Coordinates;
  destinationAddress: string;
}