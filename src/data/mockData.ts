import { 
  Destination, 
  City, 
  AirTicket, 
  RoadOption, 
  SeaOption, 
  HotelRetreat, 
  MythosStory, 
  HotelListing, 
  RestaurantListing,
  TourActivity
} from "../types";
import realOpenRoofJeepImg from "../assets/images/real_open_roof_chandergari_jeep_1787089566226.jpg";

export const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=2000&q=80";

export const DESTINATIONS: Destination[] = [
  // ==========================================
  // BANGLADESH DOMESTIC CIRCUITS
  // ==========================================

  // 1. BANDARBAN - NAFAKHUM, DEBOTAKHUM & REMOTE PEAKS
  {
    id: "bandarban-remote",
    name: "Bandarban (Nafakhum, Debotakhum & Nilgiri)",
    tagline: "The Niagara of Bengal, mystical gorges, bamboo rafting & high peaks",
    description: "Ride Chander Gari jeeps to Thanchi, navigate Sangu river rapids to Nafakhum waterfall, and bamboo-raft through Debotakhum gorge.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    region: "Chittagong Hill Tracts, Bangladesh",
    isDomestic: true,
    highlights: [
      "Nafakhum Waterfall Trek via Remakri Rapids", 
      "Debotakhum Deep Limestone Gorge Bamboo Raft", 
      "Nilgiri Peak High-Altitude Cloud Observation", 
      "Boga Lake Volcanic Crater & Keokradong Summit Trek"
    ]
  },

  // 2. SAJEK VALLEY & KANGLAK PEAKS
  {
    id: "sajek-valley",
    name: "Sajek Valley & Kanglak Peak",
    tagline: "The Kingdom of Clouds & thrilling Chander Gari military convoy",
    description: "Ascend above the cloud ceiling in an open Chander Gari jeep, stay in cliffside wooden cottages, and hike to Kanglak Peak for panoramic views.",
    imageUrl: "https://images.unsplash.com/photo-1585123388867-3bfe6dd4bdbf?auto=format&fit=crop&w=1200&q=80",
    region: "Rangamati, Bangladesh",
    isDomestic: true,
    highlights: [
      "Chander Gari Open-Top Mountain Convoy", 
      "Helipad Sunrise Above the Sea of Clouds", 
      "Kanglak Hill Summit & Lushei Village", 
      "Tribal Bamboo-Stuffed Chicken Roast Dinner"
    ]
  },

  // 3. TANGUAR HAOR & SUNAMGANJ
  {
    id: "tanguar-haor",
    name: "Tanguar Haor & Sunamganj Houseboats",
    tagline: "Living on luxury wooden houseboats on a UNESCO freshwater wetland",
    description: "Cruise on wooden houseboats across Tanguar Haor's emerald waters with views of the Meghalaya hills, Niladri Lake, and Jadukata River.",
    imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    region: "Sunamganj, Sylhet Division",
    isDomestic: true,
    highlights: [
      "Overnight Stay on Premium Wooden Houseboat", 
      "Niladri Lake (Shahid Siraj) Crystal Waters", 
      "Shimul Bagan Crimson Flower Grove", 
      "Jadukata River & Barek Tila Mountain Ridge"
    ]
  },

  // 4. COX'S BAZAR & INANI MARINE DRIVE
  {
    id: "coxsbazar-marine",
    name: "Cox's Bazar & Marine Drive Coast",
    tagline: "World's longest 120km unbroken sandy beach & open jeep drives",
    description: "Drive along the 80km scenic Marine Drive, explore Inani coral beach, tandem paraglide, and enjoy fresh seafood on the world's longest natural beach.",
    imageUrl: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80",
    region: "Chittagong Division, Bangladesh",
    isDomestic: true,
    highlights: [
      "80km Marine Drive Open Chander Gari Ride", 
      "Tandem Paragliding Over Bay of Bengal", 
      "Inani Coral Beach & Red Crab Colonies", 
      "Fresh Grilled Rupchanda & Coral Seafood"
    ]
  },

  // 5. SAINT MARTIN'S CORAL ISLAND & CHERA DWIP
  {
    id: "saintmartin-island",
    name: "Saint Martin's Island & Chera Dwip",
    tagline: "Bangladesh's only tropical coral paradise & turquoise lagoon",
    description: "Sail across the Bay of Bengal to explore turquoise waters, live coral reefs, coconut groves, and the secluded shores of Chera Dwip.",
    imageUrl: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80",
    region: "Bay of Bengal, Bangladesh",
    isDomestic: true,
    highlights: [
      "MV Bay One Ocean Liner Cruise", 
      "Chera Dwip Coral Reef Scuba & Snorkel", 
      "Sweet Green Coconut Groves", 
      "Live Lobster & King Crab Night BBQ"
    ]
  },

  // 6. KAPTAI LAKE & RANGAMATI
  {
    id: "kaptai-rangamati",
    name: "Kaptai Lake & Rangamati Hill Country",
    tagline: "South Asia's largest artificial lake, Shuvolong waterfalls & tribal villages",
    description: "Cruise across Kaptai Lake on motor boats, visit Shuvolong waterfalls, and experience local lakeside culture in Rangamati.",
    imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    region: "Rangamati, Chittagong Hill Tracts",
    isDomestic: true,
    highlights: [
      "Kaptai Lake Engine Boat & Kayak Cruise", 
      "Shuvolong Rock Waterfall Expedition", 
      "Chakma Rajbari & Tribal Cultural Museum", 
      "Peda Ting Ting Lakefront Bamboo Dining"
    ]
  },

  // 7. SUNDARBANS MANGROVE TIGER RESERVE
  {
    id: "sundarbans-mangrove",
    name: "Sundarbans National Mangrove Forest",
    tagline: "World's largest mangrove forest & Royal Bengal Tiger habitat",
    description: "Embark on a multi-day river cruise through tidal creeks, spotted deer habitats, and the world's largest mangrove forest.",
    imageUrl: "https://images.unsplash.com/photo-1615966650071-855b15f29ad1?auto=format&fit=crop&w=1200&q=80",
    region: "Khulna, Bangladesh",
    isDomestic: true,
    highlights: [
      "Multi-day Wooden Cruise Vessel Expedition", 
      "Kotka Tiger Point Watchtower Trek", 
      "Harbaria Mangrove Wooden Walkway", 
      "Sundarbans Wild Raw Honey Gathering"
    ]
  },

  // 8. KUAKATA - SAGAR KANYA
  {
    id: "kuakata-beach",
    name: "Kuakata (Daughter of the Sea)",
    tagline: "Panoramic sunrise and sunset over the same sweeping beach",
    description: "Watch both sunrise and sunset over the Bay of Bengal from the same beach, with nearby mangrove trails and Rakhine temples.",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    region: "Patuakhali, Bangladesh",
    isDomestic: true,
    highlights: [
      "Dual Sunrise & Sunset on Same Beach", 
      "Gangamati Mangrove Forest Trail", 
      "Ancient Rakhine 200-Yr Buddhist Temple", 
      "Lal Kakra (Red Crab) Secluded Beach Walk"
    ]
  },

  // 9. PANCHAGARH & TENTULIA (KANCHENJUNGA VIEWPOINT)
  {
    id: "panchagarh-tentulia",
    name: "Panchagarh & Tentulia Border Valley",
    tagline: "Unobstructed view of Mount Kanchenjunga from Bangladesh border & flatland tea",
    description: "Gaze upon the snow peaks of Mount Kanchenjunga across the border, explore flatland tea gardens, and visit Banglabandha Point.",
    imageUrl: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80",
    region: "Rangpur Division, Bangladesh",
    isDomestic: true,
    highlights: [
      "Direct View of Mount Kanchenjunga Snow Peaks", 
      "Mahananda River Rocky Border Beach", 
      "Tentulia Organic Flatland Tea Gardens", 
      "Banglabandha Zero Point & Border Gate"
    ]
  },

  // ==========================================
  // CROSS-BORDER REGIONAL CIRCUITS (INDIA & NEIGHBORS)
  // ==========================================

  // 10. MEGHALAYA (SHILLONG, CHERRAPUNJI & DAWKI)
  {
    id: "meghalaya-dawki",
    name: "Meghalaya (Dawki, Cherrapunji & Shillong)",
    tagline: "Abode of clouds, crystal transparent rivers & living root bridges",
    description: "Boat on the crystal-clear waters of Dawki, trek to the living root bridges of Cherrapunji, and view majestic waterfalls.",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    region: "Northeast India (Adjacent to Sylhet)",
    isDomestic: false,
    highlights: [
      "Dawki Umngot Transparent River Boating", 
      "Double Decker Living Root Bridge Trek & Caving", 
      "Nohkalikai Waterfall Canyon Vista", 
      "Mawlynnong - Cleanest Village in Asia"
    ]
  },

  // 11. DARJEELING (QUEEN OF HILLS & KANCHENJUNGA)
  {
    id: "darjeeling-hills",
    name: "Darjeeling (Queen of Hills)",
    tagline: "Tiger Hill Kanchenjunga sunrise, UNESCO Toy Train & tea estates",
    description: "Witness the golden sunrise over Kanchenjunga from Tiger Hill, ride the heritage Toy Train, and visit historic tea gardens.",
    imageUrl: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    region: "West Bengal, India (Bordering Panchagarh)",
    isDomestic: false,
    highlights: [
      "Tiger Hill Dawn Sunrise over Mt. Kanchenjunga", 
      "UNESCO Heritage Himalayan Steam Toy Train", 
      "Batasia Loop & War Memorial Viewpoint", 
      "Happy Valley Historic Tea Estate Tour"
    ]
  },

  // 12. SIKKIM (GANGTOK, TSOMGO & YUMTHANG)
  {
    id: "sikkim-himalaya",
    name: "Sikkim (Gangtok & Tsomgo Glacial Lake)",
    tagline: "Glacial alpine lakes, Buddhist monasteries & high Himalayan passes",
    description: "Visit the high-altitude Tsomgo glacial lake, explore historic mountain passes, and discover serene Himalayan Buddhist monasteries.",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    region: "Eastern Himalayas, India",
    isDomestic: false,
    highlights: [
      "Tsomgo Alpine Glacial Lake (12,310 ft) & Yak Ride", 
      "Nathula Pass (Indo-China Historic Silk Route)", 
      "Rumtek Imperial Buddhist Monastery", 
      "Yumthang Valley of Flowers & Hot Springs"
    ]
  },

  // 13. ASSAM & KAZIRANGA (WILDLIFE & BRAHMAPUTRA)
  {
    id: "assam-kaziranga",
    name: "Assam (Kaziranga & Brahmaputra Valley)",
    tagline: "One-horned rhino safari, Brahmaputra river sunsets & lush tea estates",
    description: "Go on safari in Kaziranga National Park to see the one-horned rhino, and cruise along the mighty Brahmaputra River.",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    region: "Assam, India (Adjacent to Kurigram)",
    isDomestic: false,
    highlights: [
      "Kaziranga Great Indian One-Horned Rhino Safari", 
      "Brahmaputra Sunset River Cruise in Guwahati", 
      "Kamakhya Ancient Hilltop Shakti Temple", 
      "Majuli Island - World's Largest River Island"
    ]
  },

  // 14. BHUTAN (THIMPHU & PARO TIGER'S NEST)
  {
    id: "bhutan-himalaya",
    name: "Bhutan (Thimphu & Paro Taktsang)",
    tagline: "The Land of the Thunder Dragon & cliffside Tiger's Nest Monastery",
    description: "Trek to the iconic cliffside Tiger's Nest Monastery and explore traditional fortress dzongs in the valleys of Paro and Thimphu.",
    imageUrl: "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80",
    region: "Himalayan Kingdom (Bordering North Bengal)",
    isDomestic: false,
    highlights: [
      "Paro Taktsang (Tiger's Nest) Cliffside Trek", 
      "Punakha Dzong Himalayan Fortress", 
      "Thimphu Buddha Dordenma Giant Bronze Statue", 
      "Dochula Pass 108 Memorial Chortens"
    ]
  }
];

