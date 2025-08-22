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
                    ".bg-primary-hover":{
                        "background-color": "#2563eb",
                    },
                    ".bg-primary-active":{
                        "background-color": "#2563eb",
                    },
                    ".counter-focus":{
                        "background-color": "#1d4ed8",
                    }
                // secondary: "blue",
                },
            }
            , {
                dark: {
                    ...require("daisyui/src/theming/themes")["dark"],
                    primary: "#12161a",
                    ".bg-primary-hover": {
                        "background-color": "#2a323c",
                    },
                    ".bg-primary-active": {
                        "background-color": "#3a4452",
                    },
                    ".counter-focus": {
                        "background-color": "#505966",
                    }
                    // secondary: "blue",
                }
            }
        ],
    }
};
