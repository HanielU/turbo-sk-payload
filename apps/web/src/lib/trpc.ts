import superjson from "superjson";
import type { AppRouter } from "../../../server/src/trpc/router";
import type { LoadEvent } from "@sveltejs/kit";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { PUBLIC_SERVER_URL } from "$env/static/public";

export const trpc = (params?: {
  fetch?: LoadEvent["fetch"];
  token?: string;
  serverUrl?: string;
}) =>
  createTRPCProxyClient<AppRouter>({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: (params?.serverUrl || PUBLIC_SERVER_URL) + "/trpc",
        fetch(url, options) {
          const fetchOpts: RequestInit = {
            ...options,
            ...(params?.token
              ? {
                  headers: {
                    Authorization: `JWT ${params?.token}`,
                  },
                }
              : {
                  credentials: "include",
                }),
          };
          if (params?.fetch) {
            const { fetch: loadFetch } = params;
            return loadFetch(url, fetchOpts);
          }
          return fetch(url, fetchOpts);
        },
      }),
    ],
  });
