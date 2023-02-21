import * as M from "maestro-ts"

M.initFlow(undefined, { TEST: "Hello Moon" })
M.launchApp()
M.tapOn("Button")
M.inputText("textField", "Hello World")
M.inputText("otherField", "${TEST}")
// This would only work once you've set up deep linking in your app
// and you've set the appropriate deepLinkingBase in maestro.config.ts
M.navigate("/profile")
M.inputFavoriteAnimal("anotherTextField")
