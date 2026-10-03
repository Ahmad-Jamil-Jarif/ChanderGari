export type StayCategory = 
  | "luxury_resort" 
  | "mid_motel" 
  | "eco_cottage" 
  | "serviced_apartment" 
  | "budget_guesthouse";

export interface WeatherForecastDay {
  date: string;
  dayName: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  conditionCode: number;
  rainProbability: number;
}

export interface RealTimeWeather {
  destinationId: string;
  locationName: string;
  lat: number;
  lng: number;
  tempC: number;
  tempF: number;
  feelsLikeC: number;
  condition: string;
  conditionCode: number;
  humidity: number;
  windSpeedKmH: number;
  uvIndex: number;
  isDay: boolean;
  forecast: WeatherForecastDay[];
  lastUpdated: string;
}

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  region: string;
  isDomestic?: boolean; // true for Bangladesh, false for Cross-Border
  highlights: string[];
  lat?: number;
  lng?: number;
}

export interface CityHotel {
  id: string;
  name: string;
  type: string;
  stayCategory?: StayCategory;
  rating: number;
  starCategory: number;
  pricePerNight: number; // in BDT
  imageUrl: string;
  description: string;
  location: string;
  amenities: string[];
}

export interface CityFood {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  description: string;
  bestWhere: string;
  priceEstimate: string;
}

export interface CityHistorySite {
  name: string;
  era: string;
  description: string;
}

export interface CityHistory {
  period: string;
  summary: string;
  historicalSites: CityHistorySite[];
  culturalSignificance: string;
}

export interface City {
  id: string;
  name: string;
  countryId: string;
  countryName: string;
  tagline: string;
  description: string;
  imageUrl: string;
  region: string;
  isDomestic?: boolean; // true for Bangladesh, false for Cross-Border
  highlights: string[];
  bestTimeToVisit?: string;
  avgPricePerNight?: number; // in BDT
  history?: CityHistory;
  hotels?: CityHotel[];
  foods?: CityFood[];
  lat?: number;
  lng?: number;
}

export interface AirTicket {
  id: string;
  classType: string;
  price: number; // in BDT
  departureTime: string;
  departureCode: string;
  arrivalTime: string;
  arrivalCode: string;
  duration: string;
  stops: string;
  features: string[];
  isDomestic?: boolean;
}

export interface RoadOption {
  id: string;
  title: string;
  price: number; // in BDT
  description: string;
  duration: string;
  capacityOrDetail: string;
  imageUrl: string;
  isDomestic?: boolean;
}

export interface SeaOption {
  id: string;
  title: string;
  startingPrice: number; // in BDT
  description: string;
  departure: string;
  arrival: string;
  isDomestic?: boolean;
  cabinTypes: {
    name: string;
    description: string;
    extraCost: number; // in BDT
  }[];
}

export interface RoomDetail {
  id: string;
  name: string;
  bedType: string;
  capacity: string;
  sizeSqFt: number;
  viewType: string;
  pricePerNight: number; // in BDT
  features: string[];
  imageUrl?: string;
  isAvailable?: boolean;
}

export interface HotelListing {
  id: string;
  name: string;
  location: string;
  region: string;
  stayCategory: StayCategory;
  isDomestic?: boolean;
  rating: number;
  starCategory: number;
  reviewCount: number;
  pricePerNight: number; // in BDT
  tagline: string;
  description: string;
  imageUrl: string;
  amenities: string[];
  rooms?: RoomDetail[];
}

export interface RestaurantListing {
  id: string;
  name: string;
  location: string;
  region: string;
  isDomestic?: boolean;
  rating: number;
  michelinStars?: number;
  reviewCount: number;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  costPerPerson: number; // in BDT
  cuisine: string;
  signatureDish: string;
  description: string;
  imageUrl: string;
}

export interface TourActivity {
  id: string;
  title: string;
  category: "adventure" | "watersports" | "camping" | "caving" | "trekking";
  location: string;
  region: string;
  isDomestic: boolean;
  rating: number;
  reviewCount: number;
  priceBDT: number;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Extreme";
  description: string;
  highlights: string[];
  safetyGearProvided: string[];
  imageUrl: string;
  bestSeason: string;
}

export interface MythosStory {
  id: string;
  title: string;
  tagline: string;
  story: string;
  imageUrl: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAnonymous: boolean;
}

export interface HotelRetreat {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  imageUrl: string;
  location: string;
  region: string;
  isDomestic?: boolean;
  rating: number;
  pricePerNight: number;
  amenities: string[];
}

export interface BookingRecord {
  id?: string;
  userId?: string;
  type: "flight" | "road" | "sea" | "hotel" | "budget" | "itinerary" | "activity";
  title: string;
  price: number; // in BDT
  details?: string;
  bookedAt: string;
}

export interface TourBudgetItem {
  id: string;
  category: "transport" | "hotel" | "food" | "sightseeing" | "shopping" | "emergency";
  title: string;
  amount: number; // in selected currency
  notes?: string;
}

export interface TourBudgetPlan {
  id: string;
  userId: string;
  tripTitle: string;
  destination: string;
  currency: "BDT" | "USD";
  durationDays: number;
  travelersCount: number;
  totalCost: number;
  items: TourBudgetItem[];
  createdAt: string;
}
