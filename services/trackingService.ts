import { CARRIER_REGEX } from '../constants';
import { Carrier } from '../types';
import type { TrackingData } from '../types';

export const identifyCarrier = (trackingNumber: string): Carrier => {
  if (CARRIER_REGEX[Carrier.UPS].test(trackingNumber)) {
    return Carrier.UPS;
  }
  if (CARRIER_REGEX[Carrier.USPS].test(trackingNumber)) {
    return Carrier.USPS;
  }
  if (CARRIER_REGEX[Carrier.FedEx].test(trackingNumber)) {
    return Carrier.FedEx;
  }
  if (CARRIER_REGEX[Carrier.DHL].test(trackingNumber)) {
    return Carrier.DHL;
  }
  return Carrier.UNKNOWN;
};

const mockUpsData: TrackingData = {
  trackingNumber: '1Z999AA10123456784',
  carrier: Carrier.UPS,
  status: 'In Transit',
  estimatedDelivery: 'June 28, 2024',
  weight: '3.5 lbs',
  dimensions: '10x6x4 in',
  service: 'UPS Worldwide Saver',
  origin: { city: 'Mexico City', country: 'Mexico', countryCode: 'MX' },
  destination: { city: 'Chicago', country: 'USA', countryCode: 'US' },
  destinationAddress: '123 N Wacker Dr, Chicago, IL 60606',
  currentLocation: { lat: 39.8283, lng: -98.5795 }, // Center of US for "in transit"
  history: [
    { date: 'Jun 25, 2024', time: '08:30 AM', location: 'Mexico City, MX', status: 'Shipper created a label', description: 'UPS has received the electronic transmission of the shipment details and billing information.' },
    { date: 'Jun 25, 2024', time: '04:15 PM', location: 'Mexico City, MX', status: 'Picked Up', description: 'UPS has received the shipment.' },
    { date: 'Jun 26, 2024', time: '01:05 AM', location: 'Laredo, TX', status: 'Departed from Facility', description: 'The package has left the UPS facility after clearing customs.' },
    { date: 'Jun 27, 2024', time: '05:45 PM', location: 'Chicago, IL', status: 'Arrived at Facility', description: 'The package has arrived at a UPS facility.' },
  ],
};

const mockUspsData: TrackingData = {
  trackingNumber: '9400100000000000000000',
  carrier: Carrier.USPS,
  status: 'Out for Delivery',
  estimatedDelivery: 'June 28, 2024',
  weight: '0.8 lbs',
  service: 'USPS Priority Mail',
  origin: { city: 'San Francisco', country: 'USA', countryCode: 'US' },
  destination: { city: 'New York', country: 'USA', countryCode: 'US' },
  destinationAddress: '1 Pennsylvania Plaza, New York, NY 10119',
  currentLocation: { lat: 40.7505, lng: -73.9934 }, // Penn Station
  history: [
    { date: 'Jun 25, 2024', time: '11:20 AM', location: 'San Francisco, CA', status: 'Acceptance', description: 'USPS in possession of item.' },
    { date: 'Jun 26, 2024', time: '02:10 AM', location: 'San Francisco, CA', status: 'Processed Through Facility', description: 'Processed through our SAN FRANCISCO CA NETWORK DISTRIBUTION CENTER facility.' },
    { date: 'Jun 27, 2024', time: '09:00 PM', location: 'New York, NY', status: 'Arrived at Post Office', description: 'The item has arrived at the local Post Office.' },
    { date: 'Jun 28, 2024', time: '07:30 AM', location: 'New York, NY', status: 'Out for Delivery', description: 'Your item is out for delivery.' },
  ],
};

const deliveredUspsData: TrackingData = {
    trackingNumber: '9405500000000000000000',
    carrier: Carrier.USPS,
    status: 'Delivered',
    estimatedDelivery: 'June 27, 2024',
    weight: '1.2 lbs',
    dimensions: '8x8x8 in',
    service: 'USPS First-Class Package',
    origin: { city: 'Miami', country: 'USA', countryCode: 'US' },
    destination: { city: 'Atlanta', country: 'USA', countryCode: 'US' },
    destinationAddress: '1 Margaret Mitchell Square, Atlanta, GA 30303',
    currentLocation: { lat: 33.7548, lng: -84.3877 }, // Atlanta
    history: [
        { date: 'Jun 25, 2024', time: '10:00 AM', location: 'Miami, FL', status: 'Acceptance', description: 'USPS has the package.' },
        { date: 'Jun 26, 2024', time: '11:00 PM', location: 'Atlanta, GA', status: 'In Transit to Next Facility', description: 'Departed USPS Regional Facility.' },
        { date: 'Jun 27, 2024', time: '06:45 AM', location: 'Atlanta, GA', status: 'Out for Delivery', description: 'Preparing for delivery.' },
        { date: 'Jun 27, 2024', time: '02:30 PM', location: 'Atlanta, GA', status: 'Delivered', description: 'Delivered, In/At Mailbox. Your item has been delivered.' },
    ],
};

