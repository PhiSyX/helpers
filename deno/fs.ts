/**
 * @requires `--allow-read`
 */
export async function readFile(
  path: string,
  encoding?: string,
) {
  const content = await Deno.readFile(path);

  if (!encoding) return content;

  const lowerPath = path.toLowerCase();
  if (lowerPath.endsWith(".json")) {
    encoding = "json";
  }

  const lowerEncoding = encoding.toLowerCase();
  const decoder = new TextDecoder(
    lowerEncoding === "json" ? "utf-8" : encoding,
  );
  return lowerEncoding === "json"
    ? JSON.parse(decoder.decode(content))
    : decoder.decode(content);
}
