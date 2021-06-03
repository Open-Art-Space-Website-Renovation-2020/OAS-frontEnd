import VuexORM from "@vuex-orm/core"
import VuexORMSearch from "@vuex-orm/plugin-search"

import database from "@/database"

VuexORM.use(VuexORMSearch)

export const plugins = [VuexORM.install(database)]
