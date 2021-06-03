<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component
export default class OASWordComponent extends Vue {
	@Prop(String) readonly text: string | undefined
}
</script>

<template>
	<div class="ml-4 md:(mr-4 rtl:mr-0 ml-0) relative">
		<img class="w-36 h-36" src="@/assets/img/bg2.png" loading="lazy" />
		<h1
			class="absolute left-0 ml-2 mt-4 top-0 rtl:(right-0 md:mr-5 mt-0) text-5xl"
		>
			{{ $t(text) }}
		</h1>
	</div>
</template>
