<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component
export default class GameSectionComponent extends Vue {
	links: object[] = [
		{
			name: "puzzle",
			color: "ffcb02",
			route: "/games/puzzles/",
			img: "/img/puzzle_logo.jpg",
		},
		{
			name: "jigsaw",
			color: "0295da",
			route: "/games/jigsaw/",
			img: "/img/jigsaw_logo.jpg",
		},
		{
			name: "card",
			color: "eb018c",
			route: "/games/card/",
			img: "/img/card_logo.jpg",
		},
		{
			name: "guess",
			color: "a6ce39",
			route: "/games/guess/",
			img: "/img/guess_logo.jpg",
		},
		{
			name: "simon",
			color: "eb018c",
			route: "/games/colors/",
			img: "/img/simon_logo.jpg",
		},
		{
			name: "arts",
			color: "ffcb02",
			route: "/arts/",
			img: "/img/arts_logo.jpg",
		},
		{
			name: "draw",
			color: "0295da",
			route: "/draw/",
			img: "/img/draw_logo.jpg",
		},
		{
			name: "block",
			color: "a6ce39",
			route: "/",
			img: "/img/coming_soon_logo.jpg",
		},
	]
}
</script>

<template>
	<section class="flex flex-col items-center pb-24 bg-hex-e5e5e5">
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
			clssass="pb-6 flex flex-col items-center justify-center md:grid md:grid-cols-2 md:gap-y-6 text-white text-3xl"
			class="pb-6 grid grid-rows-1 gap-y-10 md:(grid-cols-2 gap-30) text-white text-3xl"
		>
			<nuxt-link
				v-for="(link, index) in links"
				:key="index"
				:to="link.route"
				:class="`h-80
				w-80
				md:w-75
				lg:w-100
				flex
				flex-col
				items-center
				justify-center
				rounded-xl
				bg-hex-${link.color}`"
			>
				<img class="h-6/9 w-7/8 mb-5 rounded-lg" :src="link.img" />
				<span>{{ $t(`${link.name}`) }}</span>
			</nuxt-link>
		</div>
	</section>
</template>

<style scoped>
* {
	font-family: "Cairo", sans-serif;
}
</style>
