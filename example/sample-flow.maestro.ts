import * as M from "maestro-ts"

// Uses appId from maestro-ts.config.cjs
M.initFlow(undefined, { NAME: "Maestro" })

M.launchApp()

M.tapOn("buttonId")

M.inputText("textFieldId", "Hello World")

M.inputText("otherTextFieldId", "${NAME}")

// This would only work once you've set up deep linking in your app
// and you've set the appropriate deepLinkingBase in maestro.config.ts
M.navigate("/profile")

// If you apply routes as testIDs to your ScreenContainers, you can do some pretty cool stuff 😎
M.assertVisible("/profile")