export const CITIES: City[] = [
  // 1. BANDARBAN
  {
    id: "bandarban",
    name: "Bandarban (Nafakhum & Debotakhum)",
    countryId: "bangladesh",
    countryName: "Bangladesh",
    tagline: "Extreme Treks, Nafakhum Falls & Debotakhum Bamboo Canyon",
    description: "The crown jewel of adventure tourism in Bangladesh. Experience thrilling Chander Gari jeep journeys to Thanchi, navigate Sangu river rapids to Nafakhum waterfall, zipline, rappel, and explore Debotakhum in Rowangchhari.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    region: "Chittagong Hill Tracts",
    isDomestic: true,
    highlights: ["Nafakhum Waterfall Trek via Remakri", "Debotakhum Gorge Bamboo Rafting", "Nilgiri Cloud Peak Station", "Boga Lake Volcanic Crater"],
    bestTimeToVisit: "Sep – Mar",
    avgPricePerNight: 3200
  },

  // 2. SAJEK VALLEY
  {
    id: "sajek",
    name: "Sajek Valley",
    countryId: "bangladesh",
    countryName: "Bangladesh",
    tagline: "Kingdom of Clouds & Chander Gari Convoy Trail",
    description: "Perched 1,800 ft above sea level, Sajek is famous for waking up directly above an ocean of floating white clouds, rustic wooden eco-cottages, campfire stargazing, and exhilarating open jeep trails.",
    imageUrl: "https://images.unsplash.com/photo-1585123388867-3bfe6dd4bdbf?auto=format&fit=crop&w=1200&q=80",
    region: "Rangamati",
    isDomestic: true,
    highlights: ["Chander Gari Convoy Escort", "Helipad Sunrise Above the Clouds", "Kanglak Peak Highest Point", "Tribal Bamboo Chicken Dinner"],
    bestTimeToVisit: "Jul – Feb",
    avgPricePerNight: 3500
  },

  // 3. TANGUAR HAOR & SUNAMGANJ
  {
    id: "tanguar",
    name: "Tanguar Haor & Sunamganj",
    countryId: "bangladesh",
    countryName: "Bangladesh",
    tagline: "Premium Houseboat Living on a Vast Freshwater Wetland",
    description: "Sail through 100 sq km of pristine wetland surrounded by the misty blue Meghalaya hills. Swim in Niladri Lake (Shahid Siraj Lake), visit Shimul Bagan, and enjoy fresh haor fish curries on board.",
    imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    region: "Sylhet Division",
    isDomestic: true,
    highlights: ["Overnight Stay on Wooden Houseboat", "Niladri Lake (Shahid Siraj) Crystal Waters", "Shimul Bagan Crimson Flower Grove", "Jadukata River Barek Tila View"],
    bestTimeToVisit: "Jun – Oct (Haor Full), Nov – Feb (Migratory Birds)",
    avgPricePerNight: 4500
  },

  // 4. SYLHET (RATARGUL, JAFLONG & BISNAKANDI)
  {
    id: "sylhet",
    name: "Sylhet (Ratargul & Jaflong)",
    countryId: "bangladesh",
    countryName: "Bangladesh",
    tagline: "Freshwater Swamp Forest, Jaflong Stone Beds & Lalakhal",
    description: "Surrounded by tea estates, historical Sufi shrines, the only freshwater swamp forest in Bangladesh at Ratargul, and emerald waters of Lalakhal originating in Indian Meghalaya hills.",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    region: "Sylhet",
    isDomestic: true,
    highlights: ["Ratargul Swamp Silent Canoe Safari", "Jaflong Zero Point & Stone Valley", "Shatkora Beef Feast at Pansi", "Lalakhal Emerald River Boat Safari"],
    bestTimeToVisit: "Jul – Feb",
    avgPricePerNight: 2500
  },

  // 5. COX'S BAZAR (Marine Drive & Beachfront)
  {
    id: "coxsbazar",
    name: "Cox's Bazar",
    countryId: "bangladesh",
    countryName: "Bangladesh",
    tagline: "120km Natural Sea Beach, Paragliding & 80km Marine Drive",
    description: "World's longest unbroken natural sea beach along the Bay of Bengal. Enjoy scenic Marine Drive open jeep rides, tandem paragliding at Himchari, fresh seafood BBQs, and beachside serviced apartments.",
    imageUrl: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80",
    region: "Chittagong Division",
    isDomestic: true,
    highlights: ["80km Marine Drive Chander Gari Ride", "Tandem Paragliding Over the Beach", "Sayeman Beach Infinity Pool", "Inani Coral Beach Sunset"],
    bestTimeToVisit: "Nov – Mar",
    avgPricePerNight: 3800
  },

  // 6. SAINT MARTIN'S ISLAND
  {
    id: "saintmartin",
    name: "Saint Martin's Island",
    countryId: "bangladesh",
    countryName: "Bangladesh",
    tagline: "Bangladesh's Only Tropical Coral Island & Scuba Lagoon",
    description: "Known as 'Narikel Jinjira' (Coconut Island), featuring living coral reefs, crystal turquoise shallow waters, scuba diving, and the untouched coral lagoon of Chera Dwip.",
    imageUrl: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80",
    region: "Bay of Bengal",
    isDomestic: true,
    highlights: ["MV Bay One Luxury Cruise Arrival", "Chera Dwip Coral Reef Scuba & Walk", "Fresh Grilled King Lobster & Crab", "Cycling Under Tall Coconut Groves"],
    bestTimeToVisit: "Nov – Feb",
    avgPricePerNight: 3000
  },

  // 7. KAPTAI & RANGAMATI
  {
    id: "rangamati",
    name: "Rangamati (Kaptai Lake)",
    countryId: "bangladesh",
    countryName: "Bangladesh",
    tagline: "Emerald Lake Boating, Hanging Bridge & Indigenous Culture",
    description: "Serene hill lake district with wooden longboat rides to Shuvolong Waterfall, picturesque hanging bridge, and indigenous Chakma & Marma culinary delights.",
    imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    region: "Chittagong Hill Tracts",
    isDomestic: true,
    highlights: ["Kaptai Lake Sunset Engine Boat Cruise", "Shuvolong Waterfall Trek", "Hanging Bridge Crossing", "Chakma Handloom Shopping"],
    bestTimeToVisit: "Sep – Mar",
    avgPricePerNight: 2600
  },

  // 8. KUAKATA
  {
    id: "kuakata",
    name: "Kuakata",
    countryId: "bangladesh",
    countryName: "Bangladesh",
    tagline: "Daughter of the Sea (Sagar Kanya) - Dual Sunrise & Sunset",
    description: "A rare beach in the world where you can watch both sunrise and sunset over the Bay of Bengal, surrounded by Gangamati mangrove forests and Rakhine handloom villages.",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    region: "Patuakhali",
    isDomestic: true,
    highlights: ["Panoramic Sunrise & Sunset on Same Beach", "Gangamati Mangrove Forest Walk", "Traditional Rakhine Handloom Weaving", "Lal Kakra Red Crab Beach"],
    bestTimeToVisit: "Nov – Mar",
    avgPricePerNight: 2400
  },

  // ==========================================
  // CROSS-BORDER REGIONAL CITIES
  // ==========================================

  // 9. MEGHALAYA (SHILLONG & CHERRAPUNJI)
  {
    id: "meghalaya",
    name: "Meghalaya (Shillong & Dawki)",
    countryId: "india",
    countryName: "India (Near Sylhet)",
    tagline: "Transparent Dawki River, Living Root Bridges & Waterfalls",
    description: "Just across the Tamabil border: boat on the mirror-transparent Umngot River in Dawki, trek to the Double Decker Root Bridge in Cherrapunji, and explore Shillong.",
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    region: "Meghalaya, India",
    isDomestic: false,
    highlights: ["Dawki Umngot Transparent River Boating", "Double Decker Living Root Bridge Trek", "Nohkalikai Waterfall Canyon", "Mawlynnong Cleanest Village"],
    bestTimeToVisit: "Sep – May",
    avgPricePerNight: 4800
  },

  // 10. DARJEELING
  {
    id: "darjeeling",
    name: "Darjeeling",
    countryId: "india",
    countryName: "India (Near North Bengal)",
    tagline: "Tiger Hill Kanchenjunga Sunrise & Himalayan Toy Train",
    description: "Ascend to 6,700 ft for the golden sunrise over Mount Kanchenjunga, ride the 1881 UNESCO Toy Train through Batasia Loop, and tour Happy Valley Tea Estate.",
    imageUrl: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    region: "West Bengal, India",
    isDomestic: false,
    highlights: ["Tiger Hill Dawn Sunrise over Mt. Kanchenjunga", "UNESCO Heritage Himalayan Steam Toy Train", "Batasia Loop & War Memorial", "Happy Valley Historic Tea Estate"],
    bestTimeToVisit: "Oct – Dec, Mar – May",
    avgPricePerNight: 5200
  },

  // 11. SIKKIM (GANGTOK)
  {
    id: "sikkim",
    name: "Sikkim (Gangtok & Tsomgo)",
    countryId: "india",
    countryName: "India (Himalayas)",
    tagline: "Glacial Tsomgo Lake (12,310 ft) & Himalayan Monasteries",
    description: "Himalayan beauty with alpine glacial lakes, snow-clad passes at Nathula on the Indo-China border, and centuries-old Buddhist monasteries in Gangtok.",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    region: "Sikkim, India",
    isDomestic: false,
    highlights: ["Tsomgo Alpine Glacial Lake (12,310 ft)", "Nathula Pass Border Post", "Rumtek Imperial Monastery", "Yumthang Valley of Flowers"],
    bestTimeToVisit: "Mar – May, Oct – Dec",
    avgPricePerNight: 5800
  },

  // 12. ASSAM (GUWAHATI & KAZIRANGA)
  {
    id: "assam",
    name: "Assam (Kaziranga & Guwahati)",
    countryId: "india",
    countryName: "India (Northeast)",
    tagline: "One-Horned Rhinoceros, Brahmaputra River & Ancient Temples",
    description: "Rich wildlife in Kaziranga National Park, scenic sunset cruises on the Brahmaputra River, and sacred hilltop temples.",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    region: "Assam, India",
    isDomestic: false,
    highlights: ["Kaziranga Rhino Safari", "Brahmaputra Sunset Cruise", "Kamakhya Temple", "Assam Silk Weaving"],
    bestTimeToVisit: "Nov – Apr",
    avgPricePerNight: 4200
  },

  // 13. BHUTAN (PARO & THIMPHU)
  {
    id: "bhutan",
    name: "Bhutan (Paro & Thimphu)",
    countryId: "bhutan",
    countryName: "Bhutan",
    tagline: "Tiger's Nest Cliffside Monastery & Pristine Dzong Valley",
    description: "The land of Gross National Happiness: climb to the cliff-hanging Paro Taktsang monastery and explore the monastic fortresses of Thimphu.",
    imageUrl: "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80",
    region: "Himalayas",
    isDomestic: false,
    highlights: ["Paro Taktsang Tiger's Nest Hike", "Tashichho Dzong Monastery", "Dochula Pass 108 Stupas", "Punakha Suspension Bridge"],
    bestTimeToVisit: "Mar – May, Sep – Nov",
    avgPricePerNight: 9500
  }
];

