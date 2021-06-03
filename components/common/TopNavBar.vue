<template>
	<nav
		data-app
		class="w-full h-24 flex items-center justify-between bg-yellow-400 select-none"
	>
		<div class="flex items-center">
			<vs-button
				transparent
				to="/"
				color="danger"
				flat
				class="focus:outline-none"
			>
				<i class="bx bxs-home text-4xl"></i>
			</vs-button>
			<LangSwitcher class="hidden lg:flex" />
		</div>

		<LangSwitcher class="lg:hidden" />

		<LogoSection />
		<div class="flex items-center">
			<Links />
			<Menu />
		</div>
	</nav>
</template>
