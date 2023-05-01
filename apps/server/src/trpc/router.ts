import { publicProcedure } from "./procedures";
import { router } from "./procedures";

/* 
  NOTE:
  Do not use path aliases for type imports else api consumers
  will get incorrect typings.
*/

export const appRouter = router({
  greeting: publicProcedure.query(() => "Hello world!"),
});

export type AppRouter = typeof appRouter;
