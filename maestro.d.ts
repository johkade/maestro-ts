declare module "maestro-ts" {
  export type MaestroConfig = {
    appId: string
    deepLinkBase?: string
    [key: string]: string | number
  }
  /**
   * Should be called at the start of every test flow.
   * In the config object, you can define the appId to use, plus a set of environment variables.
   */
  export function initFlow(config?: {
    appId?: string
    [key: string]: string | number
  }): string
  /**
   * Launches the app.
   * @param appId The bundle id of your app. Falls back to the appId provided in maestro-ts.config.js.
   * @param clearState Whether to clear the app state before starting.
   * @param clearKeychain Whether to clear the entire Keychain before starting.
   * @param stopApp Whether to stop the app before starting - default: true.
   */
  export function launchApp(
    appId?: string,
    clearState?: boolean,
    clearKeychain?: boolean,
    stopApp?: boolean
  ): string
  /**
   * Tap on a text visible on screen.
   */
  export function tapOnText(text: string): string
  /**
   * Tap on an element with the given testId.
   */
  export function tapOn(testId: string): string
  /**
   * Long press on an element with the given testId.
   */
  export function longPressOn(testId: string): string
  /**
   * Tap on the given point.
   * Can either take numbers for dips or strings for percentages.
   * @example
   * M.tapOnPoint({ x: "50%", y: "50%"}) // tap middle of the screen.
   */
  export function tapOnPoint(point: {
    x: number | string
    y: number | string
  }): string
  /**
   * Long press on the given point.
   */
  export function longPressOnPoint(point: { x: number; y: number }): string
  /**
   * Input a text into the currently focused input or the input with the given testId.
   */
  export function inputText(text: string, testId?: string): string
  /**
   * Erase a number of characters from the focused input or the input with the given testId.
   */
  export function eraseText(characters: number, testId?: string): string
  /**
   * Open a url / deepLink.
   */
  export function openLink(url: string): string
  /**
   * Assert an element with the given testId is visible.
   * @param enabled Whether the view should also be enabled.
   */
  export function assertVisible(testId: string, enabled?: boolean): string
  /**
   * Assert the element with the given testId is not visible.
   */
  export function assertNotVisible(testId: string): string
  /**
   * Clear the state of the current app or of the app with the given id.
   */
  export function clearState(appId?: string): string
  /**
   * Clear the entire keychain.
   */
  export function clearKeychain(): string
  /**
   * Run a subFlow.
   * @param path Path to the subFlow.
   * @param env Map of env variables for the subFlow.
   */
  export function runFlow(
    path: string,
    env?: { [key: string]: string | number }
  ): string
  /**
   * Scroll down.
   */
  export function scroll(): string
  /**
   * Scroll until the element with the given testId is visible.
   */
  export function scrollUntilVisible(testId: string): string
  /**
   * Input random number into focused input or the one with given testId.
   */
  export function inputRandomNumber(testId?: string): string
  /**
   * Input random name into focused input or the one with given testId.
   */
  export function inputRandomName(testId?: string): string
  /**
   * Input random email into focused input or the one with given testId.
   */
  export function inputRandomEmail(testId?: string): string
  /**
   * Input random text into focused input or the one with given testId.
   */
  export function inputRandomText(testId?: string): string
  /**
   * Use the configured deepLinkBase or appId to navigate to the given path.
   * Only works if deepLinking is set up correctly.
   */
  export function navigate(path: string): string
  /**
   * Repeats the given actions a given number of times.
   */
  export function repeat(times: number, fn: () => void): string
  /**
   * Repeats the given actions while the element with the given testId is visible.
   */
  export function repeatWhileVisible(id: string, fn: () => void): string
  /**
   * Repeats the given actions while the element with the given testId is not visible.
   */
  export function repeatWhileNotVisible(id: string, fn: () => void): string
  /**
   * Wait a number of milliseconds.
   * This is an anti-pattern, try to fall back to other waiting methods if possible.
   */
  export function wait(ms: number): string
  /**
   * Wait a max of n ms or until the current animation has ended.
   */
  export function waitForAnimationEnd(continueAfter?: number): string
  /**
   * Wait a max of milliseconds until the element with the given testId is visible.
   */
  export function waitUntilVisible(testId: string, maxWait?: number): string
  /**
   * Wait a max of milliseconds until the element with the given testId is no longer visible.
   */
  export function waitUntilNotVisible(testId: string, maxWait?: number): string
  /**
   * Take a screenshot and store at the path with the given name.
   */
  export function screenshot(fileName: string): string
  /**
   * Press the enter key on the software keyboard.
   */
  export function pressEnter(): string
  /**
   * Dismiss the software keyboard.
   */
  export function hideKeyboard(): string
  /**
   * Stop the current app or the one with the given appId.
   */
  export function stopApp(appId?: string): string
  /**
   * Swipe left from center.
   */
  export function swipeLeft(): string
  /**
   * Swipe right from center.
   */
  export function swipeRight(): string
  /**
   * Swipe down from center.
   */
  export function swipeDown(): string
  /**
   * Swipe up from center.
   */
  export function swipeUp(): string
  /**
   * Swipe from a start to an end point. Use percentages or dips.
   * @example
   * // swipe from left top corner to right bottom corner.
   * M.swipe({x: "0%", y: "0%"}, {x: "100%", y: "100%"})
   */
  export function swipe(
    start: { x: string | number; y: string | number },
    end: { x: string | number; y: string | number }
  ): string
  /**
   * Insert inline yaml code. Good for specialized commands.
   * @example
   * M.yaml(`
   * - tapOn:
   *     point: 50%,50%
   * `)
   */
  export function yaml(yaml: string): string
  /**
   * Check if a condition is true.
   */
  export function assertTrue(condition: string): string
  /**
   * Copies text of an element with the given testId. If a variable is given, the value is set to that variable.
   */
  export function copyTextFrom(testId: string, variableName?: string): string
  /**
   * Runs a script.
   */
  export function evalScript(script: string): string
  /**
   * Press android back button.
   */
  export function back(): string
  /**
   * Press the home button.
   */
  export function pressHomeButton(): string
  /**
   * Press the lock button.
   */
  export function pressLockButton(): string
  /**
   * Increase device volume.
   */
  export function volumeUp(): string
  /**
   * Decrease device volume.
   */
  export function volumeDown(): string
}
