<script>
export default {
	name: "Games",
	transition: "page",
	data() {
		return {
			links: [
				{
					name: "puzzle",
					route: "puzzles/",
					image: "/img/home-games/puzzle.png",
					color: "#00afef",
				},
				{
					name: "jigsaw",
					route: "jigsaw/",
					image: "/img/home-games/jigsaw.png",
					color: "#ffcc2a",
				},
				{
					name: "card",
					route: "card/",
					image: "/img/home-games/memory-card.png",
					color: "#ec278f",
				},
				{
					name: "guess",
					route: "guess/",
					image: "/img/home-games/guess-the-image.png",
					color: "#a53792",
				},
				{
					name: "simon",
					route: "colors/",
					image: "/img/home-games/color-game.png",
					color: "#f48750",
				},
			],
		}
	},
	head: {
		title: "Games | Open Art Space",
	},
}
</script>

<template>
	<div>
		<section
			class="
				-mt-20
				pt-20
				pb-12
				flex flex-col
				items-center
				text-gray-600
				bg-hex-0295da
			"
		>
			<div
				class="
					w-10/11
					pt-4
					mb-14
					flex flex-col
					items-center
					p-0
					border-4 border-pink-500
					bg-white
					rounded-3xl
				"
			>
				<div class="ml-4 md:(mr-4 rtl:mr-0 ml-0) relative">
					<img
						class="w-36 h-36"
						src="@/assets/img/bg2.png"
						loading="lazy"
					/>
					<h1
						class="
							absolute
							left-0
							ml-2
							mt-11
							top-0
							rtl:(right-0
							mr-5)
							text-5xl
						"
					>
						{{ $t("games") }}
					</h1>
				</div>

				<div class="w-full flex flex-col items-center mb-3">
					<div
						class="
							w-full
							p-8
							flex flex-wrap
							justify-center
							gap-x-10 gap-y-24
							lg:(gap-x-14
							gap-y-32)
							capitalize
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
							<div
								class="
									w-full
									h-64
									sm:h-72
									overflow-hidden
									bg-hex-cfff4e
								"
							>
								<img
									:src="link.image"
									loading="lazy"
									class="
										block
										w-full
										h-full
										object-cover
										transition-transform
										duration-200
										group-hover:scale-105
										group-focus:scale-105
									"
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
									text-center text-white text-2xl
									sm:text-3xl
								"
								:style="{ backgroundColor: link.color }"
							>
								{{ $t(link.name) }}
							</span>
						</nuxt-link>
					</div>
				</div>
			</div>
			<UploadArtLink />
		</section>
	</div>
</template>

<style scoped>
* {
	font-family: "Cairo", sans-serif;
}

.game-label {
	font-weight: 900;
	line-height: 1.15;
	transition: filter 0.2s ease;
}

.game-card:hover .game-label,
.game-card:focus .game-label {
	filter: brightness(1.06);
}
</style>
