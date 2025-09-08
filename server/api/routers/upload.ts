import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { 
  uploadBase64Image, 
  initiateMultipartUpload, 
  uploadPart, 
  completeMultipartUpload, 
  abortMultipartUpload,
  uploadCompressedImage
} from '@/server/storage';

export const uploadRouter = createTRPCRouter({
  uploadImage: protectedProcedure
    .input(
      z.object({
        dataUrl: z.string(),
        bucketName: z.string().default('assets'),
        isCompressed: z.boolean().default(false),
      })
    )
    .mutation(async ({ input }) => {
      let result;
      
      if (input.isCompressed) {
        result = await uploadCompressedImage(input.dataUrl, "assets");
      } else {
        result = await uploadBase64Image(input.dataUrl, "assets");
      }
      
      if (!result) {
        throw new Error('Failed to upload image');
      }
      
      return {
        url: result.url,
        hash: result.hash,
        mimeType: result.mimeType,
      };
    }),

  initiateMultipartUpload: protectedProcedure
    .input(
      z.object({
        fileName: z.string(),
        contentType: z.string(),
        bucketName: z.string().default('assets'),
      })
    )
    .mutation(async ({ input }) => {
      return await initiateMultipartUpload(input.fileName, input.contentType, "assets");
    }),

  uploadPart: protectedProcedure
    .input(
      z.object({
        bucket: z.string(),
        key: z.string(),
        uploadId: z.string(),
        partNumber: z.number(),
        data: z.string(), // base64 encoded part data
      })
    )
    .mutation(async ({ input }) => {
      const buffer = Buffer.from(input.data, 'base64');
      return await uploadPart("assets", input.key, input.uploadId, input.partNumber, buffer);
    }),

  completeMultipartUpload: protectedProcedure
    .input(
      z.object({
        bucket: z.string(),
        key: z.string(),
        uploadId: z.string(),
        parts: z.array(z.object({
          ETag: z.string(),
          PartNumber: z.number(),
        })),
      })
    )
    .mutation(async ({ input }) => {
      return await completeMultipartUpload("assets", input.key, input.uploadId, input.parts);
    }),

  abortMultipartUpload: protectedProcedure
    .input(
      z.object({
        bucket: z.string(),
        key: z.string(),
        uploadId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await abortMultipartUpload("assets", input.key, input.uploadId);
      return { success: true };
    }),
});
