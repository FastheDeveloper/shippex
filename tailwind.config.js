/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/app/**/*.{js,ts,tsx}', './src/components/**/*.{js,ts,tsx}'],

    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                PRIMARY_BLUE: "#2F50C1",
                TEXT_INPUT: "#F4F2F8",
                PLACEHOLDER_TEXT: "#A7A3B3",
                REGULAR_TEXT: '#757281',
                HEADER_COLOR: "#4561DB",
                BOX_BG: '#F4F2F8',
                RECIEVED_BG: "#D9E6FD",
                ERROR_BG: "#FEE3D4",
                ERROR_TEXT: "#D12030",
                DELIVRY_BG: "#E3FAD6",
                DELIVERY_TEXT: "#208D28",
                STROKE_COLOR: "#6E91EC"
            },
            fontFamily: {
                SF_REGULAR: "SF-Regular",
                SF_MEDIUM: "SF-Medium",
                SF_SEMIBOLD: "SF-SemiBold",
                SF_BOLD: "SF-Bold",
            }
        },
    },
    plugins: [],
};