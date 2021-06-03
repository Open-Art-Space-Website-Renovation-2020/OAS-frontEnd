<script>
export default {
	transition: "page",
	async asyncData({ $axios, query }) {
		const page_number = query.page_number || 1
		const item_per_page = query.item_per_page || 6
		const response = await $axios.$get(
			`/fapi/gallery/?page_number=${page_number}&item_per_page=${item_per_page}`
		)
		const photos = response.gallery || []
		const max_page_number = response.number_of_pages || 0
		const base_url = process.env.BASE_URL
		return {
			photos,
			max_page_number,
			item_per_page,
			base_url,
			page_number,
		}
	},
	data() {
		return {
			active: false,
			zoomed_img: false,
			current_page: 1,
			base_urls:
				this.base_url === undefined
					? this.$store.getters["other/get_url"]
					: this.base_url,
		}
	},
	head: {
		title: "Gallery | Open Art Space",
	},
	watch: {
		async current_page() {
			this.$router.push(
				`/gallery/?page_number=${this.current_page}&item_per_page=${this.item_per_page}`
			)
			const loading = this.$vs.loading({
				type: "circles",
				text: "loading...",
				color: "#d5397b",
				// background: "#7a76cb",
			})
			const response = await this.$axios.$get(
				`/fapi/gallery/?page_number=${this.current_page}&item_per_page=${this.item_per_page}`
			)

			this.photos = response.gallery || []
			loading.close()
		},
	},
	created() {
		this.current_page = this.page_number
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
	<div class="flex flex-col items-center">
		<section class="pt-20 pb-12 flex flex-col items-center text-gray-600">
			<div
				class="w-10/11 mb-4 flex flex-col items-center p-0 border-4 border-pink-500 bg-white rounded-3xl"
			>
				<div class="mr-4 relative select-none">
					<img class="w-24 h-24" src="@/assets/img/bg2.png" />
					<h1 class="w-64 absolute left-0 mt-6 top-0 text-5xl">
						{{ $t("gallery") }}
					</h1>
				</div>
				<div
					class="mb-3 grid grid-rows-1 gap-y-10 md:(grid-cols-2 gap-6) lg:(grid-cols-3 gap-6) capitalize"
				>
					<div
						v-for="(photo, index) in photos"
						:key="index"
						class="flex flex-col justify-center items-center max-w-lg mx-auto my-8 cursor-pointer"
						@click="open_dialog(`${base_urls}${photo.image.file}`)"
					>
						<nuxt-img
							:src="`${base_urls}` + photo.image.file"
							class="rounded-lg bg-cover bg-center"
							:alt="`${base_urls}` + photo.image.title + 'art'"
						/>
					</div>
				</div>
				<vs-pagination
					v-model="current_page"
					class="mb-4"
					danger
					:length="max_page_number"
				/>
			</div>
			<vs-dialog v-model="active" class="bg-transparent" blur>
				<nuxt-img v-if="zoomed_img" :src="zoomed_img" />
			</vs-dialog>
			<UploadArtLink />
		</section>
	</div>
</template>
