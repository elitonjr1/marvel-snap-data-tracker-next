import { z } from "zod";
import { allowedProvidersList } from "../../../../src/auth/allowedProviders";

const messages = {
  invalidProvider:
    "Roubei esse codigo todo da autenticacao professor kkkkkk, a vida como ela é",
};

export const providerSchema = z
  .string()
  .refine((provider) => allowedProvidersList.includes(provider), {
    message: messages.invalidProvider,
  });
