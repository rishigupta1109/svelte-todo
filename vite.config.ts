import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		mockReset: true,
		environment: 'jsdom',
		globals: true,
		include: ['src/**/*.test.{js,ts}'],
		setupFiles: 'src/setupTests.ts'
	}
});
