
import { Carrier } from './types';

export const CARRIER_REGEX: Record<Carrier, RegExp> = {
  [Carrier.UPS]: /^(1Z[0-9A-Z]{16})$/,
  [Carrier.USPS]: /^(\d{22})$|^(94\d{20})$/,
  [Carrier.FedEx]: /^(\d{12})$/,
  [Carrier.DHL]: /^(\d{10})$/,
  [Carrier.UNKNOWN]: /^$/,
};

export const MOCK_SAVED_PACKAGES = [
  { name: 'Office Electronics', number: '1Z999AA10123456784' },
  { name: 'Birthday Gift', number: '9400100000000000000000' },
  { name: 'Important Documents', number: '123456789012' },
  { name: 'Art Supplies (DHL)', number: '1234567890' },
];