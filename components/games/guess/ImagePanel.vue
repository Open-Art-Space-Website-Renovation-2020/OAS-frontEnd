<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component
export default class ImagePanelComponent extends Vue {
	@Prop(Number) readonly total: number | undefined
	@Prop(String) readonly image: string | undefined
	@Prop(Number) readonly current: number | undefined
}
</script>

<template>
	<div class="img-wrapper rounded-lg">
		<nuxt-img class="rounded-lg" :src="image" />

		<p>{{ current }}/{{ total }}</p>
	</div>
</template>

<style>
.img-wrapper {
	position: relative;
	top: 7%;
	margin: 0 auto;
	height: 35vh;
	width: 35vh;
	padding: 2px;
	background: #eaeaea;
}

.img-wrapper img {
	height: 100%;
	width: 100%;
}

.img-wrapper p {
	margin: 10px auto;
	color: #767676;
	font-size: 12px;
	text-align: center;
}
</style>
