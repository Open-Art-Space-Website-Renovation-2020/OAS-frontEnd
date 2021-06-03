<script>
export default {
	name: "Guess",
	async asyncData({ $axios }) {
		const guess = await $axios.$get(`/fapi/guess/`)
		const video_id = guess.video.split("?v=")[1]
		const base_url = process.env.BASE_URL
		return {
			guess,
			video_id,
			base_url,
		}
	},
	data() {
		return {
			is_loading: false,
			base_urls:
				this.base_url === undefined
					? this.$store.getters["other/get_url"]
					: this.base_url,

			gameStage: 0,
			wordArray: [],
			guessArray: [],
			states: ["warning", "danger", "success"],
			currentState: 0,
			currentNameIndex: 0,
			newsfg: [
				{ name: "monalisa", image: "monalisa.jpg" },
				{ name: "thescream", image: "thescream.jpg" },
				{ name: "thestarrynight", image: "thestarrynight.jpg" },
				{
					name: "themysticalnativity",
					image: "themysticalnativity.jpg",
				},
			],
			time: 0,
			timer: null,
			score: 0,
			playing: true,
			playings: false,
			infoMessage: "That's Correct!",
			isCorrect: false,
			responses: [
				"That's Correct!",
				"Oops Wrong Answer!",
				"Oops, Time Ran out!",
				"Question Skipped",
			],
			video: "",
			ar_text: "",
			en_text: "",

			skipCount: 1,
		}
	},
	head: {
		title: "Guess the imag Game | Open Art Space",
	},
	computed: {
		guessLength() {
			return this.newsfg[this.currentNameIndex].name.split("").length
		},
	},
	watch: {
		// time(val) {
		// 	if (val == 0) {
		// 		this.playing = false
		// 	}
		// },
		currentNameIndex(val) {
			this.wordArray = this.shuffle(this.newsfg[val].name.split(""))
			this.time = this.newsfg[val].name.length * 30
		},
	},
	async created() {
		this.is_loading = true
		const loading = this.$vs.loading({
			type: "circles",
			text: "Loading...",
			color: "#d5397b",
		})

		this.ar_text = this.guess.ar_description
		this.en_text = this.guess.eng_description
		const cards = this.guess.content[0].value.cards
		for (const card of cards) {
			const card_image = await this.$axios.$get(
				`/api/images/${card.image}`
			)
			// console.log(card_image.meta.download_url)
			card.image = this.base_urls + card_image.meta.download_url
		}
		this.newsfg = cards
		this.wordArray = this.shuffle(
			this.newsfg[this.currentNameIndex].name.split("")
		)
		this.time = this.newsfg[this.currentNameIndex].name.length * 30
		this.is_loading = false
		loading.close()
	},
	methods: {
		sleep(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms))
		},

		selectWord(word, index) {
			if (word === "") return
			this.guessArray.push(word)
			this.wordArray[index] = ""
		},
		deleteWord() {
			if (this.guessArray) {
				let done = false
				this.wordArray.forEach((el, index) => {
					if (el === "" && !done) {
						this.wordArray[index] = this.guessArray.pop()
						done = true
					}
				})
			}
		},
		startGame() {
			this.playings = true
			this.guessArray = []
			this.currentNameIndex = 0
			this.playing = true
			this.skipCount = 1
			this.score = 0
			this.wordArray = this.shuffle(
				this.newsfg[this.currentNameIndex].name.split("")
			)
			this.startTimer()
		},
		checkAnswer() {
			if (this.guessArray.length !== this.guessLength) return false
			if (
				this.guessArray.join("") ===
				this.newsfg[this.currentNameIndex].name
			) {
				return true
			} else {
				return false
			}
		},
		submit() {
			if (this.checkAnswer()) {
				// this.victorySound.play()
				this.score += this.time
				this.score += 200
				this.isCorrect = true
				this.currentState = 2
				this.infoMessage = this.responses[0]
			} else if (this.time === 0) {
				// this.gameOverSound.play()
				this.isCorrect = false
				this.currentState = 1
				this.infoMessage = this.responses[2]
			} else {
				// this.gameOverSound.play()
				this.isCorrect = false
				this.currentState = 1
				this.infoMessage = this.responses[1]
			}
			this.endTimer()
		},
		nextRound() {
			if (this.currentNameIndex === this.newsfg.length - 1) {
				this.endGame()
				return
			}
			this.currentNameIndex++
			this.playing = true
			this.guessArray = []
			this.startTimer()
		},
		endGame() {
			this.startGame()
		},
		skip() {
			this.isCorrect = true
			this.currentState = 2
			this.infoMessage = this.responses[3]
			this.playing = false
			this.skipCount--
			this.endTimer()
		},
		startTimer() {
			this.currentState = 0
			// this.time = 30
			this.timer = null
			this.timer = setInterval(() => {
				if (this.time <= 0) {
					this.submit()
				} else {
					this.time -= 1
				}
			}, 1000)
		},
		endTimer() {
			this.playing = false
			clearInterval(this.timer)
			this.time = 0
			this.timer = null
		},
		shuffle(arra1) {
			let ctr = arra1.length
			let temp
			let index
			while (ctr > 0) {
				index = Math.floor(Math.random() * ctr)
				ctr--
				temp = arra1[ctr]
				arra1[ctr] = arra1[index]
				arra1[index] = temp
			}
			return arra1
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
				class="w-full md:w-10/11 mb-4 flex flex-col items-center p-8 border-4 border-pink-500 bg-white rounded-3xl"
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

				<div v-if="!playings" class="w-full mt-4">
					<div class="flex flex-col items-center">
						<nuxt-img
							class="h-full w-full mb-6 rounded-xl"
							src="/img/guess_logo.jpg"
						/>
						<div
							class="mr-4 relative select-none cursor-pointer"
							@click="startGame"
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
				<div v-else id="app" :class="states[currentState]">
					<div class="displayPanel">
						<div class="mb-4 flex items-center justify-around">
							<span class="text-lg"
								>{{ $t("score:") }} {{ score }}</span
							>
							<span class="text-lg"
								>{{ $t("time:") }} {{ time }}</span
							>
						</div>
						<ImagePanel
							:image="newsfg[currentNameIndex].image"
							:total="newsfg.length"
							:current="currentNameIndex + 1"
						/>
						<WordSlot
							:state="states[currentState]"
							:guess-length="guessLength"
							:guess-array="guessArray"
						/>
					</div>
					<div :class="states[currentState]" class="playPanel mt-4">
						<div v-if="playing" class="words_wrapper">
							<Word
								v-for="(word, index) in wordArray"
								:key="index"
								:alphabet="word"
								:state="states[currentState]"
								@click.native="selectWord(word, index)"
							/>
						</div>
						<div
							v-else
							class="info_box"
							:class="isCorrect ? 'isCorrect' : 'isWrong'"
						>
							<i v-if="isCorrect" class="far fa-smile"></i>
							<i v-else class="far fa-frown"></i>
							{{ infoMessage }}
						</div>
						<div v-if="playing" class="bottom_panel">
							<span>
								<button
									:disabled="skipCount == 0"
									class="btn skip"
									@click="skip()"
								>
									<i class="fas fa-forward"></i>
								</button>
								<br />
								<div class="label">
									{{ $t("skip:") }} {{ skipCount }}
								</div>
							</span>

							<button
								:disabled="guessLength != guessArray.length"
								class="btn action"
								@click="submit()"
							>
								{{ $t("submit") }}
							</button>
							<span>
								<button
									:disabled="guessArray.length == 0"
									class="btn backspace"
									@click="deleteWord()"
								>
									<i class="fas fa-backspace"></i>
								</button>
								<br />
								<div class="label">{{ $t("clear") }}</div>
							</span>
						</div>
						<div v-else class="bottom_panel">
							<button
								v-if="currentNameIndex == 4"
								class="btn action"
								@click="endGame()"
							>
								{{ $t("new game") }}
							</button>
							<button
								v-else
								class="btn action"
								@click="nextRound()"
							>
								{{ $t("next question") }}
							</button>
						</div>
					</div>
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

<style>
body {
	margin: 0;
}

.label {
	font-size: 12px;
	color: #695a17ee;
	width: 100%;
	font-weight: 600;
	padding-top: 5px;
	text-align: center;
}

#app {
	margin: 30px auto;
	height: 100vh;
	font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
		sans-serif;
}

