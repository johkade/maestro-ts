import * as Maestro from "maestro-ts"
import Config from "./maestro-ts.config.js"

export const MaestroTranslators: Partial<typeof Maestro> = {
  inputFavoriteAnimal: (id) => {
    return `- tapOn:\n    id: ${id}` + `- inputText: ${Config.favoriteAnimal}`
  },
  inputRandomEmail: (id) => {
    return `- tapOn:\n    id: ${id}` + `- inputText: myCustomEmail`
  },
}
