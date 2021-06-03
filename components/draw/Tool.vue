<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component
export default class ToolComponent extends Vue {
	@Prop(String) readonly name: string | undefined
	@Prop(String) readonly iconClass: string | undefined
	@Prop(Boolean) readonly labelForUploadImage: boolean | undefined
	@Prop(Function) readonly event: Function | undefined
}
</script>
<template>
	<div class="mx-5 hover:(cursor-pointer text-red-500)">
		<div v-if="!labelForUploadImage" @click="event">
			<i class="text-5xl" :class="iconClass"></i>
		</div>
		<div
			v-if="labelForUploadImage"
			:class="{
				'upload-image': labelForUploadImage,
				tool: labelForUploadImage,
			}"
		>
			<label for="chooseImage"
				><i class="text-5xl" :class="iconClass"></i
			></label>
			<input
				id="chooseImage"
				style="visibility: hidden"
				type="file"
				accept="image/*"
				@change="event"
			/>
		</div>
		<p class="mt-2">{{ name }}</p>
	</div>
</template>

<style scoped>
.tool {
	align-items: center;
	justify-content: space-between;
	display: flex;
	font-size: 16px;
	padding: 2px 5px;
}
.upload-image {
	max-width: 50px;
}
</style>
