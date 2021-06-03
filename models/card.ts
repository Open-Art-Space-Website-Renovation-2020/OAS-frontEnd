import { Model } from "@vuex-orm/core"

export default class Card extends Model {
	static entity = "card"

	static fields() {
		return {
			id: this.uid(),
			level: this.string("one"),
			total_time: this.number(37),
			level_one: this.attr([
				"/img/cards/Bat.png",
				"/img/cards/Bat.png",
				"/img/cards/Bones.png",
				"/img/cards/Bones.png",
				"/img/cards/Cauldron.png",
				"/img/cards/Cauldron.png",
				"/img/cards/Eye.png",
				"/img/cards/Eye.png",
			]),
			level_two: this.attr([
				"/img/cards/Bat.png",
				"/img/cards/Bat.png",
				"/img/cards/Bones.png",
				"/img/cards/Bones.png",
				"/img/cards/Cauldron.png",
				"/img/cards/Cauldron.png",
				"/img/cards/Eye.png",
				"/img/cards/Eye.png",
				"/img/cards/Skull.png",
				"/img/cards/Skull.png",
				"/img/cards/Pumpkin.png",
				"/img/cards/Pumpkin.png",
			]),
			level_three: this.attr([
				"/img/cards/Bat.png",
				"/img/cards/Bat.png",
				"/img/cards/Bones.png",
				"/img/cards/Bones.png",
				"/img/cards/Cauldron.png",
				"/img/cards/Cauldron.png",
				"/img/cards/Eye.png",
				"/img/cards/Eye.png",
				"/img/cards/Skull.png",
				"/img/cards/Skull.png",
				"/img/cards/Pumpkin.png",
				"/img/cards/Pumpkin.png",
				"/img/cards/Ghost.png",
				"/img/cards/Ghost.png",
				"/img/cards/Dracula.png",
				"/img/cards/Dracula.png",
			]),
		}
	}
}
