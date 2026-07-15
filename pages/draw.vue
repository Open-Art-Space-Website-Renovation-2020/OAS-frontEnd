<script>
export default {
	transition: "page",
	data() {
		return {
			currentActiveMethod: null,
			params: {},
			color: "black",
			imageUrl: null,
			croppedImage: false,
			canvasWidth: 1000,
			canvasHeight: 1000,
			resizeFrame: null,
		}
	},
	head: {
		title: "Draw | Open Art Space",
	},
	destroyed() {
		window.removeEventListener("resize", this.resize_detect)
		if (this.resizeFrame) {
			window.cancelAnimationFrame(this.resizeFrame)
		}
	},
	mounted() {
		window.addEventListener("resize", this.resize_detect)
		this.resize_detect()
		if (this.imageUrl) {
			this.$refs.editor.setBackgroundImage(this.imageUrl)
			this.croppedImage = this.$refs.editor.croppedImage
		}
		this.$watch(
			() => {
				return this.$refs.editor.croppedImage
			},
			(val) => {
				this.croppedImage = val
			}
		)
	},
	methods: {
		resize_detect() {
			if (this.resizeFrame) {
				window.cancelAnimationFrame(this.resizeFrame)
			}

			this.resizeFrame = window.requestAnimationFrame(() => {
				this.resizeFrame = null
				const container = this.$refs.canvasContainer
				const width = Math.min(
					1150,
					Math.max(200, Math.floor(container.clientWidth))
				)
				const height = width
				const editor = this.$refs.editor
				const canvas = editor && editor.canvas

				if (
					width === this.canvasWidth &&
					height === this.canvasHeight
				) {
					return
				}

				if (canvas) {
					const scaleX = width / canvas.getWidth()
					const scaleY = height / canvas.getHeight()

					canvas.getObjects().forEach((object) => {
						object.set({
							left: object.left * scaleX,
							top: object.top * scaleY,
							scaleX: object.scaleX * scaleX,
							scaleY: object.scaleY * scaleY,
						})
						object.setCoords()
					})

					if (canvas.backgroundImage) {
						canvas.backgroundImage.scaleX *= scaleX
						canvas.backgroundImage.scaleY *= scaleY
					}

					canvas.setDimensions({ width, height })
					canvas.calcOffset()
					canvas.requestRenderAll()
				}

				this.canvasWidth = width
				this.canvasHeight = height
			})
		},
		cropImage() {
			this.croppedImage = true
			this.currentActiveMethod = "crop"
			this.setTool("crop")
		},
		applyCropping() {
			this.croppedImage = false
			this.currentActiveMethod = ""
			this.$refs.editor.applyCropping()
		},
		changeColor(colorHex) {
			this.color = colorHex
			this.$refs.editor.changeColor(colorHex)
		},
		saveImage() {
			const image = this.$refs.editor.saveImage()
			this.saveImageAsFile(image)
		},
		saveImageAsFile(base64) {
			const link = document.createElement("a")
			link.setAttribute("href", base64)
			link.setAttribute("download", "image-markup")
			link.click()
		},
		setTool(type, params) {
			this.currentActiveMethod = type
			this.$refs.editor.set(type, params)
		},
		uploadImage(e) {
			this.$refs.editor.uploadImage(e)
		},
		clear() {
			this.currentActiveMethod = this.clear
			this.$refs.editor.clear()
		},
		undo() {
			this.currentActiveMethod = this.undo
			this.$refs.editor.undo()
		},
		redo() {
			this.currentActiveMethod = this.redo
			this.$refs.editor.redo()
		},
	},
}
</script>

