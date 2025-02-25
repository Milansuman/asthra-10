
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  publicProcedure
} from "../trpc";
import { z } from "zod";

export const shortnerRouter = createTRPCRouter({
  shorten: publicProcedure.input(z.object({
    url: z.string(),
    name: z.string()
  })).mutation(async ({input}) => {
    const response = await fetch("https://sjcet.in/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: input.url,
        name: input.name
      })
    })

    if(!response.ok){
      console.log(await response.text());
      return new TRPCError({
        message: "An error occurred when shortening the url",
        code: "INTERNAL_SERVER_ERROR"
      })
    }

    const {url}: {url: string} = await response.json();
    return { url }
  })
})