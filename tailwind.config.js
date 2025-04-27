/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Include .mdx if you are using it
    // You can uncomment the following lines if you need to include specific folders or packages:
    // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: { fontFamily: {
      sofia: "var(--font-sofia-sans-condensed)",
      inter: "var(--font-geist-sans)",
    },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "bounce-rotate": "bounce-rotate 4s ease-in-out infinite",
        "rotate-3d": "rotate-3d 6s linear infinite",
        "float-bounce": "float-bounce 5s ease-in-out infinite",
        "move-around": "move-around 10s linear infinite",
      },
      keyframes: {
        "bounce-rotate": {
          "0%, 100%": { transform: "translateY(0) translateX(0) rotate(0deg)" },
          "25%": { transform: "translateY(-15px) translateX(10px) rotate(10deg)" },
          "50%": { transform: "translateY(0) translateX(0) rotate(20deg)" },
          "75%": { transform: "translateY(15px) translateX(-10px) rotate(10deg)" },
        },
        "rotate-3d": {
          "0%": { transform: "rotate3d(1, 1, 0, 0deg)" },
          "100%": { transform: "rotate3d(1, 1, 0, 360deg) rotate(360deg)" }, // Added rotate for spinning
        },
        "float-bounce": {
          "0%": { transform: "translate(0, 0)" },
          "20%": { transform: "translate(15px, -20px)" },
          "40%": { transform: "translate(-20px, 10px)" },
          "60%": { transform: "translate(10px, 15px)" },
          "80%": { transform: "translate(-15px, -10px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        "move-around": {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(100px, 50px)" },
          "50%": { transform: "translate(-100px, -50px)" },
          "75%": { transform: "translate(50px, -100px)" },
          "100%": { transform: "translate(0, 0)" },
        },
      }, 

      colors: {},
      screens: {
        tablet: "640px",
        laptop: "1024px",
        desktop: "1280px",
      },
    },
    screens: {
      base: "0px",
      sm: '640px',
      md: '768px', 
      lg: '960px',
      lgg: '1064px',
      xl: '1280px',
    },
  },
  darkMode: "class",
};
