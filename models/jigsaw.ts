import { Model } from "@vuex-orm/core"

export default class Jigsaw extends Model {
	static entity = "jigsaw"

	static fields() {
		return {
			id: this.uid(),
			name: this.string(""),
			level: this.string("one"),
			horizontal: this.number(4),
			vertical: this.number(5),
		}
	}
}
