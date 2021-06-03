<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component
export default class LinksComponent extends Vue {
	links: object[] = [
		{ name: "games", icon: "bx bx-game", route: "/games/" },
		{ name: "gallery", icon: "bx bx-image", route: "/gallery/" },
		{ name: "draw", icon: "bx bx-pencil", route: "/draw/" },
		{
			name: "upload",
			icon: "bx bx-cloud-upload",
			route: "/upload-artwork/",
		},
		{ name: "arts", icon: "bx bx-images", route: "/arts/" },
		{
			name: "contact",
			icon: "bx bx-message-rounded-detail",
			route: "/contact/",
		},
		{ name: "about us", icon: "bx bx-info-circle", route: "/about/" },
	]
}
</script>

<template>
	<nav
		class="w-full bottom-0 fixed overflow-x-auto flex items-center justify-between lg:hidden bg-yellow-500 shadow z-100"
	>
		<li v-for="(link, i) in links" :key="i" class="flex flex-col">
			<div
				v-if="$route.path.includes(link.route)"
				class="mb-0 block border-2 border-hex-f2135d"
			></div>

			<nuxt-link
				:to="link.route"
				class="py-3 px-10 rounded-lg text-3xl"
				:class="[
					$route.path.includes(link.route)
						? 'text-hex-f2135d '
						: 'text-white',
				]"
			>
				<i :class="link.icon"></i>
			</nuxt-link>
		</li>
	</nav>
</template>
