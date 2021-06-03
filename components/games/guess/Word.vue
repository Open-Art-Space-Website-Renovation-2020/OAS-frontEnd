<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component
export default class WordComponent extends Vue {
	@Prop(String) readonly alphabet: string | undefined
	@Prop(String) readonly state: string | undefined

	handleClick() {
		this.$emit("WORD_SELCTED", this.alphabet)
	}
}
</script>

<template>
	<div :class="state" class="word success">{{ alphabet }}</div>
</template>

<style>
.word {
	height: 40px;
	width: 40px;
	border-radius: 10px;
	margin: 2% 3%;
	font-size: 23px;
	text-align: center;
	text-transform: uppercase;
	padding: 8px;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.word.success {
	box-shadow: 3px 3px 10px #366d1d;
	background: #bcff9e;
	color: #264218;
}

.word.success:active {
	box-shadow: 1px 1px 5px #366d1d;
	transform: translate(2px, 2px);
}

.word.danger {
	box-shadow: 3px 3px 10px #cc3727;
	background: #f8b3ae;
	color: #88281e;
}

.word.danger:active {
	box-shadow: 1px 1px 5px #cc3727;
}

.word.warning {
	box-shadow: 3px 3px 10px #eeb61b;
	background: #fcebbd;
	color: #7e6216;
}

.word.warning:active {
	box-shadow: 1px 1px 5px #eeb61b;
}
</style>
