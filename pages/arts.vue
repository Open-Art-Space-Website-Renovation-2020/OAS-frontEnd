<script>
import axios from "axios"
export default {
	transition: "page",
	async asyncData({ $axios }) {
		const response = await $axios.$get("/fapi/arts/")
		const arts = response
		const base_url = process.env.BASE_URL
		return { arts, base_url }
	},
	data() {
		return {
			active: false,
			zoomed_img: false,
			base_urls:
				this.base_url === undefined
					? this.$store.getters["other/get_url"]
					: this.base_url,
		}
	},
	head: {
		title: "Arts | Open Art Space",
	},
	methods: {
		sleep(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms))
		},
		download_image(image, name) {
			axios({
				url: image,
				method: "GET",
				responseType: "blob",
			}).then((response) => {
				const fileURL = window.URL.createObjectURL(
					new Blob([response.data], { type: response.data.type })
				)
				const fileLink = document.createElement("a")

				fileLink.href = fileURL
				fileLink.setAttribute(
					"download",
					`${name}.${response.data.type.split("/")[1]}`
				)
				document.body.appendChild(fileLink)

				fileLink.click()
			})
		},

		image_to_print(image) {
			return `<!DOCTYPE html>
                    <html>
                        <head>
                        </head>
                        <body>
                            <img src="${image}" />
                        </body>
                    </html>`
		},
		async print_image(image) {
			const poxp = window.open("", "")
			poxp.document.write(this.image_to_print(image))
			poxp.document.close()
			await this.sleep(4000)
			poxp.focus()
			poxp.print()
			poxp.close()
		},
		open_dialog(img) {
			this.zoomed_img = img
			this.active = true
		},
	},
}
</script>
<template>
	<div class="flex flex-col items-center mb-3">
		<div
			class="w-10/11 md:mt-20 p-8 grid grid-rows-1 gap-y-10 md:(grid-cols-2 gap-6) lg:(grid-cols-3 gap-6) border-4 border-pink-500 rounded-3xl capitalize"
		>
			<vs-card
				v-for="(art, index) in arts"
				:key="index"
				type="1"
				class="mb-8 md:mb-4 md:my-8 md:mr-3"
			>
				<template #title>
					<h3>
						{{
							$t("dir") === "ltr" ? art.eng_title : art.ar_title
						}}
					</h3>
				</template>
				<template #img>
					<img :src="art.image.file" :alt="art.eng_title + 'art'" />
				</template>
				<template #text>
					<p
						v-html="
							$t('dir') === 'ltr'
								? art.eng_description
								: art.ar_description
						"
					></p>
				</template>
				<template #interactions>
					<vs-button
						danger
						icon
						@click="print_image(art.image.file)"
					>
						<i class="bx bx-printer"></i>
					</vs-button>
					<vs-button
						warn
						primary
						icon
						@click="download_image(art.image.file, art.eng_title)"
					>
						<i class="bx bx-download"></i>
					</vs-button>
					<vs-button
						shadow
						primary
						icon
						@click="open_dialog(art.image.file)"
					>
						<i class="bx bx-zoom-in"></i>
					</vs-button>
				</template>
			</vs-card>
		</div>
		<vs-dialog v-model="active" class="bg-transparent" blur>
			<nuxt-img v-if="zoomed_img" :src="zoomed_img" />
		</vs-dialog>
		<UploadArtLink />
	</div>
</template>
