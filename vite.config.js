import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';

export default defineConfig({
  root: 'src/renderer',
  base: '/library/',
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['fonts/*.woff2'],
      manifest: {
        name: "Kiara's Bücherwelt",
        short_name: 'Bücherwelt',
        description: 'Book library management application',
        orientation: 'portrait',
        theme_color: '#fff8f8',
        background_color: '#fff8f8',
        display: 'standalone',
        display_override: ['standalone', 'window-controls-overlay'],
        launch_handler: {
          client_mode: ['navigate-existing', 'auto'],
        },
        start_url: '/library/',
        publicDir: resolve(__dirname, 'src/renderer/public'),
        scope: '/library/',
        base: '/library/',
        screenshots: [
          {
            src: 'mobile-screenshot.png',
            sizes: '750x1334',
            type: 'image/png',
            form_factor: 'narrow',
          },
          {
            src: 'desktop-screenshot.png',
            sizes: '1920x1080',
            type: 'image/png',
            form_factor: 'wide',
          },
        ],
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,woff2,png}'],
        runtimeCaching: [
          {
            urlPattern: /\.(?:js|css|html|woff2)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets',
              expiration: { maxEntries: 100, maxAgeSeconds: 6000000 },
            },
          },
        ],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
    }),
  ],
  server: {
    port: 8080,
    open: true,
  },
});
