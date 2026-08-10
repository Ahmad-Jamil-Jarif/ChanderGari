import mongoose from "mongoose";

const transportationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['bus', 'train', 'flight'],
    required: true
  },
  from: {
    type: String,
    required: true,
    trim: true
  },
  to: {
    type: String,
    required: true,
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
  departureTime: {
    type: String, // Storing as string for simplicity, could be Date
    required: true
  },
  arrivalTime: {
    type: String, // Storing as string for simplicity, could be Date
    required: true
  },
  duration: {
    type: String, // e.g., "2h 30m"
    required: true
  },
  provider: {
    type: String,
    trim: true
  },
  class: {
    type: String,
    enum: ['economy', 'business', 'first'],
    default: 'economy'
  },
  seatsAvailable: {
    type: Number,
    default: 0
  },
  bookingReference: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  status: {
    type: String,
    enum: ['available', 'booked', 'cancelled'],
    default: 'available'
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
transportationSchema.index({ from: 1, to: 1, type: 1 });
transportationSchema.index({ price: 1 });

export default mongoose.model('Transportation', transportationSchema);