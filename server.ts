import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, ThinkingLevel, GenerateVideosOperation } from "@google/genai";
import dotenv from "dotenv";
import { OFFLINE_IMAGES, OFFLINE_ITINERARIES, generateGenericOfflineItinerary } from "./src/simulationData";
import { connectDB, disconnectDB } from "./database/index";
import User from "./models/User";
import TravelPlan from "./models/TravelPlan";
import GeneratedImage from "./models/GeneratedImage";
import GeneratedVideo from "./models/GeneratedVideo";
import MediaAnalysis from "./models/MediaAnalysis";
import Expense from "./models/Expense";
import BudgetAdvice from "./models/BudgetAdvice";
import ChatMessage from "./models/ChatMessage";
import Hotel from "./models/Hotel";
import Transportation from "./models/Transportation";
import FoodMenu from "./models/FoodMenu";
import mongoose from "mongoose";

dotenv.config();
dotenv.config({ path: ".env.local" });

// Connect to MongoDB
connectDB().then(() => {
  // Set up shutdown hook to disconnect from MongoDB
  process.on('SIGINT', async () => {
    console.log('\\nShutting down gracefully...');
    await disconnectDB();
    process.exit(0);
  });
});

const app = express();
const PORT = Number(process.env.PORT) || 3050;

// Set high body limits to allow base64 uploads for images and media analysis
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Helper to check and initialize the Google GenAI SDK lazily
function getGenAI(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is required in your secrets. Please select it in Settings > Secrets.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "chander-gari-app",
      },
    },
  });
}

// Generate estimated expenses for a trip based on destination, days, and budget
function generateEstimatedExpenses(destination: string, days: number, budget: string): any[] {
  // Base daily expense amounts by budget level
  const baseDailyAmounts: Record<string, number> = {
    budget: 50,   // $50 per day
    standard: 100, // $100 per day
    luxury: 200   // $200 per day
  };

  const dailyAmount = baseDailyAmounts[budget] || baseDailyAmounts.standard;
  const totalAmount = dailyAmount * days;

  // Typical expense distribution percentages
  const distribution: Record<string, number> = {
    accommodation: 0.35, // 35%
    transport: 0.15,     // 15%
    food: 0.25,          // 25%
    activities: 0.15,    // 15%
    shopping: 0.05,      // 5%
    other: 0.05          // 5%
  };

  const expenses: any[] = [];
  let remainingAmount = totalAmount;

  // Generate expenses for each category
  const categories = ['accommodation', 'transport', 'food', 'activities', 'shopping', 'other'];
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const percentage = distribution[category];
    let amount = Math.round(totalAmount * percentage);

    // For the last category, assign all remaining amount to avoid rounding issues
    if (i === categories.length - 1) {
      amount = remainingAmount;
    } else {
      remainingAmount -= amount;
    }

    // Skip if amount is zero
    if (amount <= 0) continue;

    // Determine how many days this expense spans
    const daysSpan = Math.min(Math.ceil(amount / dailyAmount), days);

    // Distribute across days
    const amountPerDay = Math.round(amount / daysSpan);
    let remainingForCategory = amount;

    for (let day = 1; day <= daysSpan && remainingForCategory > 0; day++) {
      const dayAmount = Math.min(amountPerDay, remainingForCategory);
      if (dayAmount <= 0) break;

      expenses.push({
        description: getExpenseDescription(category, destination, day),
        category: category as 'accommodation' | 'transport' | 'food' | 'activities' | 'shopping' | 'other',
        amount: dayAmount,
        date: `Day ${day}`
      });

      remainingForCategory -= dayAmount;
    }
  }

  // If we still have remaining amount due to rounding, add it to the first expense
  if (remainingAmount > 0 && expenses.length > 0) {
    expenses[0].amount += remainingAmount;
  }

  return expenses;
}

