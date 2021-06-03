<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component
export default class MenuComponent extends Vue {
	visible: boolean = false
	links: object[] = [
		{ name: "arts", route: "/arts/" },
		{ name: "contact", route: "/contact/" },
		{ name: "about us", route: "/about/" },
	]
}
</script>

<template>
	<div class="hidden lg:block antialiased font-sans py-16">
		<div
			v-if="visible"
			class="fixed inset-0"
			@click="visible = false"
		></div>
		<div class="relative inline-block" @click="visible = !visible">
			<vs-button
				flat
				class="font-black text-4xl focus:outline-none"
				color="danger"
				transparent
				><i class="bx bx-dots-vertical-rounded"></i
			></vs-button>

			<transition
				enter-active-class="transition duration-300 ease-out transform"
				enter-class="-translate-y-3 scale-95 opacity-0"
				enter-to-class="translate-y-0 scale-100 opacity-100"
				leave-active-class="transition duration-150 ease-in transform"
				leave-class="translate-y-0 opacity-100"
				leave-to-class="-translate-y-3 opacity-0"
			>
				<div
					v-show="visible"
					class="absolute pt-2 right-4 rtl:-right-27"
				>
					<div
						class="relative py-1 bg-white border border-gray-200 rounded-md shadow-xl"
					>
						<div
							class="absolute right-8 rtl:right-38 top-0 w-4 h-4 origin-center transform rotate-45 translate-x-5 -translate-y-2 bg-white border-t border-l border-gray-200 rounded-sm pointer-events-none"
						></div>
						<div class="relative">
							<nuxt-link
								v-for="(link, i) in links"
								:key="i"
								:to="link.route"
								class="block w-full px-4 py-2 font-black text-2xl text-gray-700 whitespace-no-wrap hover:bg-gray-100 focus:outline-none hover:text-gray-900 focus:text-gray-900 focus:shadow-outline transition duration-300 ease-in-out"
								style="font-family: 'Cairo', sans-serif"
								>{{ $t(`${link.name}`) }}</nuxt-link
							>
						</div>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>
