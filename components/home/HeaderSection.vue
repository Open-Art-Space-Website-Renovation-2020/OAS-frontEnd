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
		this.$emit("about-loaded", {
			ar_text: this.ar_text,
			en_text: this.en_text,
		})
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
						:class="{ 'word-gap': index === 3 || index === 6 }"
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
					lg:w-5/11
					p-8
					mt-16
					flex flex-col
					items-center
					border-8 border-pink-500
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

				<img
					v-else
					class="w-full h-full rounded-3xl"
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
	</div>
</template>

<style scoped>
* {
	font-family: "Cairo", sans-serif;
}

.word-gap {
	margin-inline-start: 0.22em;
}
</style>
