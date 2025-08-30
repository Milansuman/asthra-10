// lib/upload-utils.ts - New utility file for handling uploads
/**
 * Utility functions for handling file uploads to S3
 */

/**
 * Uploads a base64 image to S3
 * @param base64Data The base64 encoded image data
 * @returns Promise resolving to the uploaded image URL
 */
export async function uploadBase64ToS3(base64Data: string): Promise<string> {
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: base64Data }),
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
}

/**
 * Converts a File object to base64
 * @param file The file to convert
 * @returns Promise resolving to the base64 string
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}