<script>
export default {
	transition: "page",
	async asyncData({ $axios }) {
		const response = await $axios.$get(
			"/api/pages/?type=about.AboutPage&fields=eng_description,ar_description"
		)
		const ar_text = response.items[0].ar_description
		const en_text = response.items[0].eng_description
		return { ar_text, en_text }
	},
	data() {
		return {
			links: [
				{ name: "facebook", icon: "bx bxl-facebook-square" },
				{ name: "twitter", icon: "bx bxl-twitter" },
				{ name: "youtube", icon: "bx bxl-youtube" },
				{ name: "linkedin", icon: "bx bxl-linkedin" },
			],
		}
	},
	head: {
		title: "About Us | Open Art Space",
	},
}
</script>

<template>
	<section
		class="mt-20 pb-24 flex flex-col items-center text-gray-600 font-black"
	>
		<div
			class="w-10/11 mb-4 flex flex-col items-center p-8 mt-0 border-4 border-pink-500 bg-white rounded-3xl"
		>
			<TextImage text="about us" />

			<div class="w-10/11">
				<!-- <p
					class="mt-16 tracking-wider leading-7 text-xl"
					v-html="$t('dir') === 'ltr' ? en_text : ar_text"
				></p> -->
				<p
					class="mt-16 md:text-xl lg:text-2xl xl:text-3xl 2xl:text-6xl tracking-wider leading-7"
					v-html="$t('dir') === 'ltr' ? en_text : ar_text"
				></p>

				<div
					class="mt-10 flex flex-col md:flex-row space-y-6 md:space-y-0 items-center justify-around"
				>
					<vs-button
						v-for="(link, index) in links"
						:key="index"
						block
						icon
						:color="link.name"
					>
						<i :class="link.icon"></i>
					</vs-button>

					<!-- <vs-button icon color="twitter">
						<i class="bx bxl-twitter"></i>
					</vs-button>

					<vs-button icon color="youtube">
						<i class="bx bxl-youtube"></i>
					</vs-button>

					<vs-button icon color="linkedin">
						<i class="bx bxl-linkedin"></i>
					</vs-button>

					<vs-button icon color="whatsapp">
						<i class="bx bxl-whatsapp"></i>
					</vs-button>

					<vs-button icon color="twitch">
						<i class="bx bxl-twitch"></i>
					</vs-button>

					<vs-button icon color="medium">
						<i class="bx bxl-medium"></i>
					</vs-button>

					<vs-button icon color="skype">
						<i class="bx bxl-skype"></i>
					</vs-button>

					<vs-button icon color="slack">
						<i class="bx bxl-slack-old"></i>
					</vs-button>

					<vs-button icon color="messenger">
						<i class="bx bxl-messenger"></i>
					</vs-button>

					<vs-button icon color="tumblr">
						<i class="bx bxl-tumblr"></i>
					</vs-button>

					<vs-button icon color="dribbble">
						<i class="bx bxl-dribbble"></i>
					</vs-button>

					<vs-button icon color="google-plus">
						<i class="bx bxl-google-plus"></i>
					</vs-button> -->
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
* {
	font-family: "Cairo", sans-serif;
}
@keyframes loader-rotate {
	0% {
		transform: rotate(0);
	}
	100% {
		transform: rotate(360deg);
	}
}
.loader {
	border-right-color: transparent;
	animation: loader-rotate 0.7s linear infinite;
}
</style>