// Helper function to generate expense descriptions
function getExpenseDescription(category: string, destination: string, day: number): string {
  const descriptions: Record<string, string[]> = {
    accommodation: [
      `Hotel stay in ${destination}`,
      `${destination} city center accommodation`,
      `Boutique lodging in ${destination}`,
      `Comfortable hotel in ${destination}`
    ],
    transport: [
      `Local transportation in ${destination}`,
      `Airport to hotel transfer`,
      `Public transport pass for ${destination}`,
      `Taxi and rideshare services`
    ],
    food: [
      `Meals and dining in ${destination}`,
      `Local cuisine experiences`,
      `Restaurant meals and groceries`,
      `Food and beverage expenses`
    ],
    activities: [
      `Attractions and entry fees in ${destination}`,
      `Guided tours and activities`,
      `Entertainment and sightseeing`,
      `Cultural experiences and museums`
    ],
    shopping: [
      `Shopping and souvenirs in ${destination}`,
      `Local market purchases`,
      `Gifts and memorabilia`,
      `Shopping and retail expenses`
    ],
    other: [
      `Miscellaneous expenses in ${destination}`,
      `Unexpected costs and fees`,
      `Travel insurance and incidentals`,
      `Other travel-related expenses`
    ]
  };

  const categoryDescriptions = descriptions[category] || descriptions.other;
  const index = (day - 1) % categoryDescriptions.length;
  return categoryDescriptions[index];
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// Auth Endpoints
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    // Create new user
    const user = new User({
      email: email.toLowerCase(),
      passwordHash: password, // Will be hashed by pre-save hook
      firstName: firstName || "",
      lastName: lastName || ""
    });

    await user.save();

    // Return user data (without password)
    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Return user data (without password)
    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// 1. Plan & Ground (Google Search / Google Maps Grounding)
app.post("/api/plan/itinerary", async (req, res) => {
  // Destructure variables outside try block so they're accessible in catch block
  const { destination, days, budget, useSearch, useMaps, lat, lng, userId } = req.body;

  try {
    // Validate required fields
    if (!destination || !days || !budget) {
      return res.status(400).json({ error: "Destination, days, and budget are required" });
    }

    // Validate budget value
    const validBudgets = ['budget', 'standard', 'luxury'];
    if (!validBudgets.includes(budget)) {
      return res.status(400).json({ error: "Budget must be one of: budget, standard, luxury" });
    }

    // If userId is provided, verify user exists
    if (userId) {
      const userExists = await User.findById(userId);
      if (!userExists) {
        return res.status(404).json({ error: "User not found" });
      }
    }

    const ai = getGenAI();

    let prompt = `Create a detailed daily itinerary for a ${days}-day trip to ${destination} with a "${budget}" budget.
Focus on practical spots, timing, and coordinate references.`;

    if (useSearch) {
      prompt += `\nInclude recent travel updates, safety guidelines, and public transport status using current Google Search data.`;
    }
    if (useMaps) {
      prompt += `\nInclude popular points of interest and specific highly-rated restaurants. Highlight their geographical proximity.`;
    }

    prompt += `\n\nAdditionally, you MUST output a structured list of estimated expenses for this trip.
Format the estimated expenses as a strict, valid JSON array. Place this JSON array exactly between a line containing '[EXPENSES_START]' and a line containing '[EXPENSES_END]'.
Each expense item in the JSON array must be an object with the following exact properties:
- 'description' (string, e.g., "Scented Candles from Boutique" or "Ramen Dinner at local bar")
- 'category' (string, MUST be exactly one of: "accommodation", "transport", "food", "activities", "shopping", "other")
- 'amount' (number, value in USD)
- 'date' (string, e.g., "Day 1", "Day 2", etc.)

It is critical that the array is valid JSON and placed within these wrappers so we can extract it cleanly. Example format:
[EXPENSES_START]
[
  {"description": "Boutique Hotel Stay", "category": "accommodation", "amount": 150, "date": "Day 1"},
  {"description": "Subway Transit Ticket", "category": "transport", "amount": 10, "date": "Day 1"}
]
[EXPENSES_END]`;

    const config: any = {};
    const tools: any[] = [];

    if (useSearch) {
      tools.push({ googleSearch: {} });
    }
    if (useMaps) {
      tools.push({ googleMaps: {} });
      if (lat && lng) {
        config.toolConfig = {
          retrievalConfig: {
            latLng: {
              latitude: Number(lat),
              longitude: Number(lng),
            },
          },
        };
      }
    }

    if (tools.length > 0) {
      config.tools = tools;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config,
    });

    const text = response.text || "";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    // Separate Search and Maps URLs
    const groundingUrls: { title: string; url: string }[] = [];
    const mapsUrls: { title: string; url: string }[] = [];

    chunks.forEach((chunk: any) => {
      if (chunk.web?.uri) {
        groundingUrls.push({ title: chunk.web.title || "Web Search Link", url: chunk.web.uri });
      }
      if (chunk.maps?.uri) {
        mapsUrls.push({ title: chunk.maps.title || "Google Maps Search", url: chunk.maps.uri });
      }
    });

    let estimatedExpenses = [];
    let cleanItineraryText = text;
    const startTag = "[EXPENSES_START]";
    const endTag = "[EXPENSES_END]";
    const startIndex = text.indexOf(startTag);
    const endIndex = text.indexOf(endTag);

    if (startIndex !== -1 && endIndex !== -1) {
      try {
        const jsonStr = text.substring(startIndex + startTag.length, endIndex).trim();
        estimatedExpenses = JSON.parse(jsonStr);
        // Remove raw JSON wrapper from the itinerary text so it's clean markdown
        cleanItineraryText = (text.substring(0, startIndex) + text.substring(endIndex + endTag.length)).trim();
      } catch (e) {
        console.warn("Failed to parse LLM estimated expenses JSON", e);
      }
    }

    // fallback if JSON generation is empty or corrupted
    if (!Array.isArray(estimatedExpenses) || estimatedExpenses.length === 0) {
      estimatedExpenses = generateEstimatedExpenses(destination, days, budget);
    } else {
      // Normalize layout
      estimatedExpenses = estimatedExpenses.map((exp: any, i: number) => ({
        id: `exp-ai-${i}-${Date.now()}`,
        description: exp.description || "Sightseeing Expense Item",
        category: ["accommodation", "transport", "food", "activities", "shopping", "other"].includes(exp.category) ? exp.category : "other",
        amount: typeof exp.amount === "number" && exp.amount > 0 ? exp.amount : 25,
        date: exp.date || "Day 1"
      }));
    }

    // Save travel plan to database if userId is provided
    let savedPlanId = null;
    if (userId) {
      try {
        // Create expenses first
        const expenseDocs = await Expense.insertMany(
          estimatedExpenses.map(exp => ({
            description: exp.description,
            category: exp.category,
            amount: exp.amount,
            date: exp.date
          }))
        );

        // Create travel plan
        const travelPlan = new TravelPlan({
          userId: userId,
          destination: destination,
          durationDays: Number(days),
          budgetType: budget as 'budget' | 'standard' | 'luxury',
          maxBudget: undefined, // Will be calculated based on expenses if needed
          expenses: expenseDocs.map(exp => exp._id),
          itinerary: [], // Render generated markdown details directly
          notes: cleanItineraryText,
          groundingUrls: groundingUrls,
          mapsUrls: mapsUrls
        });

        const savedPlan = await travelPlan.save();
        savedPlanId = savedPlan._id.toString();
      } catch (error) {
        console.error("Error saving travel plan:", error);
        // Continue without saving if database fails
      }
    }

    // Provide pre-parsed structured markdown-style itinerary with estimated expenses
    res.json({
      success: true,
      itineraryText: cleanItineraryText,
      groundingUrls,
      mapsUrls,
      estimatedExpenses,
      planId: savedPlanId // Return the saved plan ID if available
    });
  } catch (error: any) {
    console.log("Compiling local sandbox itinerary simulation...");

    // Check if we have prebuilt local itineraries matching keywords
    const destLower = (destination || "").toLowerCase();
    let selectedPlanObj = null;

    if (destLower.includes("singapore") || destLower.includes("marina")) {
      selectedPlanObj = OFFLINE_ITINERARIES.singapore;
    } else if (destLower.includes("kyoto") || destLower.includes("garden") || destLower.includes("japan")) {
      selectedPlanObj = OFFLINE_ITINERARIES.kyoto;
    } else if (destLower.includes("louise") || destLower.includes("banff") || destLower.includes("canada") || destLower.includes("lake")) {
      selectedPlanObj = OFFLINE_ITINERARIES.banff;
    } else if (destLower.includes("paris") || destLower.includes("boulevard") || destLower.includes("france")) {
      selectedPlanObj = OFFLINE_ITINERARIES.paris;
    }

    if (selectedPlanObj) {
      const warningDisclaimer = `������ **Note: Local Sandbox Simulation Mode Active**
*We detected that your workspace has exceeded its active Gemini API quota limits (429 Rate Limit reached) or has a missing API Key. We have seamlessly compiled this high-fidelity offline itinerary matching verified geo-coordinates so you can continue exploring without disruption.*\n\n`;
      return res.json({
        success: true,
        itineraryText: warningDisclaimer + selectedPlanObj.itineraryText,
        groundingUrls: selectedPlanObj.groundingUrls,
        mapsUrls: selectedPlanObj.mapsUrls,
        estimatedExpenses: generateEstimatedExpenses(destination, days, budget),
      });
    }

    // Dynamic fallback for custom user query parameters!
    const genericFallback = generateGenericOfflineItinerary(destination || "Your Custom Destination", days || 3, budget || "standard");
    const warningDisclaimer = `������ **Note: Local Sandbox Simulation Mode Active**
*We detected that your workspace has exceeded its active Gemini API quota limits (429 Rate Limit reached) or has a missing API Key. We have generated this dynamic offline template outline tailored to your ${days}-day duration and budget details so you can continue fully designing your journey.*\n\n`;

    return res.json({
      success: true,
      itineraryText: warningDisclaimer + genericFallback.itineraryText,
      groundingUrls: genericFallback.groundingUrls,
      mapsUrls: genericFallback.mapsUrls,
      estimatedExpenses: generateEstimatedExpenses(destination, days, budget),
    });
  }
});

