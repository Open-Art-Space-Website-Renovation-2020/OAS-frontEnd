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
					? this.$store.getters["other/get_url"]
					: this.base_url,
			aboutLoading: true,
			ar_text: "",
			en_text: "",
		}
	},
	head: {
		title: "Home | Open Art Space",
	},
	methods: {
		setAboutContent({ ar_text, en_text }) {
			this.ar_text = ar_text
			this.en_text = en_text
			this.aboutLoading = false
		},
	},
}
</script>

<template>
	<div>
		<HeaderSection :base_url="base_urls" @about-loaded="setAboutContent" />
		<GameSection />
		<GallerySection :base_url="base_urls" />
		<AboutSection
			:loading="aboutLoading"
			:ar_text="ar_text"
			:en_text="en_text"
		/>
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
