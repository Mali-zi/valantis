import { IOptions } from './models';

export async function fetchWithTimeout(
  url: string,
  options: IOptions,
  timeout: number
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(url, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(timeoutId);
  return response;
}
