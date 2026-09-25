import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log('[Cloudinary] Configured with cloud:', process.env.CLOUDINARY_CLOUD_NAME);
} else {
  console.log('[Cloudinary] API keys not found in .env. Running with Data URI fallback mode for avatar uploads.');
}

export const uploadToCloudinary = (
  fileBuffer: Buffer,
  folder: string = 'intellimeet/avatars',
  mimeType: string = 'image/jpeg'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured) {
      // Offline/Local dev fallback: Return base64 Data URI
      const base64 = fileBuffer.toString('base64');
      const dataUri = `data:${mimeType};base64,${base64}`;
      return resolve(dataUri);
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [
          { width: 300, height: 300, crop: 'fill', gravity: 'face' },
          { quality: 'auto', fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) {
          console.warn('[Cloudinary] Upload failed, falling back to base64 Data URI:', error.message);
          const base64 = fileBuffer.toString('base64');
          return resolve(`data:${mimeType};base64,${base64}`);
        }
        resolve(result?.secure_url || '');
      }
    );

    uploadStream.end(fileBuffer);
  });
};

export default cloudinary;