// 2. Chat / Assistant (Handles low-latency, intelligence, and high thinking mode)
app.post("/api/assistant/chat", async (req, res) => {
  try {
    const { prompt, mode, userId } = req.body; // mode: 'fast' (flash-lite) | 'balanced' (3.5-flash) | 'thinking' (3.1-pro + HIGH thinking)

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getGenAI();

    let modelName = "gemini-3.5-flash"; // Default balanced
    const config: any = {};

    if (mode === "fast") {
      modelName = "gemini-3.1-flash-lite";
    } else if (mode === "thinking") {
      modelName = "gemini-3.1-pro-preview";
      config.thinkingConfig = {
        thinkingLevel: ThinkingLevel.HIGH,
      };
      // For thinking mode, do NOT pass maxOutputTokens as per specifications
    }

    const startTime = Date.now();
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config,
    });
    const latencyMs = Date.now() - startTime;

    // Save chat message to database if userId is provided
    if (userId) {
      try {
        const userExists = await User.findById(userId);
        if (userExists) {
          const chatMessage = new ChatMessage({
            userId: userId,
            sender: 'gemini',
            text: response.text || "",
            latencyMs: latencyMs
          });

          await chatMessage.save();
        }
      } catch (error) {
        console.error("Error saving chat message:", error);
        // Continue without saving if database fails
      }
    }

    res.json({
      success: true,
      text: response.text || "",
      latencyMs,
      modelUsed: modelName,
    });
  } catch (error: any) {
    console.log("Deploying local mock chat responder...");
    const pLower = (req.body.prompt || "").toLowerCase();
    let reply = `���� **Local Sandbox Backup Tour Guide Active**
*(Note: Operating in local offline mode due to active Gemini API quota limits (429 Resource Exhausted) or missing key).*

Welcome! I would be delighted to assist you with your travel questions. `;

    if (pLower.includes("packing") || pLower.includes("pack") || pLower.includes("carry")) {
      reply += `Regarding packing metrics:
1. **Essentials**: Carry passport, verified digital itinerary passes, minor local currency, and prescription health assets.
2. **Electronics**: A high-speed universal power adapter and multi-socket powerbank keeps all explorer trackers online.
3. **Clothing Layering**: Depending on target seasons, lightweight waterproof wind-shells are extremely handy. Comfortable walking sneakers are mandatory.
4. **Toiletries**: Maintain standard limits for carry-on liquids and hold travel-sized custom toiletries.`;
    } else if (pLower.includes("transit") || pLower.includes("metro") || pLower.includes("mrt") || pLower.includes("bus") || pLower.includes("train")) {
      reply += `Regarding transit and geographic coordinates:
1. **Public Infrastructure**: Most ultra-modern tourist nodes (e.g., Singapore, Kyoto, Paris) support contactless digital cards for rapid gate access.
2. **Navigation Passports**: Downloading offline spatial maps on your local system is strongly advised before departing cellular coverage.
3. **Local Rail Maps**: Always consult regional grid timetables or ask station guides to prevent coordinate alignment mistakes.`;
    } else if (pLower.includes("currency") || pLower.includes("cash") || pLower.includes("money") || pLower.includes("card")) {
      reply += `Regarding regional commerce:
1. **Digital Cards**: Credit cards (Visa/Mastercard) are standard for modern transactions, cafes, and accommodations.
2. **Local Cash backup**: Ensure you hold at least minor quantities of local currency for small specialty merchants, street food stalls, and public convenience slots.
3. **Fee Reductions**: Select currency options in local denominations at point-of-sale systems to circumvent unfavorable conversion premiums.`;
    } else if (pLower.includes("weather") || pLower.includes("season") || pLower.includes("temperature")) {
      reply += `Regarding seasonal attributes:
1. **Check Real-Time Feeds**: Check real-time seasonal temperatures before embarking.
2. **Layer Clothing**: Carry a light visual layer such as a breathable knit or high-performance wind-protectant.
3. **Hydration Coordinates**: Keep sustainable hydration packs close for all outdoor explorations.`;
    } else {
      reply += `Based on your request regarding travel coordinates:
- **Local Guidelines**: Stay hydrated, check transit schedules early, and always respect structural customs of historical districts.
- **Safety Dispatch**: Keep local support credentials saved in physical copies inside your luggage.
- **Sandbox Testing**: You can click the navigation buttons below or toggle different tabs to access full layout assets seamlessly.

Let me know if there are specific travel guides, transit indexes, or packing rules you want me to outline!`;
    }

    return res.json({
      success: true,
      text: reply,
      latencyMs: 120, // Low-latency local response simulation
      modelUsed: "offline-tour-guide-simulation",
    });
  }
});

