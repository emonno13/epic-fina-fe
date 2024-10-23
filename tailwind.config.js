/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Include any refine-specific paths if necessary
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@refinedev/**/*.{js,ts,jsx,tsx}', // Include refine-specific paths
  ],
  important: true,
  theme: {
    extend: {
      backgroundImage: {
        family: "url('/image/family.png')",
        workspace: "url('/image/workspace.jpeg')",
        greentea: "url('/image/green-tea.webp')",
        'gradient-benefit':
          'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 37.08%, rgba(31, 180, 110, 0.0048) 107.75%)',
        'gradient-green':
          'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 37.08%, rgba(31, 180, 110, 0.16) 107.75%)',
        'gradient-purple':
          'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 37.08%, rgba(31, 53, 180, 0.16) 107.75%)',
        'gradient-blue':
          'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 37.08%, rgba(14, 163, 255, 0.16) 107.75%)',
        'gradient-red':
          'linear-gradient(180.43deg, rgba(255, 255, 255, 0.16) 37.18%, rgba(180, 31, 138, 0.16) 99.62%)',
      },
      colors: {
        'grey-1': '#586379',
        'black-1': '#2D3C58',
        'black-2': '#65676B',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