@media screen and (min-width: 500px) {
	#app {
		width: 450px !important;
	}
}

#app .displayPanel .slot_wrapper {
	position: relative;
	top: 20%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	flex-wrap: wrap;
	padding: 5% 5%;
	margin: 10px auto;
}

#app .playPanel.success {
	background: linear-gradient(to top, #a8e063, #56ab2f);
	box-shadow: 0px -20px 50px #56ab2f3a;
}

#app .playPanel.danger {
	background: linear-gradient(to bottom, #ed213a, #93291e);
	box-shadow: 0px -20px 50px #b1261745;
}

#app .playPanel.warning {
	background: linear-gradient(to bottom, #f8de48, #ffbc02);
	box-shadow: 0px -20px 50px #fdc83034;
}

#app .playPanel .words_wrapper {
	display: flex;
	flex-direction: row;
	justify-content: center;
	flex-wrap: wrap;
	padding: 6% 6% 0 6%;
	min-height: 100px;
}

#app .playPanel .info_box {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	text-align: center;
	flex-wrap: wrap;
	padding: 6% 6% 0 6%;
	min-height: 100px;
	font-size: 35px;
	color: white;
}

#app .playPanel .info_box.isCorrect {
	text-shadow: 2px 2px green;
}

#app .playPanel .info_box.isWrong {
	text-shadow: 2px 2px darkred;
}

