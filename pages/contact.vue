<script>
export default {
	transition: "page",
	data() {
		return {
			full_name: null,
			email: null,
			message: null,
		}
	},
	head: {
		title: "Contact Us | Art Space Open",
	},
	methods: {
		async submit() {
			const loading = this.$vs.loading({
				type: "circles",
				text: "submitting...",
				color: "#d5397b",
				// background: "#7a76cb",
			})
			const data = {
				email: this.email,
				full_name: this.full_name,
				message: this.message,
			}
			try {
				await this.$axios.$post("/fapi/subscribers/", data)
				this.$vs.notification({
					progress: "auto",
					width: "100%",
					icon: "<i class='bx bx-select-multiple' ></i>",
					color: "success",
					position: "top-center",
					title: this.$t("submitted"),
				})
				loading.close()
			} catch (error) {
				// console.log(error.response)
				this.$vs.notification({
					progress: "auto",
					width: "100%",
					icon: "<i class='bx bx-bug' ></i>",
					color: "danger",
					position: "top-center",
					title: "Something went wrong. Try again.",
				})

				loading.close()
			}
		},
	},
}
</script>
<template>
	<div
		class="w-10/11 mt-10 mb-30 flex flex-col items-center justify-center container mx-auto p-0 md:p-8 border-4 border-pink-500 rounded-3xl select-none"
	>
		<h1
			class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200"
		>
			{{ $t("contact") }}
		</h1>

		<div
			class="w-10/11 flex flex-col items-center justify-between p-8 shadow-lg"
		>
			<form class="w-full" @submit.prevent="submit">
				<div class="mb-6">
					<label
						for="name"
						class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
						>{{ $t("full_name") }} *
					</label>
					<vs-input
						id="name"
						v-model="full_name"
						type="text"
						name="name"
						placeholder="John Doe"
						required
						class="w-full"
					>
						<template #icon>
							<i class="bx bx-text"></i>
						</template>
					</vs-input>
				</div>
				<div class="mb-6">
					<label
						for="email"
						class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
						>{{ $t("email") }} *</label
					>
					<vs-input
						id="email"
						v-model="email"
						type="email"
						name="email"
						placeholder="Email"
						required
						class="w-full"
					>
						<template #icon> @ </template>
					</vs-input>
				</div>
				<div class="mb-6">
					<label
						for="message"
						class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
						>{{ $t("message") }} *</label
					>

					<textarea
						id="message"
						v-model="message"
						rows="5"
						name="message"
						:placeholder="$t('message')"
						class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
						required
					></textarea>
				</div>
				<div class="mb-6">
					<vs-button
						:disabled="!full_name || !email || !message"
						type="submit"
						success
						block
						class="text-xl"
					>
						{{ $t("submit") }}
					</vs-button>
				</div>
			</form>
		</div>
	</div>
</template>

<style>
.vs-input-content {
	margin: 10px 0px;
	width: calc(100%);
}

.vs-input-content .vs-input {
	width: 100%;
}
</style>
