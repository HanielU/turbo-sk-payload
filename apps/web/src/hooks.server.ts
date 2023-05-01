import type { Handle } from "@sveltejs/kit";
// import { RAILWAY_API_URL } from "$env/static/private";
import { setSession } from "$houdini";
// import { trpc } from "$lib/trpc";

export const handle: Handle = async ({ event, resolve }) => {
  const cookiesStr = event.request.headers.get("cookie") || "";
  const cookies = parseCookies(cookiesStr);
  const payloadToken = cookies?.["payload-token"] || "";

  // const user = await trpc({
  //   fetch: event.fetch,
  //   token: payloadToken,
  //   serverUrl: RAILWAY_API_URL,
  // })
  //   .user.self.query()
  //   .catch(() => null);
  // // console.log("user:", user);
  const user = null;
  event.locals.user = user;
  event.locals.token = payloadToken;

  setSession(event, { user, token: payloadToken });

  return await resolve(event);
};

function parseCookies(cookieStr: string) {
  const cookies = cookieStr.split("; ");
  const parsedCookies: { [key: string]: string } = {};
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    parsedCookies[key] = value;
  }
  return parsedCookies;
}
