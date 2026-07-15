<script>
import sample from "lodash.sample"
import Puzzle from "@/models/puzzle"
let backupTiles = null
export default {
	props: ["level"],
	data() {
		return {
			// victorySound: new Audio("audio/victory.wav"),
			image: null,
			showingOriginal: false,
			size: {
				horizontal: 0,
				vertical: 0,
			},
			tiles: [],
			tileSize: {
				width: 0,
				height: 0,
			},
			imageSize: {
				width: 0,
				height: 0,
			},
			resizeFrame: null,
		}
	},
	mounted() {
		window.addEventListener("resize", this.scheduleResize)
	},
	destroyed() {
		window.removeEventListener("resize", this.scheduleResize)
		if (this.resizeFrame) {
			window.cancelAnimationFrame(this.resizeFrame)
		}
	},
	computed: {
		frameSize() {
			return {
				width: `${this.tileSize.width * this.size.horizontal}px`,
				height: `${this.tileSize.height * this.size.vertical}px`,
				gridTemplateColumns: `repeat(${this.size.horizontal}, 1fr)`,
			}
		},
		/**
		 * The total number of tiles in the current board.
		 * @return {Number}
		 */
		totalTiles() {
			return this.size.horizontal * this.size.vertical
		},
		/**
		 * Determine if the current board is valid (solved).
		 * @return {boolean}
		 */
		valid() {
			if (!this.tiles.length) {
				return false
			}
			for (let i = 0; i < this.totalTiles; ++i) {
				if (this.tiles[i].styles.order !== this.tiles[i].position) {
					return false
				}
			}
			const puzzle = Puzzle.query()
				.search(this.$route.params.slug)
				.first()
			if (puzzle) {
				if (puzzle.level === "one") {
					Puzzle.insertOrUpdate({
						data: {
							id: puzzle.id,
							name: puzzle.name,
							horizontal: 4,
							vertical: 4,
							level: "two",
						},
					})
				}
				if (puzzle.level === "two") {
					Puzzle.insertOrUpdate({
						data: {
							id: puzzle.id,
							name: puzzle.name,
							horizontal: 5,
							vertical: 5,
							level: "three",
						},
					})
				}
				if (puzzle.level === "three") {
					Puzzle.insertOrUpdate({
						data: {
							id: puzzle.id,
							name: puzzle.name,
							horizontal: 6,
							vertical: 6,
							level: "four",
						},
					})
				}
				if (puzzle.level === "four") {
					Puzzle.insertOrUpdate({
						data: {
							id: puzzle.id,
							name: puzzle.name,
							horizontal: 7,
							vertical: 7,
							level: "five",
						},
					})
				}
				if (puzzle.level === "five") {
					Puzzle.insertOrUpdate({
						data: {
							id: puzzle.id,
							name: puzzle.name,
							horizontal: 8,
							vertical: 8,
							level: "six",
						},
					})
				}

				this.after_win()
			}
			return true
		},
	},
	methods: {
		scheduleResize() {
			if (this.resizeFrame) {
				window.cancelAnimationFrame(this.resizeFrame)
			}

			this.resizeFrame = window.requestAnimationFrame(() => {
				this.resizeFrame = null
				this.resizeBoard()
			})
		},
		resizeBoard() {
			if (!this.imageSize.width || !this.$refs.board) {
				return
			}

			const availableWidth = this.$refs.board.clientWidth
			if (!availableWidth) {
				return
			}

			const boardWidth = Math.min(this.imageSize.width, availableWidth)
			const scale = boardWidth / this.imageSize.width
			this.tileSize.width = boardWidth / this.size.horizontal
			this.tileSize.height =
				(this.imageSize.height * scale) / this.size.vertical
			this.updateTileSizes(this.tiles)

			if (backupTiles) {
				const backup = JSON.parse(backupTiles)
				this.updateTileSizes(backup)
				backupTiles = JSON.stringify(backup)
			}
		},
		updateTileSizes(tiles) {
			const backgroundSize = `${
				this.tileSize.width * this.size.horizontal
			}px ${this.tileSize.height * this.size.vertical}px`

			tiles.forEach((tile, index) => {
				tile.styles.backgroundPositionX = `-${
					(index % this.size.horizontal) * this.tileSize.width
				}px`
				tile.styles.backgroundPositionY = `-${
					Math.floor(index / this.size.horizontal) *
					this.tileSize.height
				}px`
				tile.styles.backgroundSize = backgroundSize
				tile.styles.width = `${this.tileSize.width}px`
				tile.styles.height = `${this.tileSize.height}px`
			})
		},
		sleep(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms))
		},
		async after_win() {
			// this.victorySound.play()
			await this.sleep(1500)
			this.$emit("restart")
			location.reload()
		},
		start({ image, size }) {
			this.size = size
			this.image = image
			backupTiles = null
			// detect the width and height of the frame
			const img = new Image()
			img.onload = () => {
				this.imageSize.width = img.naturalWidth || img.width
				this.imageSize.height = img.naturalHeight || img.height
				this.resizeBoard()
				this.generateTiles()
				this.shuffleTiles()
			}
			img.src = image
		},
		/**
		 * Generate the tiles for the current game.
		 */
		generateTiles() {
			this.tiles = []
			for (let i = 0; i < this.totalTiles; ++i) {
				this.tiles.push({
					styles: {
						background:
							i === 0 ? "transparent" : `url(${this.image})`,
						backgroundRepeat: "no-repeat",
						backgroundPositionX: `-${
							(i % this.size.horizontal) * this.tileSize.width
						}px`,
						backgroundPositionY: `-${
							Math.floor(i / this.size.horizontal) *
							this.tileSize.height
						}px`,
						width: `${this.tileSize.width}px`,
						height: `${this.tileSize.height}px`,
						order: i,
					},
					position: i,
					isEmpty: i === 0,
				})
			}
			this.updateTileSizes(this.tiles)
		},
		/**
		 * Shuffle the generated tiles.
		 */
		shuffleTiles() {
			// To make sure the puzzle is solvable, we execute a series of random moves
			for (let i = 0, j = this.totalTiles * 5; i < j; ++i) {
				const emptyTile = this.tiles.find((t) => t.isEmpty)
				const movableTiles = this.tiles.filter((t) => {
					return this.getAdjacentOrders(emptyTile).includes(
						t.styles.order
					)
				})
				this.switchTiles(emptyTile, sample(movableTiles))
			}
			// Make a backup for later reset
			backupTiles = JSON.stringify(this.tiles)
		},
		/**
		 * Move a (movable) tile
		 * @param  {Object} tile
		 */
		moveTile(tile) {
			if (tile.isEmpty) {
				return
			}
			// Find the 4 direct (non-diagonal) adjacent tiles and see if any of them is the empty tile
			const target = this.tiles.find((t) => {
				return (
					t.isEmpty &&
					this.getAdjacentOrders(tile).includes(t.styles.order)
				)
			})
			// If found the empty tile, just switch the flex order and we're good.
			target && this.switchTiles(target, tile)
		},
		/**
		 * Switch two tiles.
		 * @param  {Object} a First tile
		 * @param  {Object} b Second tile
		 */
		switchTiles(a, b) {
			;[a.styles.order, b.styles.order] = [
				b.styles.order,
				a.styles.order,
			]
		},
		/**
		 * Get the four direct (non-diagonal) adjacent tiles' orders of a tile.
		 * @param  {Object} tile
		 * @return {Array.<Number>}
		 */
		getAdjacentOrders(tile) {
			const pos = tile.styles.order
			return [
				pos % this.size.horizontal ? pos - 1 : null,
				(pos + 1) % this.size.horizontal ? pos + 1 : null,
				pos - this.size.horizontal,
				pos + this.size.horizontal,
			]
		},
		/**
		 * Reset the board.
		 */
		reset() {
			this.tiles = JSON.parse(backupTiles)
		},
		/**
		 * Restart the game.
		 */
		restart() {
			this.$emit("restart")
		},
	},
}
</script>

