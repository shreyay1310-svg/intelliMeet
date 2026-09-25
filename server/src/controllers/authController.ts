import { Request, Response } from 'express';
import { User } from '../models/User';
import { sendTokenResponse, generateToken, generateRefreshToken, verifyRefreshToken } from '../utils/token';
import { AuthRequest } from '../middleware/auth';
import { AuditLog } from '../models/AuditLog';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, organization, team, role } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide name, email and password',
      });
      return;
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'A user with this email already exists',
      });
      return;
    }

    // Default avatar using Dicebear initials
    const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=2563eb,7c3aed`;

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      avatar,
      organization: organization || 'Zidio Development',
      team: team || 'Product Team',
      role: role === 'admin' ? 'admin' : 'employee',
    });

    await AuditLog.create({
      userId: user._id,
      userName: user.name,
      action: 'USER_REGISTERED',
      resource: 'AUTH',
      details: `New user registered: ${user.email} (${user.role})`,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    });

    await sendTokenResponse(user, 201, res, 'User registered successfully');
  } catch (error: any) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration',
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
      return;
    }

    // Find user with password selected
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials',
      });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials',
      });
      return;
    }

    if (user.status === 'inactive') {
      res.status(403).json({
        success: false,
        message: 'This account has been deactivated. Please contact your administrator.',
      });
      return;
    }

    await AuditLog.create({
      userId: user._id,
      userName: user.name,
      action: 'USER_LOGIN',
      resource: 'AUTH',
      details: `User logged in: ${user.email}`,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    });

    await sendTokenResponse(user, 200, res, 'Logged in successfully');
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during login',
    });
  }
};

// @desc    Get currently authenticated user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }

    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        avatar: req.user.avatar,
        organization: req.user.organization,
        team: req.user.team,
        jobTitle: req.user.jobTitle,
        preferences: req.user.preferences,
        createdAt: req.user.createdAt,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error retrieving user' });
  }
};

// @desc    Update user profile & preferences
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }

    const { name, avatar, jobTitle, team, preferences } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    if (name) user.name = name;
    if (avatar) user.avatar = avatar;
    if (jobTitle) user.jobTitle = jobTitle;
    if (team) user.team = team;
    if (preferences) {
      user.preferences = { ...user.preferences, ...preferences };
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        organization: user.organization,
        team: user.team,
        jobTitle: user.jobTitle,
        preferences: user.preferences,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Profile update failed' });
  }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400).json({ success: false, message: 'Please provide current and new password' });
      return;
    }

    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      res.status(400).json({ success: false, message: 'Current password is incorrect' });
      return;
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to update password' });
  }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      res.status(400).json({ success: false, message: 'Please provide a valid refresh token' });
      return;
    }

    let decoded: any;
    try {
      decoded = verifyRefreshToken(token);
    } catch (err) {
      res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
      return;
    }

    const user = await User.findById(decoded.id).select('+refreshToken');
    if (!user || user.status === 'inactive') {
      res.status(401).json({ success: false, message: 'User not found or account deactivated' });
      return;
    }

    if (user.refreshToken && user.refreshToken !== token) {
      res.status(401).json({ success: false, message: 'Refresh token has been revoked or replaced' });
      return;
    }

    const newAccessToken = generateToken(user._id.toString(), user.role);
    const newRefreshToken = generateRefreshToken(user._id.toString());

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      token: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Token refresh failed' });
  }
};

// @desc    Logout user & invalidate refresh token
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });
    }
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Logout failed' });
  }
};
