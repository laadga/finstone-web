import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			brand: 'hsl(var(--brand))',
  			'brand-foreground': 'hsl(var(--brand-foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))',
				blue: '#3ABEFF'
			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
			finstone: {
				primary: '#00BFA6',
				secondary: '#4DD0E1',
				text: '#111111',
				muted: '#555555'
			},
			navy: {
				900: '#0B1C2C',
				800: '#1A2B3C',
				700: '#2A3B4C'
			},
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
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(-25%)'
  				}
  			},
			'shiny-text': {
				'0%, 90%, 100%': {
					'background-position': '0% 0',
				},
				'30%, 60%': {
					'background-position': '100% 0',
				},
			},
  			'appear': {
  				'0%': { 
  					opacity: '0', 
  					transform: 'translateY(10px)' 
  				},
  				'100%': { 
  					opacity: '1', 
  					transform: 'translateY(0)' 
  				},
  			},
  			'appear-zoom': {
  				'0%': { 
  					opacity: '0', 
  					transform: 'scale(0.98)' 
  				},
  				'100%': { 
  					opacity: '1', 
  					transform: 'scale(1)' 
  				},
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			marquee: 'marquee 60s linear infinite',
  			'shiny-text': 'shiny-text 8s infinite',
  			'appear': 'appear 0.5s ease-out forwards',
  			'appear-zoom': 'appear-zoom 0.8s ease-out forwards'
  		},
  		rotate: {
  			'15': '15deg',
  		},
  		backgroundImage: {
  			'noise': "url('https://www.reactbits.dev/assets/noise.png')",
  		},
  		maskImage: {
  			'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
  		},
  		maxWidth: {
  			container: '1280px'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

export default config


