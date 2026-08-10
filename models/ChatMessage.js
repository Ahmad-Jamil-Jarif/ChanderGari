import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  sender: {
    type: String,
    enum: ['user', 'gemini'],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  thinking: {
    type: String
  },
  latencyMs: {
    type: Number
  },
  groundingUrls: [{
    title: String,
    url: String
  }]
});

export default mongoose.model('ChatMessage', chatMessageSchema);