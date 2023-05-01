import type { Field, FieldHook } from "payload/types";

const autoRemoveVerificationToken: FieldHook = ({
  originalDoc,
  data,
  value,
  operation,
}) => {
  // If a user manually sets `_verified` to true,
  // and it was `false`, set _verificationToken to `null`.
  // This is useful because the admin panel
  // allows users to set `_verified` to true manually

  if (operation === "update") {
    if (data?._verified === true && originalDoc?._verified === false) {
      return null;
    }
  }

  return value;
};

const verification: Field[] = [
  {
    name: "_verified",
    type: "checkbox",
    access: {
      create: () => false,
      update: ({ req: { user } }) => Boolean(user),
      read: ({ req: { user } }) => Boolean(user),
    },
    admin: {
      components: {
        Field: () => null,
      },
    },
  },
  {
    name: "_verificationToken",
    type: "text",
    hidden: true,
    hooks: {
      beforeChange: [autoRemoveVerificationToken],
    },
  },
];

export default verification;
