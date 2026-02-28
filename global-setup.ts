import { checkBaseUrl } from './utils/system/checkBaseUrl';

export default async () => {
  const baseUrl = process.env.BASE_URL;

  if (!baseUrl) {
    throw new Error('❌ BASE_URL is not defined in environment variables');
  }

  console.log(`🔍 Checking availability of ${baseUrl}...`);
  await checkBaseUrl(baseUrl);
  console.log('✅ Base URL is reachable. Starting tests...');

  // Validate API_BASE_URL for API tests
  const apiBaseUrl = process.env.API_BASE_URL;
  if (!apiBaseUrl) {
    throw new Error('❌ API_BASE_URL is not defined in environment variables');
  }
  console.log(`🔍 Checking availability of API: ${apiBaseUrl}...`);
  await checkBaseUrl(apiBaseUrl);
  console.log('✅ API Base URL is reachable. Starting tests...');
};
