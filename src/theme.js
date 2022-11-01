import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	root: {},
	components: {
		MuiCssBaseline: {
			styleOverrides: `@font-face {
				font-family: 	'Helvetica Neue, Helvetica, Roboto, sans-serif';
			}`
		},
		MuiCheckbox: {
			styleOverrides: {
				root: {
					backgroundColor: "transparent"
				}
			}
		},
		MuiAvatar: {
			defaultProps: {
				imgProps: { referrerPolicy: "no-referrer" }
			}
		},
		MuiButton: {
			defaultProps: {
				disableElevation: true,
				type: "text"
			},
			variants: [
				{
					props: { type: 'outlined' },
					style: {
						borderRadius: "18px",
						backgroundColor: "white",
						border: '1px solid #b3b3b3',
						boxShadow: "none",
						fontWeight: "bold",
						minHeight: "30px",
						width: "150px",
						margin: "8px",
						fontSize: "12px",
						'&:hover': {
							backgroundColor: "#EEEEEE",
							border: '1px solid #b3b3b3',
							borderColor: "#b3b3b3",

						},
						'&:active': {
							backgroundColor: "#D9D9D9",
							border: '1px solid #b3b3b3',
							borderColor: "#b3b3b3",

						},
						color: "#3b3b3b",
						borderColor: "#b3b3b3",
					},
				},
				// contained blue
				{
					props: { type: 'contained', color: "primary" },
					style: {
						paddingTop: "6px",
						paddingBottom: "6px",
						paddingRight: "16px",
						paddingLeft: "16px",
						backgroundColor: "#4fc0c3",
						color: "white",
						'&:hover': {
							background: "#48b2b5",
						},
						'&:active': {
							background: "#42a3a6",
						},
						'&:disabled': {
							backgroundColor: "#D9D9D9",
							color: "#b8b8b8"
						},
						'&:disabled:hover': {
							backgroundColor: "#D9D9D9",
							color: "#b8b8b8"
						},
					},
				},
				// contained grey
				{
					props: { type: 'contained', color: "secondary" },
					style: {
						paddingTop: "6px",
						paddingBottom: "6px",
						paddingRight: "16px",
						paddingLeft: "16px",
						backgroundColor: "#ababab",
						'&:hover': {
							backgroundColor: "#A8A8a8",
						},
						'&:active': {
							backgroundColor: "#8C8C8C",
						},
						color: "white",
					},
				},
				// contained grey
				{
					props: { type: 'popup', },
					style: {
						boxShadow: 3,
						backgroundColor: "#f0f0f0",
						'&:hover': {
							// backgroundColor: "#A8A8a8",
						},
						'&:active': {
							// backgroundColor: "#8C8C8C",
						},
						color: "grey",
					},
				},
				// text button
				{
					props: { type: 'text' },
					style: {
						color: "#5F5F5F",
						backgroundColor: "transparent",
						'&:hover': {
							backgroundColor: "#f0f0f0",
						},
						'&:active': {
							backgroundColor: "#ebebeb",
						},

					},
				},
			]
		},
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
			styleOverrides: {
				root: {
					backgroundColor: "white",
					"&.Mui-selected": {
						backgroundColor: "#D9D9D9",
					},
					'&:hover': {
						borderColor: "#b3b3b3"
					}
				}
			},
			style: {
				backgroundColor: "white",
				'&:hover': {
					backgroundColor: "#EEEEEE",
					borderColor: "#b3b3b3"
				},
				'&:active': {
					backgroundColor: "#D9D9D9",
					borderColor: "#b3b3b3"

				},
				'&$selected': { backgroundColor: 'brown' }
			}
		},
		MuiDivider: {
			defaultProps: {
				style: {
					borderBottomWidth: "2px",
				}
			}
		},
		MuiDialog: {
			defaultProps: {
				style: {
					width: "100%"
				}
			}
		}
	},
	palette: {
		primary: { // blue
			main: "#4fc0c3", //12a1de
			light: "#8BD2F4",
			dark: "#1E7291",
		},
		secondary: { // grey
			main: "#A8A8A8",
			hover: "#8C8C8C",
			active: "#5F5F5F"
		},
		warning: {
			main: '#ff6a6a',
			light: '#ffadb5',
			dark: '#a94e58'
		},
		green: { highlight: "#3ecf21", button: "#37b81d", hover: "#2ea317", clicked: "#298c15" },
		blue: { highlight: "#84e7ea", button: "#4fc0c3", hover: "#48b2b5", clicked: "#42a3a6" },
		lightBlue: { button: "#6ABEED", hover: "#5eaedb", clicked: "#559fc9" },
		errorButton: { text: "#d11313", background: "#ffebeb" },
		background: { paper: "#F9F9F9" },
		foreground: "#FBFBFB",
		border: {
			light: "#eeeeee",
			dark: "#e7e7e7"
		},
		grey: {
			A000: "#f5f5f5",
			A100: '#EEEEEE',
			A200: '#D9D9D9',
			A300: "#b3b3b3",
			A400: '#A8A8A8',
			A500: '#8C8C8C',
			A600: '#5F5F5F',
			A700: '#3b3b3b',
		},
		red: "#e70020",
		white: "#FFFFFF",
		messaging: {
			blue: "#54c2cc",
			grey: "#eeeeee"
		},
		reactions: {
			love: 'invert(45%) sepia(39%) saturate(3302%) hue-rotate(313deg) brightness(97%) contrast(87%)',
			white: "invert(99%) sepia(99%) saturate(2%) hue-rotate(27deg) brightness(103%) contrast(100%)",
			blue: "#54c2cc",
			grey: "#cdcdcd"
		},
		landingPage: {
			primary: '#67d3d5',
			hover: '#67d3d5',
			active: '#67d3d5'
		},
		moodLogger: {
			main: "#4fc0c3",
			primary: "#4fc0c3",
			hover: "#48b2b5",
			active: "#42a3a6",
			mood: {
				primary: "#4ed0be",
				hover: "#4ac7b6",
				active: "#43baaa"
			},
			category: {
				primary: "#60d5e1",
				hover: "#54c2cc",
				active: "#50b5bf"
			}
		},
		quip: {
			highlight: "#acd7eb",
			primary: "#41a1ce",
			hover: "#3b95bf",
			active: "#368bb3"
		},
		muse: {
			primary: "#bc68c8",
			hover: "#aa5eb5",
			active: "#a057ab",
			highlight: "#e9caed"
		},
		gratitude: {
			primary: "#e376a0",
			hover: "#cb688e",
			active: "#b85d80"
		},

		action: {
			hover: '#EFEFEF',
			selected: "#E9E9E9"
		}
	},
	typography: {
		fontFamily: [
			'Helvetica Neue', 'Helvetica', 'Roboto', 'sans-serif'
		].join(","),
		fontSize: 14,
		button: {
			textTransform: 'none'
		}
	},
	listItem: {
		fontSize: 14,
		button: {
			textTransform: 'none'
		}
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 975,
			lg: 1250,
			xl: 1920,
		},
		// mobile: 0,
		// tablet: 640,
		// laptop: 1024,
		// desktop: 1200,
	},

	overrides: {

		MuiCssBaseline: {
			'@global': {

			},

		}
	},
});

export default theme;