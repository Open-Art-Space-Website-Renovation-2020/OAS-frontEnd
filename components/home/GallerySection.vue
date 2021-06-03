<script>
export default {
	props: {
		// eslint-disable-next-line vue/prop-name-casing
		base_url: {
			required: true,
			type: String,
		},
	},
	data() {
		return {
			photos: [],
			loading: false,
			active: false,
			zoomed_img: false,
		}
	},
	async mounted() {
		this.loading = true
		this.photos = await this.$axios.$get("/fapi/gallery/frandom/")
		this.loading = false
	},
	methods: {
		open_dialog(img) {
			this.zoomed_img = img
			this.active = true
		},
	},
}
</script>
<template>
	<section class="flex flex-col items-center bg-hex-0295da">
		<div class="-mt-24">
			<Triangle
				text="gallery"
				ar_y="20.051079"
				ar_x="88.844219"
				en_y="20.051079"
				en_x="30.844219"
			/>
		</div>
		<div>
			<div class="flex flex-col items-center mb-3">
				<div
					v-if="loading"
					class="w-12 h-12 mt-10 border-4 border-hex-f2135d rounded-full loader"
				></div>

				<div
					v-else
					class="mb-12 px-3 grid grid-rows-1 gap-y-10 md:(grid-cols-3 gap-6)"
				>
					<div
						v-for="(photo, index) in photos"
						:key="index"
						class="mx-auto max-w-lg flex flex-col justify-center items-center cursor-pointer"
						@click="open_dialog(`${base_url}${photo.image.file}`)"
					>
						<nuxt-img
							:src="base_url + photo.image.file"
							loading="lazy"
							class="w-full h-64 rounded-lg bg-cover bg-center"
							:alt="photo.image.title + 'art'"
						/>
					</div>
				</div>
			</div>
		</div>
		<vs-dialog v-model="active" class="bg-transparent" blur>
			<nuxt-img v-if="zoomed_img" :src="zoomed_img" />
		</vs-dialog>
	</section>
</template>

<style scoped>
* {
	font-family: "Cairo", sans-serif;
}
</style>
