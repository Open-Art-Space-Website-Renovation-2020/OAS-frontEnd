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
	]
}
</script>

<template>
	<div class="hidden lg:(flex items-center)">
		<vs-button
			v-for="(link, i) in links"
			:key="i"
			flat
			:to="link.route"
			:active="$route.path.includes(link.name)"
			color="danger"
			transparent
			style="font-family: 'Cairo', sans-serif"
			class="font-black lg:text-sm xl:text-2xl focus:outline-none"
		>
			{{ $t(`${link.name}`) }}
			<template #animate>
				<i :class="link.icon"></i>
			</template>
		</vs-button>
	</div>
</template>
