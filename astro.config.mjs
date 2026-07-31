import { defineConfig } from 'astro/config';
import events from 'node:events';

// Increase default listener limit to prevent Vite/HMR dev server socket warnings
events.defaultMaxListeners = 20;

// https://astro.build/config
export default defineConfig({
    site: 'https://berkeleyfurries.github.io', // GitHub user
    base: '/', // This is the base URL, since the project is running off the root page repo
});