<template>
	<div class="text-2xl lg:text-sm xl:text-2xl text-pink-600 font-black">
		<a
			href="#"
			style="font-family: 'Cairo', sans-serif"
			class="ml-4 mr-2"
			@click.prevent.stop="$i18n.setLocale('ar')"
			>{{ $t("arabic") }}</a
		>

		<span>/</span>

		<a
			href="#"
			style="font-family: 'Cairo', sans-serif"
			class="ml-2"
			@click.prevent.stop="$i18n.setLocale('en')"
			>{{ $t("english") }}</a
		>
	</div>
</template>
