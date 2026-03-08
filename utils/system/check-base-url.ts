import { request } from '@playwright/test';

export async function checkBaseUrl(baseUrl: string) {
  const context = await request.newContext({
    ignoreHTTPSErrors: true,
    timeout: 5000,
    extraHTTPHeaders: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });

  try {
    const response = await context.get(baseUrl);
    if (!response.ok()) {
      throw new Error(`HTTP ${response.status()}`);
    }
  } catch (error) {
    throw new Error(
      `❌ Base URL is not reachable: ${baseUrl}\n` +
      `Reason: ${(error as Error).message}`
    );
  } finally {
    await context.dispose();
  }
}
