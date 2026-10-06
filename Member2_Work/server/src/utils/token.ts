import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { IUser } from '../models/User';

export const generateToken = (userId: string, role: string): string => {
  const secret = process.env.JWT_SECRET || 'super_secret_intellimeet_jwt_key_2026_dev';
  return jwt.sign({ id: userId, role }, secret, { expiresIn: '1d' });
};

export const generateRefreshToken = (userId: string): string => {
  const refreshSecret = process.env.JWT_REFRESH_SECRET || 'super_secret_intellimeet_refresh_key_2026_dev';
  return jwt.sign({ id: userId }, refreshSecret, { expiresIn: '30d' });
};

export const verifyRefreshToken = (token: string): any => {
  const refreshSecret = process.env.JWT_REFRESH_SECRET || 'super_secret_intellimeet_refresh_key_2026_dev';
  return jwt.verify(token, refreshSecret);
};

export const sendTokenResponse = async (
  user: IUser,
  statusCode: number,
  res: Response,
  message: string = 'Success'
) => {
  const token = generateToken(user._id.toString(), user.role);
  const refreshToken = generateRefreshToken(user._id.toString());

  // Save refresh token on user document
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  res.status(statusCode).json({
    success: true,
    message,
    token,
    refreshToken,
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
      createdAt: user.createdAt,
    },
  });
};
