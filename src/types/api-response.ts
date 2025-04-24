export interface IApiResponseError {
  statusCode: number;
  message: string;
  error: Record<string, string>
}