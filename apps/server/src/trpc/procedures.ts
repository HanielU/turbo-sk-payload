import superjson from "superjson";
import type { Context } from "./context";
import { initTRPC, TRPCError } from "@trpc/server";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const middleware = t.middleware;
export const router = t.router;

/**
 * Unprotected procedure
 */
export const publicProcedure = t.procedure;

const isAuthed = middleware(({ next, ctx }) => {
  // console.log(ctx);
  if (!ctx.user?.email) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return next({
    ctx: {
      // Infers the `session` as non-nullable
      user: ctx.user,
    },
  });
});

export const protectedProcedure = publicProcedure.use(isAuthed);
export const adminProcedure = protectedProcedure.use(({ next, ctx }) => {
  if (ctx.user.collection !== "users") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return next({
    ctx: {
      // Infers the `session` as non-nullable
      user: ctx.user,
    },
  });
});
