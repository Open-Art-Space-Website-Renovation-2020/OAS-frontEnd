<template>
	<nuxt-link class="my-4" to="/upload-artwork/">
		<div class="mr-4 relative select-none">
			<img class="w-40 h-40" src="@/assets/img/button4.png" />
			<h1
				class="w-20 absolute left-10 rtl:(left-5) mr-0 mt-6 bottom-16 text-xl text-hex-e6e7e8"
			>
				{{ $t("upload") }}
			</h1>
		</div>
	</nuxt-link>
</template>
