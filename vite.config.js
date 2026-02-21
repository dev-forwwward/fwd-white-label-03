import { defineConfig } from 'vite';
import { resolve } from 'path';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
    plugins: [mkcert()],

    server: {
        port: 5173,
        cors: true,
        open: false,
        headers: {
            'Access-Control-Allow-Private-Network': 'true',
        },
        hmr: {
            // Allows HMR WebSocket to work through a Cloudflare tunnel (Firefox/Safari)
            // The client connects to the tunnel host on port 443 (WSS) instead of localhost
            protocol: 'wss',
            clientPort: 443,
        },
    },

    build: {
        lib: {
            entry: resolve(__dirname, 'src/js/main.js'),
            name: 'FWD',
            formats: ['iife'],
            fileName: () => 'bundle.js',
        },
        rollupOptions: {
            output: {
                // Rename the extracted CSS to 'bundle.css' regardless of Vite's default naming
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name && assetInfo.name.endsWith('.css')) return 'bundle.css';
                    return assetInfo.name;
                },
            },
        },
        outDir: 'dist',
        minify: 'esbuild',
        sourcemap: false,
        cssCodeSplit: false,
    },

    css: {
        preprocessorOptions: {
            scss: {
                // Use the modern Sass compiler API (avoids deprecation warnings)
                api: 'modern-compiler',
            },
        },
    },
});
