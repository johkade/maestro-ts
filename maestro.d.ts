declare module "maestro-ts" {
  /**
   * Should be called at the start of every test flow.
   * @param appId The bundle id of your app. Falls back to the appId provided in maestro-ts.config.js.
   * @param env A map of environment variables.
   */
  export function initFlow(
    appId?: string,
    env?: { [key: string]: string | number }
  )
  /**
   * Launches the app.
   * @param appId The bundle id of your app. Falls back to the appId provided in maestro-ts.config.js.
   * @param clear Whether to clear the app state before starting.
   */
  export function launchApp(appId?: string, clear?: boolean)
  /**
   * Tap on a text visible on screen.
   */
  export function tapOnText(text: string)
  /**
   * Tap on an element with the given testId.
   */
  export function tapOn(testId: string)
  /**
   * Long press on an element with the given testId.
   */
  export function longPressOn(testId: string)
  /**
   * Tap on the given point.
   */
  export function tapOnPoint(point: { x: number; y: number })
  /**
   * Long press on the given point.
   */
  export function longPressOnPoint(point: { x: number; y: number })
  export function inputText(testId: string, text: string)
  export function eraseText(characters: int)
  export function openLink(url: string)
  export function assertVisible(testId: string)
  export function assertNotVisible(testId: string)
  export function clearState()
  /**
   * Run a subFlow.
   * @param path Path to the subFlow.
   * @param env Map of env variables for the subFlow.
   */
  export function runFlow(
    path: string,
    env?: { [key: string]: string | number }
  )
  export function scroll()
  export function scrollUntilVisible(testId: string)
  export function inputRandomNumber(testId: string)
  export function inputRandomName(testId: string)
  export function inputRandomEmail(testId: string)
  export function inputRandomText(testId: string)
  export function navigate(path: string)
  export function repeat(times: number, fn: () => void)
  export function repeatWhileVisible(id: string, fn: () => void)
  export function repeatWhileNotVisible(id: string, fn: () => void)
  export function wait(ms: number)
  export function waitForAnimationEnd(continueAfter?: number)
  export function waitUntilVisible(testId: string, maxWait?: number)
  export function waitUntilNotVisible(testId: string, maxWait?: number)
  export function screenshot(fileName: string)
  export function pressEnter()
  export function dismissKeyboard()
  export function stopApp()
  export function swipeLeft()
  export function swipeRight()
}
