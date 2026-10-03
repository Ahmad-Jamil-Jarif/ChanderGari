import { RealTimeWeather, WeatherForecastDay } from "../types";

export interface DestinationCoords {
  id: string;
  name: string;
  lat: number;
  lng: number;
  elevationM: number;
  region: string;
  isDomestic: boolean;
  defaultTempC: number;
  defaultCondition: string;
  climateZone: string;
  expeditionAdvice: string;
}

export const DESTINATION_COORDINATES: Record<string, DestinationCoords> = {
  bandarban: {
    id: "bandarban",
    name: "Bandarban & Nilgiri",
    lat: 22.1953,
    lng: 92.2184,
    elevationM: 650,
    region: "Chittagong Hill Tracts",
    isDomestic: true,
    defaultTempC: 24,
    defaultCondition: "Misty Mountain Breeze",
    climateZone: "Subtropical Highland",
    expeditionAdvice: "Ideal for Nilgiri cloud viewing & Debotakhum canyon rafting."
  },
  sajek: {
    id: "sajek",
    name: "Sajek Valley & Kanglak Peak",
    lat: 23.3820,
    lng: 92.2938,
    elevationM: 550,
    region: "Rangamati Hills",
    isDomestic: true,
    defaultTempC: 22,
    defaultCondition: "Floating Cloud Sea",
    climateZone: "Cloud Forest Ridge",
    expeditionAdvice: "Morning cloud blankets peak at 05:45 AM. Ensure army convoy departure on time."
  },
  tanguar: {
    id: "tanguar",
    name: "Tanguar Haor & Sunamganj",
    lat: 25.1278,
    lng: 91.0772,
    elevationM: 10,
    region: "Sylhet Wetlands",
    isDomestic: true,
    defaultTempC: 27,
    defaultCondition: "Emerald Lagoon Breeze",
    climateZone: "Freshwater Wetland",
    expeditionAdvice: "Gentle water waves. Perfect for luxury wooden houseboat anchoring at Niladri."
  },
  coxsbazar: {
    id: "coxsbazar",
    name: "Cox's Bazar & Marine Drive",
    lat: 21.4272,
    lng: 92.0058,
    elevationM: 5,
    region: "Bay of Bengal Coast",
    isDomestic: true,
    defaultTempC: 29,
    defaultCondition: "Coastal Ocean Winds",
    climateZone: "Maritime Coastal",
    expeditionAdvice: "Wind conditions optimal for tandem paragliding at Himchari beach."
  },
  saintmartin: {
    id: "saintmartin",
    name: "Saint Martin's Coral Island",
    lat: 20.6273,
    lng: 92.3225,
    elevationM: 4,
    region: "Deep Bay of Bengal",
    isDomestic: true,
    defaultTempC: 28,
    defaultCondition: "Turquoise Clear Waters",
    climateZone: "Tropical Marine Island",
    expeditionAdvice: "Excellent underwater visibility for Chera Dwip scuba & snorkeling."
  },
  rangamati: {
    id: "rangamati",
    name: "Kaptai Lake & Rangamati",
    lat: 22.6533,
    lng: 92.1753,
    elevationM: 40,
    region: "Hill Tracts Lake",
    isDomestic: true,
    defaultTempC: 26,
    defaultCondition: "Calm Lake Waters",
    climateZone: "Inland Hill Basin",
    expeditionAdvice: "Smooth sailing for speedboat cruises to Shuvolong waterfall."
  },
  sundarbans: {
    id: "sundarbans",
    name: "Sundarbans Mangrove Tiger Reserve",
    lat: 21.9497,
    lng: 89.1833,
    elevationM: 3,
    region: "Delta Coastal",
    isDomestic: true,
    defaultTempC: 28,
    defaultCondition: "Tidal Estuary Mist",
    climateZone: "Tidal Mangrove Forest",
    expeditionAdvice: "Optimal high tide window for Kotka wildlife watchtowers."
  },
  kuakata: {
    id: "kuakata",
    name: "Kuakata (Daughter of the Sea)",
    lat: 21.8167,
    lng: 90.1167,
    elevationM: 5,
    region: "South Coast",
    isDomestic: true,
    defaultTempC: 28,
    defaultCondition: "Golden Horizon Breeze",
    climateZone: "Maritime Coastal",
    expeditionAdvice: "Clear horizon forecast for dual sunrise and sunset over the Bay."
  },
  panchagarh: {
    id: "panchagarh",
    name: "Panchagarh & Tentulia",
    lat: 26.3354,
    lng: 88.5517,
    elevationM: 70,
    region: "North Bengal Border",
    isDomestic: true,
    defaultTempC: 21,
    defaultCondition: "Crisp Himalayan Breeze",
    climateZone: "Sub-Himalayan Plain",
    expeditionAdvice: "High atmospheric clarity for viewing snow-capped Mt. Kanchenjunga."
  },
  meghalaya: {
    id: "meghalaya",
    name: "Meghalaya (Dawki & Cherrapunji)",
    lat: 25.5788,
    lng: 91.8933,
    elevationM: 1490,
    region: "North-East India",
    isDomestic: false,
    defaultTempC: 17,
    defaultCondition: "Rainforest Cloud Waterfall",
    climateZone: "Highland Subtropical",
    expeditionAdvice: "Crystal clear water transparency on Dawki Umngot river."
  },
  darjeeling: {
    id: "darjeeling",
    name: "Darjeeling & Tiger Hill",
    lat: 27.0410,
    lng: 88.2663,
    elevationM: 2042,
    region: "Himalayan Foothills",
    isDomestic: false,
    defaultTempC: 13,
    defaultCondition: "Alpine Mountain Chill",
    climateZone: "Subtropical Highland Alpine",
    expeditionAdvice: "Low cloud cover expected at dawn on Tiger Hill sunrise viewpoint."
  },
  sikkim: {
    id: "sikkim",
    name: "Sikkim (Gangtok & Tsomgo Lake)",
    lat: 27.3389,
    lng: 88.6065,
    elevationM: 1650,
    region: "Eastern Himalayas",
    isDomestic: false,
    defaultTempC: 11,
    defaultCondition: "Glacial Mountain Air",
    climateZone: "Alpine Mountain",
    expeditionAdvice: "Tsomgo Lake pass open. Wear thermal jackets and gloves."
  },
  assam: {
    id: "assam",
    name: "Assam (Kaziranga & Guwahati)",
    lat: 26.5775,
    lng: 93.1711,
    elevationM: 65,
    region: "Brahmaputra Valley",
    isDomestic: false,
    defaultTempC: 23,
    defaultCondition: "Riverine Forest Breeze",
    climateZone: "Tropical Monsoon",
    expeditionAdvice: "Early morning elephant safari safari slots have optimal wildlife sightings."
  },
  bhutan: {
    id: "bhutan",
    name: "Bhutan (Paro & Thimphu)",
    lat: 27.4287,
    lng: 89.4164,
    elevationM: 2200,
    region: "High Himalayas",
    isDomestic: false,
    defaultTempC: 12,
    defaultCondition: "Crisp Himalayan Sun",
    climateZone: "Sub-Alpine Continental",
    expeditionAdvice: "Ideal clear skies for hiking up to Paro Taktsang Tiger's Nest Monastery."
  }
};

