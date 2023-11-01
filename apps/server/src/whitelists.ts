const whitelist = [
  "http://localhost:5173",
  "http://192.168.0.225:5173",
  "http://localhost:5174",
  "http://localhost:4173",
  "http://sveltekit-prerender",
  process.env.PAYLOAD_PUBLIC_SERVER_URL,
].filter(Boolean);

export default whitelist;
