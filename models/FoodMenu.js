import mongoose from "mongoose";

const foodMenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['appetizer', 'main course', 'dessert', 'beverage', 'snack'],
    required: true
  },
  cuisine: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  description: {
    type: String,
    trim: true
  },
  isVegetarian: {
    type: Boolean,
    default: false
  },
  isVegan: {
    type: Boolean,
    default: false
  },
  isSpicy: {
    type: Boolean,
    default: false
  },
  calories: {
    type: Number,
    min: 0
  },
  hotelName: {
    type: String,
    trim: true
  },
  destination: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  availability: {
    type: String,
    enum: ['always', 'breakfast', 'lunch', 'dinner', 'weekends'],
    default: 'always'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
foodMenuSchema.index({ destination: 1, category: 1 });
foodMenuSchema.index({ price: 1 });
foodMenuSchema.index({ cuisine: 1 });

export default mongoose.model('FoodMenu', foodMenuSchema);