<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component
export default class RotationComponent extends Vue {
	@Prop(String) readonly image: string | undefined

	myCroppa: any = {}

	sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}

	async update_image() {
		const new_image = await this.myCroppa.generateDataUrl()
		this.$emit("update-image", new_image)
	}

	async flipX() {
		await this.myCroppa.flipX()
		await this.sleep(100)
		await this.update_image()
	}

	async flipY() {
		await this.myCroppa.flipY()
		await this.sleep(100)
		await this.update_image()
	}

	async rotate() {
		await this.myCroppa.rotate()
		await this.sleep(100)
		await this.update_image()
	}
}
</script>

<template>
	<div class="w-full flex flex-col items-center justify-center">
		<div>
			<croppa
				v-model="myCroppa"
				:disable-drag-and-drop="true"
				:disable-click-to-choose="true"
				:disable-drag-to-move="true"
				:disable-scroll-to-zoom="true"
				:show-remove-button="false"
				:initial-image="image"
			></croppa>
		</div>
		<div
			class="w-full mt-4 md:mt-8 flex flex-col md:flex-row items-center justify-center"
		>
			<vs-button block color="danger" size="xl" @click="flipX">{{
				$t("flip_h")
			}}</vs-button>
			<vs-button block color="danger" size="xl" @click="flipY">{{
				$t("flip_v")
			}}</vs-button>
			<vs-button block color="danger" size="xl" @click="rotate">{{
				$t("rotate_90")
			}}</vs-button>
		</div>
	</div>
</template>