export const interpretWeatherCode = (code: number, isDay: boolean = true): { text: string; icon: string } => {
  switch (code) {
    case 0:
      return { text: isDay ? "Sunny & Clear" : "Clear Night Sky", icon: isDay ? "☀️" : "🌙" };
    case 1:
    case 2:
      return { text: "Partly Cloudy", icon: isDay ? "🌤️" : "☁️" };
    case 3:
      return { text: "Overcast Clouds", icon: "☁️" };
    case 45:
    case 48:
      return { text: "Misty Mountain Fog", icon: "🌫️" };
    case 51:
    case 53:
    case 55:
      return { text: "Light Hill Drizzle", icon: "🌦️" };
    case 61:
    case 63:
    case 65:
      return { text: "Rain Showers", icon: "🌧️" };
    case 71:
    case 73:
    case 75:
      return { text: "Snow / Frost", icon: "❄️" };
    case 80:
    case 81:
    case 82:
      return { text: "Passing Showers", icon: "🌦️" };
    case 95:
    case 96:
    case 99:
      return { text: "Thunderstorm", icon: "⛈️" };
    default:
      return { text: "Pleasant Mountain Weather", icon: "⛅" };
  }
};

const getDayName = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

// In-memory weather cache to prevent rate-limits and provide instant snappy loading
const weatherCache: Record<string, { data: RealTimeWeather; timestamp: number }> = {};
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

