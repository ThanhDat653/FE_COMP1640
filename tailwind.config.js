/** @type {import('tailwindcss').Config} */
export const content = [
   "./src/**/*.{html,js,tsx,jsx}",
   "./node_modules/flowbite/**/*.js",
];
export const theme = {
   extend: {},
};
export const plugins = [require("flowbite/plugin")];
