import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/instances': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      // Проксируем все запросы, которые начинаются с цифр (fiddId обычно числовой)
      // или добавь конкретные префиксы, если они известны.
      // Используем регулярное выражение для захвата всех числовых ID сессий
      '^/(?!@vite/|src/|node_modules)([^/]+)/.*': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.log('proxy error', err);
          });
          
          proxy.on('proxyRes', (proxyRes, req) => {
            if (proxyRes.headers['transfer-encoding'] && proxyRes.headers['content-length']) {
              console.log('Удаляю конфликтующий transfer-encoding для:', req.url);
              delete proxyRes.headers['transfer-encoding'];
            }
          });
        },
        // Force absolute paths in target to avoid parsing issues
        selfHandleResponse: false,
        buffer: undefined,
      },
    },
  },
})
