/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        colors: {
            'black': '#000000',
            'white': '#ffffff',
            'gray': '#F2F2F2',
            'gray-60': '#666666',
            'gray-80': '#B3B3B3',
        },
        container: {
            padding: {
                DEFAULT: '1rem',
                sm: '1rem'
            }
        },
        fontFamily: {
            roboto: ['Roboto', 'sans-serif'],
            urbanist: ['"Urbanist"', 'sans-serif'],
        },
        keyframes: {
            'topToBottom': {
                '0%': {opacity: '0'},
                '5%': {transform: 'translateY(-10px)', opacity: '0'},
                '10%': {transform: 'translateY(0px)', opacity: '1'},
                '25%': {transform: 'translateY(0px)', opacity: '1'},
                '30%': {transform: 'translateY(+10px)', opacity: '0'},
                '80%': {opacity: '0'},
                '100%': {opacity: '0'},
            },
            'slideDown': {
                '0%': {transform: 'translateY(-100%)', opacity: '0'},
                '100%': {transform: 'translateY(0%)', opacity: '1'},
            }
        },
        extend: {
            animation: {
                'topToBottom': 'topToBottom 15s linear 0s infinite',
                'slideDown': 'slideDown duration-500 ease-out;',
            }
        },
    },
    plugins: [],
}
