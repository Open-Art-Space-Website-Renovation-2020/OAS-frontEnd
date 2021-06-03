<script>
import Card from "@/models/card"

export default {
	name: "Card",
	data() {
		return {
			// flipSound: new Audio("audio/flip.wav"),
			// matchSound: new Audio("audio/match.wav"),
			// victorySound: new Audio("audio/victory.wav"),
			// gameOverSound: new Audio("audio/gameOver.wav"),
			cardsArray: [],
			totalTime: 100,
			timeRemaining: this.totalTime,
			timer: this.totalTime,
			ticker: 0,
			totalClicks: 0,
			cardToCheck: null,
			matchedCards: [],
			busy: true,
			countdown: 0,
			images: [],
			card_model: null,
			level: "one",
			playing: false,
		}
	},
	head: {
		title: "Memory card Game | Open Art Space",
	},
	async created() {
		await this.load_game_data()
	},
	destroyed() {
		this.stopGame()
	},

	methods: {
		sleep(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms))
		},
		stopGame() {
			this.timeRemaining = 0
		},
		flip() {
			// this.flipSound.play()
		},
		match() {
			// this.matchSound.play()
		},
		victory() {
			this.stopGame()
			// this.victorySound.play()
		},
		gameOver() {
			this.stopGame()
			// this.gameOverSound.play()
		},
		startGame() {
			this.totalClicks = 0
			this.timeRemaining = this.totalTime
			this.cardToCheck = null
			this.matchedCards = []
			this.busy = true
			setTimeout(() => {
				this.shuffleCards()
				this.countdown = this.startCountdown()
				this.busy = false
			}, 500)
			this.hideCards()
			this.timer = this.timeRemaining
			this.ticker = this.totalClicks
		},
		hideCards() {
			this.cardsArray.forEach((card) => {
				card.classList.remove("visible")
				card.classList.remove("matched")
			})
		},
		flipCard(card) {
			if (this.canFlipCard(card)) {
				this.flip()
				this.totalClicks++
				this.ticker = this.totalClicks
				card.classList.add("visible")
				if (this.cardToCheck) {
					this.checkForCardMatch(card)
				} else {
					this.cardToCheck = card
				}
			}
		},
		checkForCardMatch(card) {
			if (
				this.getCardType(card) === this.getCardType(this.cardToCheck)
			) {
				this.cardMatch(card, this.cardToCheck)
			} else {
				this.cardMismatch(card, this.cardToCheck)
			}
			this.cardToCheck = null
		},
		getCardType(card) {
			return card.getElementsByClassName("card-value")[0].src
		},
		cardMatch(card1, card2) {
			this.matchedCards.push(card1)
			this.matchedCards.push(card2)
			card1.classList.add("matched")
			card2.classList.add("matched")
			this.match()

			if (this.matchedCards.length === this.cardsArray.length) {
				this.$vs.notification({
					width: "100%",
					icon: "<i class='bx bx-select-multiple' ></i>",
					color: "success",
					position: "bottom-center",
					title: "You Won",
				})
				this.victoryz()
			}
		},
		cardMismatch(card1, card2) {
			this.busy = true
			setTimeout(() => {
				card1.classList.remove("visible")
				card2.classList.remove("visible")
				this.busy = false
			}, 1000)
		},
		shuffleCards() {
			for (let i = this.cardsArray.length - 1; i > 0; i--) {
				const randIndex = Math.floor(Math.random() * (i + 1))
				this.cardsArray[randIndex].style.order = i
				this.cardsArray[i].style.order = randIndex
			}
		},

		canFlipCard(card) {
			return (
				!this.busy &&
				!this.matchedCards.includes(card) &&
				card !== this.cardToCheck
			)
		},
		startCountdown() {
			return setInterval(() => {
				this.timeRemaining--
				this.timer = this.timeRemaining
				if (this.timeRemaining === 0) {
					this.$vs.notification({
						width: "100%",
						icon: "<i class='bx bx-bug' ></i>",
						color: "danger",
						position: "bottom-center",
						title: "GameOver.",
					})
					this.game_over()
				}
			}, 1000)
		},
		game_over() {
			clearInterval(this.countdown)
			this.gameOver()
			this.ready()
		},
		victoryz() {
			clearInterval(this.countdown)
			this.victory()
			this.next_level()
		},
		async next_level() {
			if (this.card_model.level === "one") {
				Card.insertOrUpdate({
					data: {
						id: this.card_model.id,
						total_time: 75,
						level_one: this.card_model.level_one,
						level_two: this.card_model.level_two,
						level_three: this.card_model.level_three,
						level: "two",
					},
				})
			}

			if (this.card_model.level === "two") {
				Card.insertOrUpdate({
					data: {
						id: this.card_model.id,
						total_time: 100,
						level_one: this.card_model.level_one,
						level_two: this.card_model.level_two,
						level_three: this.card_model.level_three,
						level: "three",
					},
				})
			}
			if (this.card_model.level === "three") {
				Card.insertOrUpdate({
					data: {
						id: this.card_model.id,
						total_time: 37,
						level_one: this.card_model.level_one,
						level_two: this.card_model.level_two,
						level_three: this.card_model.level_three,
						level: "one",
					},
				})
			}
			await this.load_game_data()
			await this.sleep(500)

			this.playing = false
		},
		async ready() {
			this.playing = true
			await this.sleep(500)
			const cards = Array.from(document.getElementsByClassName("card"))
			this.cardsArray = cards

			this.startGame()

			cards.forEach((card) => {
				card.addEventListener("click", () => {
					this.flipCard(card)
				})
			})
		},
		async load_game_data() {
			let card = await Card.query().first()
			if (!card) {
				const new_card = await Card.insert({
					data: {
						level: "one",
					},
				})
				card = new_card.card[0]
			}
			if (card.level === "one") {
				this.images = card.level_one
			}
			if (card.level === "two") {
				this.images = card.level_two
			}
			if (card.level === "three") {
				this.images = card.level_three
			}
			this.card_model = card
			this.totalTime = card.total_time
			this.level = card.level
		},
	},
}
</script>

