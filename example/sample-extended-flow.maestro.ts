import { M } from "maestro-ts-ext"

M.initFlow({ TEST: "TODO" })

M.inputFavoriteAnimal("dis")
M.inputRandomEmail()

// There's nothing here yet, sorry about that...

M.runFlow("subflows/app-start.flow.yaml")
M.tapOn("testId")

M.runFlow("subflows/login/fast-login.flow.yaml", {
  TB_REFRESH_TOKEN_START: "${TB_REFRESH_TOKEN_START}",
  TB_REFRESH_TOKEN_END: "${TB_REFRESH_TOKEN_END}",
})
