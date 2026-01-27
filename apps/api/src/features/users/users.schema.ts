import z from "zod";

export const usersSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const createUserSchema = usersSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const updateUserSchema = createUserSchema.partial();

export type UsersSchema = z.infer<typeof usersSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;