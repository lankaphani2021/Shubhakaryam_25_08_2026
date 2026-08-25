export interface Service {
  _row_id: number;
  slug: string;
  name: string;
  deity: string;
  category: string;
  description: string;
  duration_minutes: number;
  price: number;
  image_url: string;
  samagri: string;
  active: number;
}

export interface Priest {
  _row_id: number;
  slug: string;
  name: string;
  tradition: string;
  languages: string;
  city: string;
  experience_years: number;
  rating: number;
  bio: string;
  photo_url: string;
  active: number;
}

export interface Booking {
  _row_id: number;
  _created_at: number;
  reference: string;
  service_slug: string;
  service_name: string;
  priest_slug: string | null;
  priest_name: string | null;
  booking_date: string;
  booking_time: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  area?: string | null;
  notes: string;
  amount: number;
  payment_status: string;
  status: string;
  is_multi_day?: number;
  end_date?: string | null;
  birth_details?: string | null;
  partner_birth_details?: string | null;
}

export const TIME_SLOTS = [
  // Early morning slots
  "06:00 AM",
  "07:30 AM",
  "09:00 AM",
  "10:30 AM",
  // Morning/afternoon slots  
  "12:00 PM",
  "01:30 PM",
  "03:00 PM",
  "04:30 PM",
  // Evening slots (from 7 PM onwards)
  "06:00 PM",
  "07:30 PM",
  "09:00 PM",
  "10:30 PM",
  // Night slots
  "12:00 AM",
  "01:30 AM",
  "03:00 AM",
  "04:30 AM",
];

export const formatINR = (n: number) =>
  "₹" + new Intl.NumberFormat("en-IN").format(n);

export const formatDuration = (m: number) =>
  m >= 60 ? `${Math.floor(m / 60)}h${m % 60 ? ` ${m % 60}m` : ""}` : `${m}m`;
