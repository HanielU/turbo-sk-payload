import crypto from "crypto";
import type { Endpoint } from "payload/config";

const customVerificationEndpoints: Endpoint[] = [
  {
    path: "/verify/:token",
    method: "post",
    handler: async ({ params, collection }, res) => {
      const { token } = params;

      if (!token) {
        return res.status(400).json({ message: "Missing required data." });
      }

      const customer = await collection.Model.findOne({
        _verificationToken: token,
      });

      if (!customer) {
        return res
          .status(400)
          .json({ message: "Verification token is invalid" });
      }

      if (customer && customer._verified === true) {
        return res.status(400).json({ message: "Account already verified." });
      }

      customer._verified = true;
      customer._verificationToken = undefined;

      await customer.save();

      return res.status(200).json({
        message: "Account verified.",
        verified: true,
      });
    },
  },

  {
    path: "/resend-verification",
    method: "post",
    handler: async ({ user, collection, payload }, res) => {
      if (user?._verified === true) {
        return res.status(400).json({ message: "Account already verified." });
      }

      const customer = await collection.Model.findOne({
        _id: user?.id,
      });

      if (!customer) {
        return res.status(400).json({ message: "Account not found." });
      }

      customer._verificationToken = crypto.randomBytes(20).toString("hex");
      await customer.save();

      await payload.sendEmail({
        from: payload.emailOptions.fromAddress,
        to: customer?.email,
        subject: "Confirm your email",
        html: `<a
            href="http://localhost:5173/auth/verify/api?token=${customer?._verificationToken}"
            >Click here to confirm your email</a
          >`,
      });

      return res.status(200).json({ message: "Verification email sent." });
    },
  },
];

export default customVerificationEndpoints;
