// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path'
//
// export default defineConfig({
//     plugins: [react()],
//     server: {
//         port: 3000,
//         open: true
//     },
//     resolve: {
//         alias: {
//             '@': path.resolve(__dirname, './src'),
//             '@/modules': path.resolve(__dirname, './src/modules'),
//             '@/common': path.resolve(__dirname, './src/common')
//         }
//     }
// })


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path'
//
// export default defineConfig({
//     plugins: [react()],
//     server: {
//         port: 3000,
//         open: true,
//         proxy: {
//             '/api': {
//                 //target: 'http://192.168.1.103:8080', // IP компьютера с бэкендом
//                 target: 'https://192.168.1.103:8080', // с https
//                 secure: false, // для самоподписанного сертификата
//                 changeOrigin: true,
//                 // Убираем rewrite, так как бэкенд ожидает /api/auth/register
//                 // rewrite: (path) => path.replace(/^\/api/, ''),
//                 configure: (proxy, _options) => {
//                     proxy.on('error', (err, _req, _res) => {
//                         console.log('Proxy error:', err);
//                     });
//                     proxy.on('proxyReq', (proxyReq, req, _res) => {
//                         console.log('Sending Request:', req.method, req.url, '→', proxyReq.path);
//                     });
//                     proxy.on('proxyRes', (proxyRes, req, _res) => {
//                         console.log('Received Response:', proxyRes.statusCode, req.url);
//                     });
//                 },
//             },
//         },
//     },
//     resolve: {
//         alias: {
//             '@': path.resolve(__dirname, './src'),
//             '@/modules': path.resolve(__dirname, './src/modules'),
//             '@/common': path.resolve(__dirname, './src/common')
//         }
//     }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        open: true,
        proxy: {
            '/api': {
                target: 'https://192.168.1.102:8080', // Используем https
                changeOrigin: true,
                secure: false, // Важно для самоподписанного сертификата
                // rewrite: (path) => path.replace(/^\/api/, ''), // ЗАКОММЕНТИРОВАНО
                configure: (proxy, _options) => {
                    proxy.on('error', (err, _req, _res) => {
                        console.log('Proxy error:', err);
                    });
                    proxy.on('proxyReq', (proxyReq, req, _res) => {
                        console.log('Sending Request:', req.method, req.url, '→', proxyReq.path);
                    });
                    proxy.on('proxyRes', (proxyRes, req, _res) => {
                        console.log('Received Response:', proxyRes.statusCode, req.url);
                    });
                },
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@/modules': path.resolve(__dirname, './src/modules'),
            '@/common': path.resolve(__dirname, './src/common')
        }
    }
})