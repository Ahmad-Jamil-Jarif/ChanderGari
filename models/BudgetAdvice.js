import mongoose from "mongoose";

const budgetAdviceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  destination: {
    type: String,
    required: true
  },
  budgetType: {
    type: String,
    enum: ['budget', 'standard', 'luxury'],
    required: true
  },
  maxBudget: {
    type: Number,
    required: true
  },
  expenses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expense'
  }],
  durationDays: {
    type: Number,
    required: true
  },
  adviceText: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('BudgetAdvice', budgetAdviceSchema);