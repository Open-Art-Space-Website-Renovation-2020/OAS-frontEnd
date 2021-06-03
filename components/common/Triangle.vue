<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component
export default class OASWordComponent extends Vue {
	@Prop(String) readonly text: string | undefined
	@Prop(String) readonly ar_y: string | undefined
	@Prop(String) readonly ar_x: string | undefined
	@Prop(String) readonly en_y: string | undefined
	@Prop(String) readonly en_x: string | undefined
	@Prop({ default: "text-yellow-400" }) readonly color: string | undefined
}
</script>

<template>
	<svg
		viewBox="0 0 105.74096 58.893469"
		class="h-48 w-48 fill-current"
		:class="[color]"
	>
		<path
			d="M 99.927413,2.5174687 H 7.178082 c -5.1693332,0 -7.75733315,6.2493332 -4.1026666,9.9053333 14.5466666,14.546666 29.0933326,29.091999 43.6399986,43.638665 1.888,1.888 4.362667,2.832 6.837333,2.832 2.474667,0 4.949334,-0.944 6.838667,-2.832 14.545333,-14.546666 29.091999,-29.091999 43.638666,-43.638665 3.65467,-3.6560001 1.06667,-9.9053333 -4.102667,-9.9053333"
		/>
		<path
			d="M 102.66555,9.9053352 C 88.118884,24.452002 73.572217,38.998668 59.026884,53.545334 c -3.777333,3.776 -9.899999,3.776 -13.675999,0 C 30.804218,38.998668 16.257552,24.452002 1.7108859,9.9053352 -1.9437807,6.2506686 0.64421922,2.1143e-6 5.8135524,2.1143e-6 H 98.562883 c 5.169337,0 7.757337,6.2506664857 4.102667,9.9053330857"
		/>

		<text>
			<tspan
				v-if="$t('dir') === 'ltr'"
				class="text-hex-e6e7e8 text-sm fill-current ml-4"
				:y="en_y"
				:x="en_x"
			>
				{{ $t(text) }}
			</tspan>
			<tspan
				v-else
				class="text-hex-e6e7e8 text-md fill-current"
				:y="ar_y"
				:x="ar_x"
			>
				{{ $t(text) }}
			</tspan>
		</text>
	</svg>
</template>
