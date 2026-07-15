import { asyncHandler } from '../utils/asyncHandler.js';
import * as entriesService from '../services/entries.service.js';

export const getEntries = asyncHandler(async (req, res) => {
  const { page, limit, search, moodId, startDate, endDate, favorite } = req.query;
  const result = await entriesService.getEntries(req.user._id, { page, limit, search, moodId, startDate, endDate, favorite });
  res.json({ success: true, ...result });
});

export const getCalendar = asyncHandler(async (req, res) => {
  const year = parseInt(req.query.year, 10) || new Date().getFullYear();
  const month = parseInt(req.query.month, 10) || new Date().getMonth() + 1;
  const result = await entriesService.getCalendarData(req.user._id, year, month);
  res.json({ success: true, ...result });
});

export const getTrash = asyncHandler(async (req, res) => {
  const entries = await entriesService.getTrash(req.user._id);
  res.json({ success: true, entries });
});

export const getEntry = asyncHandler(async (req, res) => {
  const entry = await entriesService.getEntryById(req.user._id, req.params.id);
  res.json({ success: true, entry });
});

export const createEntry = asyncHandler(async (req, res) => {
  const entry = await entriesService.createEntry(req.user._id, req.validatedBody);
  res.status(201).json({ success: true, entry });
});

export const updateEntry = asyncHandler(async (req, res) => {
  const entry = await entriesService.updateEntry(req.user._id, req.params.id, req.validatedBody);
  res.json({ success: true, entry });
});

export const softDeleteEntry = asyncHandler(async (req, res) => {
  const result = await entriesService.softDeleteEntry(req.user._id, req.params.id);
  res.json({ success: true, ...result });
});

export const restoreEntry = asyncHandler(async (req, res) => {
  const entry = await entriesService.restoreEntry(req.user._id, req.params.id);
  res.json({ success: true, entry });
});

export const hardDeleteEntry = asyncHandler(async (req, res) => {
  const result = await entriesService.hardDeleteEntry(req.user._id, req.params.id);
  res.json({ success: true, ...result });
});

export const emptyTrash = asyncHandler(async (req, res) => {
  const result = await entriesService.emptyTrash(req.user._id);
  res.json({ success: true, ...result });
});