#app .bottom_panel {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 5% 7%;
}

#app .bottom_panel .btn {
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	outline: none;
}

#app .bottom_panel .btn:disabled {
	opacity: 0.4;
}

#app .bottom_panel .skip {
	width: 50px;
	height: 50px;
	border: 0.3px solid #ffffff00;
	border-radius: 10px;
	background: linear-gradient(to bottom, #ed213a, #93291e);
	box-shadow: 3px 3px 1px #741707;
	color: white;
	font-size: 20px;
	font-weight: 550;
}

#app .bottom_panel .skip:active {
	box-shadow: 1px 1px 5px #741707;
	transform: translate(2px, 2px);
}

#app .bottom_panel .action {
	width: 60%;
	border: 0.3px solid #ffffff00;
	border-radius: 10px;
	height: 50px;
	margin: 0 auto;
	background: linear-gradient(to top, #0f5397, #0640ad);
	color: white;
	font-size: 20px;
	font-weight: 550;
	box-shadow: 3px 3px 1px #0b3b6b;
}

#app .bottom_panel .action:active {
	box-shadow: 1px 1px 5px #366d1d;
	transform: translate(2px, 2px);
}

#app .bottom_panel .backspace {
	width: 50px;
	height: 50px;
	border: 1px solid #323435;
	border-radius: 10px;
	background: linear-gradient(to top, #232526, #414345);
	box-shadow: 3px 3px 1px #323435;
	color: white;
	font-size: 20px;
	font-weight: 550;
}

#app .bottom_panel .backspace:active {
	box-shadow: 1px 1px 5px black;
	transform: translate(2px, 2px);
}

@keyframes pulse {
	0% {
		transform: scale(1.1, 1.1);
	}

	100% {
		transform: scale(1, 1);
	}
}
</style>
