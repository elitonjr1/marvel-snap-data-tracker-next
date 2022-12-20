import { z } from "zod";
import { nameSchema } from "./base/nameSchema";
import { emailSchema } from "./base/emailSchema";

export const baseUserSchema = z.object({
  name: nameSchema,
  email: emailSchema,
});

export type BaseUserSchema = z.infer<typeof baseUserSchema>;
