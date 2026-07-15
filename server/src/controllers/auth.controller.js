import { asyncHandler } from '../utils/asyncHandler.js';
import * as authService from '../services/auth.service.js';

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.validatedBody;
  const result = await authService.registerUser({ name, email, password });
  res.status(201).json({ success: true, ...result });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validatedBody;
  const result = await authService.loginUser({ email, password });
  res.json({ success: true, ...result });
});

export const logout = asyncHandler(async (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getUserProfile(req.user._id);
  res.json({ success: true, user });
});

export const updateMe = asyncHandler(async (req, res) => {
  const user = await authService.updateUserProfile(req.user._id, req.validatedBody);
  res.json({ success: true, user });
});

export const deleteMe = asyncHandler(async (req, res) => {
  const { password } = req.validatedBody;
  const result = await authService.deleteUserAccount(req.user._id, password);
  res.json({ success: true, ...result });
});
