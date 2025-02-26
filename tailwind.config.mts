
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			brand: {
  				'50': '#FFF6EE',
  				'100': '#FFE3C9',
  				'200': '#FFD7B1',
  				'300': '#FFC288',
  				'400': '#FFA957',
  				'500': '#FF922A',
  				'600': '#FF7C00',
  				'700': '#DF6C00',
  				'800': '#C86303',
  				'900': '#924A05'
  			},
  			gray: {
  				'50': '#F9FAFB',
  				'100': '#F0F4F7',
  				'200': '#D8E3EB',
  				'300': '#C0CDD4',
  				'400': '#829099',
  				'500': '#58676F',
  				'600': '#40494E',
  				'700': '#2F373A',
  				'800': '#202427',
  				'900': '#16181A'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".truncate-clip": {
          overflowX: "clip",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
      });
    },
    tailwindcssAnimate,
],
};

export default config;
