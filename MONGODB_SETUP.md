# MongoDB Setup for ChanderGari

This document explains how to set up MongoDB for the ChanderGari travel planning application.

## Prerequisites

1. **MongoDB** - Install MongoDB Community Edition or use MongoDB Atlas
   - Local installation: https://www.mongodb.com/try/download/community
   - MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

2. **Node.js** - Version 14 or higher
3. **npm** - Node package manager

## Local MongoDB Installation

### Option 1: Install MongoDB Locally

1. Download and install MongoDB Community Edition from:
   https://www.mongodb.com/try/download/community

2. Start MongoDB service:
   - On macOS: `brew services start mongodb-community`
   - On Linux: `sudo systemctl start mongod`
   - On Windows: Use MongoDB Compass or start mongod.exe

3. Verify MongoDB is running:
   ```bash
   mongo --eval 'db.runCommand({ connectionStatus: 1 })'
   ```

### Option 2: Use MongoDB Atlas (Recommended for Development)

1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Set up database access (add a user with password)
4. Configure network access to allow connections from your IP
5. Get your connection string from the cluster dashboard

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
GEMINI_API_KEY="your_gemini_api_key_here"
APP_URL="http://localhost:3000"
MONGODB_URI="mongodb://localhost:27017/chandergari"  # For local MongoDB
# OR for MongoDB Atlas:
# MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/chandergari?retryWrites=true&w=majority"
```

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ChanderGari
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Edit `.env.local` and add your actual values
   - At minimum, set `GEMINI_API_KEY` and `MONGODB_URI`

4. Start the development server:
   ```bash
   npm run dev
   ```

## Database Schema

The application uses the following MongoDB collections:

### Users
Stores user authentication information
- email (string, unique, required)
- passwordHash (string, required)
- firstName (string)
- lastName (string)
- createdAt (date)
- updatedAt (date)

### TravelPlans
Stores saved travel itineraries
- userId (ObjectId, ref: User, required)
- destination (string, required)
- durationDays (number, required)
- budgetType (string, enum: budget/standard/luxury, required)
- maxBudget (number)
- expenses (array of ObjectId, ref: Expense)
- itinerary (array of objects with day, title, activities)
- notes (string)
- groundingUrls (array of {title, url})
- mapsUrls (array of {title, url})
- createdAt (date)
- updatedAt (date)

### GeneratedImages
Stores AI-generated images
- userId (ObjectId, ref: User)
- prompt (string, required)
- imageUrl (string, required)
- ratio (string, required)
- size (string, required)
- studioQuality (boolean)
- createdAt (date)

### GeneratedVideos
Stores AI-generated video metadata
- userId (ObjectId, ref: User)
- operationName (string, required, unique)
- prompt (string, required)
- aspectRatio (string, enum: 16:9/9:16, required)
- videoUrl (string, populated after processing)
- status (string, enum: pending/done/failed, default: pending)
- hasStartingImage (boolean)
- createdAt (date)
- updatedAt (date)

### MediaAnalyses
Stores media analysis results
- userId (ObjectId, ref: User)
- mediaType (string, enum: image/video, required)
- mediaName (string, required)
- previewUrl (string, required)
- analysis (string, required)
- createdAt (date)

### Expenses
Stores individual expense items
- travelPlanId (ObjectId, ref: TravelPlan, required)
- description (string, required)
- category (string, enum: accommodation/transport/food/activities/shopping/other, required)
- amount (number, required, min: 0)
- date (string, required)
- createdAt (date)

### BudgetAdvice
Stores budget advice sessions
- userId (ObjectId, ref: User, required)
- destination (string, required)
- budgetType (string, enum: budget/standard/luxury, required)
- maxBudget: (number, required)
- expenses (array of ObjectId, ref: Expense)
- durationDays (number, required)
- adviceText (string, required)
- createdAt (date)

### ChatMessages
Stores chat history (optional)
- userId (ObjectId, ref: User)
- sender (string, enum: user/gemini, required)
- text (string, required)
- timestamp (date)
- thinking (string)
- latencyMs (number)
- groundingUrls (array of {title, url})

## Verification

To verify that MongoDB is connected and working:

1. Start the application: `npm run dev`
2. Look for the message: `MongoDB Connected: localhost:27017` in the console
3. Register a new user through the API or frontend
4. Check that data is persisted in MongoDB collections

## Troubleshooting

### Connection Issues
- Verify MongoDB is running and accessible
- Check the MONGODB_URI in your .env.local file
- Ensure your IP is whitelisted if using MongoDB Atlas
- Verify username/password credentials

### Performance
- Consider adding indexes to frequently queried fields
- Monitor connection pool usage
- Use MongoDB Compass or similar tools to inspect data

## Production Considerations

1. Use environment variables for sensitive data (never commit .env files)
2. Implement proper error handling and logging
3. Consider using MongoDB Atlas for production deployments
4. Set up monitoring and backups
5. Implement rate limiting and security best practices

## References

- MongoDB Documentation: https://docs.mongodb.com/
- Mongoose Documentation: https://mongoosejs.com/docs/
- Node.js Best Practices: https://github.com/goldbergyoni/nodebestpractices