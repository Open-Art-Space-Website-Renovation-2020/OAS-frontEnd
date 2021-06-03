<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component
export default class ColorPickerComponent extends Vue {
	@Prop(String) readonly color: string | undefined
	@Prop(Function) readonly event: Function | undefined
}
</script>
<template>
	<div
		class="mt-5 md:mt-0 h-20 w-20 cursor-pointer rounded-xl"
		:style="{ backgroundColor: color ? color : '' }"
		@click="event(color)"
	></div>
</template>
