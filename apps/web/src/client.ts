import { HoudiniClient } from "$houdini";
import { PUBLIC_SERVER_URL } from "$env/static/public";
import { error } from "@sveltejs/kit";

export default new HoudiniClient({
  url: PUBLIC_SERVER_URL + "/api/graphql",

  // uncomment this to configure the network call (for things like authentication)
  // for more information, please visit here: https://www.houdinigraphql.com/guides/authentication
  fetchParams({ session }) {
    return {
      ...(session?.token
        ? {
            headers: {
              Authorization: `JWT ${session?.token}`,
            },
          }
        : {
            credentials: "include",
          }),
    };
  },
  throwOnError: {
    // can be any combination of
    // query, mutation, subscription, and all
    operations: ["all"],
    // the function to call
    error: (errors, ctx) =>
      error(
        500,
        `(${ctx.artifact.name}): ` +
          errors.map(err => err.message).join(". ") +
          "."
      ),
  },
});
