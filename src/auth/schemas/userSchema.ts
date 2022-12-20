import { z } from "zod";

const messages = {
  min: (field: string, length: number) =>
    `O campo "${field}" precisa ter pelo menos ${length} letras.`,
  max: (field: string, length: number) =>
    `O campo "${field}" deve ter ate ${length} letras.`,
  emailInvalid: "O email digitado é invalido",
};

const nameMinLength = 2;
const nameMaxLength = 24;

const name = z
  .string()
  .min(nameMinLength, { message: messages.min("nome", nameMinLength) })
  .max(nameMaxLength, { message: messages.max("nome", nameMaxLength) });

const email = z.string().email({
  message: messages.emailInvalid,
});

const passwordMinLength = 8;
const passwordMaxLength = 64;

const password = z
  .string()
  .min(passwordMinLength, { message: messages.min("senha", passwordMinLength) })
  .max(passwordMaxLength, {
    message: messages.max("senha", passwordMaxLength),
  });

export const userSchema = z.object({
  name,
  email,
  password,
});

export type UserSchema = z.infer<typeof userSchema>;
