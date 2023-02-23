declare module "maestro-ts" {
  export type MaestroConfig = {
    appId: string
    deepLinkBase?: string
    [key: string]: string | number
  }
  /**
   * Should be called at the start of every test flow.
   * @param appId The bundle id of your app. Falls back to the appId provided in maestro-ts.config.js.
   * @param env A map of environment variables.
   */
  export function initFlow(
    appId?: string,
    env?: { [key: string]: string | number }
  ): string
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
  export function inputText(testId: string, text: string): string
  export function eraseText(characters: number): string
  export function openLink(url: string): string
  export function assertVisible(testId: string): string
  export function assertNotVisible(testId: string): string
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
  export function scroll(): string
  export function scrollUntilVisible(testId: string): string
  export function inputRandomNumber(testId: string): string
  export function inputRandomName(testId: string): string
  export function inputRandomEmail(testId: string): string
  export function inputRandomText(testId: string): string
  export function navigate(path: string): string
  export function repeat(times: number, fn: () => void): string
  export function repeatWhileVisible(id: string, fn: () => void): string
  export function repeatWhileNotVisible(id: string, fn: () => void): string
  export function wait(ms: number): string
  export function waitForAnimationEnd(continueAfter?: number): string
  export function waitUntilVisible(testId: string, maxWait?: number): string
  export function waitUntilNotVisible(testId: string, maxWait?: number): string
  export function screenshot(fileName: string): string
  export function pressEnter(): string
  export function dismissKeyboard(): string
  export function stopApp(): string
  export function swipeLeft(): string
  export function swipeRight(): string
}