const mockFedexData: TrackingData = {
  trackingNumber: '123456789012',
  carrier: Carrier.FedEx,
  status: 'Delivered',
  estimatedDelivery: 'June 27, 2024',
  weight: '1.0 lbs',
  dimensions: '9x12 in (Envelope)',
  service: 'FedEx International Priority',
  origin: { city: 'Toronto', country: 'Canada', countryCode: 'CA' },
  destination: { city: 'Dallas', country: 'USA', countryCode: 'US' },
  destinationAddress: '2500 Victory Ave, Dallas, TX 75219',
  currentLocation: { lat: 32.7767, lng: -96.7970 }, // Dallas
  history: [
    { date: 'Jun 26, 2024', time: '10:00 PM', location: 'TORONTO, ON', status: 'Left FedEx origin facility', description: 'Package has left the origin facility.' },
    { date: 'Jun 27, 2024', time: '05:30 AM', location: 'DALLAS, TX', status: 'At local FedEx facility', description: 'Package arrived at the local facility.' },
    { date: 'Jun 27, 2024', time: '08:15 AM', location: 'DALLAS, TX', status: 'On FedEx vehicle for delivery', description: 'On vehicle for delivery.' },
    { date: 'Jun 27, 2024', time: '01:20 PM', location: 'DALLAS, TX', status: 'Delivered', description: 'Delivered, left at front door.' },
  ],
};

const mockDhlData: TrackingData = {
  trackingNumber: '1234567890',
  carrier: Carrier.DHL,
  status: 'In Transit',
  estimatedDelivery: 'June 29, 2024',
  weight: '0.5 kg',
  dimensions: '20x15x10 cm',
  service: 'DHL Express Worldwide',
  origin: { city: 'Berlin', country: 'Germany', countryCode: 'DE' },
  destination: { city: 'Los Angeles', country: 'USA', countryCode: 'US' },
  destinationAddress: '1000 Vin Scully Ave, Los Angeles, CA 90012',
  currentLocation: { lat: 50.1109, lng: 8.6821 }, // Frankfurt, a major hub
  history: [
    { date: 'Jun 26, 2024', time: '03:00 PM', location: 'BERLIN, GERMANY', status: 'Picked Up', description: 'Shipment has been picked up by DHL.' },
    { date: 'Jun 26, 2024', time: '11:55 PM', location: 'LEIPZIG, GERMANY', status: 'Processed at LEIPZIG - GERMANY', description: 'Shipment has been processed at a DHL facility.' },
    { date: 'Jun 27, 2024', time: '04:30 AM', location: 'LEIPZIG, GERMANY', status: 'Departed from Facility', description: 'The shipment has departed from a DHL sort facility.' },
    { date: 'Jun 27, 2024', time: '08:00 PM', location: 'CINCINNATI HUB, OH', status: 'Arrived at Sort Facility', description: 'Shipment has arrived at a DHL facility in CINCINNATI HUB - USA.' },
  ],
};

export const fetchTrackingData = (trackingNumber: string, carrier: Carrier): Promise<TrackingData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (carrier === Carrier.UPS) {
        resolve({ ...mockUpsData, trackingNumber });
      } else if (carrier === Carrier.USPS) {
        // Simple logic to return different mock data
        if(trackingNumber.startsWith('94055')) {
            resolve({ ...deliveredUspsData, trackingNumber });
        } else {
            resolve({ ...mockUspsData, trackingNumber });
        }
      } else if (carrier === Carrier.FedEx) {
        resolve({ ...mockFedexData, trackingNumber });
      } else if (carrier === Carrier.DHL) {
        resolve({ ...mockDhlData, trackingNumber });
      } else {
        reject(new Error('Invalid carrier.'));
      }
    }, 1500); // Simulate network delay
  });
};