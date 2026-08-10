import mongoose from "mongoose";

const travelPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  durationDays: {
    type: Number,
    required: true
  },
  budgetType: {
    type: String,
    enum: ['budget', 'standard', 'luxury'],
    required: true
  },
  maxBudget: {
    type: Number
  },
  expenses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expense'
  }],
  itinerary: [{
    day: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    activities: [{
      type: String
    }]
  }],
  notes: {
    type: String
  },
  groundingUrls: [{
    title: String,
    url: String
  }],
  mapsUrls: [{
    title: String,
    url: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('TravelPlan', travelPlanSchema);