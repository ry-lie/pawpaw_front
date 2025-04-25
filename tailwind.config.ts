import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "426px", // 426px 이상
        sm: "600px", // 600px 이상
      },
      maxWidth: {
        mobile: "600px",
      },
      colors: {
        primary: "#FDA002",
        hover: "#FF8C00",
        alarm_orange: "#FFF3D9",
        accent_orange: "#EC9400",
        background: "#F9F9F9",
        stroke_gray: "#d9d9d9",
        medium_gray: "#efefef",
        strong_gray: "#686868",
      },
      boxShadow: {
        'top-sm': '0px -2px 8px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;
