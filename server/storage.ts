import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
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
