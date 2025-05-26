export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,vue}",
    "./node_modules/@star-fleet/**/dist/*.{js,jsx,ts,vue}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xxs: "300px",
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        /***** TELENOR COLORS ******/
        // PRIMARY
        "telenor-dark": "#070452",
        "telenor-mid": "#1C16C5",
        telenor: "#00c8ff",
        "telenor-light": "#adffff",
        "telenor-super-light": "#ebffff",

        /*Call to action colors*/
        "telenor-cta-default": "#1020F9",
        "telenor-cta-hover": "#070452",
        "telenor-cta-active": "#0E09AA",
        "telenor-cta-default-background": "#5280FF16",
        "telenor-cta-hover-background": "#5280FF32",
        "telenor-cta-disabled": "#B2BAD1",
        "telenor-cta-focus": "#8533FF",

        /* Call to action darkmode colors*/
        "telenor-cta-dark-default": "#42F0F0",
        "telenor-cta-dark-hover": "#D6FFFF",
        "telenor-cta-dark-active": "#ADFFFF",
        "telenor-cta-dark-default-background": "#FFFFFF32",
        "telenor-cta-dark-hover-background": "#FFFFFF48",
        "telenor-cta-dark-disabled": "#677398",
        "telenor-cta-dark-focus": "#FF2483",

        /* NEUTRALS
        Core: 500
        Shade: 1000, 900, 800, 700, 600
        Tint: 400, 300, 200, 100, 50, 25 */
        "telenor-neutral-black": "#000B2E",
        "telenor-neutral-ui-default": "#293351",
        "telenor-neutral-ui-icon-subtle": "#4F5A7D",
        "telenor-neutral-shade-1000": "#18223f",
        "telenor-neutral-shade-900": "#293351",
        "telenor-neutral-shade-800": "#374262",
        "telenor-neutral-shade-700": "#4f5a7d",
        "telenor-neutral-shade-600": "#677398",
        "telenor-neutral-core-500": "#7c88ab",
        "telenor-neutral-tint-400": "#929dbf",
        "telenor-neutral-tint-300": "#b2bad1",
        "telenor-neutral-tint-200": "#c5cbdd",
        "telenor-neutral-tint-100": "#e5e8f0",
        "telenor-neutral-tint-50": "#f2f3f7",
        "telenor-neutral-tint-15": "#F9F9FB",
        "telenor-neutral-white": "#FFFFFF",

        /* FEEDBACK
        Shade: 800
        Core: 500 (current hex)
        Tint: 200, 50 */

        /* Success */
        "telenor-success-shade-800": "#114517",
        "telenor-success-core-500": "#24a831",
        "telenor-success-tint-200": "#d8fddc",
        "telenor-success-tint-50": "#ecfef1",

        /* Attention */
        "telenor-attention-shade-800": "#4e410e",
        "telenor-attention-core-500": "#fde408",
        "telenor-attention-tint-200": "#fffbd6",
        "telenor-attention-tint-50": "#fffdeb",

        /* Warning */
        "telenor-warning-shade-800": "#5c2600",
        "telenor-warning-core-500": "#f06906",
        "telenor-warning-tint-200": "#ffe7d6",
        "telenor-warning-tint-50": "#fff3eb",

        /* Critical */
        "telenor-critical-shade-800": "#5c0000",
        "telenor-critical-core-500": "#c70505",
        "telenor-critical-tint-200": "#ffd6d6",
        "telenor-critical-tint-50": "#ffebeb",

        /* Information */
        "telenor-information-shade-800": "#0e0a7f",
        "telenor-information-core-500": "#0e0a7e",
        "telenor-information-tint-200": "#d6e7ff",
        "telenor-information-tint-50": "#ebf3ff",

        /* UNCATEGORIZED */
        "--telenor-peach": "#e4a99b",
        "--telenor-peach-dark": "#c88170",

        // theme setup - see tailwind.css file --> not in use?
        // "telenor-primary": "var(--primary)",
        // "telenor-secondary": "var(--secondary)",
        // "telenor-text": "var(--text)",

        theme: {
          1: "rgb(var(--color-theme-1) / <alpha-value>)",
          2: "rgb(var(--color-theme-2) / <alpha-value>)",
        },
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        pending: "rgb(var(--color-pending) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
        light: "rgb(var(--color-light) / <alpha-value>)",
        dark: "rgb(var(--color-dark) / <alpha-value>)",
        darkmode: {
          50: "rgb(var(--color-darkmode-50) / <alpha-value>)",
          100: "rgb(var(--color-darkmode-100) / <alpha-value>)",
          200: "rgb(var(--color-darkmode-200) / <alpha-value>)",
          300: "rgb(var(--color-darkmode-300) / <alpha-value>)",
          400: "rgb(var(--color-darkmode-400) / <alpha-value>)",
          500: "rgb(var(--color-darkmode-500) / <alpha-value>)",
          600: "rgb(var(--color-darkmode-600) / <alpha-value>)",
          700: "rgb(var(--color-darkmode-700) / <alpha-value>)",
          800: "rgb(var(--color-darkmode-800) / <alpha-value>)",
          900: "rgb(var(--color-darkmode-900) / <alpha-value>)",
        },

        /* telenorMid: "rgb(var(--color-telenor-mid) / <alpha-value>)", */
        /*  telenor: "rgb(var(--color-telenor) / <alpha-value>)", */
      },
      fontFamily: {
        sans: ["telenorEvUi", "sans-serif"],
        // telenor evolution UI
        telenorEv: ["telenorEv"],
        // telenor evolution UI
        telenorEvUi: ["telenorEvUi"],
      },
      container: {
        center: true,
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      strokeWidth: {
        0.5: 0.5,
        1.5: 1.5,
        2.5: 2.5,
      },
      // Custom spacing - refactor out - dep - uhsman
      spacing: {
        108: "27rem",
        120: "30rem",
        132: "33rem",
      },
      boxShadow: {
        "telenor-sm":
          "0px 2px 8px rgba(0, 0, 0, 0.02), 0px 2px 8px rgba(0, 0, 0, 0.08), 0px 0px 4px -2px rgba(0, 0, 0, 0.12)",
        "telenor-md":
          "0px 4px 12px rgba(0, 0, 0, 0.04), 0px 2px 8px rgba(0, 0, 0, 0.08), 0px 0px 4px -2px rgba(0, 0, 0, 0.12)",
        "telenor-lg":
          "0px 8px 16px rgba(0, 0, 0, 0.04), 0px 2px 8px rgba(0, 0, 0, 0.08), 0px 0px 4px -2px rgba(0, 0, 0, 0.12)",
        "telenor-sm-hover":
          "0px 12px 16px rgba(0, 0, 0, 0.02), 0px 4px 12px rgba(0, 0, 0, 0.08), 0px 0px 4px -2px rgba(0, 0, 0, 0.12)",
        "telenor-md-hover":
          "0px 16px 32px 4px rgba(0, 0, 0, 0.04), 0px 4px 16px rgba(0, 0, 0, 0.08), 0px 0px 4px -2px rgba(0, 0, 0, 0.12)",
        "telenor-lg-hover":
          "0px 24px 48px 4px rgba(0, 0, 0, 0.06), 0px 4px 16px rgba(0, 0, 0, 0.08), 0px 0px 4px -2px rgba(0, 0, 0, 0.12",
      },
      borderRadius: {
        "telenor-2xs": "0.125rem",
        "telenor-xs": "0.25rem",
        "telenor-sm": "0.5rem",
        "telenor-md": "1rem",
        "telenor-lg": "1.5rem",
      },
      fontSize: {
        // default tailwind fontsize = 16px
        // 1rem = 16px
        "telenor-xl": [
          "1.5rem", // 24px
          {
            lineHeight: "2.125rem", // 28px
            fontFamily: "telenorEvUi",
            fontWeight: 300,
          },
        ], // 24px / 34px
        // set font to telenorEvUi for all sizes below 20px
        "telenor-lg": [
          "1.25rem",
          {
            lineHeight: "1.75rem", // 28px
            fontFamily: "telenorEvUi",
            fontWeight: 300,
          },
        ], // 20px
        "telenor-md": [
          "1.125rem", // 18px
          {
            lineHeight: "1.625rem", // 26px
            fontFamily: "telenorEvUi",
            fontWeight: 300,
          },
        ],
        "telenor-sm": [
          "1rem", // 16px
          {
            lineHeight: "1.375rem", // 22px
            fontFamily: "telenorEvUi",
            fontWeight: 300,
          },
        ],
        "telenor-xs": [
          "0.875rem", // 14px
          {
            lineHeight: "1.25rem", // 20px
            fontFamily: "telenorEvUi",
            fontWeight: 300,
          },
        ],
        "telenor-2xs": [
          "0.75rem", // 12px
          {
            lineHeight: "1rem", // 16px
            fontFamily: "telenorEvUi",
            fontWeight: 300,
          },
        ],

        "telenor-title-2xl": [
          "3.5rem",
          { lineHeight: "4rem", fontFamily: "telenorEv" },
        ], // 56px / 64px
        "telenor-title-xl": [
          "3rem",
          { lineHeight: "3.5rem", fontFamily: "telenorEv" },
        ], // 48px / 56px
        "telenor-title-lg": [
          "2.5rem",
          { lineHeight: "3rem", fontFamily: "telenorEv" },
        ], // 40px / 48px
        "telenor-title-md": [
          "2rem",
          { lineHeight: "2.25rem", fontFamily: "telenorEv" },
        ], // 32px / 36px
        "telenor-title-sm": [
          "1.5rem",
          { lineHeight: "1.875rem", fontFamily: "telenorEv" },
        ], // 24px / 30px
        // set font to telenorEvUi for all sizes below 20px
        "telenor-title-xs": [
          "1.25rem", // 20px
          {
            lineHeight: "1.625", // 26px
            fontFamily: "telenorEvUi",
            fontWeight: 300,
          },
        ], // 20px /
        "telenor-title-2xs": [
          "1rem", // 16px
          {
            lineHeight: "1.375rem", // 22px
            fontFamily: "telenorEvUi",
            fontWeight: 300,
          },
        ],

        // Default tailwind font sizes
        // only changed the font family to telenorEvUi
        xs: [
          "0.75rem", // 12px
          {
            lineHeight: "1rem",
            fontFamily: "telenorEvUi",
            fontWeight: 300,
          },
        ],
        sm: [
          "0.875rem", // 14px
          {
            lineHeight: "1.25rem",
            fontFamily: "telenorEvUi",
            fontWeight: 300,
          },
        ],
        base: [
          "1rem", // 16px
          {
            lineHeight: "1.5rem",
            fontFamily: "telenorEvUi",
            fontWeight: 300,
          },
        ],
        lg: [
          "1.125rem", // 18px
          {
            lineHeight: "1.75rem",
            fontFamily: "telenorEvUi",
            fontWeight: 300,
          },
        ],
      },

      lineHeight: {
        "telenor-h1": "0.93",
        "telenor-large": "1.4",
      },

      letterSpacing: {
        "telenor-tighter": "-0.03em",
        "telenor-tight": "-0.02em",
        "telenor-normal": "0.01em",
        "telenor-normal-plus": "0.015em",
        "telenor-wide": "0.02em",
        "telenor-wide-large": "0.09em",
      },
    },
  },

  plugins: [],
  variants: {
    extend: {
      boxShadow: ["dark"],
      stroke: ["hover"],
      fill: ["hover"],
    },
  },
}
