<script>
import Jigsaw from "@/models/jigsaw"
export default {
	name: "Jigsaw",
	async asyncData({ $axios, params }) {
		const slug = params.slug
		const detail_jigsaw = await $axios.$get(`/fapi/jigsaw/${slug}`)
		const video_id = detail_jigsaw.video.split("?v=")[1]

		const base_url = process.env.BASE_URL
		return {
			detail_jigsaw,
			video_id,
			base_url,
			slug,
		}
	},

	data() {
		return {
			// victorySound: new Audio("audio/victory.wav"),
			canvas: null,
			image: null,
			horizontal: 4,
			vertical: 5,
			level: null,
			alert: false,
			playing: false,
			jigsawx: null,
			ar_text: "",
			en_text: "",
			base_urls:
				this.base_url === undefined
					? this.$store.getters["other/get_url"]
					: this.base_url,
		}
	},
	head: {
		title: "Jigsaw Game | Open Art Space",
	},
	async created() {
		this.ar_text = this.detail_jigsaw.ar_description
		this.en_text = this.detail_jigsaw.eng_description
		await this.load_game_data()
		this.image = this.detail_jigsaw.image.file
	},
	methods: {
		start() {
			this.playing = true
			const audio = new Audio("/audio/connect.wav")

			const dali = new Image()
			dali.src = this.image
			dali.onload = () => {
				// eslint-disable-next-line no-undef
				const canvas = new headbreaker.Canvas("my-canvas", {
					image: dali,
					width: 900,
					height: 700,
					pieceSize: 80,
					proximity: 10,
					borderFill: 10,
					strokeWidth: 2,
					lineSoftness: 0.12,
					fixed: true,
					strokeColor: "black",
					preventOffstageDrag: true,

					// outline: new headbreaker.outline.Rounded(),
				})

				canvas.adjustImagesToPuzzleHeight()

				canvas.autogenerate({
					horizontalPiecesCount: this.horizontal,
					verticalPiecesCount: this.vertical,
				})

				// canvas.shuffleColumns(1)
				canvas.shuffleGrid()

				canvas.draw()

				// let canvass = document.querySelector("canvas")
				// canvass.style.border = "100px solid black"
				// canvass.style.borderImage = "url('/oas-frame.png') 380"

				this.canvas = canvas
				canvas.onConnect((_piece, figure, _target, targetFigure) => {
					// play sound
					audio.play()

					// paint borders on click
					// of conecting and conected figures
					figure.shape.stroke("yellow")
					targetFigure.shape.stroke("yellow")
					canvas.redraw()

					setTimeout(() => {
						// restore border colors
						// later
						figure.shape.stroke("black")
						targetFigure.shape.stroke("black")
						canvas.redraw()
					}, 200)
				})
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				canvas.onDisconnect((it) => {
					audio.play()
				})
				canvas.attachSolvedValidator()
				canvas.onValid(async () => {
					if (this.jigsawx.level === "one") {
						Jigsaw.insertOrUpdate({
							data: {
								id: this.jigsawx.id,
								name: this.jigsawx.name,
								horizontal: 5,
								vertical: 6,
								level: "two",
							},
						})
					}
					if (this.jigsawx.level === "two") {
						Jigsaw.insertOrUpdate({
							data: {
								id: this.jigsawx.id,
								name: this.jigsawx.name,
								horizontal: 6,
								vertical: 6,
								level: "three",
							},
						})
					}
					if (this.jigsawx.level === "three") {
						Jigsaw.insertOrUpdate({
							data: {
								id: this.jigsawx.id,
								name: this.jigsawx.name,
								horizontal: 4,
								vertical: 5,
								level: "one",
							},
						})
					}
					// this.victorySound.play()
					this.$vs.notification({
						progress: "auto",
						width: "100%",
						icon: "<i class='bx bx-select-multiple' ></i>",
						color: "success",
						position: "top-center",
						title: "You Won !",
					})

					await this.load_game_data()
					await this.sleep(500)
					canvas.resize(0, 0)
					canvas.redraw()
					this.playing = false
				})
			}
		},
		sleep(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms))
		},
		async load_game_data() {
			let jigsaw = await Jigsaw.query().search(this.slug).first()
			if (!jigsaw) {
				const new_jigsaw = await Jigsaw.insert({
					data: {
						name: this.slug,
					},
				})
				jigsaw = new_jigsaw.jigsaw[0]
			}

			this.horizontal = jigsaw.horizontal
			this.vertical = jigsaw.vertical
			this.level = jigsaw.level
			this.jigsawx = jigsaw
		},
		solve() {
			this.canvas.solve()
			this.canvas.redraw()
		},
		shuffle() {
			this.canvas.shuffle(0.8)
			this.canvas.redraw()
		},
		shuffleGrid() {
			this.canvas.shuffleGrid(1.2)
			this.canvas.redraw()
		},
		shuffleColumns() {
			this.canvas.shuffleColumns(1.2)
			this.canvas.redraw()
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
				class="mb-4 flex flex-col items-center p-8 border-4 border-pink-500 bg-white rounded-3xl"
				:class="[playing ? 'w-3/4' : 'w-3/4']"
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

				<div v-if="!playing" class="w-full mt-4">
					<div class="flex flex-col items-center">
						<nuxt-img
							v-if="image"
							class="h-full w-full mb-6 rounded-xl"
							:src="image"
						/>
						<div
							class="mr-4 relative select-none cursor-pointer"
							@click="start"
						>
							<img
								class="w-36 h-36"
								src="@/assets/img/button4.png"
							/>
							<h1
								class="absolute left-0 ml-7 mt-10 top-0 rtl:(right-3 mr-10 mt-9) text-4xl"
							>
								{{ $t("start") }}
							</h1>
						</div>
					</div>
				</div>

				<div
					v-else
					class="relative flex flex-col items-center justify-center"
				>
					<div
						id="my-canvas"
						class="z-30"
						style="
							border: 20px solid black;
							border-image: url('/img/oas-frame.png') 65;
							padding: 0px;
						"
					></div>
					<div
						v-if="level === 'one'"
						style="padding: 10rem 10rem 15.2rem 10.2rem"
						class="absolute border-2 border-black"
					></div>
					<div
						v-else-if="level === 'two'"
						style="padding: 12.6rem 12.6rem 17.6rem 12.6rem"
						class="absolute border-2 border-black"
					></div>
					<div
						v-else-if="level === 'three'"
						style="padding: 15.1rem"
						class="absolute border-2 border-black"
					></div>
				</div>

				<div
					v-if="playing"
					class="flex items-end justify-between mt-8 text-black"
				>
					<!-- SHOW ORIGINAL -->
					<div
						class="mr-14 relative select-none cursor-pointer"
						@click="alert = true"
					>
						<img
							class="w-35 h-35"
							src="@/assets/img/button4.png"
						/>
						<h1 class="w-20 absolute left-6 bottom-12 text-2xl">
							{{ $t("original image") }}
						</h1>
					</div>
					<!-- RESHUFFLE -->
					<div
						class="mr-14 relative select-none cursor-pointer"
						@click="shuffle"
					>
						<img
							class="w-35 h-35"
							src="@/assets/img/button4.png"
						/>
						<h1
							class="w-64 absolute left-7 rtl:(right-12) top-0 mt-10 text-2xl"
						>
							{{ $t("shuffle") }}
						</h1>
					</div>

					<div
						class="mr-14 relative select-none cursor-pointer"
						@click="shuffleGrid"
					>
						<img
							class="w-35 h-35"
							src="@/assets/img/button4.png"
						/>
						<h1
							class="w-20 absolute left-8 rtl:(right-12) bottom-12 text-2xl"
						>
							{{ $t("shuffleGrid") }}
						</h1>
					</div>

					<div
						class="mr-14 relative select-none cursor-pointer"
						@click="shuffleColumns"
					>
						<img
							class="w-35 h-35"
							src="@/assets/img/button4.png"
						/>
						<h1
							class="w-20 absolute left-7 rtl:(right-12) bottom-12 text-2xl"
						>
							{{ $t("shuffleColumns") }}
						</h1>
					</div>

					<vs-dialog v-model="alert" class="bg-transparent">
						<nuxt-img v-if="image" :src="image" />
					</vs-dialog>
				</div>
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
						v-html="$t('dir') === 'ltr' ? en_text : ar_text"
					></p>
				</div>
				<UploadArtLink />
			</div>
		</section>
	</div>
</template>
