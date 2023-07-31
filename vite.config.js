import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VitePWA({
      manifest: {
        name: 'Aladdog',
        short_name: 'Aladdog',
        description: 'Aladdog POS for Bar',
        theme_color: '#409EFF',
        icons: [
          {
            src: 'icon-72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'icon-144.png',
            sizes: '144x144',
            type: 'image/png',
          },
        ]
      },
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],		//缓存相关静态资源
        runtimeCaching: [{		//由于要测试第三方API， 这里配置缓存访问第三方API的资源
          handler: 'CacheFirst',
          urlPattern: /^https:\/\/jsonplaceholder/,		//注意，要修改成要测试的API。请使用正则表达式匹配
          method: 'GET',
          options: {
            cacheName: 'test-external-api',		//创建缓存名称
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
