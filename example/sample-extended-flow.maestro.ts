import { M, N } from "maestro-ts-ext"

// Initialize your flow
M.initFlow({ TEST_ENV_VAR: "HELLO_MAESTRO" })
M.launchApp({ clearKeychain: true, clearState: true })

// you can clear the simulator's state whenever you like.
M.clearKeychain()
M.clearState()

// run subflows with or without environment variables
M.runFlow("sub-flows/init.yaml")
M.runFlow("sub-flows/login.yaml", {
  USERNAME: "${USERNAME}",
  PASSWORD: "${PASSWORD}",
})
// and stop the app
M.stopApp()

// Tap on things
M.tapOnText("Let's get started")
M.tapOn("loginButtonId")
M.tapOnPoint({ x: 100, y: 100 })
M.tapOnPoint({ x: "50%", y: "50%" })

// Long-press things
M.longPressOnText("Submit")
M.longPressOn("longPressableButtonId")
M.longPressOnPoint({ x: 100, y: 200 })
M.longPressOnPoint({ x: "50%", y: "50%" })

// Text inputs

// focus input, then enter text
M.inputText("sample text", "input-id")
// enter into focussed input
M.inputText("More text")
M.eraseText(5, "input-id")
M.eraseText(5)

M.inputRandomNumber("number-input-id")
M.inputRandomNumber()
M.inputRandomName("name-input-id")
M.inputRandomName()
M.inputRandomEmail("email-input-id")
M.inputRandomEmail()
M.inputRandomText("text-input-id")
M.inputRandomText()

// from extensions
M.inputFavoriteAnimal("myInputId")

// special buttons/actions
M.pressEnter()
M.hideKeyboard()
M.pressHomeButton()
M.pressLockButton()
M.volumeDown()
M.volumeUp()
M.copyTextFrom("element-id")
M.openLink("https://example.com")
// If you set up deep linking in your app, you can navigate to screens directly.
M.navigate("/path")
M.screenshot("test.png")

// if maestro-ts doesn't suffice, you can just add yaml.
M.yaml(`- tapOn:
  point: 50%,50%`)

// scrolling, gestures, swiping
M.swipeLeft()
M.swipeRight()
M.swipeDown()
M.swipeUp()
M.swipe({ x: "0%", y: "0%" }, { x: "100%", y: "100%" })
M.scroll()
M.scrollUntilVisible("element-id")

// assertions
M.assertVisible("element-id", true)
M.assertTrue("condition")
M.assertNotVisible("element-id")

// waiting
M.wait(1000)
M.waitForAnimationEnd()
M.waitUntilVisible("element-id", 5000)
M.waitUntilNotVisible("element-id", 5000)

// loops / nesting
M.repeat(3, () => {
  N.tapOn("hello")
  N.tapOn("my")
  N.tapOn("friend")
})
M.repeatWhileVisible("element-id", () => {
  N.tapOn("hello")
  N.tapOn("my")
  N.tapOn("friend")
})
M.repeatWhileNotVisible("element-id", () => {
  N.tapOn("hello")
  N.tapOn("my")
  N.tapOn("friend")
})
