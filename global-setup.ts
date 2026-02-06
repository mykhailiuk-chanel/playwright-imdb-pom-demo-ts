import { checkBaseUrl } from './utils/system/checkBaseUrl';

export default async () => {
  const baseUrl = process.env.BASE_URL;

  if (!baseUrl) {
    throw new Error('❌ BASE_URL is not defined in environment variables');
  }

  console.log(`🔍 Checking availability of ${baseUrl}...`);
  await checkBaseUrl(baseUrl);
  console.log('✅ Base URL is reachable. Starting tests...');
};
