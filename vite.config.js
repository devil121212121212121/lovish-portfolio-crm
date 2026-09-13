import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Vite local development serverless API middleware
function apiDevPlugin() {
  return {
    name: 'vite-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/leads')) {
          try {
            // Buffer request body
            const buffers = [];
            for await (const chunk of req) {
              buffers.push(chunk);
            }
            const rawBody = Buffer.concat(buffers).toString('utf-8');
            try {
              req.body = rawBody ? JSON.parse(rawBody) : {};
            } catch (e) {
              req.body = rawBody;
            }

            // Mock Vercel response helper methods
            res.status = function (statusCode) {
              res.statusCode = statusCode;
              return res;
            };
            res.json = function (data) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return res;
            };

            // Dynamically import handler
            const { default: handler } = await import('./api/leads.js');
            return await handler(req, res);
          } catch (err) {
            console.error('[API DEV SERVER ERROR]', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message || 'Local API handler error' }));
            return;
          }
        }
        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [react(), apiDevPlugin()],
    server: {
      port: 5173,
      host: true
    },
    build: {
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            supabase: ['@supabase/supabase-js'],
            icons: ['lucide-react']
          }
        }
      }
    }
  };
});