// =========================================================================
// ACCOMMODATIONS: ACCURATE PHOTOS FOR 5 TIERS
// =========================================================================

export const FEATURED_HOTELS: HotelListing[] = [
  // 1. LUXURY RESORTS (5-STAR / PREMIER)
  {
    id: "hotel-lux-sayeman",
    name: "Sayeman Beach Resort (5-Star Luxury)",
    location: "Marine Drive, Cox's Bazar",
    region: "Bangladesh",
    stayCategory: "luxury_resort",
    isDomestic: true,
    rating: 4.9,
    starCategory: 5,
    reviewCount: 920,
    pricePerNight: 15500,
    tagline: "Iconic oceanfront infinity pool & sunset over Bay of Bengal",
    description: "Located on Marine Drive, offering private balconies directly facing the rolling Bay of Bengal waves, Casablanca seafood dining, and presidential suites.",
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    amenities: ["Beachfront Infinity Pool", "Casablanca Restaurant", "Private Beach Access", "Airport Shuttle"],
    rooms: [
      {
        id: "sayeman-ocean-deluxe",
        name: "Deluxe Ocean View King",
        bedType: "1 Extra-Large King Bed",
        capacity: "2 Adults + 1 Child",
        sizeSqFt: 420,
        viewType: "Direct Bay of Bengal Oceanfront & Sunset View",
        pricePerNight: 15500,
        features: ["Private Sea-Facing Balcony", "Bathtub & Rain Shower", "Complimentary Breakfast Buffet", "High-Speed Wi-Fi", "Mini Bar & Espresso Maker"],
        imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
        isAvailable: true
      },
      {
        id: "sayeman-super-twin",
        name: "Superior Sea View Twin",
        bedType: "2 Twin Beds",
        capacity: "2 Adults",
        sizeSqFt: 380,
        viewType: "Panoramic Coastal & Marine Drive View",
        pricePerNight: 13800,
        features: ["Balcony with Wave Views", "Ensuite Rain Shower", "Daily Buffet Breakfast", "LED Smart TV", "In-Room Safe"],
        imageUrl: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=800&q=80",
        isAvailable: true
      },
      {
        id: "sayeman-presidential-suite",
        name: "Executive Oceanfront Panorama Suite",
        bedType: "1 Super King Bed + Living Area",
        capacity: "3 Adults or 2 Adults + 2 Children",
        sizeSqFt: 750,
        viewType: "180° Unobstructed Ocean Panorama",
        pricePerNight: 28500,
        features: ["Expansive Private Sun Terrace", "Jacuzzi with Ocean Horizon", "Casablanca VIP Butler Service", "Complimentary Airport Limousine"],
        imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
        isAvailable: true
      }
    ]
  },
  {
    id: "hotel-lux-thepalace",
    name: "The Palace Luxury Resort (5-Star Luxury)",
    location: "Bahubal, Sylhet Highway",
    region: "Bangladesh",
    stayCategory: "luxury_resort",
    isDomestic: true,
    rating: 4.9,
    starCategory: 5,
    reviewCount: 840,
    pricePerNight: 19500,
    tagline: "5-Star sanctuary nestled in pristine rubber hills & private villas",
    description: "Nestled between rolling rubber hills, featuring 4 temperature-controlled pools, private pool villas, helipad, multiple cuisines, and holistic luxury spa.",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    amenities: ["4 Swimming Pools", "Private Pool Villas", "Helipad Access", "Rubber Forest Buggy Walks"],
    rooms: [
      {
        id: "palace-tea-king",
        name: "King Deluxe Valley Vista",
        bedType: "1 California King Bed",
        capacity: "2 Adults + 1 Child",
        sizeSqFt: 450,
        viewType: "Lush Rolling Hill Plantation View",
        pricePerNight: 19500,
        features: ["Private Garden Balcony", "Deep Soaking Marble Tub", "Complimentary Helipad Access", "Artisan Coffee Bar", "Buffet Breakfast"],
        imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
        isAvailable: true
      },
      {
        id: "palace-executive-suite",
        name: "Grand Royal Villa with Private Pool",
        bedType: "1 Master King + Separate Parlour",
        capacity: "3 Adults",
        sizeSqFt: 820,
        viewType: "Forest & Valley Panorama",
        pricePerNight: 32000,
        features: ["Private Plunge Pool", "Private Dining Room", "Full Spa Package Access", "24hr Dedicated Butler"],
        imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
        isAvailable: true
      }
    ]
  },
  {
    id: "hotel-lux-sairu",
    name: "Sairu Hill Resort (Premier Hilltop Luxury)",
    location: "Chimbuk Road, Bandarban",
    region: "Bangladesh",
    stayCategory: "luxury_resort",
    isDomestic: true,
    rating: 4.9,
    starCategory: 5,
    reviewCount: 610,
    pricePerNight: 16800,
    tagline: "Architectural masterpiece with infinity pool over blue hills",
    description: "Perched atop high hill ridges on Chimbuk Road, featuring cliffside open infinity pool overlooking endless layers of green mountains and misty valleys.",
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    amenities: ["Hilltop Infinity Pool", "Sairu Fine Dining", "Private Sky Terraces", "Chander Gari Guide"],
    rooms: [
      {
        id: "sairu-premium-chalet",
        name: "Shangu Ridge Premium Hill Chalet",
        bedType: "1 King Bed (Solid Teak Wood)",
        capacity: "2 Adults",
        sizeSqFt: 460,
        viewType: "Endless Hill Ranges & Cloud Valley",
        pricePerNight: 16800,
        features: ["Panoramic Cantilevered Balcony", "Raindance Open Shower", "Complimentary Hill Trek Guide", "Organic Breakfast Included"],
        imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
        isAvailable: true
      },
      {
        id: "sairu-executive-suite",
        name: "Cloud Edge Executive Villa",
        bedType: "1 Grand King + Daybed",
        capacity: "3 Adults",
        sizeSqFt: 680,
        viewType: "Sunrise over Misty Mountain Waves",
        pricePerNight: 24500,
        features: ["Private Cliffside Infinity Sunbed", "Custom Wood Fireplace", "Personal Chander Gari Liaison", "Minibar & Local Coffee Selection"],
        imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        isAvailable: true
      }
    ]
  },

  // 2. MID-TIER BOUTIQUE MOTELS
  {
    id: "hotel-mid-nilgiri",
    name: "Nilgiri Hill Resort (High Altitude Motel)",
    location: "Nilgiri Peak, Bandarban",
    region: "Bangladesh",
    stayCategory: "mid_motel",
    isDomestic: true,
    rating: 4.8,
    starCategory: 4,
    reviewCount: 480,
    pricePerNight: 6500,
    tagline: "Army-managed resort at 2,200 ft elevation surrounded by fog",
    description: "Located high atop Nilgiri Peak, providing unmatched 360-degree views of rolling clouds and serpentine valleys with top-tier security and dining.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    amenities: ["Helipad Access", "Cloud Viewing Deck", "Dedicated Restaurant", "High Security Escort"],
    rooms: [
      {
        id: "nilgiri-cloud-cottage",
        name: "Meghdoot High Peak Cottage Room",
        bedType: "1 Queen Bed",
        capacity: "2 Adults",
        sizeSqFt: 320,
        viewType: "2,200ft High Altitude 360° Cloud Blanket",
        pricePerNight: 6500,
        features: ["Direct Cloud Viewing Veranda", "Attached Geyser Bathroom", "Security Escort Included", "Authentic Army Mess Breakfast"],
        imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
        isAvailable: true
      },
      {
        id: "nilgiri-family-room",
        name: "Akashbari Family Twin Suite",
        bedType: "2 Queen Beds",
        capacity: "4 Persons",
        sizeSqFt: 480,
        viewType: "Helipad & Rolling Hill Ridgelines",
        pricePerNight: 9500,
        features: ["Spacious Double Queen Setup", "Heated Water Facility", "Dedicated Mountain View Windows", "Complimentary Tea Service"],
        imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
        isAvailable: true
      }
    ]
  },
  {
    id: "hotel-mid-longbeach",
    name: "Hotel Sea Crown (Mid-Tier Beachfront Motel)",
    location: "Kolatoli Beach, Cox's Bazar",
    region: "Bangladesh",
    stayCategory: "mid_motel",
    isDomestic: true,
    rating: 4.4,
    starCategory: 3,
    reviewCount: 510,
    pricePerNight: 4200,
    tagline: "Direct beachfront dining & sea breeze balconies",
    description: "Comfortable beach motel right on Kolatoli sand with direct outdoor sea-facing deck dining and sound of crashing waves.",
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    amenities: ["Beach Deck Diner", "AC Sea-View Rooms", "Free Breakfast", "24hr Generator"],
    rooms: [
      {
        id: "seacrown-super-ac",
        name: "Superior Sea Breeze Double AC",
        bedType: "1 Queen Bed",
        capacity: "2 Adults",
        sizeSqFt: 290,
        viewType: "Direct Sandy Beach & Shoreline",
        pricePerNight: 4200,
        features: ["Air Conditioning", "Private Balcony with Wave Sound", "Attached Hot Water Bath", "Breakfast on Beach Deck", "Free Wi-Fi"],
        imageUrl: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
        isAvailable: true
      },
      {
        id: "seacrown-economy-twin",
        name: "Standard Twin AC Room",
        bedType: "2 Single Beds",
        capacity: "2 Adults",
        sizeSqFt: 250,
        viewType: "Side Beach & City View",
        pricePerNight: 3400,
        features: ["AC & Ceiling Fan", "Ensuite Bathroom", "Cable TV", "Free Wi-Fi"],
        imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
        isAvailable: true
      }
    ]
  },

  // 3. ECO-COTTAGES (RUSTIC HILL & TIMBER STAYS)
  {
    id: "hotel-cot-meghpunji",
    name: "Meghpunji Eco Cottage (Cloud Edge Cottage)",
    location: "Ruilui Para, Sajek Valley",
    region: "Bangladesh",
    stayCategory: "eco_cottage",
    isDomestic: true,
    rating: 4.8,
    starCategory: 3,
    reviewCount: 520,
    pricePerNight: 5500,
    tagline: "Cloud-touching wooden eco-cottages on cliff edge",
    description: "Signature timber cottages perched on the cliff edge where morning clouds pass directly through your open balcony overlooking the green hill ridges.",
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    amenities: ["Cloud View Balcony", "Traditional Bamboo Meals", "Campfire Setup", "Solar Backed Power"],
    rooms: [
      {
        id: "meghpunji-tora-cottage",
        name: "Tora / Mayabati Cliff-Edge Timber Cabin",
        bedType: "1 Queen Bamboo Bed",
        capacity: "2 Adults",
        sizeSqFt: 300,
        viewType: "Frontline Sajek Valley Cloud Floating Horizon",
        pricePerNight: 5500,
        features: ["Private Hanging Wood Balcony", "Direct Morning Fog Inflow", "Geyser Attached Bathroom", "Campfire Wood Included", "Solar Backup Power"],
        imageUrl: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
        isAvailable: true
      },
      {
        id: "meghpunji-family-timber",
        name: "Rongdhonu Family Wooden Cottage",
        bedType: "2 Double Bamboo Beds",
        capacity: "4 Adults",
        sizeSqFt: 450,
        viewType: "Lush Mizoram Border Mountain Ranges",
        pricePerNight: 8500,
        features: ["Double Bedroom Setup", "Wide Panoramic Porch with Hammock", "Indigenous Bamboo Dinner Option", "Hot Shower Facility"],
        imageUrl: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80",
        isAvailable: true
      }
    ]
  },
  {
    id: "hotel-cot-kaptai",
    name: "Polwel Lake Nature Cottage (Lakefront Timber Cabin)",
    location: "DC Hill, Rangamati",
    region: "Bangladesh",
    stayCategory: "eco_cottage",
    isDomestic: true,
    rating: 4.7,
    starCategory: 3,
    reviewCount: 390,
    pricePerNight: 4800,
    tagline: "Timber cabins overlooking Kaptai Lake with private jetty",
    description: "Tranquil lakefront cottages situated under pine trees with open decks looking onto the shimmering waters of Kaptai Lake.",
    imageUrl: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
    amenities: ["Private Boat Jetty", "Kayaking Included", "Lakeview Balcony", "Open BBQ Lawn"],
    rooms: [
      {
        id: "polwel-water-cabin",
        name: "Honeymoon Lakefront Wooden Chalet",
        bedType: "1 King Wood Bed",
        capacity: "2 Adults",
        sizeSqFt: 340,
        viewType: "Overwater Kaptai Lake Shimmer & Hills",
        pricePerNight: 4800,
        features: ["Private Wooden Deck Over Water", "Free 1-Hour Kayak Session", "Modern Hot Shower", "Local Chapila Fish Dinner Ordering"],
        imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
        isAvailable: true
      }
    ]
  },

  // 4. SERVICED APARTMENTS / VACATION CONDOS
  {
    id: "hotel-apt-coxmarine",
    name: "Marine Drive Panorama 2-BHK Holiday Apartment",
    location: "Inani Marine Drive, Cox's Bazar",
    region: "Bangladesh",
    stayCategory: "serviced_apartment",
    isDomestic: true,
    rating: 4.6,
    starCategory: 3,
    reviewCount: 220,
    pricePerNight: 7500,
    tagline: "Fully furnished 2-bedroom sea-facing condo with kitchen",
    description: "Ideal for families and groups: master bedroom with private ocean balcony, second bedroom, spacious living lounge, and equipped kitchen for private cooking.",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    amenities: ["Fully Equipped Kitchen", "2 Private Bedrooms", "Sea-Facing Balcony", "High Speed Wi-Fi", "Free Parking"],
    rooms: [
      {
        id: "apt-cox-entire-2bhk",
        name: "Entire 2-Bedroom Ocean Condo (2BHK)",
        bedType: "1 King Master + 1 Queen Bedroom",
        capacity: "Up to 5 Guests",
        sizeSqFt: 850,
        viewType: "Marine Drive Bay of Bengal Horizon",
        pricePerNight: 7500,
        features: ["Full Gas Kitchen with Cookware", "Private Sea-Breeze Balcony", "2 Attached AC Bathrooms", "Living Room with 55-inch Smart TV", "High-Speed Wi-Fi"],
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        isAvailable: true
      }
    ]
  },
  {
    id: "hotel-apt-sylhet",
    name: "Surma Riverview Family Serviced Suite",
    location: "VIP Road, Sylhet City",
    region: "Bangladesh",
    stayCategory: "serviced_apartment",
    isDomestic: true,
    rating: 4.5,
    starCategory: 3,
    reviewCount: 180,
    pricePerNight: 5800,
    tagline: "Spacious multi-room serviced apartment near Pansi restaurant",
    description: "Modern serviced flat with 2 air-conditioned bedrooms, living room, dining area, refrigerator, and microwave, walking distance to shopping and food hubs.",
    imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    amenities: ["Living & Dining Hall", "Kitchenette", "AC in All Rooms", "Elevator & 24hr Security"],
    rooms: [
      {
        id: "apt-sylhet-family",
        name: "Executive 2-Bedroom Family Suite",
        bedType: "2 Queen AC Bedrooms",
        capacity: "4-5 Guests",
        sizeSqFt: 780,
        viewType: "Surma River & City Skyline",
        pricePerNight: 5800,
        features: ["Equipped Kitchenette & Microwave", "Air Conditioned Bedrooms", "Dining Hall & Refrigerator", "Elevator & 24hr Security Guard"],
        imageUrl: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=800&q=80",
        isAvailable: true
      }
    ]
  },

  // 5. BUDGET GUEST HOUSES & BACKPACKER LODGES
  {
    id: "hotel-bud-ruilui",
    name: "Ruilui Bamboo Traveler's Lodge (Budget Backpacker)",
    location: "Ruilui Para, Sajek Valley",
    region: "Bangladesh",
    stayCategory: "budget_guesthouse",
    isDomestic: true,
    rating: 3.9,
    starCategory: 1,
    reviewCount: 340,
    pricePerNight: 1200,
    tagline: "Basic indigenous bamboo room for backpackers and students",
    description: "Simple, honest, and very cheap bamboo rooms with shared or attached basic bath, bucket hot water service, and walking distance to helipad.",
    imageUrl: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80",
    amenities: ["Bamboo Beds", "Bucket Hot Water", "Home-Cooked Food", "Chander Gari Parking"],
    rooms: [
      {
        id: "ruilui-standard-bamboo",
        name: "Standard Double Bamboo Room",
        bedType: "1 Double Bamboo Bed",
        capacity: "2 Travelers",
        sizeSqFt: 180,
        viewType: "Village Trail & Hill Ridge",
        pricePerNight: 1200,
        features: ["Mosquito Netting", "Attached Bath with Bucket Hot Water", "Power Charging Point", "Chander Gari Parking on Site"],
        imageUrl: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
        isAvailable: true
      },
      {
        id: "ruilui-dorm-bed",
        name: "Backpacker Shared Dormitory Bed",
        bedType: "1 Single Bunk Bed",
        capacity: "1 Traveler",
        sizeSqFt: 80,
        viewType: "Courtyard View",
        pricePerNight: 650,
        features: ["Individual Lockable Locker", "Shared Hot Bath", "Power Strip for Devices"],
        imageUrl: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
        isAvailable: true
      }
    ]
  },
  {
    id: "hotel-bud-thanchi",
    name: "Thanchi Sangu River Basecamp Rest House",
    location: "Thanchi Bazar, Bandarban",
    region: "Bangladesh",
    stayCategory: "budget_guesthouse",
    isDomestic: true,
    rating: 3.8,
    starCategory: 1,
    reviewCount: 290,
    pricePerNight: 900,
    tagline: "Economical staging dormitory & rooms before Nafakhum trek",
    description: "No-frills budget stay overlooking Sangu river ghat. The standard launchpad for trekkers heading to Remakri, Nafakhum, and Amiakhum.",
    imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
    amenities: ["River View", "Boat Guide Booking Desk", "Local Canteen", "Charging Station"],
    rooms: [
      {
        id: "thanchi-trekker-room",
        name: "Trekker Basecamp Room",
        bedType: "2 Single Wooden Beds",
        capacity: "2 Trekkers",
        sizeSqFt: 190,
        viewType: "Direct Sangu River Boat Ghat",
        pricePerNight: 900,
        features: ["Ceiling Fan", "River View Window", "Attached Bathroom", "Registered Remakri Boat Guide Desk on Site"],
        imageUrl: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
        isAvailable: true
      }
    ]
  },
  {
    id: "hotel-bud-saintmartin",
    name: "Coconut Grove Island Backpacker Dorm & Cottage",
    location: "West Beach, Saint Martin's Island",
    region: "Bangladesh",
    stayCategory: "budget_guesthouse",
    isDomestic: true,
    rating: 4.0,
    starCategory: 2,
    reviewCount: 310,
    pricePerNight: 1500,
    tagline: "Budget thatch cottage 100 meters from coral beach",
    description: "Economical island lodging under coconut trees with basic private room and mosquito net, steps from beachside tea stalls.",
    imageUrl: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
    amenities: ["Direct Beach Walk", "Generator 6PM-11PM", "BBQ Grill Rental", "Bicycle Hire"],
    rooms: [
      {
        id: "saintmartin-thatch-cabin",
        name: "Island Eco-Thatch Room",
        bedType: "1 Double Bed + Mosquito Net",
        capacity: "2 Guests",
        sizeSqFt: 220,
        viewType: "Coconut Tree Garden",
        pricePerNight: 1500,
        features: ["1-Minute Walk to Coral Beach", "Attached Clean Bath", "Evening Generator Electricity", "Fresh Coconut on Arrival"],
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        isAvailable: true
      }
    ]
  },

  // 6. CROSS-BORDER REGIONAL STAYS (INDIA)
  {
    id: "hotel-int-shillong",
    name: "Ri Kynjai - Serenity by the Lake (Meghalaya Luxury)",
    location: "Umiam Lake, Shillong, Meghalaya",
    region: "India (Near Sylhet)",
    stayCategory: "luxury_resort",
    isDomestic: false,
    rating: 4.9,
    starCategory: 5,
    reviewCount: 420,
    pricePerNight: 18500,
    tagline: "Inspired by Khasi thatched architecture overlooking Umiam Lake",
    description: "Luxury cottages on stilts overlooking emerald pine forests and Umiam Lake, offering traditional Khasi herbal spa baths and fine dining.",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    amenities: ["Umiam Lake Balconies", "Khasi Herbal Spa", "Sao Aiom Restaurant", "Boat Ride on Lake"],
    rooms: [
      {
        id: "rikynjai-supreme-cottage",
        name: "Supreme Khasi Lake-View Cottage on Stilts",
        bedType: "1 Extra-Large King Bed",
        capacity: "2 Adults",
        sizeSqFt: 520,
        viewType: "Unobstructed Umiam Lake & Pine Hills",
        pricePerNight: 18500,
        features: ["Traditional Thatch Architecture", "Lake-Facing Veranda with Daybed", "Khasi Herbal Spa Bath Experience", "Gourmet Breakfast Included"],
        imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
        isAvailable: true
      }
    ]
  },
  {
    id: "hotel-int-darjeeling",
    name: "Windamere Historic Heritage Hotel (Darjeeling Heritage)",
    location: "Observatory Hill, Darjeeling",
    region: "India (Near North Bengal)",
    stayCategory: "luxury_resort",
    isDomestic: false,
    rating: 4.8,
    starCategory: 5,
    reviewCount: 380,
    pricePerNight: 14500,
    tagline: "Legendary Raj-era heritage hotel with colonial fireplaces",
    description: "Established in the 19th century on Observatory Hill, celebrated for traditional afternoon English tea, candlelit dinners, and unobstructed Kanchenjunga views.",
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    amenities: ["Afternoon High Tea", "Fireplace in Rooms", "Kanchenjunga Vista", "Colonial Dining Hall"],
    rooms: [
      {
        id: "windamere-heritage-room",
        name: "Heritage Colonial Suite with Fireplace",
        bedType: "1 Grand Four-Poster King Bed",
        capacity: "2 Adults",
        sizeSqFt: 480,
        viewType: "Snow-capped Mt. Kanchenjunga & Pine Ridge",
        pricePerNight: 14500,
        features: ["Live Coal/Wood Fireplace", "Daily Afternoon High Tea", "Clawfoot Bathtub", "Raj-Era Antique Decor"],
        imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
        isAvailable: true
      }
    ]
  },
  {
    id: "hotel-int-darjeeling-bud",
    name: "Chowrasta Mall Backpacker Inn (Budget)",
    location: "Gandhi Road, Darjeeling",
    region: "India (Near North Bengal)",
    stayCategory: "budget_guesthouse",
    isDomestic: false,
    rating: 3.9,
    starCategory: 1,
    reviewCount: 280,
    pricePerNight: 1800,
    tagline: "Affordable room near Mall Road with hot water bucket",
    description: "Clean budget lodging 2 minutes from Chowrasta Mall, ideal for backpackers waking early for the 4:00 AM Tiger Hill taxi.",
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    amenities: ["Hot Water Geyser", "Mall Proximity", "Early Morning Taxi Help", "Free Wi-Fi"],
    rooms: [
      {
        id: "chowrasta-budget-double",
        name: "Budget Double Room with Geyser",
        bedType: "1 Double Bed",
        capacity: "2 Travelers",
        sizeSqFt: 210,
        viewType: "Darjeeling Mountain Valley",
        pricePerNight: 1800,
        features: ["24hr Hot Water Geyser", "2-Min Walk to Chowrasta Mall", "Tiger Hill Sunrise Taxi Help", "Free Wi-Fi"],
        imageUrl: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=800&q=80",
        isAvailable: true
      }
    ]
  }
];

