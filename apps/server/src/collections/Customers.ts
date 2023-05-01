import type { CollectionConfig } from "payload/types";
import VerificationFields from "../fields/verification";
import customVerificationEndpoints from "../endpoints/auth";

const Customers: CollectionConfig = {
  slug: "customers",
  auth: {
    // 8 hours
    tokenExpiration: 28800,
    cookies: {
      secure: true,
      sameSite: "none",
      domain: process.env.COOKIE_DOMAIN,
    },
  },
  fields: [
    {
      name: "firstName",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      required: true,
    },
    {
      name: "phoneNumber",
      type: "text",
      required: false,
    },
    {
      name: "dateOfBirth",
      type: "date",
      required: false,
    },
    {
      name: "gender",
      type: "select",
      hasMany: true,
      options: [
        {
          label: "Male",
          value: "male",
        },
        {
          label: "Female",
          value: "female",
        },
      ],
    },
    {
      name: "viewPost",
      type: "relationship",
      relationTo: "posts",
      hasMany: true,
    },
    {
      name: "likes",
      type: "relationship",
      relationTo: "posts",
      hasMany: true,
    },
    {
      name: "likeCount",
      type: "number",
      defaultValue: 0,
    },

    ...VerificationFields,
  ],
  endpoints: customVerificationEndpoints,
};

export default Customers;
