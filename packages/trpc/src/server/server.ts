import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  users: t.router({
    getUserById: publicProcedure.input(z.object({ id: z.number() })).output(z.object({
      id: z.number(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    getAllUsers: publicProcedure.output(z.array(z.object({
      id: z.number(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    createUser: publicProcedure.input(z.object({
      id: z.number(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }).omit({
      id: true,
      createdAt: true,
      updatedAt: true,
    })).output(z.object({
      id: z.number(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateUser: publicProcedure.input(z.object({
      id: z.number(),
      data: z.object({
        id: z.number(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }).omit({
        id: true,
        createdAt: true,
        updatedAt: true,
      }).partial(),
    })).output(z.object({
      id: z.number(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteUser: publicProcedure.input(z.object({
      id: z.number(),
    })).output(z.void()).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});
export type AppRouter = typeof appRouter;