// =========================================================================
// ADVENTURE ACTIVITIES & SPORTS (PARAGLIDING, CAMPING, ZIPLINING, RAPPELLING)
// =========================================================================

export const TOUR_ACTIVITIES: TourActivity[] = [
  // 1. PARAGLIDING OVER MARINE DRIVE (COX'S BAZAR)
  {
    id: "act-cox-paragliding",
    title: "Tandem Paragliding Over Bay of Bengal & Marine Drive",
    category: "adventure",
    location: "Himchari Beach Cliff, Marine Drive, Cox's Bazar",
    region: "Cox's Bazar, Bangladesh",
    isDomestic: true,
    rating: 4.9,
    reviewCount: 480,
    priceBDT: 3500,
    duration: "15-20 Min Flight + Briefing",
    difficulty: "Easy",
    description: "Soar like an eagle 500 feet above the crashing turquoise waves of the Bay of Bengal and green Himchari hills. Tandem flight with a certified professional pilot including high-resolution 4K GoPro action recording.",
    highlights: [
      "500-ft High Aerial Glide over Marine Drive",
      "Certified Professional Paragliding Pilot",
      "Complimentary 4K Action Camera Flight Video",
      "Safe Soft-Sand Beach Landing"
    ],
    safetyGearProvided: [
      "Full Body Certified Harness",
      "High-Impact Aviation Helmet",
      "Emergency Reserve Parachute",
      "Pre-flight Safety Briefing"
    ],
    imageUrl: "https://images.unsplash.com/photo-1508873696983-2df57046475a?auto=format&fit=crop&w=800&q=80",
    bestSeason: "Nov – Mar (Dry Coastal Breeze)"
  },

  // 2. CLIFFSIDE CAMPING & STARGAZING IN SAJEK VALLEY
  {
    id: "act-sajek-camping",
    title: "Cliffside Cloud Stargazing Camping & Campfire BBQ",
    category: "camping",
    location: "Kanglak Peak & Helipad Ridge, Sajek Valley",
    region: "Rangamati, Bangladesh",
    isDomestic: true,
    rating: 4.8,
    reviewCount: 390,
    priceBDT: 1800,
    duration: "Overnight (4:00 PM – 9:00 AM)",
    difficulty: "Easy",
    description: "Pitch a waterproof alpine tent directly on the high mountain ridge above the cloud blanket. Enjoy a night of acoustic campfire music, charcoal-grilled bamboo chicken BBQ, and wake up directly inside the sea of clouds at dawn.",
    highlights: [
      "Overnight All-Weather Double-Layer Alpine Tent",
      "Campfire with Live Tribal Bamboo Chicken BBQ",
      "Unpolluted Milky Way Stargazing at 1,800 ft",
      "Front-Row Sunrise over the Cloud Ocean"
    ],
    safetyGearProvided: [
      "Thermal Sleeping Bags & Inflatable Mats",
      "Solar LED Lanterns & Headlamps",
      "Camp Security & Hill Guide Support",
      "Clean Dedicated Washroom Access"
    ],
    imageUrl: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80",
    bestSeason: "Jul – Feb (Peak Cloud Formation)"
  },

  // 3. ZIPLINING & CANYON RAPPELLING IN BANDARBAN
  {
    id: "act-bandarban-zipline",
    title: "High-Altitude Zipline (Zimling) & Deep Canyon Rappelling",
    category: "adventure",
    location: "Sangu River Canyon & Nilgiri Cliff, Bandarban",
    region: "Bandarban, Bangladesh",
    isDomestic: true,
    rating: 4.9,
    reviewCount: 310,
    priceBDT: 2200,
    duration: "2.5 Hours",
    difficulty: "Moderate",
    description: "Experience heart-pounding adrenaline on Bangladesh's longest 1,200-foot zipline crossing the rocky gorges of Sangu river, followed by a guided 90-foot vertical cliff rappel down natural limestone rocks.",
    highlights: [
      "1,200-ft Dual-Cable Canyon Zipline Flight",
      "90-ft Vertical Limestone Waterfall Rappel",
      "Panoramic Views of Sangu River & Tribal Valleys",
      "Army-Trained Mountaineering Instructors"
    ],
    safetyGearProvided: [
      "UIAA-Certified Climbing Harness",
      "Petzl Heavy-Duty Carabiners & Descenders",
      "High-Tension Kernmantle Dynamic Ropes",
      "Safety Helmet & Heavy-Duty Belay Gloves"
    ],
    imageUrl: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=800&q=80",
    bestSeason: "Sep – Apr"
  },

  // 4. BOGA LAKE & KEOKRADONG STARGAZING CAMPING EXPEDITION
  {
    id: "act-boga-keokradong",
    title: "Boga Lake Alpine Camping & Keokradong Summit Trek",
    category: "trekking",
    location: "Boga Lake (1,200 ft) to Keokradong (3,172 ft), Bandarban",
    region: "Bandarban, Bangladesh",
    isDomestic: true,
    rating: 4.9,
    reviewCount: 420,
    priceBDT: 2800,
    duration: "2 Days / 1 Night",
    difficulty: "Challenging",
    description: "Trek through sacred Bawm indigenous villages to camp by the mysterious volcanic crater lake of Boga Lake. Ascend to Keokradong summit at dawn to stand above misty peaks and cross the historic Darjeeling Para.",
    highlights: [
      "Camp Beside Volcanic Mystery Lake of Boga",
      "Summit Keokradong Peak (3,172 ft)",
      "Traditional Bawm Indigenous Homestyle Meals",
      "Crystal Clear Mountain Stream Bathing"
    ],
    safetyGearProvided: [
      "Trek-Grade Alpine Dome Tents",
      "First Aid Kit & Antivenom Equipped Guide",
      "Hiking Poles & Leech Guards",
      "BGB Checkpost Permits Handled"
    ],
    imageUrl: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80",
    bestSeason: "Oct – Mar"
  },

  // 5. SCUBA DIVING & CORAL REEF SNORKELING IN SAINT MARTIN
  {
    id: "act-saintmartin-scuba",
    title: "Living Coral Reef Scuba Diving & Chera Dwip Snorkel",
    category: "watersports",
    location: "Chera Dwip Lagoon, Saint Martin's Island",
    region: "Bay of Bengal, Bangladesh",
    isDomestic: true,
    rating: 4.9,
    reviewCount: 350,
    priceBDT: 4000,
    duration: "3 Hours (Includes Boat & Training)",
    difficulty: "Moderate",
    description: "Dive beneath the turquoise waves of Bangladesh's sole coral reef. Swim among brain corals, clownfish, sea turtles, and colorful marine invertebrates with PADI-certified dive instructors.",
    highlights: [
      "30-Minute Shallow Reef Scuba Dive with Instructor",
      "Snorkeling in Protected Chera Dwip Coral Lagoon",
      "Underwater Photos & Videos with GoPro 11",
      "Speedboat Transfer from Saint Martin Jetty"
    ],
    safetyGearProvided: [
      "Full Scuba Tank & Scubapro Regulator System",
      "Buoyancy Control Device (BCD) & Wet Suit",
      "Anti-Fog Diving Mask & Silicone Snorkel",
      "Fins & Surface Marker Buoy (SMB)"
    ],
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    bestSeason: "Nov – Feb (Calm Bay Waters)"
  },

  // 6. NAFAKHUM & DEBOTAKHUM BAMBOO RAFTING EXPEDITION
  {
    id: "act-debotakhum-rafting",
    title: "Debotakhum Canyon Bamboo Raft & Nafakhum Waterfall Safari",
    category: "adventure",
    location: "Rowangchhari & Thanchi, Bandarban",
    region: "Bandarban, Bangladesh",
    isDomestic: true,
    rating: 4.9,
    reviewCount: 540,
    priceBDT: 2500,
    duration: "Full Day (7:00 AM – 5:00 PM)",
    difficulty: "Challenging",
    description: "Trek through lush forest streams and navigate traditional indigenous bamboo rafts through the narrow, towering limestone gorge of Debotakhum. Then take longboat rapids to the roaring falls of Nafakhum.",
    highlights: [
      "Navigating 300-ft High Dark Limestone Gorge",
      "Handcrafted Indigenous Bamboo Raft Experience",
      "Nafakhum Waterfall 'Niagara of Bengal' Dip",
      "Sangu River Rapids Longboat Safari"
    ],
    safetyGearProvided: [
      "High-Buoyancy Certified Life Jackets",
      "Waterproof Dry Bags for Electronics",
      "River Trek Non-Slip Plastic Sandals",
      "Certified Marma Local Water Guide"
    ],
    imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    bestSeason: "Jul – Nov (Roaring Water Season)"
  },

  // 7. DOUBLE DECKER LIVING ROOT BRIDGE TREK & CAVING (MEGHALAYA)
  {
    id: "act-rootbridge-caving",
    title: "Double Decker Root Bridge Rainforest Trek & Mawsmai Caving",
    category: "caving",
    location: "Nongriat & Sohra, Cherrapunji, Meghalaya",
    region: "Northeast India",
    isDomestic: false,
    rating: 4.9,
    reviewCount: 410,
    priceBDT: 3200,
    duration: "Full Day Guided Expedition",
    difficulty: "Challenging",
    description: "Descend 3,500 stone steps through misty tropical rainforest to cross the ancient 150-year-old Double Decker Living Root Bridge, followed by exploring natural limestone stalactite caves in Mawsmai.",
    highlights: [
      "Walking Across 150-Year Bio-Engineered Root Bridges",
      "Rainbow Falls Natural Turquoise Plunge Pool Dip",
      "Limestone Stalactite Mawsmai Cave Exploration",
      "Khasi Rainforest Herbal Tea Stop"
    ],
    safetyGearProvided: [
      "Caving Headlamps & Safety Helmets",
      "Trekking Walking Sticks",
      "Rain Ponchos & Leech Guard Socks",
      "Registered Local Khasi Naturalist"
    ],
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    bestSeason: "Sep – May"
  }
];

