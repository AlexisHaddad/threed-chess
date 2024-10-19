/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const {nextui} = require("@nextui-org/react");

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
}

