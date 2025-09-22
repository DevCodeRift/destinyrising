import { put, del, list } from '@vercel/blob';

export interface UploadImageOptions {
  filename: string;
  folder?: string;
  contentType?: string;
}

export interface ImageUploadResult {
  url: string;
  pathname: string;
  size?: number;
}

/**
 * Upload an image file to Vercel Blob storage
 */
export async function uploadImage(
  file: File | Buffer,
  options: UploadImageOptions
): Promise<ImageUploadResult> {
  try {
    const { filename, folder = 'items', contentType } = options;

    // Generate a unique filename with folder structure
    const timestamp = Date.now();
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const pathname = `${folder}/${timestamp}_${sanitizedFilename}`;

    const blob = await put(pathname, file, {
      access: 'public',
      contentType: contentType || (file instanceof File ? file.type : 'image/jpeg'),
    });

    return {
      url: blob.url,
      pathname: blob.pathname,
      size: file instanceof File ? file.size : 0,
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
}

/**
 * Delete an image from Vercel Blob storage
 */
export async function deleteImage(url: string): Promise<void> {
  try {
    await del(url);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image');
  }
}

/**
 * List images in a specific folder
 */
export async function listImages(folder: string = 'items', limit: number = 100) {
  try {
    const { blobs } = await list({
      prefix: folder,
      limit,
    });

    return blobs.map(blob => ({
      url: blob.url,
      pathname: blob.pathname,
      size: 0, // Size not available from list API
      uploadedAt: blob.uploadedAt,
    }));
  } catch (error) {
    console.error('Error listing images:', error);
    throw new Error('Failed to list images');
  }
}

/**
 * Validate image file before upload
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Allowed types: JPEG, PNG, WebP, GIF',
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File too large. Maximum size is 10MB',
    };
  }

  return { valid: true };
}

/**
 * Generate optimized image variants (thumbnails, etc.)
 */
export function getImageVariants(baseUrl: string) {
  // Vercel Blob doesn't have built-in image optimization
  // You might want to use Next.js Image Optimization or external services
  return {
    original: baseUrl,
    thumbnail: `${baseUrl}?w=150&h=150&fit=crop`,
    medium: `${baseUrl}?w=400&h=400&fit=crop`,
    large: `${baseUrl}?w=800&h=800&fit=crop`,
  };
}

/**
 * Extract filename from blob URL
 */
export function extractFilenameFromUrl(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    return pathname.split('/').pop() || 'unknown';
  } catch {
    return 'unknown';
  }
}