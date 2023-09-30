import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	testDir: 'e2e/tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
