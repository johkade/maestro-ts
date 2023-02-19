declare module "maestro-ts" {
  export function initFlow(appId?: string)
  export function launchApp(appId?: string, clear?: boolean)
  export function tapOn(testId: string)
  export function tapOnPoint(point: { x: number; y: number })
  export function inputText(testId: string, text: string)
  export function eraseText(characters: int)
  export function openLink(url: string)
  export function assertVisible(testId: string)
  export function clearState()
  export function setEnv(env: { [key: string]: string | number })
  export function runFlow(
    path: string,
    env?: { [key: string]: string | number }
  )
  export function scrollUntilVisible(testId: string)
  export function inputRandomNumber()
  export function inputRandomName()
  export function navigate(path: string)
}
