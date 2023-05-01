/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
  watchSchema: {
    url: "http://localhost:3000/api/graphql",
  },
  plugins: {
    "houdini-svelte": {},
  },
  scalars: {
    EmailAddress: {
      type: "string",
    },
    DateTime: {
      type: "string",
    },
    JSON: {
      // <- The GraphQL Scalar
      type: "Record<string, any>", // <-  The TypeScript type
    },
  },
};

export default config;
