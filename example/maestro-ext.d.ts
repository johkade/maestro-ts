// In the future, you can extend and override maestro-ts's functionality.

declare module "maestro-ts-ext" {
  import type { MaestroAll, MaestroNestedOrBase } from "maestro-ts"

  /**
   * Extensions which should be available in nested or base commands.
   */
  interface NestedOrBaseExtension extends MaestroNestedOrBase {
    inputFavoriteAnimal(): string
  }
  /**
   * Extensions which should only be available on base commands.
   */
  interface MaestroAllExtension extends NestedOrBaseExtension, MaestroAll {
    setupFlow(): string
  }
  export const M: MaestroAllExtension
  export const N: NestedOrBaseExtension
}
