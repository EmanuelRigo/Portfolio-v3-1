import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messagesPath = join(process.cwd(), "messages", `${locale}.json`);
  const messages = JSON.parse(await readFile(messagesPath, "utf8"));

  return {
    locale,
    messages,
  };
});
