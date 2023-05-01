import houdini from "houdini/vite";
import unocss from "unocss/vite";
import { sveltekit } from "@sveltejs/kit/vite";

const config: import("vite").UserConfig = {
  plugins: [unocss(), houdini(), sveltekit()],
};

export default config;
