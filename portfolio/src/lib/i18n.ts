import en from "@/i18n/en.json";

export const locales = ["en"] as const;
export type Locale = (typeof locales)[number];
export type Messages = typeof en;

export function getMessages(locale: string | null | undefined): Messages {
  const requestedLocale = locale ?? "en";
  if (!locales.includes(requestedLocale as Locale)) {
    return en;
  }
  return en;
}

export function formatMessage(message: string, values: Record<string, string>): string {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(`{${key}}`, value),
    message,
  );
}
