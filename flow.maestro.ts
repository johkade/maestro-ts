import * as M from "maestro-ts"

M.initFlow()
M.launchApp()
M.tapOn("Button")
M.inputText("textField", "Hello World")
M.inputText("otherField", "${TEST}")
M.navigate("/profile/me")

// M.repeat(2, () => {
//   M.tapOn("Dis")
// })

// M.repeatWhileNotVisible("someId", () => {
//   M.tapOn("Dis")
// })

// M.repeatWhileVisible("someId", () => {
//   M.tapOn("Dis")
// })
