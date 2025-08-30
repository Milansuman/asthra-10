import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { uploadBase64Image } from '@/server/storage';

export const uploadRouter = createTRPCRouter({
  uploadImage: protectedProcedure
    .input(
      z.object({
        dataUrl: z.string(),
        bucketName: z.string().default('assets'),
      })
    )
    .mutation(async ({ input }) => {
      const result = await uploadBase64Image(input.dataUrl, "assets");
      
      if (!result) {
        throw new Error('Failed to upload image');
      }
      
      return {
        url: result.url,
        hash: result.hash,
        mimeType: result.mimeType,
      };
    }),

  uploadFile: protectedProcedure
    .input(
      z.object({
        file: z.instanceof(File),
        bucketName: z.string().default('posters'),
      })
    )
    .mutation(async ({ input }) => {
      // Note: This would need to be handled differently in tRPC
      // as File objects don't serialize well over the network
      // We'll primarily use the base64 upload for images
      throw new Error('Direct file upload not implemented. Use uploadImage with base64 data.');
    }),
});
