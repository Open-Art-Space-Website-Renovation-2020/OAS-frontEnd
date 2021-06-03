<script>
import "vue2-dropzone/dist/vue2Dropzone.min.css"

export default {
	components: {
		vueDropzone: () => {
			if (process.client) {
				return import("vue2-dropzone")
			}
		},
	},
	transition: "page",
	data() {
		return {
			is_loading: false,
			image: false,
			frame_image: false,
			dialog: false,
			step: 1,
			dropzone_options: {
				url: "https://httpbin.org/post",
				thumbnailWidth: 550,
				maxFiles: 1,
				acceptedFiles: "image/*",
				addRemoveLinks: true,
			},
		}
	},
	head: {
		title: "Upload ArtWork | Open Art Space",
	},
	methods: {
		sleep(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms))
		},

		dataURLtoFile(dataurl, filename) {
			const arr = dataurl.split(",")
			const mime = arr[0].match(/:(.*?);/)[1]
			const bstr = atob(arr[1])
			let n = bstr.length
			const u8arr = new Uint8Array(n)
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n)
			}
			return new File([u8arr], `${filename}.${mime.split("/")[1]}`, {
				type: mime,
			})
		},

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		async thumbnail(file, dataUrl) {
			this.image = file.dataURL
			this.step = 1
			await this.sleep(1800)
			this.dialog = true
		},
		update_image(new_image) {
			this.image = new_image
		},
		update_frame_image(new_frame_image) {
			this.frame_image = new_frame_image
		},
		async save_image() {
			this.is_loading = true
			await this.$refs.frameimagez.get_image_frame()
			const name_of_user = this.$refs.frameimagez.name
			const age_of_user = this.$refs.frameimagez.age
			const message_of_user = this.$refs.frameimagez.message
			const country_of_user = this.$refs.frameimagez.country
			this.frame_image = this.$refs.frameimagez.image_frame
			const frame_image_file = this.dataURLtoFile(
				this.frame_image,
				`${name_of_user}_${age_of_user}_${country_of_user}`
			)
			const original_image_file = this.dataURLtoFile(
				this.image,
				`original_${name_of_user}_${age_of_user}_${country_of_user}`
			)

			const form_data = new FormData()
			form_data.append("image", frame_image_file)
			form_data.append("original_image", original_image_file)
			form_data.append("full_name", name_of_user)
			form_data.append("age", age_of_user)
			form_data.append("country", country_of_user)
			form_data.append("message", message_of_user)
			const config = {
				headers: { "Content-Type": "multipart/form-data" },
			}
			try {
				const response = await this.$axios.$post(
					"/fapi/gallery/",
					form_data,
					config
				)
				this.is_loading = false
				this.step = 1
				this.dialog = false
				this.$vs.notification({
					progress: "auto",
					width: "100%",
					icon: "<i class='bx bx-select-multiple' ></i>",
					color: "success",
					position: "top-center",
					title: response,
				})
			} catch (error) {
				// eslint-disable-next-line no-console
				// console.log(error.response)
				this.is_loading = false
				this.$vs.notification({
					progress: "auto",
					width: "100%",
					icon: "<i class='bx bx-bug' ></i>",
					color: "danger",
					position: "top-center",
					title: "Something went wrong. Try again.",
				})
			}
		},
	},
}
</script>
<template>
	<div class="items-center justify-center">
		<section
			class="-mt-20 pt-20 pb-12 flex flex-col items-center text-gray-600 bg-hex-0295da"
		>
			<div
				class="w-10/11 mb-4 flex flex-col items-center p-8 border-4 border-pink-500 bg-white rounded-3xl"
			>
				<TextImage text="upload" />

				<client-only>
					<vue-dropzone
						id="dropzone"
						ref="myVueDropzone"
						class="mt-10 md:mt-20 mb-4 w-10/11 h-100"
						:duplicate-check="true"
						:options="dropzone_options"
						:use-custom-slot="true"
						@vdropzone-thumbnail="thumbnail"
					>
						<div class="flex flex-col items-center justify-center">
							<svg
								viewBox="0 0 232.395 232.395"
								class="h-14 w-14 mt-14"
							>
								<path
									d="M177.121,83.258c-5.921,0-11.324,2.26-15.393,5.962c-4.068-3.702-9.472-5.962-15.393-5.962
	c-5.925,0-11.333,2.261-15.404,5.963c-1.672-1.522-3.579-2.783-5.645-3.76c7.467-9.163,11.828-20.792,11.828-33.095
	C137.115,23.491,113.627,0,84.756,0C55.878,0,32.383,23.491,32.383,52.366c0,20.105,11.649,38.4,29.469,47.085v63.871
	c0,38.086,30.988,69.072,69.077,69.072c38.092,0,69.083-30.986,69.083-69.072V106.15C200.012,93.527,189.743,83.258,177.121,83.258z
	 M47.383,52.366C47.383,31.762,64.148,15,84.756,15c20.6,0,37.359,16.762,37.359,37.366c0,11.702-5.529,22.549-14.467,29.515V52.366
	c0-12.628-10.27-22.902-22.893-22.902c-12.629,0-22.904,10.274-22.904,22.902v29.513C52.912,74.915,47.383,64.068,47.383,52.366z
	 M185.012,163.322c0,29.815-24.262,54.072-54.083,54.072c-29.818,0-54.077-24.257-54.077-54.072V94.887
	c0.013-0.251,0.013-0.502,0-0.751v-41.77c0-4.357,3.546-7.902,7.904-7.902c4.352,0,7.893,3.545,7.893,7.902v53.784v16.451
	c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5V106.15c0-4.352,3.54-7.893,7.891-7.893c4.351,0,7.89,3.541,7.89,7.893v16.451
	c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5V106.15c0-4.352,3.547-7.893,7.907-7.893c4.352,0,7.893,3.541,7.893,7.893
	v16.451c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5V106.15c0-4.352,3.541-7.893,7.893-7.893
	c4.351,0,7.891,3.541,7.891,7.893V163.322z"
								/>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
							</svg>

							<span class="mt-6 text-lg font-semibold">{{
								$t("drag_drop")
							}}</span>
						</div>
					</vue-dropzone>
				</client-only>
				<vs-dialog
					v-model="dialog"
					:dir="$t('dir')"
					overflow-hidden
					full-screen
					blur
				>
					<Rotation
						v-if="image"
						v-show="step === 1"
						:image="image"
						@update-image="update_image"
					/>
					<FrameEditior
						v-show="step === 2"
						ref="frameimagez"
						:image="image"
					/>
					<template #footer>
						<div class="flex items-center justify-center">
							<vs-button
								v-show="step === 1"
								class="text-lg lg:text-2xl"
								block
								@click="
									() => {
										step = 2
									}
								"
								>{{ $t("continue") }}</vs-button
							>
							<vs-button
								v-show="step === 2"
								:loading="is_loading"
								class="text-lg lg:text-2xl"
								block
								@click="save_image"
								>{{ $t("save") }}</vs-button
							>
							<vs-button
								v-show="step === 2"
								class="text-lg lg:text-2xl"
								block
								flat
								@click="step = 1"
								>{{ $t("back") }}</vs-button
							>
						</div>
					</template>
				</vs-dialog>
			</div>
			<UploadArtLink />
		</section>
	</div>
</template>
