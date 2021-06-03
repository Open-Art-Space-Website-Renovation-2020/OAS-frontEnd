<script>
import { svgAsPngUri } from "save-svg-as-png"
export default {
	name: "FrameEditior",
	props: {
		image: {
			required: true,
			type: [Boolean, String],
		},
	},
	data() {
		return {
			name: "",
			message: "",
			age: "1",
			message_options: [
				"السلام يبدأ بابتسامة",
				"سلام في أنفسنا",
				"اعط السلام فرصة",
				"لا يوجد طريق للسلام",
				"السلام دائما جميل",
				"السلام لبلدي‬",
				"Peace begins with a smile",
				"Peace in ourselves",
				"Give peace a chance",
				"There is no way to peace",
				"Peace is always beautiful",
				"Peace to my country",
			],
			country: "",
			country_options: [
				"Afghanistan",
				"Åland Islands",
				"Albania",
				"Algeria",
				"American Samoa",
				"Andorra",
				"Angola",
				"Anguilla",
				"Antarctica",
				"Antigua and Barbuda",
				"Argentina",
				"Armenia",
				"Aruba",
				"Australia",
				"Austria",
				"Azerbaijan",
				"Bahamas",
				"Bahrain",
				"Bangladesh",
				"Barbados",
				"Belarus",
				"Belgium",
				"Belize",
				"Benin",
				"Bermuda",
				"Bhutan",
				"Bolivia (Plurinational State of)",
				"Bonaire, Sint Eustatius and Saba",
				"Bosnia and Herzegovina",
				"Botswana",
				"Bouvet Island",
				"Brazil",
				"British Indian Ocean Territory",
				"Brunei Darussalam",
				"Bulgaria",
				"Burkina Faso",
				"Burundi",
				"Cabo Verde",
				"Cambodia",
				"Cameroon",
				"Canada",
				"Cayman Islands",
				"Central African Republic",
				"Chad",
				"Chile",
				"China",
				"Christmas Island",
				"Cocos (Keeling) Islands",
				"Colombia",
				"Comoros",
				"Congo",
				"Congo (the Democratic Republic of the)",
				"Cook Islands",
				"Costa Rica",
				"Côte d'Ivoire",
				"Croatia",
				"Cuba",
				"Curaçao",
				"Cyprus",
				"Czechia",
				"Denmark",
				"Djibouti",
				"Dominica",
				"Dominican Republic",
				"Ecuador",
				"Egypt",
				"El Salvador",
				"Equatorial Guinea",
				"Eritrea",
				"Estonia",
				"Eswatini",
				"Ethiopia",
				"Falkland Islands (Malvinas)",
				"Faroe Islands",
				"Fiji",
				"Finland",
				"France",
				"French Guiana",
				"French Polynesia",
				"French Southern Territories",
				"Gabon",
				"Gambia",
				"Georgia",
				"Germany",
				"Ghana",
				"Gibraltar",
				"Greece",
				"Greenland",
				"Grenada",
				"Guadeloupe",
				"Guam",
				"Guatemala",
				"Guernsey",
				"Guinea",
				"Guinea-Bissau",
				"Guyana",
				"Haiti",
				"Heard Island and McDonald Islands",
				"Holy See",
				"Honduras",
				"Hong Kong",
				"Hungary",
				"Iceland",
				"India",
				"Indonesia",
				"Iran (Islamic Republic of)",
				"Iraq",
				"Ireland",
				"Isle of Man",
				"Israel",
				"Italy",
				"Jamaica",
				"Japan",
				"Jersey",
				"Jordan",
				"Kazakhstan",
				"Kenya",
				"Kiribati",
				"Korea (the Democratic People's Republic of)",
				"Korea (the Republic of)",
				"Kuwait",
				"Kyrgyzstan",
				"Lao People's Democratic Republic",
				"Latvia",
				"Lebanon",
				"Lesotho",
				"Liberia",
				"Libya",
				"Liechtenstein",
				"Lithuania",
				"Luxembourg",
				"Macao",
				"Madagascar",
				"Malawi",
				"Malaysia",
				"Maldives",
				"Mali",
				"Malta",
				"Marshall Islands",
				"Martinique",
				"Mauritania",
				"Mauritius",
				"Mayotte",
				"Mexico",
				"Micronesia (Federated States of)",
				"Moldova (the Republic of)",
				"Monaco",
				"Mongolia",
				"Montenegro",
				"Montserrat",
				"Morocco",
				"Mozambique",
				"Myanmar",
				"Namibia",
				"Nauru",
				"Nepal",
				"Netherlands",
				"New Caledonia",
				"New Zealand",
				"Nicaragua",
				"Niger",
				"Nigeria",
				"Niue",
				"Norfolk Island",
				"North Macedonia",
				"Northern Mariana Islands",
				"Norway",
				"Oman",
				"Pakistan",
				"Palau",
				"Palestine, State of",
				"Panama",
				"Papua New Guinea",
				"Paraguay",
				"Peru",
				"Philippines",
				"Pitcairn",
				"Poland",
				"Portugal",
				"Puerto Rico",
				"Qatar",
				"Réunion",
				"Romania",
				"Russian Federation",
				"Rwanda",
				"Saint Barthélemy",
				"Saint Helena, Ascension and Tristan da Cunha",
				"Saint Kitts and Nevis",
				"Saint Lucia",
				"Saint Martin (French part)",
				"Saint Pierre and Miquelon",
				"Saint Vincent and the Grenadines",
				"Samoa",
				"San Marino",
				"Sao Tome and Principe",
				"Saudi Arabia",
				"Senegal",
				"Serbia",
				"Seychelles",
				"Sierra Leone",
				"Singapore",
				"Sint Maarten (Dutch part)",
				"Slovakia",
				"Slovenia",
				"Solomon Islands",
				"Somalia",
				"South Africa",
				"South Georgia and the South Sandwich Islands",
				"South Sudan",
				"Spain",
				"Sri Lanka",
				"Sudan",
				"Suriname",
				"Svalbard and Jan Mayen",
				"Sweden",
				"Switzerland",
				"Syrian Arab Republic",
				"Taiwan (Province of China)",
				"Tajikistan",
				"Tanzania, the United Republic of",
				"Thailand",
				"Timor-Leste",
				"Togo",
				"Tokelau",
				"Tonga",
				"Trinidad and Tobago",
				"Tunisia",
				"Turkey",
				"Turkmenistan",
				"Turks and Caicos Islands",
				"Tuvalu",
				"Uganda",
				"Ukraine",
				"United Arab Emirates",
				"United Kingdom of Great Britain and Northern Ireland",
				"United States Minor Outlying Islands",
				"United States of America",
				"Uruguay",
				"Uzbekistan",
				"Vanuatu",
				"Venezuela (Bolivarian Republic of)",
				"Viet Nam",
				"Virgin Islands (British)",
				"Virgin Islands (U.S.)",
				"Wallis and Futuna",
				"Western Sahara",
				"Yemen",
				"Zambia",
				"Zimba",
			],
			color: "#f4c7b1",
			emoji: "",
			emojis: ["😎", "😀", "😍", "🤣", "❤️", "🧐", "🥰"],
			image_frame: "",
		}
	},
	computed: {
		valid_name() {
			return this.name && this.name.length > 0
		},
		valid_age() {
			return this.age && this.age.length > 0
		},
		valid_max_age() {
			return this.age > 0 && this.age < 100
		},
	},
	methods: {
		sleep(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms))
		},
		change_color(color) {
			this.color = color
		},
		change_emoji(emoji) {
			this.emoji = emoji
		},
		async get_image_frame() {
			const img_url = await svgAsPngUri(
				document.getElementById("Layer_1")
			)
			this.image_frame = img_url
		},
	},
}
</script>
<template>
	<div
		class="w-full flex flex-col-reverse md:flex-row items-center justify-between"
	>
		<div
			class="w-10/11 h-50 md:h-110 2xl:h-250 pt-10 pl-10 pr-4 space-y-10 overflow-y-scroll overflow-hidden"
		>
			<vs-input
				v-model="name"
				required
				type="text"
				style="direction: ltr"
				:label-placeholder="$t('name')"
			>
				<template #icon>
					<i class="bx bx-user"></i>
				</template>
				<template v-if="!valid_name" #message-danger>
					{{ $t("please_type") }}
				</template>
			</vs-input>
			<vs-input
				v-model="age"
				required
				style="direction: ltr"
				type="number"
				:label-placeholder="$t('Age')"
			>
				<template v-if="!valid_age" #message-warn>
					{{ $t("please_type_age") }}
				</template>
				<template v-if="!valid_max_age" #message-danger>
					{{ $t("please_type_real_age") }}
				</template>
			</vs-input>
			<vs-select
				v-model="country"
				color="danger"
				style="direction: ltr"
				:label-placeholder="$t('country')"
			>
				<vs-option
					v-for="(country_option, i) in country_options"
					:key="i"
					style="direction: ltr"
					:label="country_option"
					:value="country_option"
				>
					{{ country_option }}
				</vs-option>
			</vs-select>
			<vs-select
				v-model="message"
				color="danger"
				style="direction: ltr"
				:label-placeholder="$t('message')"
			>
				<vs-option
					v-for="(message_option, i) in message_options"
					:key="i"
					style="direction: ltr"
					:label="message_option"
					:value="message_option"
				>
					{{ message_option }}
				</vs-option>
			</vs-select>
			<div class="flex items-center justify-between">
				<vs-button
					class="bg-hex-ffcb02 p-4"
					@click="change_color('#ffcb02')"
				></vs-button>
				<vs-button
					class="bg-hex-0295da p-4"
					@click="change_color('#0295da')"
				></vs-button>
				<vs-button
					class="bg-hex-eb018c p-4"
					@click="change_color('#eb018c')"
				></vs-button>
				<vs-button
					class="bg-hex-e6e7e8 p-4"
					@click="change_color('#e6e7e8')"
				></vs-button>
				<vs-button
					class="bg-hex-a6ce39 p-4"
					@click="change_color('#a6ce39')"
				></vs-button>
			</div>
			<div class="flex flex-wrap">
				<vs-button
					v-for="(selected_emoji, i) in emojis"
					:key="i"
					class="text-6xl bg-transparent hover:(bg-pink-500 text-pink-500) focus:(bg-pink-500 text-pink-500)"
					@click="change_emoji(selected_emoji)"
					>{{ selected_emoji }}</vs-button
				>
			</div>
		</div>
		<div class="w-10/11 h-50 md:h-110 2xl:h-250 z-50">
			<Frame
				class="z-index"
				:emoji="emoji"
				:color="color"
				:message="message"
				:name="name"
				:age="age"
				:image="image"
			/>
		</div>
	</div>
</template>

<style>
.vs-input-content {
	margin: 10px 0px;
	width: calc(100%);
}

.vs-input-content .vs-input {
	width: 100%;
}
</style>