export const AIR_TICKETS: AirTicket[] = [
  // Domestic Flights (Bangladesh)
  {
    id: "air-bd-1",
    classType: "Biman Bangladesh Airlines (Dhaka → Cox's Bazar)",
    price: 6800,
    departureTime: "08:30",
    departureCode: "DAC (Dhaka)",
    arrivalTime: "09:25",
    arrivalCode: "CXB (Cox's Bazar)",
    duration: "55m",
    stops: "Direct Non-Stop",
    isDomestic: true,
    features: ["20kg Checked Baggage Included", "Complimentary In-Flight Snack", "Leather Recliner Seating", "Bay of Bengal Coastal Aerial View"]
  },
  {
    id: "air-bd-2",
    classType: "US-Bangla Airlines (Dhaka → Sylhet Osmani)",
    price: 4900,
    departureTime: "14:15",
    departureCode: "DAC (Dhaka)",
    arrivalTime: "15:05",
    arrivalCode: "ZYL (Sylhet)",
    duration: "50m",
    stops: "Direct Non-Stop",
    isDomestic: true,
    features: ["15-min Express Boarding", "Complimentary Beverage Box", "Extra Legroom", "Scenic Tea Valley Approach"]
  },
  {
    id: "air-bd-3",
    classType: "Air Astra (Dhaka → Chattogram)",
    price: 4500,
    departureTime: "11:20",
    departureCode: "DAC (Dhaka)",
    arrivalTime: "12:05",
    arrivalCode: "CGP (Chattogram)",
    duration: "45m",
    stops: "Direct Non-Stop",
    isDomestic: true,
    features: ["ATR 72-600 Modern Turboprop", "Punctual Schedule Guarantee", "Snack Service", "Window View of Karnaphuli River"]
  },
  // Cross-Border Flight (India / Northeast)
  {
    id: "air-int-1",
    classType: "IndiGo / Biman Regional (Dhaka → Kolkata / Bagdogra for Darjeeling)",
    price: 14500,
    departureTime: "09:10",
    departureCode: "DAC (Dhaka)",
    arrivalTime: "11:45",
    arrivalCode: "IXB (Bagdogra)",
    duration: "2h 35m",
    stops: "1 Transit / Direct Connecting",
    isDomestic: false,
    features: ["Connecting to Darjeeling & Sikkim", "International Baggage Allowance", "Fast Immigration Support", "Himalayan Ridge Views"]
  }
];