<template>
	<div>
		<section
			class="-mt-20 pt-20 pb-12 flex flex-col items-center bg-hex-a6ce39 text-gray-600"
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
							class="h-full w-full mb-6 rounded-xl"
							src="/img/card_logo.jpg"
							spinner-color="white"
						/>
						<div
							class="mr-4 relative select-none cursor-pointer"
							@click="ready"
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
					class="w-full md:w-10/11 md:p-8"
					style="
						border: 20px solid black;
						border-image: url('/img/oas-frame.png') 65;
					"
				>
					<!-- Counters start -->
					<div
						class="flex flex-col md:flex-row items-center justify-between"
					>
						<div class="text-hex-ffcb02 text-4xl md:text-6xl">
							Time
							<span id="time-remaining">{{ timer }}</span>
						</div>

						<div class="text-hex-ffcb02 text-4xl md:text-6xl">
							Flips <span id="flips">{{ ticker }}</span>
						</div>
					</div>
					<!-- Counters End -->

					<div
						class="w-full md:w-10/11 mt-50px flex flex-col items-center space-y-10 md:(grid grid-cols-2 gap-y-15 gap-x-36 space-y-0) lg:(grid grid-cols-3 gap-y-20 gap-x-35) xl:(grid grid-cols-4 gap-y-20 gap-x-40)"
					>
						<div
							v-for="(image, index) in images"
							:key="index"
							class="relative h-45 w-43.75 card cursor-pointer"
						>
							<div
								class="w-full h-full absolute flex items-center justify-center bg-black shadow-xl transition duration-500 ease-in-out card-back card-face"
							>
								<img
									v-if="level === 'one'"
									class="w-full h-full"
									src="/img/cards/a.jpg"
								/>
								<img
									v-if="level === 'two'"
									class="w-full h-full"
									src="/img/cards/b.jpg"
								/>
								<img
									v-if="level === 'three'"
									class="w-full h-full"
									src="/img/cards/d.jpg"
								/>
							</div>
							<div
								class="card-front card-face transition duration-500 ease-in-out"
							>
								<img
									class="relative w-full h-26vh transition duration-100 ease-in-out card-value cursor-default"
									:src="image"
								/>
							</div>
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
				<Youtube
					id="oDhY1lpLhu4"
					class_name="h-100 w-full rounded-3xl"
				/>
				<UploadArtLink />
			</div>
		</section>
	</div>
</template>

<style scoped>
.card {
	/* width: 175px; */
}

.card-face {
	backface-visibility: hidden;
}

.card.visible .card-back {
	transform: rotateY(-180deg);
}

.card.visible .card-front {
	transform: rotateY(0);
}

.card-back {
	transform: rotateY(0);
}

.card-value {
	/* height: 26vh;
	position: relative; */
	/* transition: transform 100ms ease-in-out; */
	/* transform: scale(0.9); */
}

.card-front:hover .card-value {
	transform: scale(1);
}

.card-front {
	transform: rotateY(180deg);
}
</style>
