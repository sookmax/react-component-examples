import defaultTheme from "tailwindcss/defaultTheme";
import animatePlugin from "tailwindcss-animate";
import reactAriaPlugin from "tailwindcss-react-aria-components";

/** @type {import('tailwindcss').Config} */
export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "2xs": ".6875rem",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    animatePlugin,
    reactAriaPlugin,
    function ({ addVariant }) {
      addVariant("hover", "@media (hover: hover) { &:hover }");
    },
  ],
};