export const ROAD_OPTIONS: RoadOption[] = [
  // 1. CHANDER GARI OPEN SAFARI JEEP
  {
    id: "road-cg-1",
    title: "Chander Gari Mountain Rover (Open Safari Jeep)",
    price: 11500,
    description: "The legendary open-roof mountain safari jeep built for the rugged mountain passes and convoy routes of Bandarban and Sajek Valley.",
    duration: "Full Day Guided Charter (3-Day Package: ৳14,500)",
    capacityOrDetail: "Up to 8-10 Travelers • Open-Air 360° Mountain Panorama • Hill Escort Approved",
    isDomestic: true,
    imageUrl: realOpenRoofJeepImg
  },
  // 2. LUXURY SCANIA DOUBLE-DECKER COACH
  {
    id: "road-cg-2",
    title: "Scania VIP Double-Decker Sleeper Coach (Shohagh / Green Line / Saintmartin)",
    price: 2400,
    description: "Ultra-luxury multi-axle sleeper coach connecting Dhaka to Cox's Bazar and Chittagong with personal entertainment pods and flatbeds.",
    duration: "8h 00m Overnight Journey",
    capacityOrDetail: "Personal Sleeping Pod • Free Water & Snacks • High-Speed Wi-Fi",
    isDomestic: true,
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"
  },
  // 3. FIRST CLASS TRAIN CABIN
  {
    id: "road-cg-3",
    title: "Suborno / Parabat Express AC First Class Train Cabin (Bangladesh Railway)",
    price: 1450,
    description: "Air-conditioned first class intercity train carriage featuring large panoramic windows overlooking rural Bengal waterways and paddy fields.",
    duration: "5h 15m Express Journey",
    capacityOrDetail: "Panoramic Train Window • Reserved Air-Conditioned Cabin • Meal Included",
    isDomestic: true,
    imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80"
  }
];

