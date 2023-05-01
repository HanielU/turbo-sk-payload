import path from "path";
import type { Media } from "payload/generated-types";
import type { CollectionConfig } from "payload/types";

const Media: CollectionConfig = {
  slug: "media",
  access: {
    // Payload's access control functions apply to files also, meaning you can permit or deny file downloads easily
    read: () => true,
    create: () => true,
  },
  admin: {
    useAsTitle: "filename",
    group: "Content",
  },

  // file uploads are stored on the server by default, plugins are available for cloud storage
  // https://github.com/richardvanbergen/payload-plugin-cloud-storage as an example
  upload: {
    // from the imageSizes below, the admin UI will show this size for previewing
    adminThumbnail: "thumbnail",

    // staticDir tell Payload where to store files to and allows them to be served
    staticDir: path.resolve(__dirname, "../../media"),

    // limit the types of files allowed and request validation
    mimeTypes: [
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/svg+xml",
      "application/pdf",
    ],

    // in addition to the original file, Payload saves resized images automatically
    imageSizes: [
      {
        name: "thumbnail",
        width: 480,
        height: 320,
      },
      {
        name: "portrait",
        width: 768,
        height: 1024,
      },
      {
        name: "landscape",
        width: 768,
        height: 360,
      },
      {
        name: "hero",
        width: 1920,
        height: 1080,
      },
    ],
  },

  // upload collections inherit base fields for file information and imageSizes, then add your own for users to change
  fields: [
    {
      name: "alt",
      label: "Alt Text (For accessibility)",
      localized: true,
      type: "text",
      admin: {
        condition: (data: Media) => data.mimeType?.startsWith("image/"),
      },
    },
  ],
};

export default Media;
