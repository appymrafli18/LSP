import { ZodError, ZodFormattedError } from "zod";
export function converterError(
  result: ZodError
): Record<string, string> {
  const formattedError = result.format() as ZodFormattedError<
    Record<string, string>,
    string
  >;

  return Object.entries(formattedError).reduce((acc, [key, value]) => {
    if (
      typeof value === "object" &&
      "_errors" in value &&
      Array.isArray(value._errors)
    ) {
      acc[key] = value._errors[0]; // Ambil error pertama dari field
    }
    return acc;
  }, {} as Record<string, string>);
}