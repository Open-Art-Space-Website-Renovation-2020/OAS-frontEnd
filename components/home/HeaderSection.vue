<script>
export default {
	props: {
		// eslint-disable-next-line vue/prop-name-casing
		base_url: {
			required: true,
			type: String,
		},
	},
	data() {
		return {
			eng_word: ["a", "r", "t", "f", "o", "r", "p", "e", "a", "c", "e"],
			ar_word: ["الفن", "لاجل", "السلام"],
			en_words_list: [],
			ar_words_list: [],
			home_image: "",
			ar_text: "",
			en_text: "",
			home_title: "",
			loading: false,
		}
	},

	async mounted() {
		this.loading = true
		let images = []
		const en_words = []
		const ar_words = []

		const response = await this.$axios.$get(`/fapi/gallery/random/`)

		const response_home = await this.$axios.$get(
			"/api/pages/?type=home.HomePage&fields=image,eng_description,ar_description"
		)
		this.home_image = response_home.items[0].image.meta.download_url
		this.ar_text = response_home.items[0].ar_description
		this.en_text = response_home.items[0].eng_description
		this.home_title = response_home.items[0].title
		for (const item of response) {
			// images = [...images, `${this.base_url}${item.original_image.file}`]
			images = [...images, item.original_image.file]
		}
		this.eng_word.forEach((value, index) => {
			const obj = {}
			obj.name = value
			if (images[index] === undefined) {
				obj.image = images[0]
			} else {
				obj.image = images[index]
			}
			en_words.push(obj)
		})

		this.en_words_list = en_words

		this.ar_word.forEach((value, index) => {
			const obj = {}
			obj.name = value
			if (images[index] === undefined) {
				obj.image = images[0]
			} else {
				obj.image = images[index]
			}
			ar_words.push(obj)
		})

		this.ar_words_list = ar_words
		this.loading = false
	},
}
</script>

<template>
	<div class="font-black">
		<section class="flex flex-col items-center">
			<div
				v-if="loading"
				class="
					w-12
					h-12
					border-4 border-hex-f2135d
					rounded-full
					loader
				"
			></div>

			<div v-else class="flex">
				<div v-if="$t('dir') === 'ltr'" class="flex">
					<OASWord
						v-for="(word, index) in en_words_list"
						:key="index"
						:title="word.name"
						:image="word.image"
					/>
				</div>

				<OASWord
					v-for="(word, index) in ar_words_list"
					v-else
					:key="index"
					:title="word.name"
					:image="word.image"
				/>
			</div>

			<div
				class="
					w-10/11
					lg:w-7/11
					p-8
					mt-16
					flex flex-col
					items-center
					border-8
					rounded-3xl
				"
			>
				<div
					v-if="loading"
					class="
						w-12
						h-12
						border-4 border-hex-f2135d
						rounded-full
						loader
					"
				></div>

				<nuxt-img
					v-else
					class="w-full h-full rounded-3xl"
					quality="50"
					:src="home_image"
				/>
				<p
					class="
						mt-3
						text-xl
						md:text-2xl
						lg:text-3xl
						xl:text-4xl
						capitalize
						text-gray-500
						font-black
					"
				>
					{{ home_title }}
				</p>
			</div>
		</section>

		<section
			class="
				mt-20
				pb-24
				flex flex-col
				items-center
				text-gray-600
				bg-hex-0295da
			"
		>
			<div class="-mt-24">
				<Triangle
					text="about"
					ar_y="22.051079"
					ar_x="87.844219"
					en_y="20.051079"
					en_x="14.844219"
				/>
			</div>

			<div
				class="
					w-10/11
					mb-4
					flex flex-col
					items-center
					p-8
					mt-0
					border-4 border-pink-500
					bg-white
					rounded-3xl
				"
			>
				<TextImage text="about" />
				<div
					v-if="loading"
					class="
						w-12
						h-12
						mt-10
						border-4 border-hex-f2135d
						rounded-full
						loader
					"
				></div>

				<div v-else>
					<p
						class="
							mt-16
							md:text-xl
							lg:text-2xl
							xl:text-3xl
							2xl:text-6xl
							tracking-wider
							leading-7
						"
						v-html="$t('dir') === 'ltr' ? en_text : ar_text"
					></p>
				</div>
			</div>
		</section>
	</div>
</template>

<style scoped>
* {
	font-family: "Cairo", sans-serif;
}
</style>
