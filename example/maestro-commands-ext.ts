import { M } from "maestro-ts-ext"
import Config from "./maestro-ts.config.cjs"

export const MaestroTranslators: Partial<typeof M> = {
  inputFavoriteAnimal: (id) => {
    if (!id) return `- inputText: ${Config.favoriteAnimal}`
    return (
      `- tapOn:\n    id: ${id}\n` + `- inputText: ${Config.favoriteAnimal}\n`
    )
  },
  inputRandomEmail: (id) => {
    if (!id) return `- inputText: myCustomEmail\n`
    return `- tapOn:\n    id: ${id}\n` + `- inputText: myCustomEmail\n`
  },
}