<template>
	<div ref="board" class="puzzle-board">
		<div class="frame-wrapper" :style="frameSize">
			<p v-if="valid" class="win">{{ $t("win") }}</p>
			<div
				v-if="showingOriginal && image"
				class="original"
				:style="{
					background: `url(${image}) center / 100% 100% no-repeat`,
				}"
			></div>
			<div class="frame" :style="frameSize">
				<Tile
					v-for="tile in tiles"
					:key="tile.position"
					ref="tiles"
					:tile="tile"
					@moving="moveTile"
				/>
			</div>
		</div>

		<div class="puzzle-controls mt-8 text-black">
			<!-- SHOW ORIGINAL -->
			<div
				class="puzzle-control relative select-none cursor-pointer"
				@click="showingOriginal = !showingOriginal"
			>
				<img class="w-35 h-35" src="@/assets/img/button4.png" />
				<h1
					class="absolute left-0 ml-7 mt-7 top-0 rtl:(right-3 mr-6 mt-7) text-2xl"
				>
					{{ $t("original image") }}
				</h1>
			</div>
			<!-- RESHUFFLE -->
			<div
				class="puzzle-control relative select-none cursor-pointer"
				@click="shuffleTiles"
			>
				<img class="w-35 h-35" src="@/assets/img/button4.png" />
				<h1
					class="absolute left-0 ml-5 mt-12 top-0 rtl:(right-3 mr-9 mt-10) text-2xl"
				>
					{{ $t("reshuffle") }}
				</h1>
			</div>
			<!-- RESET -->
			<div
				class="puzzle-control relative select-none cursor-pointer"
				@click="reset"
			>
				<img class="w-35 h-35" src="@/assets/img/button4.png" />
				<h1
					class="absolute left-0 ml-8 mt-12 top-0 rtl:(right-3 mr-9 mt-10) text-2xl"
				>
					{{ $t("reset") }}
				</h1>
			</div>
			<!-- NEW GAME -->
			<div
				class="puzzle-control relative select-none cursor-pointer"
				@click="restart"
			>
				<img class="w-35 h-35" src="@/assets/img/button4.png" />
				<h1
					class="absolute left-0 ml-9 mt-7 top-0 rtl:(right-3 mr-5 mt-7) text-2xl"
				>
					{{ $t("New Game") }}
				</h1>
			</div>
		</div>
	</div>
</template>

<style>
.puzzle-board {
	box-sizing: border-box;
	width: 100%;
	max-width: 1310px;
	border: clamp(12px, 6vw, 80px) solid black;
	border-image: url("/img/oas-frame.png") 65;
}

.frame-wrapper {
	margin: 0 auto;
	position: relative;
	box-shadow: 0 0 0px 3px;
}

.frame-wrapper .original {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
}

.frame-wrapper p.win {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.5);
	color: #fff;
	font-size: 40px;
	margin: 0 0;
	background: rgba(43, 181, 82, 0.7);
	text-transform: uppercase;
}

.frame {
	display: grid;
	background: #612211 url("/img/puzzle/board.jpeg");
	background-size: cover;
}

.puzzle-controls {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
	justify-items: center;
	gap: 1rem;
}

.puzzle-control {
	margin-top: 1rem;
}

.controls {
	margin-top: 30px;
}

.controls a {
	display: inline-block;
	text-decoration: none;
	padding: 6px 12px;
	background: #f78403;
	color: #fff;
	border-radius: 3px;
}

.controls a.toggle-original {
	background: #d05b88;
}

.controls a.restart {
	background: #368ba0;
}

.controls a.shuffle {
	background: #3ebb5c;
}
</style>
