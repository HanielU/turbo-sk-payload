import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { inferAsyncReturnType } from "@trpc/server";
import type { PayloadRequest } from "payload/types";

export const createContext = ({
  req,
  res,
}: CreateExpressContextOptions & { req: PayloadRequest }) => {
  return { req, res, user: req?.user };
};

export type Context = inferAsyncReturnType<typeof createContext>;
