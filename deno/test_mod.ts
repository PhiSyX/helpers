export {
  assertEquals,
  assertMatch,
  assertNotEquals,
  assertNotMatch,
  assertThrows,
  assertThrowsAsync,
} from "https://deno.land/std@0.84.0/testing/asserts.ts";
import { moduleDir, resolve } from "./mod.ts";

/**
 * @usage testdataDir(import.meta.url)
 */
export const testdataDir = (url: string) => resolve(moduleDir(url), "testdata");
