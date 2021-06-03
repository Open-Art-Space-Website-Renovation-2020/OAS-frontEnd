export default {
	// Target: https://go.nuxtjs.dev/config-target
	target: "server",

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: "Open Art Space",
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				hid: "description",
				name: "description",
				content:
					"The Open Art Space project aims to make art a part of people’s lives in Damascus, and the enable children and young people to interact with contemporary visual art and open up to other cultures, and to Peace.",
			},
			{
				hid: "og:title",
				property: "og:title",
				content: "Open Art Space",
			},
			{
				hid: "og:type",
				property: "og:type",
				content: "website",
			},
			{
				hid: "og:url",
				property: "og:url",
				content: "https://www.openartspace.net",
			},
			{
				hid: "og:description",
				property: "og:description",
				content:
					"The Open Art Space project aims to make art a part of people’s lives in Damascus, and the enable children and young people to interact with contemporary visual art and open up to other cultures, and to Peace.",
			},
			{
				hid: "og:image",
				property: "og:image",
				content: "https://www.openartspace.net/img/logo.png",
			},
			{
				hid: "twitter:title",
				property: "twitter:title",
				content: "Open Art Space",
			},
			{
				hid: "twitter:card",
				property: "twitter:card",
				content: "summary_large_image",
			},
			{
				hid: "twitter:url",
				property: "twitter:url",
				content: "https://www.openartspace.net",
			},
			{
				hid: "twitter:description",
				property: "twitter:description",
				content:
					"The Open Art Space project aims to make art a part of people’s lives in Damascus, and the enable children and young people to interact with contemporary visual art and open up to other cultures, and to Peace.",
			},
			{
				hid: "twitter:image",
				property: "twitter:image",
				content: "https://www.openartspace.net/img/logo.png",
			},
			{
				hid: "format-detection",
				name: "format-detection",
				content: "telephone=no",
			},
			{
				hid: "msapplication-tap-highlight",
				name: "msapplication-tap-highlight",
				content: "no",
			},
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
			{
				rel: "icon",
				type: "image/png",
				sizes: "128x128",
				href: "/icons/favicon-128x128.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "96x96",
				href: "/icons/favicon-96x96.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/icons/favicon-32x32.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/icons/favicon-16x16.png",
			},
			{
				rel: "apple-touch-startup-image",
				media:
					"(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)",
				href: "icons/apple-launch-828x1792.png",
			},
			{
				rel: "apple-touch-startup-image",
				media:
					"(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)",
				href: "icons/apple-launch-1125x2436.png",
			},
			{
				rel: "apple-touch-startup-image",
				media:
					"(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)",
				href: "icons/apple-launch-1242x2688.png",
			},
			{
				rel: "apple-touch-startup-image",
				media:
					"(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)",
				href: "icons/apple-launch-750x1334.png",
			},
			{
				rel: "apple-touch-startup-image",
				media:
					"(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)",
				href: "icons/apple-launch-1242x2208.png",
			},
			{
				rel: "apple-touch-startup-image",
				media:
					"(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
				href: "icons/apple-launch-640x1136.png",
			},
			{
				rel: "apple-touch-startup-image",
				media:
					"(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)",
				href: "icons/apple-launch-1536x2048.png",
			},
			{
				rel: "apple-touch-startup-image",
				media:
					"(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)",
				href: "icons/apple-launch-1668x2224.png",
			},
			{
				rel: "apple-touch-startup-image",
				media:
					"(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)",
				href: "icons/apple-launch-1668x2388.png",
			},
			{
				rel: "apple-touch-startup-image",
				media:
					"(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)",
				href: "icons/apple-launch-2048x2732.png",
			},
		],
		script: [
			{
				src: "/js/headbreaker.js",
				type: "text/javascript",
				body: true,
				defer: true,
			},
		],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		"vuesax/dist/vuesax.css",
		"boxicons/css/boxicons.min.css",
		"@/assets/css/main.css",
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		"@/plugins/i18n",
		"@/plugins/persistedState",
		"@/plugins/vuesax",
		"@/plugins/croppa.client",
		"@/plugins/markup.client",
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: {
		dirs: [
			"~/components",
			"~/components/art_upload",
			"~/components/common",
			"~/components/draw",
			"~/components/home",
			"~/components/games",
			"~/components/games/guess",
			"~/components/games/puzzle",
		],
	},
	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		"@nuxt/typescript-build",
		"nuxt-windicss",
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		"nuxt-i18n",
		// https://go.nuxtjs.dev/axios
		"@nuxtjs/axios",
		// https://go.nuxtjs.dev/pwa
		"@nuxtjs/pwa",
		"@nuxtjs/robots",
		"@nuxt/image",
		"@nuxtjs/google-fonts",
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		baseURL: "https://oas-backend.herokuapp.com", // Used as fallback if no runtime config is provided
	},

	publicRuntimeConfig: {
		axios: {
			browserBaseURL: process.env.BROWSER_BASE_URL,
		},
	},

	privateRuntimeConfig: {
		axios: {
			baseURL: process.env.BASE_URL,
		},
	},
	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			lang: "en",
		},
	},
	image: {
		domains: [
			"https://oas-backend.herokuapp.com/",
			"http://127.0.0.1:8000/",
			"http://localhost:8000/",
			"https://content.dropboxapi.com/",
			"https://dropboxapi.com/",
		],
	},
	googleFonts: {
		families: {
			Cairo: true,
		},
		display: "swap", // 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
		download: true,
		preconnect: true,
	},
	i18n: {
		locales: [
			{
				code: "en",
				file: "en.ts",
			},
			{
				code: "ar",
				file: "ar.ts",
			},
		],
		lazy: true,
		strategy: "no_prefix",
		langDir: "locales/",
		defaultLocale: "en",
	},
	loading: {
		color: "red",
	},
	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		babel: {
			plugins: [
				["@babel/plugin-proposal-private-methods", { loose: true }],
			],
		},
		// 	extend(config) {
		// 		config.module.rules.push({
		// 			test: /\.vue$/,
		// 			loader: "vue-windicss-preprocess",
		// 			options: {
		// 				// config: "tailwind.config.js", // tailwind config file path (optional)
		// 				compile: false, // false: interpretation mode; true: compilation mode
		// 				globalPreflight: true, // set preflight style is global or scoped
		// 				globalUtility: true, // set utility style is global or scoped
		// 				// prefix: "windi-", // set compilation mode style prefix
		// 			},
		// 		})
		// 	},
		// },
	},
}
