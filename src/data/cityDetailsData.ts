import { City, CityHotel, CityFood, CityHistory } from "../types";
import { formatDualPrice } from "../utils/currency";

export interface CityFullDetails {
  hotels: CityHotel[];
  foods: CityFood[];
  history: CityHistory;
}

export const CITY_DETAILS_DATABASE: Record<string, CityFullDetails> = {
  // 1. BANDARBAN (NAFAKHUM, DEBOTAKHUM & REMOTE PEAKS)
  bandarban: {
    hotels: [
      {
        id: "b-lux-1",
        name: "Sairu Hill Resort (5-Star Luxury)",
        type: "Premier Mountain Resort",
        stayCategory: "luxury_resort",
        rating: 4.9,
        starCategory: 5,
        pricePerNight: 16800,
        imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
        description: "Spectacular architectural hilltop resort on Chimbuk Road with an open infinity pool gazing over layers of misty blue hills.",
        location: "Chimbuk Road, Bandarban",
        amenities: ["Hilltop Infinity Pool", "Sairu Restaurant", "Private Panoramic Decks", "Chander Gari Transfer"]
      },
      {
        id: "b-mid-1",
        name: "Nilgiri Hill Resort (Army Managed Motel)",
        type: "High-Altitude Cloud Motel",
        stayCategory: "mid_motel",
        rating: 4.8,
        starCategory: 4,
        pricePerNight: 6500,
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        description: "Perched atop Nilgiri Peak at 2,200 ft elevation. Experience 360-degree floating clouds right beside the helipad.",
        location: "Nilgiri Peak, Thanchi Road",
        amenities: ["Cloud Observation Deck", "VIP Restaurant", "Helipad Access", "High Security Escort"]
      },
      {
        id: "b-bud-1",
        name: "Thanchi Riverview Traveler's Guest House (Budget Option)",
        type: "Basecamp Guesthouse",
        stayCategory: "budget_guesthouse",
        rating: 4.6,
        starCategory: 2,
        pricePerNight: 1200,
        imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
        description: "Affordable and clean guest rooms right beside the Sangu River. The central staging post before taking engine boats to Remakri & Nafakhum.",
        location: "Thanchi Bazar, Bandarban",
        amenities: ["River View Balcony", "Boat & Guide Arrangement", "Local Marma Food", "Solar Light"]
      }
    ],
    foods: [
      {
        id: "bf-1",
        name: "Bamboo Chicken & Sticky Rice (Mundro)",
        category: "Tribal Indigenous Cuisine",
        imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
        description: "Fresh country chicken and sticky hill rice cooked slowly inside green bamboo stems over wood fire, infused with mountain lemongrass and ginger.",
        bestWhere: "Thanchi Bazar Tribal Eatery & Remakri Village",
        priceEstimate: "৳350 – ৳450 ($2.85 – $3.70)"
      },
      {
        id: "bf-2",
        name: "Sangu River Fresh Fish Curry (Pitha & Vegetables)",
        category: "River Catch",
        imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
        description: "Sweet wild fish caught fresh from the rocky rapids of Sangu River, cooked with wild mustard seeds and hill tomatoes.",
        bestWhere: "Remakri Rest Point & Thanchi Ghat",
        priceEstimate: "৳250 – ৳350 ($2.05 – $2.85)"
      }
    ],
    history: {
      period: "15th Century – Present (Bohmong Royal Circle)",
      summary: "Bandarban ('Dam of Monkeys') has been the historic seat of the Bohmong Marma Royal Dynasty since the 16th century. Home to 11 indigenous ethnicities including Marma, Bawm, Murang, and Tripura.",
      culturalSignificance: "Celebrated for the sacred Buddha Dhatu Jadi (Golden Temple), ancient tribal kingships, and natural wonders like Nafakhum, Amiakhum, and Debotakhum.",
      historicalSites: [
        {
          name: "Buddha Dhatu Jadi (Golden Temple)",
          era: "1995 (Theravada Buddhist Shrine)",
          description: "Stunning golden pagoda holding sacred Buddha relics overlooking the misty mountain hills."
        },
        {
          name: "Bohmong Royal Palace",
          era: "16th Century",
          description: "Historic residence of the Bohmong Chief, host of the annual historic Rajpunnah durbar tax festival."
        }
      ]
    }
  },

  // 2. SAJEK VALLEY
  sajek: {
    hotels: [
      {
        id: "sj-lux-1",
        name: "Sajek Resort & Runmoy (Boutique Mountain Stay)",
        type: "VIP Ridge Cottage",
        stayCategory: "luxury_resort",
        rating: 4.8,
        starCategory: 4,
        pricePerNight: 8500,
        imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        description: "Perched right at the highest ridge near the Army camp, with premium cedar rooms and balconies projecting over the cloud valley.",
        location: "Ruilui Para Top, Sajek",
        amenities: ["Cloud Horizon Balcony", "Runmoy VIP Dining", "Campfire Lawn", "Army Escort Support"]
      },
      {
        id: "sj-mid-1",
        name: "Meghpunji Eco Cottage (Cloud Edge Cottage)",
        type: "Rustic Hill Cottage",
        stayCategory: "eco_cottage",
        rating: 4.9,
        starCategory: 3,
        pricePerNight: 5500,
        imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
        description: "Charming wood and bamboo eco-cottages where morning clouds float directly across your bed and balcony.",
        location: "Ruilui Para, Sajek Valley",
        amenities: ["Suspended Balcony", "Tribal Kitchen", "Campfire Stargazing", "Solar Power"]
      },
      {
        id: "sj-bud-1",
        name: "Ruilui Bamboo Traveler's Lodge (Budget Option)",
        type: "Backpacker Timber Lodge",
        stayCategory: "budget_guesthouse",
        rating: 4.3,
        starCategory: 2,
        pricePerNight: 1200,
        imageUrl: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80",
        description: "Cozy and economical bamboo lodging built by local Lushai families, walking distance from the Sajek Helipad.",
        location: "Ruilui Main Trail, Sajek",
        amenities: ["Bamboo Beds", "Bucket Hot Water", "Home-Cooked Food", "Chander Gari Parking"]
      }
    ],
    foods: [
      {
        id: "sjf-1",
        name: "Sajek Famous Bamboo Roast Chicken",
        category: "Highland Specialty",
        imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        description: "Whole tender organic chicken spiced with indigenous hill pepper, ginger, and wild herbs, grilled inside green bamboo trunks over glowing embers.",
        bestWhere: "Chimmbal & Meghdut Bamboo Kitchen, Ruilui",
        priceEstimate: "৳450 – ৳600 ($3.70 – $4.90)"
      },
      {
        id: "sjf-2",
        name: "Fresh Hill Papaya Salad & Tribal Smoked Meat",
        category: "Lushai Indigenous Dish",
        imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
        description: "Crunchy green hill papaya pounded with lime, wild coriander, mountain chilies, and served with smoked river fish.",
        bestWhere: "Kanglak Peak Viewpoint Canteen",
        priceEstimate: "৳150 – ৳250 ($1.20 – $2.05)"
      }
    ],
    history: {
      period: "1860s – Present (Lushai & Tripura Settlement)",
      summary: "Sajek Valley was historically part of the Lushai Hills corridor connecting the Chittagong Hill Tracts with Mizoram. Ruilui Para was founded in 1885 by the Lushai tribal chieftain.",
      culturalSignificance: "Famous for the harmonious coexistence of Lushai, Chakma, and Tripura communities, preserved church traditions from British missionary eras, and stone trails.",
      historicalSites: [
        {
          name: "Ruilui Para 1885 Baptist Church",
          era: "Late 19th Century",
          description: "One of the oldest wooden churches in the Chittagong Hill Tracts established by British missionaries."
        },
        {
          name: "Kanglak Old Village",
          era: "Traditional Tribal Era",
          description: "The highest authentic Lushai village in Sajek, retaining ancient thatch structures and stone boundary markers."
        }
      ]
    }
  },

  // 3. TANGUAR HAOR & SUNAMGANJ
  tanguar: {
    hotels: [
      {
        id: "tg-lux-1",
        name: "Jol Torongo Luxury Wooden Houseboat",
        type: "Deluxe Haor Cruiser",
        stayCategory: "luxury_resort",
        rating: 4.9,
        starCategory: 5,
        pricePerNight: 9500,
        imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
        description: "Handcrafted teak-wood houseboat with private AC cabins, open sun-deck lounges, and gourmet haor duck & fish banquet.",
        location: "Tahirpur Ghat & Tanguar Haor",
        amenities: ["Private AC Staterooms", "Sun Deck with Hammocks", "Dedicated Chef on Board", "Kayaks Included"]
      },
      {
        id: "tg-mid-1",
        name: "Niladri Lake View Tent & Resort Camp",
        type: "Scenic Lake Resort",
        stayCategory: "eco_cottage",
        rating: 4.6,
        starCategory: 3,
        pricePerNight: 3500,
        imageUrl: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80",
        description: "Overlooking the turquoise quarry waters of Shahid Siraj (Niladri) Lake with direct views of the blue Meghalaya mountain border.",
        location: "Tekerghat, Tahirpur",
        amenities: ["Lake View Tents & AC Rooms", "Campfire Setup", "Motorbike Rental", "Meghalaya Border View"]
      },
      {
        id: "tg-bud-1",
        name: "Tahirpur Central Rest House (Budget Option)",
        type: "Town Guesthouse",
        stayCategory: "budget_guesthouse",
        rating: 4.2,
        starCategory: 2,
        pricePerNight: 950,
        imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
        description: "Clean basic lodging located 2 minutes from Tahirpur boat ghat for backpackers embarking on budget haor longboats.",
        location: "Tahirpur Bazar, Sunamganj",
        amenities: ["Fan Rooms", "Attached Bath", "Boat Booking Desk", "Haor Fish Canteen"]
      }
    ],
    foods: [
      {
        id: "tgf-1",
        name: "Fresh Tanguar Bowal & Rui Fish Kalia",
        category: "Wetland Freshwater Catch",
        imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
        description: "Giant sweetwater fish caught straight from Tanguar Haor's deep waters, cooked in rich mustard gravy on board the houseboat.",
        bestWhere: "Live Cooked on Tanguar Houseboats",
        priceEstimate: "৳350 – ৳500 ($2.85 – $4.10)"
      },
      {
        id: "tgf-2",
        name: "Sunamganj Desi Duck (Hash Bhuna) with Chaler Ruti",
        category: "Regional Winter Feast",
        imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
        description: "Rich free-range haor duck slow-braised with whole garlic pods, cloves, and fiery red chili paste, served with steaming rice flour flatbreads.",
        bestWhere: "Tahirpur Ghat & Tekerghat Dhabas",
        priceEstimate: "৳300 – ৳450 ($2.45 – $3.70)"
      }
    ],
    history: {
      period: "Ancient Kamarupa – Present (UNESCO Wetland)",
      summary: "Sunamganj is the historic mystic land of Baul philosopher-poets including Hason Raja, Radharaman Dutta, and Shah Abdul Karim. Tanguar Haor is a Ramsar-protected wetland of international ecological importance.",
      culturalSignificance: "The epicentre of Bengali folk philosophy, mystic Sufi music, vibrant water ecology, and winter migratory avian flyways from Siberia.",
      historicalSites: [
        {
          name: "Hason Raja Museum & Palace",
          era: "19th Century",
          description: "Historic residence of mystic zamindar-poet Hason Raja, showcasing original handwritten songs and artifacts."
        },
        {
          name: "Lauyer Garh Ancient Capital",
          era: "12th Century",
          description: "Remains of the ancient kingdom of Laur along the Jadukata River bordering Meghalaya."
        }
      ]
    }
  },

  // 4. SYLHET (RATARGUL, JAFLONG & TEA ESTATES)
  sylhet: {
    hotels: [
      {
        id: "syl-lux-1",
        name: "The Palace Luxury Resort (5-Star Luxury)",
        type: "5-Star Sprawling Estate",
        stayCategory: "luxury_resort",
        rating: 4.9,
        starCategory: 5,
        pricePerNight: 19500,
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        description: "Sprawling luxury resort surrounded by pristine rubber hills, featuring 4 swimming pools, helipad, and private luxury villas.",
        location: "Bahubal, Sylhet Highway",
        amenities: ["4 Swimming Pools", "Private Pool Villas", "Helipad", "Fine Dining", "Holistic Spa"]
      },
      {
        id: "syl-mid-1",
        name: "Hotel Noorjahan Grand (Boutique City Hotel)",
        type: "4-Star City Hotel",
        stayCategory: "mid_motel",
        rating: 4.6,
        starCategory: 4,
        pricePerNight: 4800,
        imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        description: "Upscale modern city hotel across from the historic Shah Jalal Dargah gate, offering luxury buffet and city skyline terrace.",
        location: "Waves, Dargah Gate, Sylhet",
        amenities: ["Rooftop Restaurant", "AC Deluxe Rooms", "Dargah Proximity", "Free Breakfast"]
      },
      {
        id: "syl-bud-1",
        name: "Surma Riverview Guest House (Budget Option)",
        type: "Riverside Budget Hotel",
        stayCategory: "budget_guesthouse",
        rating: 4.3,
        starCategory: 2,
        pricePerNight: 1100,
        imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
        description: "Centrally located budget rooms overlooking the historic Keane Bridge and Surma River, close to Pansi & Pach Bhai restaurants.",
        location: "VIP Road, Zindabazar, Sylhet",
        amenities: ["Surma River View", "AC & Non-AC Rooms", "Walk to Pansi Diner", "Free Wi-Fi"]
      }
    ],
    foods: [
      {
        id: "sylf-1",
        name: "Sylheti Shatkora Beef Curry (Pansi Classic)",
        category: "Signature Heritage Curry",
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        description: "Tender chunks of beef slow-simmered with thick wedges of wild citrus macroptera (Shatkora), imparting an intoxicating aroma and tangy flavor.",
        bestWhere: "Pansi Restaurant & Pach Bhai, Zindabazar",
        priceEstimate: "৳240 – ৳320 ($1.95 – $2.60)"
      },
      {
        id: "sylf-2",
        name: "Famous Sreemangal Seven Layered Colored Tea",
        category: "Iconic Tea Innovation",
        imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
        description: "A transparent glass displaying 7 distinctly colored and flavored layers of green tea, black tea, condensed milk, spices, and lemon without mixing.",
        bestWhere: "Nilkantha Tea Cabin, Sylhet & Sreemangal",
        priceEstimate: "৳90 – ৳120 ($0.75 – $1.00)"
      }
    ],
    history: {
      period: "1303 – Present (Hazrat Shah Jalal Era)",
      summary: "Sylhet was unified into the Bengal Sultanate following the arrival of the revered Sufi saint Hazrat Shah Jalal (R) and his 360 companions in 1303. Later became the heartland of tea production under the British Empire in 1854.",
      culturalSignificance: "A globally renowned spiritual pilgrimage hub, birthplace of the Nagri script, and tea capital of Bangladesh.",
      historicalSites: [
        {
          name: "Dargah-e-Hazrat Shah Jalal (R)",
          era: "1303 (Sufi Shrine Complex)",
          description: "Spiritual sanctuary housing the ancient tomb, sacred pond with giant catfishes, and heritage mosque."
        },
        {
          name: "Keane Bridge & Ali Amjad Clock",
          era: "1895 (Colonial Iron Architecture)",
          description: "Iconic Victorian bow-string iron bridge across the Surma River and historic brass clock tower."
        }
      ]
    }
  },

  // 5. COX'S BAZAR
  coxsbazar: {
    hotels: [
      {
        id: "cx-lux-1",
        name: "Sayeman Beach Resort (5-Star Luxury)",
        type: "Oceanfront Luxury Resort",
        stayCategory: "luxury_resort",
        rating: 4.9,
        starCategory: 5,
        pricePerNight: 15500,
        imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        description: "The most iconic 5-star beachfront resort with an infinity pool overlooking the rolling waves of the Bay of Bengal on Marine Drive.",
        location: "Marine Drive, Kolatoli, Cox's Bazar",
        amenities: ["Beachfront Infinity Pool", "Casablanca Dining", "Private Beach Access", "Airport Shuttle"]
      },
      {
        id: "cx-mid-1",
        name: "Hotel Sea Crown (Mid-Tier Beach Motel)",
        type: "Direct Beach Motel",
        stayCategory: "mid_motel",
        rating: 4.4,
        starCategory: 3,
        pricePerNight: 4200,
        imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
        description: "Direct beachfront location where the waves break steps from the dining deck. Ideal for families wanting instant beach access.",
        location: "Kolatoli Beach, Cox's Bazar",
        amenities: ["Beach Deck Restaurant", "AC Sea-View Rooms", "Free Breakfast", "Generator Backup"]
      },
      {
        id: "cx-bud-1",
        name: "Marine Drive Panorama 2-BHK Holiday Apartment",
        type: "Vacation Condo (Budget Multi-Room)",
        stayCategory: "serviced_apartment",
        rating: 4.5,
        starCategory: 3,
        pricePerNight: 7500,
        imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        description: "Fully equipped 2-bedroom oceanfront apartment with private kitchen, sea-facing balcony, and high-speed Wi-Fi.",
        location: "Inani Marine Drive, Cox's Bazar",
        amenities: ["Kitchen & Cookware", "2 Bedrooms", "Balcony over Ocean", "High Speed Wi-Fi"]
      }
    ],
    foods: [
      {
        id: "cxf-1",
        name: "Live Grilled Rupchanda (Silver Pomfret) BBQ",
        category: "Coastal Seafood BBQ",
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        description: "Freshly caught Silver Pomfret scored and marinated with coriander, crushed cumin, and lemon, grilled over coconut-charcoal grills.",
        bestWhere: "Mermaid Beach Cafe & Laboni Beach BBQ Hub",
        priceEstimate: "৳650 – ৳950 ($5.30 – $7.80)"
      },
      {
        id: "cxf-2",
        name: "Spicy Coral Fish Curry & Crab Masala",
        category: "Bay of Bengal Fresh Catch",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
        description: "Rich coastal curry made from thick sea-coral steaks and mud crabs, cooked with caramelized onions, green chilies, and coconut milk.",
        bestWhere: "Jhaubon Restaurant & Kolatoli Seafood Diner",
        priceEstimate: "৳450 – ৳700 ($3.70 – $5.75)"
      }
    ],
    history: {
      period: "1799 – Present (Captain Hiram Cox Era)",
      summary: "Named after Captain Hiram Cox of the British East India Company who was appointed superintendent of Palongkee outpost in 1799 to rehabilitate Rakhine refugees fleeing Burmese conquest of Arakan.",
      culturalSignificance: "Home to the world's longest unbroken natural sandy sea beach (120 km), ancient Rakhine Buddhist monasteries (Aggamedha Khyang), and the Marine Drive highway.",
      historicalSites: [
        {
          name: "Aggamedha Khyang Buddhist Monastery",
          era: "Early 19th Century",
          description: "Magnificent timber monastery built on stilt poles housing centuries-old bronze Buddha sculptures."
        },
        {
          name: "Ramu Ancient Buddhist Pagodas & 100-ft Reclining Buddha",
          era: "3rd Century BCE & Modern",
          description: "Historic sanctuary at Vimutti Sasana Seva Vihara containing the 100-foot gold-plated reclining Buddha."
        }
      ]
    }
  },

  // 6. SAINT MARTIN'S ISLAND
  saintmartin: {
    hotels: [
      {
        id: "sm-lux-1",
        name: "Saint Martin Resort & Marine Coral Village",
        type: "Island Beach Resort",
        stayCategory: "luxury_resort",
        rating: 4.8,
        starCategory: 4,
        pricePerNight: 9500,
        imageUrl: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
        description: "Private wooden beach bungalows set in lush palm gardens steps from the crystal clear turquoise coral waters.",
        location: "West Beach, Saint Martin's Island",
        amenities: ["Direct Coral Beach Access", "Live Lobster BBQ", "Solar & 24hr Power", "Speedboat to Chera Dwip"]
      },
      {
        id: "sm-mid-1",
        name: "Coral View Resort (Lagoon Front)",
        type: "Lagoon View Motel",
        stayCategory: "mid_motel",
        rating: 4.5,
        starCategory: 3,
        pricePerNight: 4800,
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        description: "Situated beside the eastern coral lagoon, offering rooms with open sea views and sunrise watching platforms.",
        location: "East Beach, Saint Martin's Island",
        amenities: ["East Beach Sunrise View", "AC Cottages", "Island Guide", "Seafood Kitchen"]
      },
      {
        id: "sm-bud-1",
        name: "Coconut Grove Island Backpacker Dorm & Cottage",
        type: "Budget Thatch Cottage",
        stayCategory: "budget_guesthouse",
        rating: 4.2,
        starCategory: 2,
        pricePerNight: 1500,
        imageUrl: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=800&q=80",
        description: "Affordable bamboo & thatch rooms under coconut palms, 100 meters from the coral reef with bicycle hire.",
        location: "North Beach, Saint Martin's Island",
        amenities: ["Beach Proximity", "Bicycle Hire", "Fresh Coconut Water", "Campfire BBQ"]
      }
    ],
    foods: [
      {
        id: "smf-1",
        name: "Live King Lobster & Red Snapper Charcoal BBQ",
        category: "Island Coral Catch",
        imageUrl: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80",
        description: "Live sea lobsters grilled directly on the sand over coconut husk coals with butter-garlic-chili glaze, served with lime.",
        bestWhere: "Saint Martin Jetty Night Seafood Bazaar",
        priceEstimate: "৳1,200 – ৳2,200 ($9.80 – $18.00)"
      },
      {
        id: "smf-2",
        name: "Fresh Sweet Green Coconut (Dab) & Koral Kalia",
        category: "Tropical Island Staple",
        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        description: "Extremely sweet and mineral-rich coconut water plucked from native palms, followed by fiery red coral fish curry with coconut milk.",
        bestWhere: "Chera Dwip Island Stalls & West Beach Shacks",
        priceEstimate: "৳80 – ৳350 ($0.65 – $2.85)"
      }
    ],
    history: {
      period: "18th Century – Present (Arab Traders & Narikel Jinjira)",
      summary: "First settled in the 18th century by Arabian traders who named it 'Jazira' (Island). Later named 'Narikel Jinjira' (Coconut Island) by Bengali settlers, and renamed Saint Martin's Island in 1900 during British survey.",
      culturalSignificance: "The only living coral island in Bangladesh, home to rare olive ridley sea turtle nesting beaches, marine biodiversity, and Chera Dwip coral formation.",
      historicalSites: [
        {
          name: "Saint Martin's Historic Lighthouse",
          era: "20th Century Maritime Navigation",
          description: "Navigational lighthouse guiding ocean freighters safely across the Bay of Bengal into the Naf River estuary."
        },
        {
          name: "Chera Dwip Natural Coral Causeway",
          era: "Geological Coral Formation",
          description: "Separated southernmost tip of Bangladesh that cuts off during high tide into a pristine coral sanctuary."
        }
      ]
    }
  },

  // 7. KAPTAI & RANGAMATI
  rangamati: {
    hotels: [
      {
        id: "rm-lux-1",
        name: "Polwel Lake Nature Cottage (Lakefront Timber Chalet)",
        type: "Lakefront Eco Resort",
        stayCategory: "eco_cottage",
        rating: 4.7,
        starCategory: 4,
        pricePerNight: 4800,
        imageUrl: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
        description: "Perched under pine trees directly on the water's edge of Kaptai Lake with private jetty, kayaks, and infinity lake deck.",
        location: "DC Hill, Rangamati",
        amenities: ["Private Boat Jetty", "Kayaks Included", "Lakeview Deck", "Open BBQ Lawn"]
      },
      {
        id: "rm-mid-1",
        name: "Hotel Sufia International (Lake Facing)",
        type: "City Lake Hotel",
        stayCategory: "mid_motel",
        rating: 4.3,
        starCategory: 3,
        pricePerNight: 3200,
        imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
        description: "Classic lakefront hotel with balconies overlooking longboats crossing Kaptai Lake and rolling green hills.",
        location: "Old Bus Stand, Rangamati",
        amenities: ["AC Lake View Rooms", "Boat Charter Desk", "Restaurant", "Wi-Fi"]
      },
      {
        id: "rm-bud-1",
        name: "Rajbari View Guesthouse (Budget Option)",
        type: "Budget Lakeside Lodge",
        stayCategory: "budget_guesthouse",
        rating: 4.1,
        starCategory: 2,
        pricePerNight: 1000,
        imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
        description: "Affordable rooms near the Chakma King's Palace with easy access to motorboat hires heading to Shuvolong Waterfall.",
        location: "Rajbari Road, Rangamati",
        amenities: ["Lake Panorama", "Fan & AC Rooms", "Boat Guide Booking", "Local Dining"]
      }
    ],
    foods: [
      {
        id: "rmf-1",
        name: "Kaptai Lake Chapila & Keski Fish Fry",
        category: "Freshwater Lake Catch",
        imageUrl: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=800&q=80",
        description: "Crispy fried sweetwater small fish caught fresh from Kaptai Lake with green chilies, onions, and steaming hill rice.",
        bestWhere: "Peda Ting Ting & Tuk Tuk Eco Village, Kaptai Lake",
        priceEstimate: "৳220 – ৳320 ($1.80 – $2.60)"
      },
      {
        id: "rmf-2",
        name: "Chakma Traditional Hebang (Fish/Chicken Steamed in Banana Leaf)",
        category: "Indigenous Chakma Cuisine",
        imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
        description: "Marinated hill chicken or lake fish wrapped tightly in aromatic wild banana leaves and slowly roasted over charcoal fire.",
        bestWhere: "Peda Ting Ting Lake Restaurant",
        priceEstimate: "৳300 – ৳450 ($2.45 – $3.70)"
      }
    ],
    history: {
      period: "1418 – Present (Chakma Raj Dynasty)",
      summary: "Rangamati is the ancestral seat of the Chakma Royal Dynasty (Chakma Circle). The district transformed in 1962 with the creation of the 68,000-hectare Kaptai Lake hydro-electric project.",
      culturalSignificance: "The cultural center of the Chakma, Marma, and Tanchangya peoples, famous for the Royal Palace, indigenous textile handlooms, and Rajbana Vihara.",
      historicalSites: [
        {
          name: "Chakma Royal Palace (Rajbari)",
          era: "1960s (Relocated after Submersion)",
          description: "Official residence of Chakma Circle Chief King Debashish Roy with royal regalia and historical archives."
        },
        {
          name: "Rajbana Vihara (Buddhist Meditation Complex)",
          era: "1974 (Ven. Sadhanananda Mahathera 'Bana Bhante')",
          description: "One of the most revered Theravada Buddhist meditation monasteries in South Asia."
        }
      ]
    }
  },

  // 8. KUAKATA (SAGAR KANYA)
  kuakata: {
    hotels: [
      {
        id: "kk-lux-1",
        name: "Sikder Resort & Villas (Premier Luxury)",
        type: "5-Star Villa Resort",
        stayCategory: "luxury_resort",
        rating: 4.8,
        starCategory: 5,
        pricePerNight: 12500,
        imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
        description: "Luxury private pool villas and multi-cuisine restaurants set among green lawns, providing chauffeur transfers to sunrise viewpoints.",
        location: "Kuakata Beach Road, Patuakhali",
        amenities: ["Swimming Pool", "Private Luxury Villas", "Helipad Access", "Ocean Shuttles"]
      },
      {
        id: "kk-mid-1",
        name: "Hotel Graver Inn International (Beachfront)",
        type: "Mid-Tier Beach Hotel",
        stayCategory: "mid_motel",
        rating: 4.4,
        starCategory: 3,
        pricePerNight: 3800,
        imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
        description: "Comfortable hotel located 3 minutes walk from the main sunrise beach with rooftop observation deck.",
        location: "Main Beach Road, Kuakata",
        amenities: ["AC Deluxe Rooms", "Rooftop Ocean View", "Free Breakfast", "Generator"]
      },
      {
        id: "kk-bud-1",
        name: "Sagar Kanya Guest House (Budget Option)",
        type: "Budget Inn",
        stayCategory: "budget_guesthouse",
        rating: 4.0,
        starCategory: 2,
        pricePerNight: 900,
        imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
        description: "Clean economical rooms near Rakhine Market, perfect for travelers catching the 5:00 AM beach sunrise.",
        location: "Rakhine Market Trail, Kuakata",
        amenities: ["Fan & AC Rooms", "Motorbike Sunrise Guide", "Attached Bath", "Free Wi-Fi"]
      }
    ],
    foods: [
      {
        id: "kkf-1",
        name: "Fresh Kuakata Bay Hilsha (Ilish Bhaji) & Khichuri",
        category: "Coastal Royal Feast",
        imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
        description: "Freshly landed silvery Padma/Bay Hilsha fish fried crisp with roe, served with yellow buttery roasted moong dal khichuri and fried green chilies.",
        bestWhere: "Kuakata Chowrasta Beach Diners & Hilsha Park",
        priceEstimate: "৳350 – ৳550 ($2.85 – $4.50)"
      },
      {
        id: "kkf-2",
        name: "Gangamati Red Crab Masala & Sweet Coconut Pitha",
        category: "Local Beach Specialty",
        imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
        description: "Succulent sea-crabs tossed in garlic, ginger, and roasted garam masala, accompanied by traditional Rakhine rice flour coconut cakes.",
        bestWhere: "Lal Kakra Beach Shacks & Rakhine Women Market",
        priceEstimate: "৳250 – ৳400 ($2.05 – $3.30)"
      }
    ],
    history: {
      period: "1784 – Present (Rakhine Settlement Era)",
      summary: "Kuakata ('Well Digging') was settled in 1784 by Rakhine refugees expelled from Arakan by the Burmese King Bodawpaya. The settlers dug wooden wells ('Kua') into the sand for freshwater.",
      culturalSignificance: "Celebrated for the holy Hindu Ganga Snan festival, Rash Mela, Maghi Purnima at the ancient 200-year-old Buddhist temple, and the historic Rakhine boat excavated on the beach.",
      historicalSites: [
        {
          name: "Ancient Rakhine 200-Year Buddhist Temple & Well",
          era: "1784 (First Settlement Well)",
          description: "Original historical well dug by the first Rakhine settlers and a temple housing the largest bronze Buddha statue in the region."
        },
        {
          name: "Excavated Ancient Rakhine Wooden Sailing Ship",
          era: "18th Century Maritime Vessel",
          description: "Preserved 72-foot ancient wooden ocean sailboat discovered buried under the Kuakata sand dunes."
        }
      ]
    }
  },

  // 9. MEGHALAYA (SHILLONG, CHERRAPUNJI & DAWKI) - CROSS BORDER
  meghalaya: {
    hotels: [
      {
        id: "mg-lux-1",
        name: "Ri Kynjai - Serenity by the Lake (5-Star Luxury)",
        type: "Premier Stilt Lake Resort",
        stayCategory: "luxury_resort",
        rating: 4.9,
        starCategory: 5,
        pricePerNight: 18500,
        imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
        description: "Luxury cottages on stilts overlooking Umiam Lake with traditional Khasi herbal spa baths and fine dining.",
        location: "Umiam Lake, Shillong, Meghalaya",
        amenities: ["Umiam Lake Balconies", "Khasi Herbal Spa", "Sao Aiom Restaurant", "Boat Ride on Lake"]
      },
      {
        id: "mg-mid-1",
        name: "Polo Orchid Resort (Cherrapunji Canyon View)",
        type: "Canyon View Resort",
        stayCategory: "mid_motel",
        rating: 4.7,
        starCategory: 4,
        pricePerNight: 7800,
        imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        description: "Overlooking the breathtaking Nohsngithiang (Seven Sisters) Falls gorge in Sohra with open cliff balconies.",
        location: "Sohra, Cherrapunji, Meghalaya",
        amenities: ["Seven Sisters Falls View", "Infinity Pool", "Rainforest Trek Liaison", "Heated Rooms"]
      },
      {
        id: "mg-bud-1",
        name: "Sohra Backpacker Village Homestay (Budget Option)",
        type: "Village Guesthouse",
        stayCategory: "budget_guesthouse",
        rating: 4.4,
        starCategory: 2,
        pricePerNight: 1600,
        imageUrl: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80",
        description: "Authentic Khasi family homestay offering clean rooms, hot water, and home-cooked meals near the Double Decker Root Bridge trailhead.",
        location: "Nongriat / Tyrna Village, Sohra",
        amenities: ["Trek Starting Point", "Hot Water Bucket", "Khasi Homestyle Food", "Local Guide"]
      }
    ],
    foods: [
      {
        id: "mgf-1",
        name: "Authentic Khasi Jadoh & Dohneiiong (Pork/Chicken in Black Sesame)",
        category: "Khasi Indigenous Feast",
        imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
        description: "Short-grain hill rice cooked in savory meat broth and turmeric, served with tender meat prepared in a thick, nutty roasted black sesame paste.",
        bestWhere: "Trattoria & Police Bazar Khasi Eateries, Shillong",
        priceEstimate: "₹250 – ₹380 (~৳360 – ৳550)"
      },
      {
        id: "mgf-2",
        name: "Tungrymbai & Bamboo Shoot Stir Fry with Steamed Rice",
        category: "Fermented Hill Delicacy",
        imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
        description: "Fermented soybean paste cooked with ginger, garlic, black sesame, and mountain herbs, delivering a pungent savory punch loved across Meghalaya.",
        bestWhere: "Sohra Market & Iewduh (Bara Bazar) Shillong",
        priceEstimate: "₹180 – ₹280 (~৳260 – ৳400)"
      }
    ],
    history: {
      period: "12th Century – Present (Khasi & Jaintia Kingdoms)",
      summary: "Meghalaya ('Abode of Clouds') is a matrilineal tribal society where lineage and property pass through the youngest daughter (Khadduh). Shillong served as the capital of British Assam from 1874 to 1972.",
      culturalSignificance: "Home to the world's highest rainfall record in Mawsynram/Cherrapunji, 150-year-old living root bridges bio-engineered by the Khasi people, and sacred grove forests.",
      historicalSites: [
        {
          name: "Nongriat Double Decker Living Root Bridge",
          era: "150+ Years (Bio-Engineered Ficus Elastica)",
          description: "Two-tiered natural bridge woven from the living aerial roots of Indian rubber trees spanning the Umshiang River."
        },
        {
          name: "All Saints Cathedral & Colonial Pine Mansions",
          era: "1877 (British Colonial Hill Station)",
          description: "Historic wood-and-stone Anglican cathedral and colonial bungalows that earned Shillong the title 'Scotland of the East'."
        }
      ]
    }
  },

  // 10. DARJEELING (WEST BENGAL / NORTH BENGAL BORDER)
  darjeeling: {
    hotels: [
      {
        id: "dj-lux-1",
        name: "Windamere Historic Heritage Hotel (5-Star Heritage)",
        type: "Colonial Manor",
        stayCategory: "luxury_resort",
        rating: 4.9,
        starCategory: 5,
        pricePerNight: 14500,
        imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        description: "Legendary 19th-century colonial heritage hotel on Observatory Hill featuring roaring wood fireplaces, afternoon English high tea, and Kanchenjunga panoramas.",
        location: "Observatory Hill, Darjeeling",
        amenities: ["Afternoon High Tea", "Fireplace in Suites", "Kanchenjunga Vista", "Heritage Dining Hall"]
      },
      {
        id: "dj-mid-1",
        name: "The Elgin Darjeeling (Heritage Luxury Resort)",
        type: "Royal Heritage Hotel",
        stayCategory: "mid_motel",
        rating: 4.8,
        starCategory: 4,
        pricePerNight: 8200,
        imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
        description: "Summer residence of the Maharaja of Cooch Behar built in 1887, adorned with Burmese teakwood, period furniture, and mountain views.",
        location: "H.D. Lama Road, Darjeeling",
        amenities: ["Oak Panelled Lounge", "Fireplaces", "Tea Tasting Sessions", "Kanchenjunga Facing Garden"]
      },
      {
        id: "dj-bud-1",
        name: "Chowrasta Mall Backpacker Inn (Budget Option)",
        type: "Cozy Hill Station Inn",
        stayCategory: "budget_guesthouse",
        rating: 4.3,
        starCategory: 2,
        pricePerNight: 1800,
        imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
        description: "Affordable and cozy budget inn 2 minutes from Chowrasta Mall, ideal for backpackers waking at 4:00 AM for the Tiger Hill sunrise.",
        location: "Gandhi Road, Mall, Darjeeling",
        amenities: ["Hot Water Geyser", "Mall Proximity", "Early Morning Taxi Help", "Free Wi-Fi"]
      }
    ],
    foods: [
      {
        id: "djf-1",
        name: "Darjeeling Steamed Pork/Chicken Momos with Spicy Dalle Chutney",
        category: "Himalayan Classic",
        imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
        description: "Thin-skinned juicy steamed dumplings stuffed with minced meat, mountain onions, and herbs, dipped into scorching Dalle Khursani chili sauce.",
        bestWhere: "Kunga Restaurant & Dekevas, Gandhi Road",
        priceEstimate: "₹180 – ₹260 (~৳260 – ৳380)"
      },
      {
        id: "djf-2",
        name: "Tibetan Thukpa Noodle Soup & First Flush Darjeeling Tea",
        category: "Warm Mountain Comfort",
        imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
        description: "A steaming hot bowl of egg noodles in rich spiced broth with vegetables and meat, accompanied by a pot of Muscatel-grade First Flush tea.",
        bestWhere: "Glenary's Bakery & Nathmulls Tea Lounge, Chowrasta",
        priceEstimate: "₹220 – ₹350 (~৳320 – ৳500)"
      }
    ],
    history: {
      period: "1835 – Present (British Hill Sanatorium & Tea Realm)",
      summary: "Acquired by the British from the Raja of Sikkim in 1835 as a sanatorium. Dr. Campbell introduced Chinese Camellia sinensis tea plants in 1841, laying the foundation for world-famous 'Champagne of Teas'.",
      culturalSignificance: "Home to the UNESCO World Heritage Darjeeling Himalayan Railway (1881), Himalayan Mountaineering Institute (co-founded by Tenzing Norgay), and Tibetan Buddhist monasteries.",
      historicalSites: [
        {
          name: "UNESCO Darjeeling Himalayan Railway (Toy Train)",
          era: "1881 (Narrow Gauge Steam Engineering)",
          description: "Historic steam-powered mountain railway looping through Batasia Loop under Mount Kanchenjunga."
        },
        {
          name: "Happy Valley Tea Estate & Factory",
          era: "1854 (One of the Oldest Organic Tea Gardens)",
          description: "Century-old tea estate producing pure orthodox black tea with live mechanical roller demonstrations."
        }
      ]
    }
  },

  // 11. SIKKIM (GANGTOK & TSOMGO LAKE)
  sikkim: {
    hotels: [
      {
        id: "sk-lux-1",
        name: "Mayfair Spa Resort & Casino Gangtok (5-Star Luxury)",
        type: "5-Star Himalayan Spa Resort",
        stayCategory: "luxury_resort",
        rating: 4.9,
        starCategory: 5,
        pricePerNight: 21000,
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        description: "Monastic Sikkim-style architecture set across 48 acres of forested mountains with casino, heated pools, and luxury spa.",
        location: "Ranipool, Gangtok, Sikkim",
        amenities: ["Heated Swimming Pool", "Full Casino", "Pevonia Spa", "Himalayan View Villas"]
      },
      {
        id: "sk-mid-1",
        name: "Denzong Regency (Luxury Mountain Retreat)",
        type: "Hilltop Heritage Hotel",
        stayCategory: "mid_motel",
        rating: 4.7,
        starCategory: 4,
        pricePerNight: 7200,
        imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
        description: "Traditional Sikkimese luxury retreat perched above Gangtok town with direct views of snow-capped Kanchenjunga peaks.",
        location: "Cherry City, Gangtok",
        amenities: ["Kanchenjunga Balconies", "Sikkimese Restaurant", "Heated Rooms", "Free Wi-Fi"]
      },
      {
        id: "sk-bud-1",
        name: "MG Marg Backpacker Inn (Budget Option)",
        type: "Pedestrian Mall Guesthouse",
        stayCategory: "budget_guesthouse",
        rating: 4.3,
        starCategory: 2,
        pricePerNight: 1900,
        imageUrl: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=800&q=80",
        description: "Clean budget lodging steps from the vehicle-free MG Marg mall, close to taxi stands for Nathula Pass & Tsomgo Lake.",
        location: "MG Marg, Gangtok",
        amenities: ["MG Marg Location", "Hot Water Geyser", "Nathula Permit Help", "Free Wi-Fi"]
      }
    ],
    foods: [
      {
        id: "skf-1",
        name: "Sikkimese Traditional Sel Roti with Aloo Dum & Gundruk",
        category: "Himalayan Festival Dish",
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        description: "Crispy sweet ring-shaped fried rice bread served with spicy potato curry and fermented mustard greens (Gundruk soup).",
        bestWhere: "Nimtho Restaurant & The Square, MG Marg, Gangtok",
        priceEstimate: "₹220 – ₹320 (~৳320 – ৳460)"
      },
      {
        id: "skf-2",
        name: "Phagshapa (Pork with Radish & Dried Chilies) & Chhurpi Soup",
        category: "Traditional Sikkimese Specialty",
        imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        description: "Tender pork stew cooked with dried mountain red chilies and radish without excessive oil, accompanied by hard-cheese soup.",
        bestWhere: "Taste of Sikkim & MG Marg Traditional Kitchens",
        priceEstimate: "₹280 – ₹420 (~৳400 – ৳600)"
      }
    ],
    history: {
      period: "1642 – 1975 (Chogyal Namgyal Kingdom)",
      summary: "Sikkim was an independent Buddhist kingdom ruled by the Namgyal Chogyals for over 300 years until joining the Indian Union in 1975 as the 22nd state.",
      culturalSignificance: "Considered a sacred 'Beyul' (hidden paradise) blessed by Guru Padmasambhava. Home to Rumtek Imperial Monastery, Tsomgo Glacial Lake, and Nathula Pass on the historic Silk Route.",
      historicalSites: [
        {
          name: "Rumtek Imperial Monastery (Dharma Chakra Centre)",
          era: "1966 (Seat of the Karmapa in Exile)",
          description: "Magnificent Tibetan Buddhist monastic complex housing golden stupas, precious silk thangkas, and sacred scriptures."
        },
        {
          name: "Nathula Pass & Old Silk Route Post",
          era: "Ancient Indo-Tibet Caravan Route",
          description: "Historic 14,140-ft high Himalayan border pass between India and China with dramatic mountain scenery."
        }
      ]
    }
  },

  // 12. ASSAM (KAZIRANGA & GUWAHATI)
  assam: {
    hotels: [
      {
        id: "as-lux-1",
        name: "IORA - The Retreat (Kaziranga Luxury Resort)",
        type: "Wilderness Resort",
        stayCategory: "luxury_resort",
        rating: 4.8,
        starCategory: 5,
        pricePerNight: 12500,
        imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
        description: "Luxury eco-resort set in 20 acres of tea gardens on the edge of Kaziranga National Park with dedicated open-top jeep safaris.",
        location: "Kohora, Kaziranga, Assam",
        amenities: ["Tea Garden Lawn", "Pool", "Open Jeep Rhino Safari", "Bhatbaan Assamese Diner"]
      },
      {
        id: "as-mid-1",
        name: "Radisson Blu Hotel Guwahati",
        type: "5-Star Business Hotel",
        stayCategory: "mid_motel",
        rating: 4.7,
        starCategory: 5,
        pricePerNight: 7500,
        imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
        description: "Premier city hotel on NH-37 in Guwahati with infinity pool and multi-cuisine dining, close to Kamakhya Temple.",
        location: "Gotanagar, Guwahati, Assam",
        amenities: ["Outdoor Pool", "Spa & Wellness", "Kamakhya Shuttle", "Free Breakfast"]
      },
      {
        id: "as-bud-1",
        name: "Kaziranga Wild Grass Safari Lodge (Budget Option)",
        type: "Jungle Eco Lodge",
        stayCategory: "budget_guesthouse",
        rating: 4.3,
        starCategory: 2,
        pricePerNight: 1800,
        imageUrl: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80",
        description: "Pioneer rustic jungle lodge in Kaziranga offering peaceful garden cottages and early morning elephant & jeep safari bookings.",
        location: "Kohora Range, Kaziranga",
        amenities: ["Safari Booking Desk", "Garden Cottages", "Local Assamese Food", "Bonfire"]
      }
    ],
    foods: [
      {
        id: "asf-1",
        name: "Assamese Masor Tenga (Tangy Freshwater Fish Curry) & Joha Rice",
        category: "Signature Assamese Classic",
        imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
        description: "Delicate freshwater fish simmered in a light, sour broth infused with sun-dried elephant apple (Ou Tenga) and tomatoes, served with aromatic Joha rice.",
        bestWhere: "Paradise Restaurant & Khorikaa, Guwahati",
        priceEstimate: "₹240 – ₹360 (~৳350 – ৳520)"
      },
      {
        id: "asf-2",
        name: "Assamese Khaar & Duck Curry with Ash Gourd (Kumura)",
        category: "Traditional Heritage Curry",
        imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
        description: "Tender duck cooked with soft ash gourd and indigenous alkaline khaar water made from sun-dried banana peels.",
        bestWhere: "Khorikaa & Maihang, Guwahati",
        priceEstimate: "₹300 – ₹450 (~৳430 – ৳650)"
      }
    ],
    history: {
      period: "1228 – 1826 (Ahom Dynasty)",
      summary: "Assam was ruled for 600 unbroken years by the valiant Ahom Dynasty who famously defeated the Mughal Empire 17 times, including the historic 1671 Battle of Saraighat on the Brahmaputra River under General Lachit Borphukan.",
      culturalSignificance: "Home to the UNESCO World Heritage Kaziranga National Park (holding two-thirds of the world's great one-horned rhinos), the ancient Kamakhya Temple, and world-renowned golden Muga silk.",
      historicalSites: [
        {
          name: "Kamakhya Ancient Hilltop Shakti Temple",
          era: "8th – 17th Century",
          description: "One of the oldest and most sacred 51 Shakti Peethas in the subcontinent, perched on Nilachal Hill in Guwahati."
        },
        {
          name: "Kaziranga National Park Rhino Sanctuary",
          era: "1905 (Lord Curzon Wildlife Declaration)",
          description: "Global sanctuary for the endangered Indian one-horned rhinoceros, wild water buffalos, and swamp deer."
        }
      ]
    }
  },

  // 13. BHUTAN (PARO & THIMPHU)
  bhutan: {
    hotels: [
      {
        id: "bt-lux-1",
        name: "Zhiwa Ling Heritage Hotel (5-Star Luxury Dzong Architecture)",
        type: "5-Star Bhutanese Sanctuary",
        stayCategory: "luxury_resort",
        rating: 4.9,
        starCategory: 5,
        pricePerNight: 28000,
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        description: "Entirely handcrafted by Bhutanese master artisans, set in 12 acres of tranquil pine valley with Buddhist temple inside the hotel.",
        location: "Satsam Chorten, Paro, Bhutan",
        amenities: ["Paro Taktsang Views", "Indoor Meditation Temple", "Menlha Spa", "Traditional Archery Lawn"]
      },
      {
        id: "bt-mid-1",
        name: "Terma Linca Resort & Spa (Riverside Mountain Hotel)",
        type: "Riverside Resort",
        stayCategory: "mid_motel",
        rating: 4.8,
        starCategory: 4,
        pricePerNight: 14500,
        imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        description: "Situated right along the roaring Wangchhu River, blending traditional wood architecture with luxury spa and river dining.",
        location: "Babesa, Thimphu, Bhutan",
        amenities: ["Riverside Dining", "Hot Stone Bath", "River View Rooms", "Traditional Archery"]
      },
      {
        id: "bt-bud-1",
        name: "Paro Traditional Valley Farmstay (Budget Option)",
        type: "Authentic Bhutanese Farmstay",
        stayCategory: "budget_guesthouse",
        rating: 4.5,
        starCategory: 2,
        pricePerNight: 3500,
        imageUrl: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
        description: "Experience authentic Bhutanese hospitality inside a traditional mud-and-timber farmhouse with wood-fired hot stone bath and home-cooked Ema Datshi.",
        location: "Paro Valley Rural Trail, Bhutan",
        amenities: ["Traditional Hot Stone Bath", "Farm-to-Table Food", "Local Butter Tea", "Taktsang Hike Guide"]
      }
    ],
    foods: [
      {
        id: "btf-1",
        name: "Authentic Bhutanese Ema Datshi (Spicy Green Chilies in Yak Cheese) & Red Rice",
        category: "National Dish of Bhutan",
        imageUrl: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=800&q=80",
        description: "Hot green mountain chilies slow-cooked in rich homemade yak and cow cheese stew, served with nutty steamed Bhutanese red rice.",
        bestWhere: "Folk Heritage Museum Restaurant & Paro Traditional Kitchens",
        priceEstimate: "Nu. 280 – Nu. 450 (~৳400 – ৳650)"
      },
      {
        id: "btf-2",
        name: "Kewa Datshi (Potato Cheese Stew) & Momos with Ezay Chutney",
        category: "Himalayan Warm Comfort",
        imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
        description: "Thinly sliced Himalayan potatoes cooked with mild chili and melted cheese, alongside beef momos with fiery Ezay chili relish.",
        bestWhere: "Babesa Village Restaurant, Thimphu",
        priceEstimate: "Nu. 240 – Nu. 380 (~৳350 – ৳550)"
      }
    ],
    history: {
      period: "17th Century – Present (Zhabdrung Ngawang Namgyal)",
      summary: "Bhutan was unified in the early 17th century by the Tibetan lama and statesman Zhabdrung Ngawang Namgyal who built the network of impregnable monastic fortresses (Dzongs) that govern the nation to this day.",
      culturalSignificance: "The world's only carbon-negative nation and the pioneer of Gross National Happiness (GNH). Famous for the cliff-hanging Paro Taktsang (Tiger's Nest) monastery where Guru Rinpoche meditated in the 8th century.",
      historicalSites: [
        {
          name: "Paro Taktsang (Tiger's Nest Monastery)",
          era: "1692 (Constructed around 8th Century Sacred Cave)",
          description: "World-famous monastery perched 3,000 feet above the Paro valley on a sheer vertical granite cliff."
        },
        {
          name: "Punakha Dzong (Palace of Great Happiness)",
          era: "1637 (Zhabdrung Ngawang Namgyal)",
          description: "The most majestic fortress in Bhutan, built at the confluence of the Pho Chhu and Mo Chhu rivers."
        }
      ]
    }
  }
};

export function getCityDetails(city: City): CityFullDetails {
  const key = city.id?.toLowerCase();
  if (key && CITY_DETAILS_DATABASE[key]) {
    return CITY_DETAILS_DATABASE[key];
  }
  return {
    hotels: [],
    foods: [],
    history: {
      period: "Present",
      summary: city.description || `Explore ${city.name}.`,
      culturalSignificance: city.tagline || "",
      historicalSites: [],
    },
  };
}
