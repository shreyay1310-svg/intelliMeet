import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { User } from '../models/User';
import { uploadToCloudinary } from '../config/cloudinary';

// @desc    Get all users / team members
// @route   GET /api/users
// @access  Private
export const getUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { role, team, status, search } = req.query;
    const filter: any = {};

    if (role && role !== 'all') filter.role = role;
    if (team && team !== 'all') filter.team = team;
    if (status && status !== 'all') filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 });

    const formattedUsers = users.map((u) => ({
      id: u._id,
      _id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      avatar: u.avatar,
      organization: u.organization,
      team: u.team,
      jobTitle: u.jobTitle,
      status: u.status,
      createdAt: u.createdAt,
    }));

    res.status(200).json({ success: true, count: formattedUsers.length, users: formattedUsers });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
export const getUserById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    res.status(200).json({ success: true, user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Upload avatar for current user via Cloudinary
// @route   POST /api/users/avatar
// @access  Private
export const uploadAvatar = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'Please provide an image file to upload' });
      return;
    }

    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }

    const avatarUrl = await uploadToCloudinary(
      req.file.buffer,
      'intellimeet/avatars',
      req.file.mimetype
    );

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: avatarUrl },
      { new: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'Avatar uploaded and profile updated successfully',
      avatarUrl,
      user,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Avatar upload failed' });
  }
};
