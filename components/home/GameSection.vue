<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component
export default class GameSectionComponent extends Vue {
	links: object[] = [
		{
			name: "puzzle",
			color: "#00afef",
			route: "/games/puzzles/",
			img: "/img/home-games/puzzle.png",
		},
		{
			name: "jigsaw",
			color: "#ffcc2a",
			route: "/games/jigsaw/",
			img: "/img/home-games/jigsaw.png",
		},
		{
			name: "card",
			color: "#ec278f",
			route: "/games/card/",
			img: "/img/home-games/memory-card.png",
		},
		{
			name: "arts",
			color: "#a7919e",
			route: "/arts/",
			img: "/img/home-games/paper-games.png",
		},
		{
			name: "guess",
			color: "#a53792",
			route: "/games/guess/",
			img: "/img/home-games/guess-the-image.png",
		},
		{
			name: "draw",
			color: "#a8cf46",
			route: "/draw/",
			img: "/img/home-games/draw.png",
		},
		{
			name: "simon",
			color: "#f48750",
			route: "/games/colors/",
			img: "/img/home-games/color-game.png",
		},
		{
			name: "blog",
			color: "#51a7b0",
			route: "/",
			img: "/img/home-games/blog.png",
		},
	]
}
</script>

<template>
	<section class="mt-20 flex flex-col items-center pb-24 bg-hex-0295da">
		<div class="-mt-24">
			<Triangle
				text="games"
				ar_y="20.051079"
				ar_x="70.844219"
				en_y="20.051079"
				en_x="30.844219"
			/>
		</div>

		<div
			class="
				w-10/11
				max-w-7xl
				pb-6
				flex flex-wrap
				justify-center
				gap-x-10 gap-y-24
				lg:gap-x-14 lg:gap-y-32
				text-white
			"
		>
			<nuxt-link
				v-for="(link, index) in links"
				:key="index"
				:to="link.route"
				class="
					game-card
					group
					w-64
					sm:w-72
					flex flex-col
					items-center
					focus:outline-none
				"
				:aria-label="$t(link.name)"
			>
				<div class="w-full h-64 sm:h-72 overflow-hidden bg-hex-cfff4e">
					<img
						class="
							block
							w-full
							h-full
							object-cover
							transition-transform
							duration-300
							group-hover:scale-105
						"
						:src="link.img"
						:alt="`${$t(link.name)} illustration`"
					/>
				</div>
				<span
					class="
						game-label
						w-11/12
						h-24
						mt-10
						px-3
						flex
						items-center
						justify-center
						text-center text-2xl
						sm:text-3xl
					"
					:style="{ backgroundColor: link.color }"
				>
					{{ $t(link.name) }}
				</span>
			</nuxt-link>
		</div>
	</section>
</template>

<style scoped>
* {
	font-family: "Cairo", sans-serif;
}

.game-card:hover .game-label,
.game-card:focus .game-label {
	filter: brightness(1.06);
}

.game-label {
	font-weight: 900;
	line-height: 1.15;
	transition: filter 0.2s ease;
}
</style>