export const fetchRealTimeWeather = async (
  destinationId: string,
  customLat?: number,
  customLng?: number
): Promise<RealTimeWeather> => {
  const meta = DESTINATION_COORDINATES[destinationId.toLowerCase()] || DESTINATION_COORDINATES["sajek"];
  const lat = customLat ?? meta.lat;
  const lng = customLng ?? meta.lng;
  const cacheKey = `${destinationId}_${lat}_${lng}`;

  // Return cached result if fresh
  if (weatherCache[cacheKey] && Date.now() - weatherCache[cacheKey].timestamp < CACHE_TTL_MS) {
    return weatherCache[cacheKey].data;
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather API returned ${response.status}`);
    }

    const data = await response.json();
    const current = data.current;
    const daily = data.daily;

    const weatherInfo = interpretWeatherCode(current.weather_code, current.is_day === 1);

    const forecastDays: WeatherForecastDay[] = (daily.time || []).slice(0, 4).map((dStr: string, idx: number) => {
      const code = daily.weather_code[idx] ?? 1;
      return {
        date: dStr,
        dayName: idx === 0 ? "Today" : getDayName(dStr),
        maxTemp: Math.round(daily.temperature_2m_max[idx] ?? current.temperature_2m + 2),
        minTemp: Math.round(daily.temperature_2m_min[idx] ?? current.temperature_2m - 4),
        condition: interpretWeatherCode(code, true).text,
        conditionCode: code,
        rainProbability: daily.precipitation_probability_max ? daily.precipitation_probability_max[idx] ?? 10 : 15,
      };
    });

    const tempC = Math.round(current.temperature_2m);
    const tempF = Math.round((tempC * 9) / 5 + 32);
    const feelsLikeC = Math.round(current.apparent_temperature);

    const result: RealTimeWeather = {
      destinationId,
      locationName: meta.name,
      lat,
      lng,
      tempC,
      tempF,
      feelsLikeC,
      condition: weatherInfo.text,
      conditionCode: current.weather_code,
      humidity: current.relative_humidity_2m,
      windSpeedKmH: Math.round(current.wind_speed_10m),
      uvIndex: 5,
      isDay: current.is_day === 1,
      forecast: forecastDays,
      lastUpdated: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    weatherCache[cacheKey] = { data: result, timestamp: Date.now() };
    return result;
  } catch (err) {
    console.warn("Using offline simulated real-time weather fallback for:", destinationId, err);
    
    // Realistic fallback based on geographic elevation & climate
    const baseTemp = meta.defaultTempC;
    const tempF = Math.round((baseTemp * 9) / 5 + 32);
    const now = new Date();
    
    const fallbackDays: WeatherForecastDay[] = [
      {
        date: now.toISOString().split("T")[0],
        dayName: "Today",
        maxTemp: baseTemp + 3,
        minTemp: baseTemp - 4,
        condition: meta.defaultCondition,
        conditionCode: 2,
        rainProbability: 15,
      },
      {
        date: new Date(now.getTime() + 86400000).toISOString().split("T")[0],
        dayName: "Tomorrow",
        maxTemp: baseTemp + 2,
        minTemp: baseTemp - 3,
        condition: "Partly Cloudy",
        conditionCode: 1,
        rainProbability: 20,
      },
      {
        date: new Date(now.getTime() + 172800000).toISOString().split("T")[0],
        dayName: getDayName(new Date(now.getTime() + 172800000).toISOString()),
        maxTemp: baseTemp + 4,
        minTemp: baseTemp - 2,
        condition: "Sunny & Clear",
        conditionCode: 0,
        rainProbability: 10,
      },
      {
        date: new Date(now.getTime() + 259200000).toISOString().split("T")[0],
        dayName: getDayName(new Date(now.getTime() + 259200000).toISOString()),
        maxTemp: baseTemp + 1,
        minTemp: baseTemp - 5,
        condition: meta.defaultCondition,
        conditionCode: 2,
        rainProbability: 25,
      }
    ];

    const fallback: RealTimeWeather = {
      destinationId,
      locationName: meta.name,
      lat,
      lng,
      tempC: baseTemp,
      tempF,
      feelsLikeC: baseTemp - 1,
      condition: meta.defaultCondition,
      conditionCode: 2,
      humidity: 68,
      windSpeedKmH: 14,
      uvIndex: 6,
      isDay: true,
      forecast: fallbackDays,
      lastUpdated: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    return fallback;
  }
};
