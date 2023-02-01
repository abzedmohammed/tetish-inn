/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{js,jsx}', './node_modules/flowbite/**/*.js'],
	theme: {
		extend: {
			backgroundImage: {
				'hero-image': "url('./assets/snack.jpg')",
			},
			screens: {
				xs: '375px',
				...defaultTheme.screens,
			},
		},
	},
	plugins: [require('daisyui'), require('flowbite/plugin')],
};
