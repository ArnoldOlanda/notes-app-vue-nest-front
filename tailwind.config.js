/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [
        daisyui,
    ],
    daisyui:{
        themes: [
            {
                light: {
                ...require("daisyui/src/theming/themes")["light"],
                primary: "#007AFF",
                // secondary: "blue",
                },
            }
            , {
                dark: {
                    ...require("daisyui/src/theming/themes")["dark"],
                    primary: "#031529",
                    // secondary: "blue",
                }
            }
        ],
    }
};
