import { userSchema } from "./userSchema";
import * as userRepository from "../userRepository";
import bcrypt from "bcrypt";

const messages = {
  emailExists: "Esse email já está cadastrado",
};

export const createUserSchema = userSchema
  .transform(async (user) => ({
    ...user,
    name: user.name.trim(),
    password: await bcrypt.hash(user.password, await bcrypt.genSalt(10)),
  }))
  .refine(
    async ({ email }) => {
      const user = await userRepository.findByEmail(email);

      return user === null;
    },
    {
      message: messages.emailExists,
      path: ["email"],
    }
  );
