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
        sm: "600px",
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
    },
  },
  plugins: [],
};
export default config;
