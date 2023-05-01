import Categories from "./collections/Categories";
import Customers from "./collections/Customers";
import Media from "./collections/Media";
import Posts from "./collections/Posts";
import Tags from "./collections/Tags";
import Users from "./collections/Users";
// import nestedDocs from "@payloadcms/plugin-nested-docs";
import path from "path";
import seo from "@payloadcms/plugin-seo";
import whitelist from "./whitelists";
import { buildConfig } from "payload/config";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";

const dev = process.env.NODE_ENV !== "production";
const mockModulePath = path.resolve(__dirname, "emptyObject_s.ts");

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    webpack: config => ({
      ...config,
      resolve: {
        ...(config.resolve || {}),
        alias: {
          ...(config.resolve.alias || {}),
          fs: mockModulePath,
        },
      },
    }),
  },
  cors: whitelist,
  csrf: whitelist,
  collections: [Categories, Customers, Media, Posts, Tags, Users],
  plugins: [
    // nestedDocs({
    //   collections: ["comments", "pages"],
    //   parentFieldSlug: "parent",
    // }),

    // FormBuilder(),

    seo({
      collections: ["posts"],
      uploadsCollection: "media",
      tabbedUI: true,
      generateTitle: ({ doc }: any) => `${doc?.title?.value} / My Site`,
      generateDescription: ({ doc }: any) => doc?.postPreview?.value,
      generateImage: ({ doc }: any) => doc?.heroImg?.value,

      // I believe this only works in production
      generateURL: ({ doc }: any) =>
        `https://www.mysite.com/blog/posts/${doc?.slug?.value}`,
    }),

    cloudStorage({
      collections: {
        media: {
          disableLocalStorage: !dev,
          adapter: dev
            ? null
            : s3Adapter({
                config: {
                  region: process.env.S3_REGION,
                  credentials: {
                    accessKeyId: process.env.S3_ACCESS_KEY_ID,
                    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
                  },
                },
                bucket: process.env.S3_BUCKET,
              }),
        },
      },
    }),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "payload-schema.graphql"),
  },
});
