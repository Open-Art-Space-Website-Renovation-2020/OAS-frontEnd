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
				? { fontFamily: 'ARCO Regular' }
				: { fontFamily: 'Fokaha‌' },
		]"
		class="text-5xl md:text-8xl lg:text-9xl xl:text-10xl 2xl:text-20xl font-extrabold uppercase select-none text-transparent"
	>
		<span
			:style="{ 'background-image': 'url(' + image + ')' }"
			class="bg-clip-text bg-gray-300 bg-cover rtl:bg-contain"
			>{{ title }}</span
		>
	</div>
</template>
