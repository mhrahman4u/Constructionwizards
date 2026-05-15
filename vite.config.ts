import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		sveltekit(),

		VitePWA({
			registerType: 'autoUpdate',

			devOptions: {
				enabled: true
			},

			workbox: {
				globPatterns: ['**/*.{js,css,html,png,svg,ico}']
			},

			manifest: {
				name: 'Construction wizard',
				short_name: 'Construction wizard',
				description: 'My PWA App',
				start_url: '/',
				scope: '/',
				display: 'standalone',

				background_color: '#11ba66',
				theme_color: '#11ba66',

				icons: [
					{
						src: '/192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/516.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			}
		})
	]
});