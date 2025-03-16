import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'; // autoImport
import Components from 'unplugin-vue-components/vite'; // 自動導入元件
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 手動設定 @ 代表的預設資料夾
    },
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue', 'vue-router' // 將會自動導入 Vue 3 中的 API，如 `ref`, `reactive`, `computed` 等，你也可以在這裡添加其他常用函式庫
      ],
      dts: 'src/auto-imports.d.ts', //test:確保有生成
    }),
    Components({
      dirs: ['src/components'],
      dts: 'src/components.d.ts', //test:確保有生成
    }),
  ],
})
