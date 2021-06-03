<script>
export default {
	name: "Colors",
	data() {
		return {
			playing: false,
		}
	},
	head: {
		title: "Color Game | Open Art Space",
	},
}
</script>

<template>
	<div>
		<section
			class="-mt-20 pt-20 pb-12 flex flex-col items-center bg-purple-600 text-gray-600"
		>
			<div
				class="w-full md:w-10/11 mb-4 flex flex-col items-center md:p-8 border-4 border-pink-500 bg-white rounded-3xl"
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

				<div v-if="!playing" class="w-full mt-4">
					<div class="flex flex-col items-center">
						<nuxt-img
							class="h-full w-full mb-6 rounded-xl"
							src="/img/simon_logo.jpg"
							spinner-color="white"
						/>
						<div
							class="mr-4 relative select-none cursor-pointer"
							@click="playing = true"
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

				<iframe
					v-else
					id="my-canvas"
					style="
						border: 20px solid black;
						border-image: url('/img/oas-frame.png') 65;
					"
					class="mt-12 w-full h-35em overflow-hidden"
					src="https://festive-engelbart-1731ce.netlify.app/"
					title="simon"
					scrolling="no"
					frameborder="0"
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
				<Youtube
					id="oDhY1lpLhu4"
					class_name="h-100 w-full rounded-3xl"
				/>
				<UploadArtLink />
			</div>
		</section>
	</div>
</template>
