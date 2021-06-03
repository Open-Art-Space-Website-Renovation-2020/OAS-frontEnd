<script>
import Puzzle from "@/models/puzzle"

export default {
	name: "Puzzle",
	async asyncData({ $axios, params }) {
		const slug = params.slug
		const detail_puzzle = await $axios.$get(`/fapi/puzzle/${slug}`)
		const video_id = detail_puzzle.video.split("?v=")[1]

		let init_horizontal, init_vertical, init_level
		const puzzle = await Puzzle.query().search(slug).first()
		if (!puzzle) {
			const new_puzzle = await Puzzle.insert({
				data: {
					name: slug,
				},
			})
			init_horizontal = new_puzzle.puzzles[0].horizontal
			init_vertical = new_puzzle.puzzles[0].vertical
			init_level = new_puzzle.puzzles[0].level
		} else {
			init_horizontal = puzzle.horizontal
			init_vertical = puzzle.vertical
			init_level = puzzle.level
		}
		const base_url = process.env.BASE_URL
		return {
			detail_puzzle,
			init_horizontal,
			init_level,
			init_vertical,
			video_id,
			base_url,
			slug,
		}
	},
	data() {
		return {
			playing: false,
			horizontal: null,
			vertical: null,
			level: null,
			loading: false,
			base_urls:
				this.base_url === undefined
					? this.$store.getters["other/get_url"]
					: this.base_url,
		}
	},
	head: {
		title: "Puzzle Game | Open Art Space",
	},
	created() {
		this.horizontal = this.init_horizontal
		this.vertical = this.init_vertical
		this.level = this.init_level
	},
	methods: {
		start(...args) {
			this.$refs.board.start(...args)
			this.playing = true
		},
		async restart() {
			this.playing = false
			this.$refs.optionsPane.reset()
			const puzzle = await Puzzle.query().search(this.slug).first()
			this.horizontal = puzzle.horizontal
			this.vertical = puzzle.vertical
			this.level = puzzle.level
		},
	},
}
</script>

<template>
	<div>
		<section
			class="-mt-20 pt-20 pb-12 flex flex-col items-center bg-purple-600 text-gray-600"
		>
			<div
				class="w-full lg:w-10/11 mb-4 flex flex-col items-center p-8 border-4 border-pink-500 bg-white rounded-3xl"
			>
				<div class="ml-4 md:(mr-4 rtl:mr-0 ml-0) relative">
					<img
						class="w-36 h-36"
						src="@/assets/img/bg2.png"
						loading="lazy"
					/>
					<h1
						class="absolute left-0 ml-2 mt-12 top-0 rtl:(right-0 mr-7 mt-9) text-5xl"
					>
						{{ $t("play") }}
					</h1>
				</div>

				<h1
					v-if="$t('dir') === 'ltr'"
					class="my-4 text-3xl select-none"
				>
					{{ $t("level") }} {{ level }}
				</h1>
				<h1
					v-if="$t('dir') === 'rtl' && level === 'one'"
					class="my-4 text-3xl select-none"
				>
					{{ $t("level") }} اول
				</h1>
				<h1
					v-if="$t('dir') === 'rtl' && level === 'two'"
					class="my-4 text-3xl select-none"
				>
					{{ $t("level") }} الثاني
				</h1>
				<h1
					v-if="$t('dir') === 'rtl' && level === 'three'"
					class="my-4 text-3xl select-none"
				>
					{{ $t("level") }} الثالث
				</h1>
				<OptionsPanel
					v-show="!playing"
					ref="optionsPane"
					:image="base_urls + detail_puzzle.image.file"
					:horizontal="horizontal"
					:vertical="vertical"
					@gameStart="start"
				/>
				<Board
					v-show="playing"
					ref="board"
					class="p-75px"
					:level="level"
					@restart="restart"
				/>
			</div>
		</section>
		<section
			class="pt-20 flex flex-col items-center bg-yellow-300 text-gray-600"
		>
			<div class="-mt-40">
				<Triangle
					text="continue"
					ar_y="20.051079"
					ar_x="72.844219"
					en_y="20.051079"
					en_x="24.844219"
					color="text-pink-500"
				/>
			</div>

			<div
				class="w-full md:w-10/11 mb-30 flex flex-col items-center p-6 mt-0 border-2 border-pink-500 bg-white rounded-3xl"
			>
				<div>
					<Youtube
						:id="video_id"
						class_name="h-100 w-full rounded-3xl"
					/>
					<p
						class="mt-16 tracking-wider leading-7"
						v-html="
							$t('dir') === 'ltr'
								? detail_puzzle.eng_description
								: detail_puzzle.ar_description
						"
					></p>
				</div>
				<UploadArtLink />
			</div>
		</section>
	</div>
</template>
