<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component
export default class OASWordComponent extends Vue {
	@Prop(String) readonly image: string | undefined
	@Prop(String) readonly title: string | undefined
}
</script>

<template>
	<div
		:style="[
			$t('dir') === 'ltr'
				? { fontFamily: 'Cairo' }
				: { fontFamily: 'Fokaha‌' },
		]"
		class="
			text-5xl
			md:text-8xl
			lg:text-9xl
			font-extrabold
			uppercase
			select-none
			text-transparent
		"
	>
		<span
			:style="{ 'background-image': 'url(' + image + ')' }"
			class="
				wordmark-text
				bg-clip-text bg-gray-300 bg-cover
				rtl:bg-contain
			"
			>{{ title }}</span
		>
	</div>
</template>

<style scoped>
.wordmark-text {
	-webkit-text-stroke: clamp(0.25px, 0.035vw, 0.5px) #6b7280;
	paint-order: stroke fill;
}
</style>
