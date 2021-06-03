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
					image: "/img/puzzle_logo.jpg",
				},
				{
					name: "jigsaw",
					route: "jigsaw/",
					image: "/img/jigsaw_logo.jpg",
				},
				{
					name: "card",
					route: "card/",
					image: "/img/card_logo.jpg",
				},
				{
					name: "guess",
					route: "guess/",
					image: "/img/guess_logo.jpg",
				},
				{
					name: "simon",
					route: "colors/",
					image: "/img/simon_logo.jpg",
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
			class="-mt-20 pt-20 pb-12 flex flex-col items-center text-gray-600 bg-hex-0295da"
		>
			<div
				class="w-10/11 pt-4 mb-14 flex flex-col items-center p-0 border-4 border-pink-500 bg-white rounded-3xl"
			>
				<div class="ml-4 md:(mr-4 rtl:mr-0 ml-0) relative">
					<img
						class="w-36 h-36"
						src="@/assets/img/bg2.png"
						loading="lazy"
					/>
					<h1
						class="absolute left-0 ml-2 mt-11 top-0 rtl:(right-0 mr-5) text-5xl"
					>
						{{ $t("games") }}
					</h1>
				</div>

				<div class="flex flex-col items-center mb-3">
					<div
						class="p-8 grid grid-rows-1 gap-y-10 md:(grid-cols-2 gap-6) lg:(grid-cols-3 gap-10) capitalize"
					>
						<div
							v-for="(link, index) in links"
							:key="index"
							class="flex flex-col justify-center items-center max-w-sm mx-auto my-8"
						>
							<img
								:src="link.image"
								loading="lazy"
								class="bg-gray-300 h-64 w-full rounded-lg shadow-md bg-cover bg-center"
								:alt="link.name + 'game'"
							/>
							<div
								class="w-56 md:w-64 bg-pink-600 -mt-10 shadow-lg rounded-lg overflow-hidden"
							>
								<div
									class="py-2 text-center font-bold uppercase tracking-wide text-white"
								>
									{{ $t(link.name) }}
								</div>
								<div
									class="flex items-center justify-center py-2 px-3 bg-yellow-400"
								>
									<vs-button
										:to="link.route"
										class="text-lg lg:text-2xl bg-pink-600"
										block
										>{{ $t("play") }}</vs-button
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<UploadArtLink />
		</section>
	</div>
</template>