<template>
	<div>
		<section
			class="-mt-20 pt-20 pb-12 flex flex-col items-center text-gray-600 bg-hex-eb018c"
		>
			<div
				class="w-10/11 mb-4 flex flex-col items-center p-8 border-4 border-pink-500 bg-white rounded-3xl"
			>
				<div class="ml-4 md:(mr-4 rtl:mr-0 ml-0) relative">
					<img
						class="w-36 h-36"
						src="@/assets/img/bg2.png"
						loading="lazy"
					/>
					<h1
						class="absolute left-0 ml-2 mt-12 top-0 rtl:(right-0 md:mr-5 mt-9) text-5xl"
					>
						{{ $t("draw") }}
					</h1>
				</div>

				<div class="w-full text-center mt-50px text-hex-34383b">
					<!-- <div class="grid grid-rows-1 gap-y-10">
						 -->
					<div class="w-full grid grid-cols-1 gap-y-10">
						<div
							class="flex flex-wrap items-center justify-between"
						>
							<Tool
								:event="() => undo()"
								:icon-class="'bx bx-undo'"
								:name="$t('undo')"
							/>

							<Tool
								:event="() => redo()"
								:icon-class="'bx bx-redo'"
								:name="$t('redo')"
							/>

							<Tool
								:event="() => clear()"
								:icon-class="'bx bxs-trash'"
								:name="$t('clear')"
							/>

							<Tool
								:event="() => setTool('freeDrawing')"
								:icon-class="'bx bxs-pencil'"
								:class="{
									'cursor-pointer text-red-500':
										currentActiveMethod === 'freeDrawing',
								}"
								:name="$t('free_draw')"
							/>

							<Tool
								:event="() => setTool('text')"
								:icon-class="'bx bx-text'"
								:class="{
									'cursor-pointer text-red-500':
										currentActiveMethod === 'text',
								}"
								:name="$t('text')"
							/>

							<Tool
								:event="() => setTool('circle')"
								:icon-class="'bx bxs-circle'"
								:class="{
									'cursor-pointer text-red-500':
										currentActiveMethod === 'circle',
								}"
								:name="$t('circle')"
							/>

							<Tool
								:event="() => setTool('rect')"
								:icon-class="'bx bxs-rectangle'"
								:class="{
									'cursor-pointer text-red-500':
										currentActiveMethod === 'rect',
								}"
								:name="$t('rect')"
							/>

							<Tool
								:event="() => setTool('arrow')"
								:icon-class="'bx bx-down-arrow-alt'"
								:class="{
									'cursor-pointer text-red-500':
										currentActiveMethod === 'arrow',
								}"
								:name="$t('arrow')"
							/>

							<Tool
								:event="() => setTool('selectMode')"
								:icon-class="'bx bx-move'"
								:class="{
									'cursor-pointer text-red-500':
										currentActiveMethod === 'selectMode',
								}"
								:name="$t('select')"
							/>

							<Tool
								v-show="croppedImage"
								:event="() => applyCropping()"
								:icon-class="'bx bxs-select-multiple'"
								:class="{
									'cursor-pointer text-red-500':
										currentActiveMethod === 'crop',
								}"
								:name="$t('apply')"
							/>

							<Tool
								v-show="!croppedImage"
								:event="() => cropImage()"
								:icon-class="'bx bxs-crop'"
								:name="$t('crop')"
							/>

							<Tool
								:event="(e) => uploadImage(e)"
								:icon-class="'bx bxs-cloud-upload'"
								:label-for-upload-image="true"
								:name="$t('uploadz')"
							/>
							<Tool
								:event="() => saveImage()"
								:icon-class="'bx bxs-save'"
								:name="$t('save')"
							/>
						</div>
						<div
							class="flex flex-wrap items-center justify-between"
						>
							<ColorPicker
								:color="'#e40000'"
								:event="changeColor"
							/>
							<ColorPicker
								:color="'#e8eb34'"
								:event="changeColor"
							/>
							<ColorPicker
								:color="'#a834eb'"
								:event="changeColor"
							/>
							<ColorPicker
								:color="'#65c31a'"
								:event="changeColor"
							/>
							<ColorPicker
								:color="'#34b7eb'"
								:event="changeColor"
							/>
							<ColorPicker
								:color="'#eb34df'"
								:event="changeColor"
							/>
							<ColorPicker
								:color="'#1a10ad'"
								:event="changeColor"
							/>
							<ColorPicker
								:color="'#000000'"
								:event="changeColor"
							/>
						</div>
						<div ref="canvasContainer" class="canvas-container">
							<Editor
								ref="editor"
								class="border border-hex-000"
								:canvas-width="canvasWidth"
								:canvas-height="canvasHeight"
							/>
						</div>
					</div>
				</div>
			</div>
			<UploadArtLink />
		</section>
	</div>
</template>

<style>
* {
	font-family: "Cairo", sans-serif;
}

.canvas-container {
	width: 100%;
	max-width: 1150px;
}
</style>
