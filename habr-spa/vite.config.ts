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
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          // Исправление HPE_INVALID_TRANSFER_ENCODING:
          // Node.js падает на уровне сокета, если видит и Content-Length, и Transfer-Encoding.
          // Чтобы прокси не падал, нужно ПЕРЕД передачей ответа в Node.js удалить лишний заголовок.
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Опционально: можно добавить логирование запроса
          });
          
          proxy.on('proxyRes', (proxyRes, req, res) => {
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
