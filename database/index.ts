import { Database } from "@vuex-orm/core"
import Card from "@/models/card"
import Jigsaw from "@/models/jigsaw"
import Puzzle from "@/models/puzzle"

const database = new Database()

database.register(Card)
database.register(Jigsaw)
database.register(Puzzle)

export default database
