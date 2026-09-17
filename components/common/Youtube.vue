<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component
export default class YoutubeComponent extends Vue {
	@Prop({ type: String, default: "tj6NdgY6Rj0" }) readonly id!: string
	@Prop(String) readonly class_name: string | undefined
}
</script>

<template>
	<iframe
		:class="class_name"
		:src="`https://www.youtube.com/embed/${id}`"
		title="YouTube"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
	></iframe>
</template>
