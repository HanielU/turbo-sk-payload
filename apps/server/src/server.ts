import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import payload from "payload";
import whitelist from "./whitelists";
import { appRouter } from "./trpc/router";
import { createContext } from "./trpc/context";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// add multiple origins to allowlist
app.use(
  cors({
    origin: whitelist,
    credentials: true,
  })
);

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

// Cache media files for 1 year
app.use((req, res, next) => {
  if (req.path.includes("/media/")) {
    res.set("Cache-Control", "public, max-age=31560000");
  }
  next();
});

// Add your own express routes here

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGO_URL,
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
    // email: {
    //   transportOptions: {
    //     host: process.env.SMTP_HOST,
    //     auth: {
    //       user: process.env.SMTP_USER,
    //       pass: process.env.SMTP_PASS,
    //     },
    //     port: +process.env.SMTP_PORT,
    //     secure: true, // use TLS
    //     tls: {
    //       // do not fail on invalid certs
    //       rejectUnauthorized: false,
    //     },
    //   },
    //   fromName: "MySite",
    //   fromAddress: "mysite@mysite.com",
    // },
  });

  // subscriptionTask.start()

  app.use(payload.authenticate);

  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // const IP = getIPAddress();
  app.listen(
    +port,
    /* IP, */ () => {
      // console.log(`API Server listening on ${IP}:${port}`);
      console.log(`API Server listening on port: ${port}`);
    }
  );
};

// import os from "os";
// function getIPAddress() {
//   const interfaces = os.networkInterfaces();
//   for (const name in interfaces) {
//     const iface = interfaces[name];
//     for (let i = 0; i < iface.length; i++) {
//       const { address, family, internal } = iface[i];
//       if (family === "IPv4" && !internal) {
//         return address;
//       }
//     }
//   }
// }

start();
