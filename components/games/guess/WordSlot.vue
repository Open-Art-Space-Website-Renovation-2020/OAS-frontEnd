<script>
export default {
	name: "WordSlot",
	props: ["guessLength", "state", "guessArray"],
	computed: {
		activeIndex() {
			// var activeIndex = 0

			// var selected = 0
			return this.guessArray.length + 1
		},
	},
}
</script>

<template>
	<div class="flex items-center justify-center mt-6">
		<div
			v-for="index in guessLength"
			:key="index"
			:class="[
				state,
				index < activeIndex != '' ? 'typed' : '',
				activeIndex == index ? 'active' : '',
			]"
			class="slots"
		>
			{{ guessArray[index - 1] }}
		</div>
	</div>
</template>

<style>
.slots {
	height: 40px;
	width: 40px;
	border-radius: 7px;
	margin: 1% 1%;
	font-size: 18px;
	text-align: center;
	text-transform: uppercase;
	font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
		sans-serif;
	background: #eaeaea;
	border: 2px solid #ffffff00;
	padding: 7px;
}

.slots.typed {
	box-shadow: 3px 3px 1px #d4d3d3;
}

.slots.typed.success {
	border: 2px solid #366d1d;
	color: #264218;
	background: #bcff9e;
}

.slots.typed.danger {
	border: 2px solid #cc3727;
	color: #88281e;
	background: #f8b3ae;
}

.slots.typed.warning {
	border: 2px solid #eeb61b;
	color: #7e6216;
	background: #fcebbd;
}

.slots.active.success {
	border: 2px solid #366d1d;
}

.slots.active.danger {
	border: 2px solid #cc3727;
}

.slots.active.warning {
	border: 2px solid #eeb61b;
}
</style>
