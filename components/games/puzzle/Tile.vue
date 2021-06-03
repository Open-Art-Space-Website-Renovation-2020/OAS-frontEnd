<script>
export default {
	props: ["tile"],
	methods: {
		move() {
			this.$emit("moving", this.tile)
		},
	},
}
</script>

<template>
	<div
		class="tile"
		:style="tile.styles"
		:class="{ empty: tile.isEmpty }"
		@click="move"
	/>
</template>

<style>
.tile {
	border: 1px solid gray;
}

.tile.empty {
	box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 10px inset;
}

.tile.empty:hover {
	border-color: #111;
	cursor: default;
}

.tile:hover {
	border-color: #a6ce39;
	cursor: pointer;
}
</style>
