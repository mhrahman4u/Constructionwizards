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
				id: '/',

				name: 'Construction wizard',
				short_name: 'Construction wizard',

				description: 'Construction learning platform',

				start_url: '/',
				scope: '/',

				display: 'standalone',

				background_color: '#11ba66',
				theme_color: '#11ba66',

				display_override: [
					'window-controls-overlay',
					'standalone'
				],

				icons: [
					{
						src: '/192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any'
					},
					{
						src: '/516.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any'
					}
				],

				screenshots: [
					        {
	src: '/screenshots/desktop.png',
	sizes: '1848x903',
	type: 'image/png',
	form_factor: 'wide'
},
{
	src: '/screenshots/mobile.png',
	sizes: '670x831',
	type: 'image/png'
}
				]
			}
		})
	]
});