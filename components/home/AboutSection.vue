<script>
export default {
	props: {
		loading: {
			required: true,
			type: Boolean,
		},
		// eslint-disable-next-line vue/prop-name-casing
		ar_text: {
			required: true,
			type: String,
		},
		// eslint-disable-next-line vue/prop-name-casing
		en_text: {
			required: true,
			type: String,
		},
	},
}
</script>

<template>
	<section
		class="pb-24 flex flex-col items-center text-gray-600 bg-hex-0295da"
	>
		<div class="-mt-24">
			<Triangle
				text="about"
				ar_y="22.051079"
				ar_x="87.844219"
				en_y="20.051079"
				en_x="14.844219"
			/>
		</div>

		<div
			class="
				w-8/11
				mb-4
				flex flex-col
				items-center
				p-8
				mt-0
				border-4 border-pink-500
				bg-white
				rounded-3xl
			"
		>
			<TextImage text="about" />
			<div
				v-if="loading"
				class="
					w-12
					h-12
					mt-10
					border-4 border-hex-f2135d
					rounded-full
					loader
				"
			></div>
			<div v-else>
				<div
					class="
						rich-text
						center
						mt-16
						text-base
						md:text-lg
						xl:text-xl
						tracking-wide
						leading-7
						md:leading-8
					"
					v-html="$t('dir') === 'ltr' ? en_text : ar_text"
				></div>
			</div>
		</div>
	</section>
</template>

<style scoped>
* {
	font-family: "Cairo", sans-serif;
}

.rich-text ::v-deep p {
	margin-bottom: 1em;
}

.rich-text ::v-deep h2,
.rich-text ::v-deep h3,
.rich-text ::v-deep h4 {
	margin: 1em 0 0.5em;
	font-weight: 700;
	line-height: 1.25;
}

.rich-text ::v-deep h2 {
	font-size: 1.5em;
}

.rich-text ::v-deep h3 {
	font-size: 1.25em;
}

.rich-text ::v-deep ul,
.rich-text ::v-deep ol {
	margin: 0 0 1em 1.5em;
}

.rich-text ::v-deep ul {
	list-style: disc;
}

.rich-text ::v-deep ol {
	list-style: decimal;
}

.rich-text ::v-deep a {
	color: #0295da;
	text-decoration: underline;
}

.rich-text ::v-deep blockquote {
	margin: 1em 0;
	padding-left: 1em;
	border-left: 4px solid #f2135d;
}

.rich-text ::v-deep strong,
.rich-text ::v-deep b {
	font-weight: 700;
}

.rich-text ::v-deep em,
.rich-text ::v-deep i {
	font-style: italic;
}
</style>
