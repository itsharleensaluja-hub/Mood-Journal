import mongoose from 'mongoose';
import { MOOD_IDS } from '../utils/constants.js';

const entrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  moodId: {
    type: String,
    required: [true, 'Mood is required'],
    enum: {
      values: MOOD_IDS,
      message: 'Mood must be one of: ' + MOOD_IDS.join(', '),
    },
  },
  note: {
    type: String,
    default: '',
    maxlength: [10000, 'Note must be at most 10000 characters'],
    trim: true,
  },
  imageUrl: {
    type: String,
    default: null,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

entrySchema.index({ userId: 1, createdAt: -1 });
entrySchema.index({ userId: 1, deletedAt: 1 });
entrySchema.index({ userId: 1, isFavorite: 1 });
entrySchema.index({ userId: 1, moodId: 1 });
entrySchema.index({ note: 'text' });

entrySchema.pre(/^find/, function () {
  const filter = this.getFilter();
  if (filter.deletedAt === undefined) {
    this.where({ deletedAt: null });
  }
});

export const Entry = mongoose.model('Entry', entrySchema);
