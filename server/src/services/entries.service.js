import { Entry } from '../models/Entry.js';
import { ApiError } from '../utils/ApiError.js';

function buildFilter(userId, { search, moodId, startDate, endDate, favorite, includeDeleted } = {}) {
  const filter = { userId };

  if (!includeDeleted) {
    filter.deletedAt = null;
  }

  if (search) {
    filter.$or = [
      { note: { $regex: search, $options: 'i' } },
    ];
  }

  if (moodId) {
    filter.moodId = moodId;
  }

  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) filter.createdAt.$lte = new Date(endDate);
  }

  if (favorite !== undefined) {
    filter.isFavorite = favorite === 'true' || favorite === true;
  }

  return filter;
}

export async function getEntries(userId, { page = 1, limit = 10, search, moodId, startDate, endDate, favorite } = {}) {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
  const skip = (pageNum - 1) * limitNum;

  const filter = buildFilter(userId, { search, moodId, startDate, endDate, favorite });

  const [entries, total] = await Promise.all([
    Entry.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Entry.countDocuments(filter),
  ]);

  return {
    entries,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum),
      hasMore: skip + entries.length < total,
    },
  };
}

export async function getCalendarData(userId, year, month) {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);

  const entries = await Entry.find({
    userId,
    deletedAt: null,
    createdAt: { $gte: start, $lte: end },
  })
    .sort({ createdAt: -1 })
    .select('moodId note createdAt')
    .lean();

  const dateSet = new Set(entries.map(e => {
    const d = new Date(e.createdAt);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }));

  return { dates: Array.from(dateSet).sort(), entries };
}

export async function getTrash(userId) {
  const entries = await Entry.find({ userId, deletedAt: { $ne: null } })
    .sort({ deletedAt: -1 })
    .lean();
  return entries;
}

export async function getEntryById(userId, entryId) {
  const entry = await Entry.findOne({ _id: entryId, userId }).lean();
  if (!entry) {
    throw ApiError.notFound('Entry not found');
  }
  return entry;
}

export async function createEntry(userId, { moodId, note, imageUrl }) {
  const entry = await Entry.create({ userId, moodId, note, imageUrl });
  return entry.toJSON();
}

export async function updateEntry(userId, entryId, updates) {
  const allowed = {};
  if (updates.moodId !== undefined) allowed.moodId = updates.moodId;
  if (updates.note !== undefined) allowed.note = updates.note;
  if (updates.imageUrl !== undefined) allowed.imageUrl = updates.imageUrl;
  if (updates.isFavorite !== undefined) allowed.isFavorite = updates.isFavorite;

  const entry = await Entry.findOneAndUpdate(
    { _id: entryId, userId, deletedAt: null },
    { $set: allowed },
    { new: true, runValidators: true },
  );

  if (!entry) {
    throw ApiError.notFound('Entry not found');
  }
  return entry;
}

export async function softDeleteEntry(userId, entryId) {
  const entry = await Entry.findOneAndUpdate(
    { _id: entryId, userId, deletedAt: null },
    { $set: { deletedAt: new Date() } },
    { new: true },
  );
  if (!entry) {
    throw ApiError.notFound('Entry not found');
  }
  return { message: 'Entry moved to trash', entry };
}

export async function restoreEntry(userId, entryId) {
  const entry = await Entry.findOneAndUpdate(
    { _id: entryId, userId, deletedAt: { $ne: null } },
    { $set: { deletedAt: null } },
    { new: true },
  );
  if (!entry) {
    throw ApiError.notFound('Entry not found in trash');
  }
  return entry;
}

export async function hardDeleteEntry(userId, entryId) {
  const entry = await Entry.findOneAndDelete({ _id: entryId, userId, deletedAt: { $exists: true } });
  if (!entry) {
    throw ApiError.notFound('Entry not found');
  }
  return { message: 'Entry permanently deleted' };
}

export async function emptyTrash(userId) {
  const result = await Entry.deleteMany({ userId, deletedAt: { $ne: null } });
  return { message: `Trash emptied (${result.deletedCount} entries)` };
}