export const SEA_OPTION: SeaOption = {
  id: "sea-bd-1",
  title: "MV Bay One Luxury Ocean Cruiser (Saint Martin Island)",
  startingPrice: 5500,
  description: "Bangladesh's premier luxury sea cruiser sailing through the deep blue waters of the Bay of Bengal from Cox's Bazar to Saint Martin's Island. Live BBQ, open-air sun deck, and royal oceanview suites.",
  departure: "09:00 AM Cox's Bazar Jetty",
  arrival: "12:30 PM Saint Martin Coral Jetty",
  isDomestic: true,
  cabinTypes: [
    {
      name: "Open Sun-Deck & Oceanview Seat",
      description: "Air-conditioned cabin or open top-deck, panoramic window over Bay of Bengal, complimentary snacks",
      extraCost: 0
    },
    {
      name: "Emperor VIP Balcony Suite",
      description: "Private teaked veranda facing open sea, dedicated steward service, fresh lobster lunch buffet",
      extraCost: 4500
    }
  ]
};

export const HOTEL_RETREATS: HotelRetreat[] = [
  {
    id: "hotel-bd-1",
    name: "Meghpunji Eco Resort",
    category: "Cloud Valley Sanctuary",
    tagline: "Unparalleled silence & ocean of morning clouds",
    description: "Suspended on the edge of Sajek Valley cliff, featuring rustic bamboo & timber eco-cottages where clouds drift directly through your open balcony at sunrise.",
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    location: "Sajek Valley, Rangamati",
    region: "Bangladesh",
    isDomestic: true,
    rating: 4.9,
    pricePerNight: 6500,
    amenities: ["Cloud View Balcony", "Traditional Bamboo Chicken", "Campfire Stargazing", "Chander Gari Pickup"]
  }
];

