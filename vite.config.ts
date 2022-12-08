import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vue(),
    AutoImport({
      // 添加你想自动导入的库，比如vue，vuex，vue-router等
      imports: [
        'vue', // vue库
        'vue/macros', // vue指令库
        '@vueuse/core', // vueuse库
      ],
      dts: true,
      vueTemplate: true,
    }),
  ],
})
