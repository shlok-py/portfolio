// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//     },
//   },
//   plugins: [],
// };


// export default config;
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '33%': { backgroundPosition: '100% 50%' },
          '66%': { backgroundPosition: '50% 0%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
          slide: {
            '0%, 100%': { transform: 'translateY(0)' },
            '33%': { transform: 'translateY(-100%)' },
            '66%': { transform: 'translateY(-200%)' },
          },
      },
      animation: {
        'gradient-move': 'gradient 10s ease infinite',
        'slide-words': 'slide 6s ease-in-out infinite',
      },
      backgroundSize: {
       'size-200': '200% 200%',
      },
    },
  },
  plugins: [],
};

export default config;
