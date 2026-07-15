import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  text: {
    type: String,
    required: [true, 'Goal text is required'],
    trim: true,
    maxlength: [500, 'Goal must be at most 500 characters'],
  },
  date: {
    type: String,
    required: true,
    match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

goalSchema.index({ userId: 1, date: -1 });

export const Goal = mongoose.model('Goal', goalSchema);
