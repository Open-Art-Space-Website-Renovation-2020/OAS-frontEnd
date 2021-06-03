<script>
export default {
	transition: "page",
	asyncData() {
		const base_url = process.env.BASE_URL
		return { base_url }
	},
	data() {
		return {
			base_urls:
				this.base_url === undefined
					? "http://127.0.0.1:8000"
					: this.base_url,
		}
	},
	head: {
		title: "Home | Open Art Space",
	},
}
</script>

<template>
	<div>
		<HeaderSection :base_url="base_urls" />
		<GameSection />
		<GallerySection :base_url="base_urls" />
	</div>
</template>

<style>
@keyframes loader-rotate {
	0% {
		transform: rotate(0);
	}
	100% {
		transform: rotate(360deg);
	}
}
.loader {
	border-right-color: transparent;
	animation: loader-rotate 0.7s linear infinite;
}
</style>
