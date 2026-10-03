import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const currentDirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : typeof import.meta !== "undefined" && import.meta.url
    ? path.dirname(fileURLToPath(import.meta.url))
    : process.cwd();

// Complete Demo Mock Backend Data Store
const DEMO_BOOKINGS = [
  {
    id: "booking-demo-1",
    userId: "guest-demo",
    type: "road",
    title: "4x4 Chander Gari Mountain Rover (Thanchi & Nilgiri)",
    price: 11500,
    details: "Full Day Guided Charter • Up to 8-10 Travelers • Rate: ৳11,500 ($94.25)",
    bookedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "booking-demo-2",
    userId: "guest-demo",
    type: "hotel",
    title: "Meghpunji Eco Resort (Boutique Cloud Cottage)",
    price: 5500,
    details: "Ruilui Para, Sajek Valley • Rate: ৳5,500 ($45.07)/night",
    bookedAt: new Date(Date.now() - 43200000).toISOString()
  },
  {
    id: "booking-demo-3",
    userId: "guest-demo",
    type: "budget",
    title: "Tour Budget: Bandarban (Nafakhum & Debotakhum) Expedition",
    price: 47700,
    details: "Thanchi & Remakri • 3 Days • 6 Travelers • Total: ৳47,700 ($390.92)",
    bookedAt: new Date().toISOString()
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      service: "Chandergari Travel Backend API",
      currencyRate: { usdToBdt: 122.02 }
    });
  });

  // Currency exchange rate endpoint
  app.get("/api/currency-rate", (req, res) => {
    res.json({
      base: "USD",
      target: "BDT",
      rate: 122.02,
      lastUpdated: new Date().toISOString()
    });
  });

  // Bookings API (Demo Mock Persistence)
  app.get("/api/bookings", (req, res) => {
    res.json({ success: true, count: DEMO_BOOKINGS.length, data: DEMO_BOOKINGS });
  });

  app.post("/api/bookings", (req, res) => {
    const newBooking = {
      id: "booking_" + Date.now(),
      userId: req.body.userId || "anonymous",
      type: req.body.type || "custom",
      title: req.body.title || "Custom Reservation",
      price: Number(req.body.price) || 0,
      details: req.body.details || "",
      bookedAt: new Date().toISOString()
    };
    DEMO_BOOKINGS.unshift(newBooking);
    res.status(201).json({ success: true, booking: newBooking });
  });

  // Vite development vs production handling
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Chandergari server running on http://localhost:${PORT}`);
  });
}

startServer();
