import { AxiosError } from "axios";

export function ErrorAxios(
  error: unknown
): Record<string, string> | string | null {
  if (error instanceof AxiosError && error.response && error.response.data) {
    if (error.response.data.error) {
      return error.response.data.error;
    } else {
      return error.response.data.message;
    }
  } else {
    return null;
  }
}
