import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';
import viteCompression from 'vite-plugin-compression';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_PORT) || 5173,
      open: true,
      strictPort: true
    },
    preview: {
      port: 4173,
      strictPort: true
    },
    plugins: [
      react(),
      svgr(),
      tsconfigPaths(),
      checker({ typescript: true }),
      viteCompression({ algorithm: 'brotliCompress', ext: '.br', threshold: 1024 }),
      legacy({ targets: ['defaults', 'not IE 11'] })
    ],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') }
    },
    build: {
      target: 'esnext',
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode === 'development',
      minify: 'esbuild',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: { react: ['react', 'react-dom'] }
        }
      }
    },
    optimizeDeps: { include: ['react', 'react-dom'] }
  };
});
