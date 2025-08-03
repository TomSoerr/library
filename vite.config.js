import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  root: 'src/renderer',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.ico', 'icon.icns', 'img1.png', 'img2.png'],
      manifest: {
        name: "Kiara's Bücherwelt",
        short_name: 'Bücherwelt',
        description: 'Book library management application',
        theme_color: '#844b6f',
      },
    }),
  ],
  server: {
    port: 8080,
    open: true,
  },
});