export const MYTHOS_STORY: MythosStory = {
  id: "mythos-cg",
  title: "The Legend of Chander Gari & The Misty Hills",
  tagline: "",
  story: "The iconic open safari jeep of the Chittagong Hill Tracts, built to conquer steep mountain climbs and misty hill trails.",
  imageUrl: realOpenRoofJeepImg
};

export const FEATURED_RESTAURANTS: RestaurantListing[] = [
  // 1. BANGLADESH AUTHENTIC RESTAURANTS
  {
    id: "rest-bd-mezban",
    name: "Mezbani Heritage Dining (Chattogram)",
    location: "GEC Circle, Chattogram",
    region: "Bangladesh",
    isDomestic: true,
    rating: 4.9,
    reviewCount: 1850,
    priceRange: "$$",
    costPerPerson: 450,
    cuisine: "Traditional Chittagonian Royal Feast",
    signatureDish: "Authentic Mezbani Gosht with Chonar Dal & Noli Gravy",
    description: "World-famous tender beef slow-cooked in large copper handis with 21 secret spices, served with steaming white rice and rich marrow gravy.",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "rest-bd-pansi",
    name: "Pansi Restaurant (Sylhet)",
    location: "Zindabazar, Sylhet",
    region: "Bangladesh",
    isDomestic: true,
    rating: 4.8,
    reviewCount: 3200,
    priceRange: "$$",
    costPerPerson: 350,
    cuisine: "Authentic Sylheti Cuisine & Bhortas",
    signatureDish: "Sylheti Beef with Wild Citrus (Shatkora) & 30 Varieties of Bhortas",
    description: "The most iconic culinary stop in Sylhet, celebrated for tangy Shatkora beef, Hilsa fry, duck curry, and fresh mashed vegetable bhortas.",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "rest-bd-bamboo",
    name: "Chimmbal Tribal Restaurant (Sajek & Bandarban)",
    location: "Ruilui Para, Sajek Valley",
    region: "Bangladesh",
    isDomestic: true,
    rating: 4.8,
    reviewCount: 1420,
    priceRange: "$$",
    costPerPerson: 400,
    cuisine: "Indigenous Hill Tracts Bamboo Cooking",
    signatureDish: "Whole Desi Chicken Roasted inside Fresh Green Bamboo Stems",
    description: "Tender chicken marinated in wild mountain spices, stuffed into green fresh bamboo stems, and charcoal-roasted directly over wood embers.",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "rest-bd-mermaid",
    name: "Mermaid Beach Cafe & Coastal Grill",
    location: "Pechardwip Marine Drive, Cox's Bazar",
    region: "Bangladesh",
    isDomestic: true,
    rating: 4.8,
    reviewCount: 1120,
    priceRange: "$$$",
    costPerPerson: 1200,
    cuisine: "Coastal Seafood BBQ & Organic Farm",
    signatureDish: "Live Coral Fish BBQ, Grilled Tiger Prawns & Crab Masala",
    description: "Bohemian eco-chic beach cafe touching the surf, serving fresh seafood straight from local fishermen's wooden catamarans.",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
  },

  // 2. CROSS-BORDER REGIONAL (INDIA)
  {
    id: "rest-int-darjeeling",
    name: "Glenary's Bakery, Pub & Restaurant (Darjeeling)",
    location: "Nehru Road, Mall, Darjeeling",
    region: "India (Near North Bengal)",
    isDomestic: false,
    rating: 4.9,
    reviewCount: 2200,
    priceRange: "$$",
    costPerPerson: 850,
    cuisine: "Anglo-Indian & Continental Hill Bakery",
    signatureDish: "Fresh Apple Pie with Sizzling Roast Chicken & Darjeeling First Flush Tea",
    description: "100-year-old historic landmark bakery in the Mall, famous for fresh breakfast buns, apple pies, and evening jazz with Kanchenjunga views.",
    imageUrl: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80"
  }
];
