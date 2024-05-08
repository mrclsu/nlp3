import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}',
    ],
    darkMode: 'media',
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
};

export default config;
