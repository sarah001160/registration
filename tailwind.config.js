/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // 這是 Vite 預設的入口文件
    "./src/**/*.{vue,js,ts,jsx,tsx}", // 在 src 目錄下的所有 Vue、JS、TS、JSX、TSX 文件都會被包含
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
