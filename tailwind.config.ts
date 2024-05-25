import type { Config } from 'tailwindcss';
const { nextui } = require("@nextui-org/react");
const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'banner': "url('/images/bkbanner.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        dark: { raw: '(prefers-color-scheme: dark)' },
        'xl': '1920px',
        'lg': '1024px',  // หน้าจอโน้ตบุ๊ค
        'md': '340px',   // หน้าจอโทรศัพท์ขนาดปกติ
      },
      colors: {
        dark: {
          bg: colors.gray[800],
          text: colors.white,
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}

export default config
