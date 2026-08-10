import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  priceRange: {
    type: String,
    enum: ['budget', 'standard', 'luxury'],
    required: true
  },
  pricePerNight: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  amenities: [{
    type: String,
    trim: true
  }],
  address: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  availableRooms: {
    type: Number,
    default: 0
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
hotelSchema.index({ destination: 1, priceRange: 1 });
hotelSchema.index({ pricePerNight: 1 });

export default mongoose.model('Hotel', hotelSchema);