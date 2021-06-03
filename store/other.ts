import { StoreState } from "@/types"

export const state = () => ({
	language: "en",
	backend_url: "http://127.0.0.1:8000",
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
	get_url: (state: StoreState) => {
		return state.backend_url
	},
}