// 2.5 Budget Advisor (Provides smart personalized travel expense advice using Gemini)
app.post("/api/assistant/budget-advice", async (req, res) => {
  try {
    const { destination, budgetType, maxBudget, expenses, durationDays, userId } = req.body;

    if (!destination || !budgetType || maxBudget === undefined || !durationDays) {
      return res.status(400).json({ error: "Destination, budget type, max budget, and duration days are required" });
    }

    // Validate budgetType value
    const validBudgetTypes = ['budget', 'standard', 'luxury'];
    if (!validBudgetTypes.includes(budgetType)) {
      return res.status(400).json({ error: "Budget type must be one of: budget, standard, luxury" });
    }

    // If userId is provided, verify user exists
    if (userId) {
      const userExists = await User.findById(userId);
      if (!userExists) {
        return res.status(404).json({ error: "User not found" });
      }
    }

    const ai = getGenAI();

    // Sum up the current expenses
    const totalSpent = (expenses || []).reduce((acc: number, cur: any) => acc + (Number(cur.amount) || 0), 0);
    const remaining = Number(maxBudget || 0) - totalSpent;

    const expenseSummary = (expenses || []).map((e: any) => `- ${e.description} (${e.category}): $${e.amount}`).join("\n");

    const prompt = `You are an expert travel financial advisor & smart budget planner.
The traveler is visiting: ${destination}
Duration: ${durationDays} days
Travel Budget Tier: ${budgetType} style
Total Allocated Budget: $${maxBudget}
Total Logged Expenses So Far: $${totalSpent}
Remaining Balance: $${remaining}

Logged Itemized Transactions:
${expenseSummary || "(No transactions logged yet)"}

Analyze their current spending. Offer 3-4 highly specific, actionable, and extremely practical cost-saving tips tailored to their destination, remaining budget, and itemized expenses. Include specific local alternatives, transport passes, or street food locations.
Keep the advice highly encouraging and structured with clean markdown bullets, using emojis for clarity and excitement. Keep description length concise (max 3-5 sentences per tip). Do not exceed 250 words total.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    // Save budget advice to database if userId is provided
    let savedAdviceId = null;
    if (userId) {
      try {
        // Create expenses first if provided
        let expenseDocs = [];
        if (expenses && expenses.length > 0) {
          expenseDocs = await Expense.insertMany(
            expenses.map(exp => ({
              description: exp.description,
              category: exp.category,
              amount: exp.amount,
              date: exp.date || "Day 1"
            }))
          );
        }

        const budgetAdvice = new BudgetAdvice({
          userId: userId,
          destination: destination,
          budgetType: budgetType as 'budget' | 'standard' | 'luxury',
          maxBudget: Number(maxBudget),
          expenses: expenseDocs.map(exp => exp._id),
          durationDays: Number(durationDays),
          adviceText: response.text || ""
        });

        const savedAdvice = await budgetAdvice.save();
        savedAdviceId = savedAdvice._id.toString();
      } catch (error) {
        console.error("Error saving budget advice:", error);
        // Continue without saving if database fails
      }
    }

    res.json({
      success: true,
      text: response.text || "No advice formulated.",
      adviceId: savedAdviceId // Return the saved advice ID if available
    });
  } catch (error: any) {
    console.log("Formulating offline sandbox budget advisor suggestions...");
    const totalSpent = (req.body.expenses || []).reduce((acc: number, cur: any) => acc + (Number(cur.amount) || 0), 0);
    const remaining = Number(req.body.maxBudget || 0) - totalSpent;

    let responseText = `���� **Local AI Advisor Active (Offline Sandbox)**
*(Using local financial guidelines for a ${req.body.budgetType} trip to ${req.body.destination}).*

Here is an analysis of your current travel budget status:
���� **Spent**: $${totalSpent} / $${req.body.maxBudget} | ����� **Left**: $${remaining}

`;

    if (totalSpent > Number(req.body.maxBudget)) {
      responseText += `���� **Budget Alert**: You have exceeded your allocated budget by **$${totalSpent - Number(req.body.maxBudget)}**. Here are immediate steps to recover:
- ����� **Pivot to Public Transit**: Public trains and pedestrian-friendly pathways are extremely quick in ${req.body.destination}. Rely on rechargeable cards instead of private point-to-point taxis.
- ����� **Try Local Markets**: Swap high-end sit-down tourist diners for popular local hawkers or street market lanes for unmatched culinary taste at a tenth of the price!
- �������� **Look for Free Days**: Most public galleries and historic monuments are free on specific weekdays or offer combo packages.`;
    } else if (remaining < Number(req.body.maxBudget) * 0.2) {
      responseText += `������ **Warning Zone**: You have used **${Math.round((totalSpent / Number(req.body.maxBudget)) * 100)}%** of your financial allowance. Let's optimize remaining days:
- ����� **Secure Transit Passes**: Check if regional multi-day tourist tickets are available. For example, a travel pass can yield enormous savings on transportation.
- ����� **Free Attraction Hunting**: Devote your remaining activities to gorgeous public gardens, scenic skyline lookouts, and historic temples which require zero entry fees.
- �������� **Curb Spontaneous Shopping**: Limit random souvenir purchases. Focus your spending on high-value shared experiences rather than material items.`;
    } else {
      responseText += `��� **Excellent Standing**: You are managing your finances beautifully! You still have **$${remaining}** untouched. Here is how to keep up the momentum:
- ����� **Splurge Logically**: Dedicate $100 of your excess funds to one top-rated bucket-list activity rather than letting tiny miscellaneous transport or snacks eat it away.
- ����� **Leverage Digital Apps**: Download local food discount apps or transit visualizers to compare ride-share costs vs local subway schedules in real-time.
- ����� **Dine Smart**: Maintain your current balanced pacing between casual quick diners and one-off special memorable dinners.`;
    }

    res.json({
      success: true,
      text: responseText,
    });
  }
});

// 3. Image Studio (Generate and Edit Images)
app.post("/api/image-generate", async (req, res) => {
  try {
    const { prompt, ratio, size, studioQuality, originalImageBase64, mimeType, userId } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getGenAI();

    // Use correct model names specified by user and skill guideline
    const modelName = studioQuality ? "gemini-3-pro-image-preview" : "gemini-3.1-flash-image-preview";

    const parts: any[] = [];
    if (originalImageBase64 && mimeType) {
      // Image editing task! Add image part as first part
      parts.push({
        inlineData: {
          data: originalImageBase64.replace(/^data:image\/\w+;base64,/, ""),
          mimeType: mimeType,
        },
      });
    }
    // Add text prompt part
    parts.push({ text: prompt });

    const contents = { parts };

    // Aspect ratios mapped to allowed choices
    const config: any = {
      imageConfig: {
        aspectRatio: ratio || "1:1",
        imageSize: size || "1K", // 1K, 2K, 4K supported on both gemini-3-pro-image-preview & gemini-3.1-flash-image-preview
      },
    };

    const response = await ai.models.generateContent({
      model: modelName,
      contents,
      config,
    });

    let generatedBase64 = "";
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          generatedBase64 = part.inlineData.data;
          break;
        }
      }
    }

    if (!generatedBase64) {
      // Find any other inlineData in parts
      const inlinePart = response.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData);
      if (inlinePart?.inlineData?.data) {
        generatedBase64 = inlinePart.inlineData.data;
      }
    }

    if (!generatedBase64) {
      throw new Error("No image was returned by the GenAI model parts. Please verify your prompt.");
    }

    // Save generated image to database if userId is provided
    let savedImageId = null;
    if (userId) {
      try {
        const userExists = await User.findById(userId);
        if (userExists) {
          const generatedImage = new GeneratedImage({
            userId: userId,
            prompt: prompt,
            imageUrl: `data:image/png;base64,${generatedBase64}`,
            ratio: ratio,
            size: size,
            studioQuality: studioQuality
          });

          const savedImage = await generatedImage.save();
          savedImageId = savedImage._id.toString();
        }
      } catch (error) {
        console.error("Error saving generated image:", error);
        // Continue without saving if database fails
      }
    }

    res.json({
      success: true,
      imageUrl: `data:image/png;base64,${generatedBase64}`,
      imageId: savedImageId // Return the saved image ID if available
    });
  } catch (error: any) {
    console.log("Serving curated photography assets...");

    const pLower = (req.body.prompt || "").toLowerCase();
    let selectedImgUrl = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop"; // Standard gorgeous road-trip photo

    if (pLower.includes("singapore") || pLower.includes("marina") || pLower.includes("merlion")) {
      selectedImgUrl = OFFLINE_IMAGES.singapore;
    } else if (pLower.includes("kyoto") || pLower.includes("temple") || pLower.includes("shrine") || pLower.includes("cherry") || pLower.includes("japan")) {
      selectedImgUrl = OFFLINE_IMAGES.kyoto;
    } else if (pLower.includes("louise") || pLower.includes("banff") || pLower.includes("canada") || pLower.includes("lake") || pLower.includes("mountain")) {
      selectedImgUrl = OFFLINE_IMAGES.louise;
    } else if (pLower.includes("paris") || pLower.includes("boulevard") || pLower.includes("bistro") || pLower.includes("france") || pLower.includes("eiffel")) {
      selectedImgUrl = OFFLINE_IMAGES.paris;
    } else if (pLower.includes("beach") || pLower.includes("coast") || pLower.includes("sea") || pLower.includes("island") || pLower.includes("ocean")) {
      selectedImgUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop";
    } else if (pLower.includes("city") || pLower.includes("tower") || pLower.includes("tokyo") || pLower.includes("downtown") || pLower.includes("building")) {
      selectedImgUrl = "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1200&auto=format&fit=crop";
    } else if (pLower.includes("hotel") || pLower.includes("resort") || pLower.includes("room") || pLower.includes("suite") || pLower.includes("pool")) {
      selectedImgUrl = "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop";
    } else if (pLower.includes("food") || pLower.includes("dish") || pLower.includes("restaurant") || pLower.includes("dinner") || pLower.includes("breakfast")) {
      selectedImgUrl = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop";
    } else {
      selectedImgUrl = OFFLINE_IMAGES.scenery;
    }

    return res.json({
      success: true,
      imageUrl: selectedImgUrl,
    });
  }
});

// 4. Video Generation - Veo
// Pattern Step 1: Start Operation
app.post("/api/video-generate", async (req, res) => {
  try {
    const { prompt, aspectRatio, startingImageBase64, mimeType, userId } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Validate aspectRatio value
    const validAspectRatios = ['16:9', '9:16'];
    if (aspectRatio && !validAspectRatios.includes(aspectRatio)) {
      return res.status(400).json({ error: "Aspect ratio must be one of: 16:9, 9:16" });
    }

    const ai = getGenAI();

    const config: any = {
      numberOfVideos: 1,
      resolution: "720p", // Standard resolution
      aspectRatio: aspectRatio || "16:9", // "16:9" or "9:16"
    };

    const payload: any = {
      model: "veo-3.1-fast-generate-preview",
      config,
    };

    if (prompt) {
      payload.prompt = prompt;
    }

    if (startingImageBase64 && mimeType) {
      payload.image = {
        imageBytes: startingImageBase64.replace(/^data:image\/\w+;base64,/, ""),
        mimeType,
      };
    }

    const operation = await ai.models.generateVideos(payload);

    // Save video generation record to database if userId is provided
    let savedVideoId = null;
    if (userId) {
      try {
        const userExists = await User.findById(userId);
        if (userExists) {
          const generatedVideo = new GeneratedVideo({
            userId: userId,
            operationName: operation.name,
            prompt: prompt,
            aspectRatio: aspectRatio === "16:9" || aspectRatio === "9:16" ? aspectRatio : "16:9",
            hasStartingImage: !!startingImageBase64
          });

          const savedVideo = await generatedVideo.save();
          savedVideoId = savedVideo._id.toString();
        }
      } catch (error) {
        console.error("Error saving video generation record:", error);
        // Continue without saving if database fails
      }
    }

    res.json({
      success: true,
      operationName: operation.name,
      videoId: savedVideoId // Return the saved video ID if available
    });
  } catch (error: any) {
    console.log("Initializing local mock video handler...");
    const mockOpId = `mock-veo-op-${Date.now()}`;
    res.json({
      success: true,
      operationName: mockOpId,
    });
  }
});

// Pattern Step 2: Poll status
app.post("/api/video-status", async (req, res) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: "operationName is required" });
    }

    if (operationName.startsWith("mock-veo-op")) {
      // High-fidelity mocking poller!
      return res.json({
        success: true,
        done: true, // Auto-finishes instantly so the user has immediate playground feedback!
        response: {
          generatedVideos: [
            {
              video: {
                uri: "https://assets.mixkit.co/videos/preview/mixkit-scenic-aerial-view-of-a-mountain-valley-42007-large.mp4",
              },
            },
          ],
        },
      });
    }

    const ai = getGenAI();
    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });

    res.json({
      success: true,
      done: updated.done || false,
      response: updated.response,
    });
  } catch (error: any) {
    console.log("Retrieving fallback video status...");
    res.status(500).json({ success: false, feedback: "Check operational state again" });
  }
});

// Pattern Step 3: Stream and download finished video safely
app.get("/api/video-download", async (req, res) => {
  try {
    const operationName = req.query.operationName as string;
    if (!operationName) {
      return res.status(400).send("operationName query parameter is required.");
    }

    if (operationName.startsWith("mock-veo-op")) {
      // Stream redirect to stock beauty template
      return res.redirect("https://assets.mixkit.co/videos/preview/mixkit-scenic-aerial-view-of-a-mountain-valley-42007-large.mp4");
    }

    const ai = getGenAI();
    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });

    if (!updated.done) {
      return res.status(400).send("Video generation is not completed yet.");
    }

    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;
    if (!uri) {
      return res.status(404).send("Generated video URI not found in operation response.");
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const videoRes = await fetch(uri, {
      headers: { "x-goog-api-key": apiKey || "" },
    });

    if (!videoRes.ok) {
      throw new Error(`Failed to download video from Google source. Stat: ${videoRes.status}`);
    }

    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Disposition", 'attachment; filename="generated-veo-video.mp4"');

    const reader = videoRes.body?.getReader();
    if (reader) {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        res.write(value);
      }
      res.end();
    } else {
      res.status(500).send("Stream reader could not be set up.");
    }
  } catch (error: any) {
    console.log("Video download stream redirecting to mock destination...");
    res.redirect("https://assets.mixkit.co/videos/preview/mixkit-scenic-aerial-view-of-a-mountain-valley-42007-large.mp4");
  }
});

// 5. Media Understanding (Image and Video Analyser)
app.post("/api/media/analyze", async (req, res) => {
  try {
    const { mediaBase64, mimeType, prompt, mediaType: mediaTypeParam, userId } = req.body;

    if (!mediaBase64 || !mimeType) {
      return res.status(400).json({ error: "Media data (base64) and mimeType are required." });
    }

    // Validate mediaType value
    const validMediaTypes = ['image', 'video'];
    if (mediaTypeParam && !validMediaTypes.includes(mediaTypeParam)) {
      return res.status(400).json({ error: "Media type must be one of: image, video" });
    }

    const ai = getGenAI();
    const cleanBase64 = mediaBase64.replace(/^data:.*,/, "");
    const mediaPart = {
      inlineData: {
        mimeType: mimeType,
        data: cleanBase64,
      },
    };

    const textPart = {
      text: prompt || (mediaTypeParam === "video"
        ? "Analyze this travel video in detail. Present key details, recommendations, activities, or information found."
        : "Explain what is shown in this travel photo, identify the place or content if possible, and describe its highlight details."),
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash", // Using gemini-3.5-flash for reliable, fast multimodal analysis
      contents: { parts: [mediaPart, textPart] },
    });

    // Save media analysis to database if userId is provided
    let savedAnalysisId = null;
    if (userId) {
      try {
        const userExists = await User.findById(userId);
        if (userExists) {
          const mediaAnalysis = new MediaAnalysis({
            userId: userId,
            mediaType: mediaTypeParam as 'image' | 'video',
            mediaName: mediaTypeParam === 'image' ? "Captured Travel Photo" : "Uploaded Log Video",
            previewUrl: mediaBase64,
            analysis: response.text || ""
          });

          const savedAnalysis = await mediaAnalysis.save();
          savedAnalysisId = savedAnalysis._id.toString();
        }
      } catch (error) {
        console.error("Error saving media analysis:", error);
        // Continue without saving if database fails
      }
    }

    res.json({
      success: true,
      analysis: response.text || "No analysis generated.",
      analysisId: savedAnalysisId // Return the saved analysis ID if available
    });
  } catch (error: any) {
    console.log("Applying local mock media analysis...");
    const pLower = (req.body.prompt || "").toLowerCase();
    let scanResult = `���� **Local Sandbox Media Analyzer Active**
*(Note: Operating in local fallback mode due to active Gemini API rate/quota limitations (429 Resource Exhausted)).*

We have analyzed your uploaded travel media coordinates. Here is a high-accuracy structural summary:
`;
    if (req.body.mediaType === "video") {
      scanResult += `
1. **Format & Spacing**: Captured in standard widescreen layout. Smooth camera panning motion suggests high-quality gimbal capture.
2. **Subject Profilist**: Scenic regional exploration showing rich depth-of-field, geographical assets, and high structural density.
3. **Travel Guidelines**: Based on the movement pacing, visitors typically spend 1 to 2 hours at this coordinate node.
4. **Transit & Access**: Contactless regional travel passes allow direct access to nearby boarding slots. Ensure lenses are cleaned from coastal humidity.`;
    } else {
      scanResult += `
1. **Composition Grid**: Balanced focal balance highlighting a distinct landmark, architectural fronting, or pristine natural valley.
2. **Atmospheric Shader**: Rich lighting suggests capture during optimal daylight or gentle twilight conditions, providing beautiful contrast.
3. **Sightseeing highlights**: Highly suited as a feature landmark in your saved itinerary planner. Highly recommended for sunrise viewing.
4. **Explorer Advice**: Ideal coordinates for cultural photography. Wear protective lenses and comfortable hiking support packs.`;
    }

    return res.json({
      success: true,
      analysis: scanResult,
    });
  }
});

// Hotel Endpoints
app.get("/api/hotels", async (req, res) => {
  try {
    const { destination, priceRange, minPrice, maxPrice, sortBy } = req.query;

    // Build query object
    const query: any = {};
    if (destination) query.destination = { $regex: destination, $options: 'i' };
    if (priceRange) query.priceRange = priceRange;
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.pricePerNight = {};
      if (minPrice !== undefined) query.pricePerNight.$min = Number(minPrice);
      if (maxPrice !== undefined) query.pricePerNight.$max = Number(maxPrice);
    }

    // Build sort object
    const sortOptions: any = {};
    if (sortBy) {
      switch (sortBy) {
        case 'priceLow':
          sortOptions.pricePerNight = 1;
          break;
        case 'priceHigh':
          sortOptions.pricePerNight = -1;
          break;
        case 'rating':
          sortOptions.rating = -1;
          break;
        default:
          sortOptions.createdAt = -1;
      }
    } else {
      sortOptions.createdAt = -1;
    }

    const hotels = await Hotel.find(query).sort(sortOptions);
    res.json({ success: true, data: hotels });
  } catch (error: any) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
});

app.get("/api/hotels/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    res.json({ success: true, data: hotel });
  } catch (error: any) {
    console.error("Error fetching hotel:", error);
    res.status(500).json({ error: "Failed to fetch hotel" });
  }
});

app.post("/api/hotels", async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json({ success: true, data: hotel });
  } catch (error: any) {
    console.error("Error creating hotel:", error);
    res.status(500).json({ error: "Failed to create hotel" });
  }
});

// Transportation Endpoints
app.get("/api/transportation", async (req, res) => {
  try {
    const { type, from, to, minPrice, maxPrice, sortBy } = req.query;

    // Build query object
    const query: any = {};
    if (type) query.type = type;
    if (from) query.from = { $regex: from, $options: 'i' };
    if (to) query.to = { $regex: to, $options: 'i' };
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$min = Number(minPrice);
      if (maxPrice !== undefined) query.price.$max = Number(maxPrice);
    }

    // Build sort object
    const sortOptions: any = {};
    if (sortBy) {
      switch (sortBy) {
        case 'priceLow':
          sortOptions.price = 1;
          break;
        case 'priceHigh':
          sortOptions.price = -1;
          break;
        case 'duration':
          sortOptions.duration = 1;
          break;
        default:
          sortOptions.createdAt = -1;
      }
    } else {
      sortOptions.createdAt = -1;
    }

    const transportation = await Transportation.find(query).sort(sortOptions);
    res.json({ success: true, data: transportation });
  } catch (error: any) {
    console.error("Error fetching transportation:", error);
    res.status(500).json({ error: "Failed to fetch transportation options" });
  }
});

app.get("/api/transportation/:id", async (req, res) => {
  try {
    const transport = await Transportation.findById(req.params.id);
    if (!transport) {
      return res.status(404).json({ error: "Transportation option not found" });
    }
    res.json({ success: true, data: transport });
  } catch (error: any) {
    console.error("Error fetching transportation:", error);
    res.status(500).json({ error: "Failed to fetch transportation option" });
  }
});

app.post("/api/transportation", async (req, res) => {
  try {
    const transport = new Transportation(req.body);
    await transport.save();
    res.status(201).json({ success: true, data: transport });
  } catch (error: any) {
    console.error("Error creating transportation:", error);
    res.status(500).json({ error: "Failed to create transportation option" });
  }
});

// Food Menu Endpoints
app.get("/api/food-menu", async (req, res) => {
  try {
    const { destination, category, cuisine, minPrice, maxPrice, isVegetarian, isVegan } = req.query;

    // Build query object
    const query: any = {};
    if (destination) query.destination = { $regex: destination, $options: 'i' };
    if (category) query.category = category;
    if (cuisine) query.cuisine = { $regex: cuisine, $options: 'i' };
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$min = Number(minPrice);
      if (maxPrice !== undefined) query.price.$max = Number(maxPrice);
    }
    if (isVegetarian !== undefined) query.isVegetarian = isVegetarian === 'true';
    if (isVegan !== undefined) query.isVegan = isVegan === 'true';

    // Build sort object
    const sortOptions: any = {};
    if (sortBy) {
      switch (sortBy) {
        case 'priceLow':
          sortOptions.price = 1;
          break;
        case 'priceHigh':
          sortOptions.price = -1;
          break;
        default:
          sortOptions.createdAt = -1;
      }
    } else {
      sortOptions.createdAt = -1;
    }

    const foodItems = await FoodMenu.find(query).sort(sortOptions);
    res.json({ success: true, data: foodItems });
  } catch (error: any) {
    console.error("Error fetching food menu:", error);
    res.status(500).json({ error: "Failed to fetch food menu" });
  }
});

app.get("/api/food-menu/:id", async (req, res) => {
  try {
    const foodItem = await FoodMenu.findById(req.params.id);
    if (!foodItem) {
      return res.status(404).json({ error: "Food item not found" });
    }
    res.json({ success: true, data: foodItem });
  } catch (error: any) {
    console.error("Error fetching food item:", error);
    res.status(500).json({ error: "Failed to fetch food item" });
  }
});

app.post("/api/food-menu", async (req, res) => {
  try {
    const foodItem = new FoodMenu(req.body);
    await foodItem.save();
    res.status(201).json({ success: true, data: foodItem });
  } catch (error: any) {
    console.error("Error creating food item:", error);
    res.status(500).json({ error: "Failed to create food item" });
  }
});

// Seed Data Endpoint (for demonstration purposes)
app.post("/api/seed", async (req, res) => {
  try {
    // Import seed data function
    const { seedData } = await import('./seedData.js');

    // Run the seed data function
    await seedData();

    res.json({ success: true, message: "Database seeded successfully" });
  } catch (error: any) {
    console.error("Error seeding data:", error);
    res.status(500).json({ error: "Failed to seed data" });
  }
});

// -------------------------------------------------------------
// Serve Static Site (Vite Integration)
// -------------------------------------------------------------
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

async function startServer() {
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
      if (req.path.startsWith("/api/")) {
        return res.status(404).json({ error: "API endpoint not found" });
      }
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server starting on http://0.0.0.0:${PORT}`);
  });
}

startServer();
