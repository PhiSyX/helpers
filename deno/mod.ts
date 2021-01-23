import { dirname, fromFileUrl } from "https://deno.land/std@0.84.0/path/mod.ts";

export {
  dirname,
  fromFileUrl,
  resolve,
} from "https://deno.land/std@0.84.0/path/mod.ts";

/**
 * @usage moduleDir(import.meta.url)
 */
export const moduleDir = (url: string) => dirname(fromFileUrl(url));
