import { StoreState } from "@/types"

export const state = () => ({
	language: "en",
})

export const mutations = {
	set_language: (state: StoreState, payload: string) => {
		state.language = payload
	},
}

export const getters = {
	get_language: (state: StoreState) => {
		return state.language
	},
}
