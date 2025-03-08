/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        './src/**/**/*.{js,ts,jsx,tsx}',
        './src/**/**/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
        screens: {
            'clg': '1124px', // Example custom breakpoint
        },
        },
    },
    plugins: [],
};