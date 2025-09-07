import sharp from 'sharp';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  forcePathStyle: true,
  region: "auto",
  endpoint: process.env.S3_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_ID!,
    secretAccessKey: process.env.S3_ACCESS_KEY!
  }
});

export interface DecompressionOptions {
  targetWidth?: number;
  targetHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
}

export async function decompressImageFromS3(
  s3Key: string, 
  bucketName: string = "assets",
  options: DecompressionOptions = {}
): Promise<Buffer> {
  try {
    // Download the compressed image from S3
    const getObjectCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: s3Key
    });

    const response = await s3Client.send(getObjectCommand);
    
    if (!response.Body) {
      throw new Error('Failed to fetch image from S3');
    }

    // Convert stream to buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of response.Body as any) {
      chunks.push(chunk);
    }
    const imageBuffer = Buffer.concat(chunks);

    // Use Sharp for high-quality image processing
    let sharpInstance = sharp(imageBuffer);

    // Apply decompression/enhancement options
    if (options.targetWidth || options.targetHeight) {
      sharpInstance = sharpInstance.resize(options.targetWidth, options.targetHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    // Apply quality and format settings
    switch (options.format) {
      case 'jpeg':
        sharpInstance = sharpInstance.jpeg({ 
          quality: options.quality || 95,
          progressive: true
        });
        break;
      case 'png':
        sharpInstance = sharpInstance.png({ 
          quality: options.quality || 95,
          compressionLevel: 1
        });
        break;
      case 'webp':
        sharpInstance = sharpInstance.webp({ 
          quality: options.quality || 95,
          lossless: false
        });
        break;
      default:
        // Auto-detect based on original format
        sharpInstance = sharpInstance.jpeg({ 
          quality: options.quality || 95 
        });
    }

    return await sharpInstance.toBuffer();
    
  } catch (error) {
    console.error('Error decompressing image:', error);
    throw new Error('Failed to decompress image');
  }
}

export async function enhanceCompressedImage(
  imageBuffer: Buffer,
  options: DecompressionOptions = {}
): Promise<Buffer> {
  try {
    let sharpInstance = sharp(imageBuffer);

    // Apply enhancement processing
    sharpInstance = sharpInstance
      .sharpen(1.0, 1.0, 2.0) // Sharpen slightly to counteract compression artifacts
      .modulate({
        brightness: 1.02, // Slight brightness boost
        saturation: 1.05  // Slight saturation boost
      });

    // Apply size and quality options
    if (options.targetWidth || options.targetHeight) {
      sharpInstance = sharpInstance.resize(options.targetWidth, options.targetHeight, {
        fit: 'inside',
        withoutEnlargement: true,
        kernel: sharp.kernel.lanczos3 // High-quality resampling
      });
    }

    // Output with high quality
    switch (options.format) {
      case 'jpeg':
        return await sharpInstance.jpeg({ 
          quality: options.quality || 95,
          progressive: true,
          mozjpeg: true // Use mozjpeg for better compression
        }).toBuffer();
      case 'png':
        return await sharpInstance.png({ 
          quality: options.quality || 95,
          compressionLevel: 1,
          adaptiveFiltering: true
        }).toBuffer();
      case 'webp':
        return await sharpInstance.webp({ 
          quality: options.quality || 95,
          effort: 6 // Maximum effort for best quality
        }).toBuffer();
      default:
        return await sharpInstance.jpeg({ 
          quality: options.quality || 95,
          progressive: true
        }).toBuffer();
    }
    
  } catch (error) {
    console.error('Error enhancing image:', error);
    throw new Error('Failed to enhance compressed image');
  }
}
