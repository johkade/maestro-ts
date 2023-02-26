/**
 * Maestro commands on base level or inside nested commands such as repeat.
 */
interface NestedOrBase {
  /**
   * Tap on a text visible on screen.
   */
  tapOnText(text: string): string
  /**
   * Tap on an element with the given testId.
   */
  tapOn(testId: string): string
  /**
   * Long press on an element with the given testId.
   */
  longPressOn(testId: string): string
  /**
   * Tap on the given point.
   * Can either take numbers for dips or strings for percentages.
   * @example
   * M.tapOnPoint({ x: "50%", y: "50%"}) // tap middle of the screen.
   */
  tapOnPoint(point: { x: number | string; y: number | string }): string
  /**
   * Long press on the given point.
   */
  longPressOnPoint(point: { x: number; y: number }): string
  /**
   * Input a text into the currently focused input or the input with the given testId.
   */
  inputText(text: string, testId?: string): string
  /**
   * Erase a number of characters from the focused input or the input with the given testId.
   */
  eraseText(characters: number, testId?: string): string
  /**
   * Open a url / deepLink.
   */
  openLink(url: string): string
  /**
   * Assert an element with the given testId is visible.
   * @param enabled Whether the view should also be enabled.
   */
  assertVisible(testId: string, enabled?: boolean): string
  /**
   * Assert the element with the given testId is not visible.
   */
  assertNotVisible(testId: string): string
  /**
   * Scroll down.
   */
  scroll(): string
  /**
   * Scroll until the element with the given testId is visible.
   */
  scrollUntilVisible(testId: string): string
  /**
   * Input random number into focused input or the one with given testId.
   */
  inputRandomNumber(testId?: string): string
  /**
   * Input random name into focused input or the one with given testId.
   */
  inputRandomName(testId?: string): string
  /**
   * Input random email into focused input or the one with given testId.
   */
  inputRandomEmail(testId?: string): string
  /**
   * Input random text into focused input or the one with given testId.
   */
  inputRandomText(testId?: string): string
  /**
   * Use the configured deepLinkBase or appId to navigate to the given path.
   * Only works if deepLinking is set up correctly.
   */
  navigate(path: string): string
  /**
   * Repeats the given actions a given number of times.
   */
  repeat(times: number, fn: () => void): string
  /**
   * Repeats the given actions while the element with the given testId is visible.
   */
  repeatWhileVisible(id: string, fn: () => void): string
  /**
   * Repeats the given actions while the element with the given testId is not visible.
   */
  repeatWhileNotVisible(id: string, fn: () => void): string
  /**
   * Wait a number of milliseconds.
   * This is an anti-pattern, try to fall back to other waiting methods if possible.
   */
  wait(ms: number): string
  /**
   * Wait a max of n ms or until the current animation has ended.
   */
  waitForAnimationEnd(continueAfter?: number): string
  /**
   * Wait a max of milliseconds until the element with the given testId is visible.
   */
  waitUntilVisible(testId: string, maxWait?: number): string
  /**
   * Wait a max of milliseconds until the element with the given testId is no longer visible.
   */
  waitUntilNotVisible(testId: string, maxWait?: number): string
  /**
   * Take a screenshot and store at the path with the given name.
   */
  screenshot(fileName: string): string
  /**
   * Press the enter key on the software keyboard.
   */
  pressEnter(): string
  /**
   * Dismiss the software keyboard.
   */
  hideKeyboard(): string
  /**
   * Swipe left from center.
   */
  swipeLeft(): string
  /**
   * Swipe right from center.
   */
  swipeRight(): string
  /**
   * Swipe down from center.
   */
  swipeDown(): string
  /**
   * Swipe up from center.
   */
  swipeUp(): string
  /**
   * Swipe from a start to an end point. Use percentages or dips.
   * @example
   * // swipe from left top corner to right bottom corner.
   * M.swipe({x: "0%", y: "0%"}, {x: "100%", y: "100%"})
   */
  swipe(
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
  yaml(yaml: string): string
  /**
   * Check if a condition is true.
   */
  assertTrue(condition: string): string
  /**
   * Copies text of an element with the given testId. If a variable is given, the value is set to that variable.
   */
  copyTextFrom(testId: string, variableName?: string): string
  /**
   * Runs a script.
   */
  evalScript(script: string): string
  /**
   * Press android back button.
   */
  back(): string
  /**
   * Press the home button.
   */
  pressHomeButton(): string
  /**
   * Press the lock button.
   */
  pressLockButton(): string
  /**
   * Increase device volume.
   */
  volumeUp(): string
  /**
   * Decrease device volume.
   */
  volumeDown(): string
}
/**
 * Maestro commands only accessible on the base level and not in nested functions with e.g. repeat.
 */
interface All extends NestedOrBase {
  /**
   * Should be called at the start of every test flow.
   * In the config object, you can define the appId to use, plus a set of environment variables.
   */
  initFlow(config?: { appId?: string; [key: string]: string | number }): string
  /**
   * Launches the app.
   * @param appId The bundle id of your app. Falls back to the appId provided in maestro-ts.config.js.
   * @param clearState Whether to clear the app state before starting.
   * @param clearKeychain Whether to clear the entire Keychain before starting.
   * @param stopApp Whether to stop the app before starting - default: true.
   */
  launchApp(
    appId?: string,
    clearState?: boolean,
    clearKeychain?: boolean,
    stopApp?: boolean
  ): string
  /**
   * Clear the state of the current app or of the app with the given id.
   */
  clearState(appId?: string): string
  /**
   * Clear the entire keychain.
   */
  clearKeychain(): string
  /**
   * Run a subFlow.
   * @param path Path to the subFlow.
   * @param env Map of env variables for the subFlow.
   */
  runFlow(path: string, env?: { [key: string]: string | number }): string
  /**
   * Stop the current app or the one with the given appId.
   */
  stopApp(appId?: string): string
}

declare module "maestro-ts" {
  export type MaestroConfig = {
    appId: string
    deepLinkBase?: string
    [key: string]: string | number
  }
  export const M: All
  export const N: NestedOrBase
  export interface MaestroNestedOrBase extends NestedOrBase {}
  export interface MaestroAll extends All {}
}
