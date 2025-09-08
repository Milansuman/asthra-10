import { 
  S3Client, 
  PutObjectCommand, 
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  AbortMultipartUploadCommand
} from "@aws-sdk/client-s3";
import * as crypto from "crypto";
import * as path from "path";

// Initialize the S3 client
const s3Client = new S3Client({
  forcePathStyle: true,
  region: "auto",
  endpoint: process.env.S3_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_ID!,
    secretAccessKey: process.env.S3_ACCESS_KEY!
  }
});

export async function uploadFile(file: File, bucketName: string) {
  try {
    const fileContent = new Uint8Array(await file.arrayBuffer());
    const hash = crypto.createHash("sha256").update(file.name).digest("hex");
    const hashedFileName = `${hash}${path.extname(file.name)}`;

    // Set up the S3 upload parameters
    const uploadParams = {
      Bucket: bucketName,
      Key: hashedFileName,
      Body: fileContent,
    };

    // Upload the file to S3
    const command = new PutObjectCommand(uploadParams);
    const response = await s3Client.send(command);

    console.log(`File uploaded successfully. ${response}`);
    return `${process.env.S3_PUBLIC_URL}/${hashedFileName}`
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

// Function to handle base64 image uploads for user profiles
export async function uploadBase64Image(dataUrl: string, bucketName: string = "assets") {
  try {
    // Parse the data URL to extract MIME type and base64 content
    const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

    if (!matches || matches.length !== 3) {
      return null
    }

    const mimeType = matches[1];
    const base64Data = matches[2];

    if(!mimeType || !base64Data){
      throw new Error("invalid data url");
    }

    const buffer = Buffer.from(base64Data, 'base64');

    // Create a hash from the content itself
    const hash = crypto.createHash("sha256").update(buffer).digest("hex");
    const extension = mimeType.split('/')[1] || 'jpg';
    const hashedFileName = `${hash}.${extension}`;

    // Set up the S3 upload parameters
    const uploadParams = {
      Bucket: bucketName,
      Key: hashedFileName,
      Body: buffer,
      ContentType: mimeType,
    };

    // Upload the file to S3
    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    const url = `${process.env.S3_PUBLIC_URL}/${hashedFileName}`;
    console.log(`Image uploaded successfully: ${url}`);
    return {
      url,
      hash,
      mimeType
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}

// Function to handle compressed image uploads
export async function uploadCompressedImage(dataUrl: string, bucketName: string = "assets") {
  try {
    // Parse the data URL to extract MIME type and base64 content
    const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

    if (!matches || matches.length !== 3) {
      return null
    }

    const mimeType = matches[1];
    const base64Data = matches[2];

    if(!mimeType || !base64Data){
      throw new Error("invalid data url");
    }

    const buffer = Buffer.from(base64Data, 'base64');

    // Create a hash from the content itself
    const hash = crypto.createHash("sha256").update(buffer).digest("hex");
    const extension = mimeType.split('/')[1] || 'jpg';
    const hashedFileName = `compressed_${hash}.${extension}`;

    // Set up the S3 upload parameters with metadata indicating compression
    const uploadParams = {
      Bucket: bucketName,
      Key: hashedFileName,
      Body: buffer,
      ContentType: mimeType,
      Metadata: {
        'compression': 'client-compressed',
        'original-format': mimeType
      }
    };

    // Upload the file to S3
    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    const url = `${process.env.S3_PUBLIC_URL}/${hashedFileName}`;
    console.log(`Compressed image uploaded successfully: ${url}`);
    return {
      url,
      hash,
      mimeType
    };
  } catch (error) {
    console.error("Error uploading compressed image:", error);
    return null;
  }
}

// Multipart upload functions
export async function initiateMultipartUpload(fileName: string, contentType: string, bucketName: string = "assets") {
  try {
    const hash = crypto.createHash("sha256").update(fileName + Date.now().toString()).digest("hex");
    const extension = path.extname(fileName);
    const hashedFileName = `${hash}${extension}`;

    const command = new CreateMultipartUploadCommand({
      Bucket: bucketName,
      Key: hashedFileName,
      ContentType: contentType,
    });

    const response = await s3Client.send(command);
    
    return {
      uploadId: response.UploadId!,
      key: hashedFileName,
      bucket: bucketName
    };
  } catch (error) {
    console.error("Error initiating multipart upload:", error);
    throw error;
  }
}

export async function uploadPart(
  bucket: string,
  key: string,
  uploadId: string,
  partNumber: number,
  data: Buffer
) {
  try {
    const command = new UploadPartCommand({
      Bucket: bucket,
      Key: key,
      UploadId: uploadId,
      PartNumber: partNumber,
      Body: data,
    });

    const response = await s3Client.send(command);
    
    return {
      ETag: response.ETag!,
      PartNumber: partNumber,
    };
  } catch (error) {
    console.error(`Error uploading part ${partNumber}:`, error);
    throw error;
  }
}

export async function completeMultipartUpload(
  bucket: string,
  key: string,
  uploadId: string,
  parts: Array<{ ETag: string; PartNumber: number }>
) {
  try {
    const command = new CompleteMultipartUploadCommand({
      Bucket: bucket,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: parts.sort((a, b) => a.PartNumber - b.PartNumber),
      },
    });

    const response = await s3Client.send(command);
    const url = `${process.env.S3_PUBLIC_URL}/${key}`;
    
    console.log(`Multipart upload completed successfully: ${url}`);
    return {
      url,
      key,
      location: response.Location
    };
  } catch (error) {
    console.error("Error completing multipart upload:", error);
    throw error;
  }
}

export async function abortMultipartUpload(
  bucket: string,
  key: string,
  uploadId: string
) {
  try {
    const command = new AbortMultipartUploadCommand({
      Bucket: bucket,
      Key: key,
      UploadId: uploadId,
    });

    await s3Client.send(command);
    console.log(`Multipart upload aborted for key: ${key}`);
  } catch (error) {
    console.error("Error aborting multipart upload:", error);
    throw error;
  }
}