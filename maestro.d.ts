declare module "maestro-ts" {
  export function initFlow(
    appId?: string,
    env?: { [key: string]: string | number }
  )
  export function launchApp(appId?: string, clear?: boolean)
  export function tapOnText(text: string)
  export function tapOn(testId: string)
  export function longPressOn(testId: string)
  export function tapOnPoint(point: { x: number; y: number })
  export function longPressOnPoint(point: { x: number; y: number })
  export function inputText(testId: string, text: string)
  export function eraseText(characters: int)
  export function openLink(url: string)
  export function assertVisible(testId: string)
  export function assertNotVisible(testId: string)
  export function clearState()
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
