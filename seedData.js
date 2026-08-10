import mongoose from "mongoose";
import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";
import Hotel from "./models/Hotel.js";
import Transportation from "./models/Transportation.js";
import FoodMenu from "./models/FoodMenu.js";

dotenv.config({ path: ".env.local" });

const seedData = async () => {
  let mongod;
  try {
    // Start in-memory MongoDB server
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    await mongoose.connect(uri);
    console.log("MongoDB connected for seeding (in-memory)");

    // Clear existing data
    await Hotel.deleteMany({});
    await Transportation.deleteMany({});
    await FoodMenu.deleteMany({});
    console.log("Existing data cleared");

    // Seed Hotels
    const hotels = [
      {
        name: "Grand Plaza Hotel",
        destination: "New York",
        priceRange: "luxury",
        pricePerNight: 350,
        rating: 4.8,
        amenities: ["Free WiFi", "Pool", "Spa", "Fitness Center", "Restaurant"],
        address: "123 Luxury Ave, New York, NY 10001",
        description: "A luxurious 5-star hotel in the heart of Manhattan with stunning city views.",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
        availableRooms: 15
      },
      {
        name: "City Central Inn",
        destination: "New York",
        priceRange: "standard",
        pricePerNight: 180,
        rating: 4.2,
        amenities: ["Free WiFi", "Breakfast Included", "Fitness Center"],
        address: "456 Central St, New York, NY 10002",
        description: "Comfortable 3-star hotel located near major attractions and public transport.",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1100&auto=format&fit=crop",
        availableRooms: 25
      },
      {
        name: "Budget Stay Hostel",
        destination: "New York",
        priceRange: "budget",
        pricePerNight: 45,
        rating: 3.8,
        amenities: ["Free WiFi", "Shared Kitchen", "Lounge Area"],
        address: "789 Budget Blvd, New York, NY 10003",
        description: "Affordable hostel accommodation perfect for backpackers and budget travelers.",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
        availableRooms: 50
      },
      {
        name: "Paris Luxury Suites",
        destination: "Paris",
        priceRange: "luxury",
        pricePerNight: 420,
        rating: 4.9,
        amenities: ["Free WiFi", "Pool", "Spa", "Michelin Restaurant", "Concierge"],
        address: "12 Champs-Élysées, Paris 75008",
        description: "Exquisite 5-star hotel with Eiffel Tower views and world-class service.",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
        availableRooms: 12
      },
      {
        name: "Parisian Boutique Hotel",
        destination: "Paris",
        priceRange: "standard",
        pricePerNight: 220,
        rating: 4.4,
        amenities: ["Free WiFi", "Breakfast", "Rooftop Terrace"],
        address: "45 Rue de Paris, Paris 75001",
        description: "Charming 4-star hotel in the historic district with authentic French hospitality.",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1100&auto=format&fit=crop",
        availableRooms: 18
      },
      {
        name: "Paris Budget Lodge",
        destination: "Paris",
        priceRange: "budget",
        pricePerNight: 65,
        rating: 3.9,
        amenities: ["Free WiFi", "Shared Bathrooms"],
        address: "78 Avenue Budget, Paris 75020",
        description: "Clean and simple budget accommodation near metro stations.",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
        availableRooms: 30
      },
      {
        name: "Tokyo Grand Palace",
        destination: "Tokyo",
        priceRange: "luxury",
        pricePerNight: 380,
        rating: 4.7,
        amenities: ["Free WiFi", "Pool", "Spa", "Multiple Restaurants", "Garden"],
        address: "1-1 Luxury District, Tokyo 100-0001",
        description: "Premium 5-star hotel combining traditional Japanese aesthetics with modern luxury.",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
        availableRooms: 10
      },
      {
        name: "Tokyo City Hotel",
        destination: "Tokyo",
        priceRange: "standard",
        pricePerNight: 190,
        rating: 4.3,
        amenities: ["Free WiFi", "Breakfast", "Fitness Center"],
        address: "2-2 City Center, Tokyo 100-0002",
        description: "Modern 4-star hotel with excellent transport connections and city views.",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1100&auto=format&fit=crop",
        availableRooms: 22
      },
      {
        name: "Tokyo Budget Inn",
        destination: "Tokyo",
        priceRange: "budget",
        pricePerNight: 55,
        rating: 4.0,
        amenities: ["Free WiFi", "Shared Kitchen"],
        address: "3-3 Budget Area, Tokyo 100-0003",
        description: "Clean and friendly budget hotel popular with international travelers.",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
        availableRooms: 35
      }
    ];

    // Seed Transportation
    const transportations = [
      // Flights
      {
        type: "flight",
        from: "New York (JFK)",
        to: "Paris (CDG)",
        price: 650,
        currency: "USD",
        departureTime: "09:00",
        arrivalTime: "21:00",
        duration: "7h 30m",
        provider: "Air France",
        class: "economy",
        seatsAvailable: 45,
        status: "available"
      },
      {
        type: "flight",
        from: "New York (JFK)",
        to: "Paris (CDG)",
        price: 1200,
        currency: "USD",
        departureTime: "14:30",
        arrivalTime: "02:30",
        duration: "7h 00m",
        provider: "Delta",
        class: "business",
        seatsAvailable: 12,
        status: "available"
      },
      {
        type: "flight",
        from: "New York (JFK)",
        to: "Tokyo (NRT)",
        price: 950,
        currency: "USD",
        departureTime: "11:00",
        arrivalTime: "15:00",
        duration: "13h 00m",
        provider: "Japan Airlines",
        class: "economy",
        seatsAvailable: 38,
        status: "available"
      },
      {
        type: "flight",
        from: "New York (JFK)",
        to: "Tokyo (NRT)",
        price: 1800,
        currency: "USD",
        departureTime: "16:45",
        arrivalTime: "20:45",
        duration: "12h 30m",
        provider: "ANA",
        class: "business",
        seatsAvailable: 8,
        status: "available"
      },
      // Trains
      {
        type: "train",
        from: "Paris Gare du Nord",
        to: "London St Pancras",
        price: 85,
        currency: "EUR",
        departureTime: "08:00",
        arrivalTime: "10:30",
        duration: "2h 30m",
        provider: "Eurostar",
        class: "economy",
        seatsAvailable: 60,
        status: "available"
      },
      {
        type: "train",
        from: "Paris Gare du Nord",
        to: "London St Pancras",
        price: 180,
        currency: "EUR",
        departureTime: "13:00",
        arrivalTime: "15:30",
        duration: "2h 30m",
        provider: "Eurostar",
        class: "business",
        seatsAvailable: 20,
        status: "available"
      },
      {
        type: "train",
        from: "Tokyo Station",
        to: "Kyoto Station",
        price: 120,
        currency: "USD",
        departureTime: "07:00",
        arrivalTime: "12:00",
        duration: "2h 15m",
        provider: "JR East",
        class: "economy",
        seatsAvailable: 80,
        status: "available"
      },
      {
        type: "train",
        from: "Tokyo Station",
        to: "Kyoto Station",
        price: 220,
        currency: "USD",
        departureTime: "09:30",
        arrivalTime: "14:30",
        duration: "2h 15m",
        provider: "JR East",
        class: "business",
        seatsAvailable: 15,
        status: "available"
      },
      // Buses
      {
        type: "bus",
        from: "New York Port Authority",
        to: "Washington DC",
        price: 35,
        currency: "USD",
        departureTime: "07:00",
        arrivalTime: "12:00",
        duration: "5h 00m",
        provider: "Greyhound",
        class: "economy",
        seatsAvailable: 25,
        status: "available"
      },
      {
        type: "bus",
        from: "New York Port Authority",
        to: "Washington DC",
        price: 65,
        currency: "USD",
        departureTime: "10:00",
        arrivalTime: "15:00",
        duration: "5h 00m",
        provider: "Megabus",
        class: "business",
        seatsAvailable: 15,
        status: "available"
      },
      {
        type: "bus",
        from: "Paris Gare de Lyon",
        to: "Lyon Perrache",
        price: 25,
        currency: "EUR",
        departureTime: "08:00",
        arrivalTime: "11:30",
        duration: "3h 30m",
        provider: "FlixBus",
        class: "economy",
        seatsAvailable: 30,
        status: "available"
      }
    ];

    // Seed Food Menu
    const foodMenu = [
      // New York Food
      {
        name: "Classic New York Cheesecake",
        category: "dessert",
        cuisine: "American",
        price: 12,
        currency: "USD",
        description: "Rich and creamy cheesecake with graham cracker crust",
        isVegetarian: true,
        isVegan: false,
        isSpicy: false,
        calories: 450,
        hotelName: "Grand Plaza Hotel",
        destination: "New York",
        imageUrl: "https://images.unsplash.com/photo-1490477850029-0c6b6d781c10?q=80&w=1100&auto=format&fit=crop",
        availability: "always"
      },
      {
        name: "Bagel with Lox and Cream Cheese",
        category: "main course",
        cuisine: "Jewish",
        price: 18,
        currency: "USD",
        description: "Traditional NYC bagel topped with smoked salmon and cream cheese",
        isVegetarian: false,
        isVegan: false,
        isSpicy: false,
        calories: 420,
        hotelName: "City Central Inn",
        destination: "New York",
        imageUrl: "https://images.unsplash.com/photo-1555507036-695bec4636e3?q=80&w=1100&auto=format&fit=crop",
        availability: "breakfast"
      },
      {
        name: "Hot Dog from Street Cart",
        category: "main course",
        cuisine: "American",
        price: 8,
        currency: "USD",
        description: "Classic New York street hot dog with mustard and sauerkraut",
        isVegetarian: false,
        isVegan: false,
        isSpicy: false,
        calories: 350,
        hotelName: "Budget Stay Hostel",
        destination: "New York",
        imageUrl: "https://images.unsplash.com/photo-1562235595-380829935cd5?q=80&w=1000&auto=format&fit=crop",
        availability: "always"
      },
      {
        name: "Pizza Slice",
        category: "main course",
        cuisine: "Italian",
        price: 4,
        currency: "USD",
        description: "New York-style pizza slice with mozzarella and tomato sauce",
        isVegetarian: true,
        isVegan: false,
        isSpicy: false,
        calories: 280,
        hotelName: "Budget Stay Hostel",
        destination: "New York",
        imageUrl: "https://images.unsplash.com/photo-1574071318-527dcfb5b4ee?q=80&w=1000&auto=format&fit=crop",
        availability: "always"
      },
      // Paris Food
      {
        name: "Croissant au Beurre",
        category: "main course",
        cuisine: "French",
        price: 5,
        currency: "EUR",
        description: "Freshly baked butter croissant, flaky and delicious",
        isVegetarian: true,
        isVegan: false,
        isSpicy: false,
        calories: 230,
        hotelName: "Paris Luxury Suites",
        destination: "Paris",
        imageUrl: "https://images.unsplash.com/photo-1555507036-695bec4636e3?q=80&w=1000&auto=format&fit=crop",
        availability: "breakfast"
      },
      {
        name: "Coq au Vin",
        category: "main course",
        cuisine: "French",
        price: 28,
        currency: "EUR",
        description: "Traditional French chicken braised with wine, mushrooms, and bacon",
        isVegetarian: false,
        isVegan: false,
        isSpicy: false,
        calories: 520,
        hotelName: "Parisian Boutique Hotel",
        destination: "Paris",
        imageUrl: "https://images.unsplash.com/photo-1599488631040-c6e228f44965?q=80&w=1100&auto=format&fit=crop",
        availability: "dinner"
      },
      {
        name: "Crème Brûlée",
        category: "dessert",
        cuisine: "French",
        price: 14,
        currency: "EUR",
        description: "Classic vanilla custard topped with caramelized sugar",
        isVegetarian: true,
        isVegan: false,
        isSpicy: false,
        calories: 320,
        hotelName: "Paris Luxury Suites",
        destination: "Paris",
        imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9589?q=80&w=1000&auto=format&fit=crop",
        availability: "always"
      },
      {
        name: "Falafel Wrap",
        category: "main course",
        cuisine: "Middle Eastern",
        price: 9,
        currency: "EUR",
        description: "Crispy falafel balls in pita with tahini sauce and vegetables",
        isVegetarian: true,
        isVegan: true,
        isSpicy: false,
        calories: 380,
        hotelName: "Paris Budget Lodge",
        destination: "Paris",
        imageUrl: "https://images.unsplash.com/photo-1553621042-f6e14724655?q=80&w=1000&auto=format&fit=crop",
        availability: "lunch"
      },
      // Tokyo Food
      {
        name: "Sushi Platter",
        category: "main course",
        cuisine: "Japanese",
        price: 25,
        currency: "USD",
        description: "Assorted fresh sushi including tuna, salmon, and eel",
        isVegetarian: false,
        isVegan: false,
        isSpicy: false,
        calories: 450,
        hotelName: "Tokyo Grand Palace",
        destination: "Tokyo",
        imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d6b8?q=80&w=1100&auto=format&fit=crop",
        availability: "dinner"
      },
      {
        name: "Ramen Bowl",
        category: "main course",
        cuisine: "Japanese",
        price: 12,
        currency: "USD",
        description: "Rich pork broth ramen with noodles, egg, and vegetables",
        isVegetarian: false,
        isVegan: false,
        isSpicy: true,
        calories: 550,
        hotelName: "Tokyo City Hotel",
        destination: "Tokyo",
        imageUrl: "https://images.unsplash.com/photo-1585031376475-7b0c8d8adaf5?q=80&w=1000&auto=format&fit=crop",
        availability: "always"
      },
      {
        name: "Matcha Green Tea Ice Cream",
        category: "dessert",
        cuisine: "Japanese",
        price: 8,
        currency: "USD",
        description: "Premium matcha ice cream with authentic green tea flavor",
        isVegetarian: true,
        isVegan: false,
        isSpicy: false,
        calories: 220,
        hotelName: "Tokyo Grand Palace",
        destination: "Tokyo",
        imageUrl: "https://images.unsplash.com/photo-1558961363-f4f4af992126?q=80&w=1000&auto=format&fit=crop",
        availability: "always"
      },
      {
        name: "Onigiri (Rice Ball)",
        category: "snack",
        cuisine: "Japanese",
        price: 3,
        currency: "USD",
        description: "Traditional Japanese rice ball filled with salmon or pickled plum",
        isVegetarian: false,
        isVegan: false,
        isSpicy: false,
        calories: 180,
        hotelName: "Tokyo Budget Inn",
        destination: "Tokyo",
        imageUrl: "https://images.unsplash.com/photo-1586190848861-96aa4a178e43?q=80&w=1000&auto=format&fit=crop",
        availability: "always"
      }
    ];

    // Insert data
    const insertedHotels = await Hotel.insertMany(hotels);
    const insertedTransportations = await Transportation.insertMany(transportations);
    const insertedFoodMenu = await FoodMenu.insertMany(foodMenu);

    console.log(`Seeded ${insertedHotels.length} hotels`);
    console.log(`Seeded ${insertedTransportations.length} transportation options`);
    console.log(`Seeded ${insertedFoodMenu.length} food menu items`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  } finally {
    // Disconnect from MongoDB and stop the in-memory server
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    if (mongod) {
      await mongod.stop();
    }
  }
};

seedData();