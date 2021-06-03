import { Model } from "@vuex-orm/core"

export default class Puzzle extends Model {
	static entity = "puzzles"

	static fields() {
		return {
			id: this.uid(),
			name: this.string(""),
			level: this.string("one"),
			horizontal: this.number(3),
			vertical: this.number(3),
		}
	}
}
