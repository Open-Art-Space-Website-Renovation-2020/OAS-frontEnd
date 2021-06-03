<script>
export default {
	props: ["image", "vertical", "horizontal"],
	methods: {
		start() {
			this.$emit("gameStart", {
				image: this.image,
				size: {
					horizontal: this.horizontal,
					vertical: this.vertical,
				},
			})
		},
		reset() {
			this.$refs.options_form.reset()
		},
	},
}
</script>

<template>
	<form ref="options_form" @submit.prevent="start">
		<div v-if="image" class="flex flex-col items-center">
			<nuxt-img class="h-full w-full mb-6 rounded-xl" :src="image" />
			<div
				class="mr-4 relative select-none cursor-pointer"
				@click="start"
			>
				<img class="w-36 h-36" src="@/assets/img/button4.png" />
				<h1
					class="absolute left-0 ml-7 mt-10 top-0 rtl:(right-3 mr-10 mt-9) text-4xl"
				>
					{{ $t("start") }}
				</h1>
			</div>
		</div>
	</form>
</template>
