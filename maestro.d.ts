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
   * @param clear Whether to clear the app state before starting.
   */
  export function launchApp(appId?: string, clear?: boolean): string
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
   */
  export function tapOnPoint(point: { x: number; y: number }): string
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
   */
  export function assertVisible(testId: string): string
  /**
   * Assert the element with the given testId is not visible.
   */
  export function assertNotVisible(testId: string): string
  /**
   * Clear the state of the device.
   */
  export function clearState(): string
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
   * @deprecated Not implemented.
   */
  export function repeat(times: number, fn: () => void): string
  /**
   * @deprecated Not implemented.
   */
  export function repeatWhileVisible(id: string, fn: () => void): string
  /**
   * @deprecated Not implemented.
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
  export function dismissKeyboard(): string
  /**
   * Stop the current app.
   */
  export function stopApp(): string
  /**
   * Swipe left from center.
   */
  export function swipeLeft(): string
  /**
   * Swipe right from center.
   */
  export function swipeRight(): string
}
