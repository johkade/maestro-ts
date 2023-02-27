import { M } from "maestro-ts"

export const MaestroTranslators: Partial<typeof M> = {
  initFlow: (config) => {
    const { appId, ...env } = config
    if (Object.keys(env).length === 0)
      return `appId: ${appId ?? process.env["appId"]}\n---\n`
    let variableLines = ""
    Object.entries(env).forEach(([key, value]) => {
      variableLines += `    ${key}: ${value}\n`
    })
    return `appId: ${
      appId ?? process.env["appId"]
    }\nenv:\n${variableLines}---\n`
  },
  launchApp: (id, clearState, clearKeychain, stopApp) => {
    return (
      "- launchApp:\n" +
      `    appId: "${id ?? process.env["appId"]}"\n` +
      (clearState ? "    clearState: true\n" : "") +
      (clearKeychain ? "    clearKeychain: true\n" : "") +
      (stopApp !== undefined ? `    stopApp: ${stopApp}\n` : "")
    )
  },
  clearState: (appId) => {
    if (appId) return `- clearState: ${appId}\n`
    return "- clearState\n"
  },
  clearKeychain: () => {
    return "- clearKeychain"
  },
  tapOn: (id) => {
    return `- tapOn:\n    id: "${id}"\n`
  },
  tapOnText: (text) => {
    return `- tapOn: ${text}`
  },
  tapOnPoint: ({ x, y }) => {
    return `- tapOn:\n    point: ${x},${y}"\n`
  },
  longPressOn: (id) => {
    return `- longPressOn:\n    id: "${id}"\n`
  },
  longPressOnPoint: ({ x, y }) => {
    return `- longPressOn:\n    point: ${x}, ${y}"\n`
  },
  swipeLeft: () => {
    return "- swipe:\n" + "    direction: LEFT\n" + "    duration: 400\n"
  },
  swipeRight: () => {
    return "- swipe:\n" + "    direction: RIGHT\n" + "    duration: 400\n"
  },
  swipeDown: () => {
    return "- swipe:\n" + "    direction: DOWN\n" + "    duration: 400\n"
  },
  swipeUp: () => {
    return "- swipe:\n" + "    direction: UP\n" + "    duration: 400\n"
  },
  swipe: (start, end) => {
    return `- swipe:\n    start: ${start.x}, ${start.y}\n    end:${end.x}, ${end.y}\n`
  },
  inputText: (text, id) => {
    if (!id) return `- inputText: ${text}\n`
    return `- tapOn:\n    id: "${id}"\n- inputText: ${text}\n`
  },
  inputRandomName: (id) => {
    if (!id) return `- inputRandomPersonName\n`
    return `- tapOn:\n    id: "${id}"\n- inputRandomPersonName\n`
  },
  inputRandomNumber: (id) => {
    if (!id) return `- inputRandomNumber\n`
    return `- tapOn:\n    id: "${id}"\n- inputRandomNumber\n`
  },
  inputRandomEmail: (id) => {
    if (!id) return `- inputRandomEmail\n`
    return `- tapOn:\n    id: "${id}"\n- inputRandomEmail\n`
  },
  inputRandomText: (id) => {
    if (!id) return `- inputRandomText\n`
    return `- tapOn:\n    id: "${id}"\n- inputRandomText\n`
  },
  eraseText: (chars, id) => {
    if (!id) return `- eraseText: ${chars ?? 50}\n`
    return `- tapOn:\n    id: "${id}"\n- eraseText: ${chars ?? 50}\n`
  },
  openLink: (url) => {
    return `- openLink: ${url}\n`
  },
  navigate: (path) => {
    return `- openLink: ${process.env["deepLinkBase"]}${path}\n`
  },
  runFlow: (path, env) => {
    if (!env) return `- runFlow: ${path}\n`
    let variableLines = ""
    Object.entries(env).forEach(([key, value]) => {
      variableLines += `      ${key}: ${value}\n`
    })
    return `- runFlow:\n    file: ${path}\n    env:\n${variableLines}`
  },
  assertVisible: (id, enabled) => {
    if (enabled) return `- assertVisible:\n    id: "${id}"\n    enabled: true\n`
    return `- assertVisible:\n    id: "${id}"\n`
  },
  assertNotVisible: (id) => {
    return `- assertNotVisible:\n    id: "${id}"\n`
  },
  scroll: () => {
    return `- scroll\n`
  },
  scrollUntilVisible: (id) => {
    return `- scrollUntilVisible:\n    element:\n      id: "${id}"\n`
  },
  waitForAnimationEnd: (continueAfter) => {
    if (!continueAfter) {
      return "- waitForAnimationToEnd\n"
    }
    return `- waitForAnimationToEnd:\n    timeout: ${continueAfter}\n`
  },
  waitUntilVisible: (id, maxWait) => {
    return (
      "- extendedWaitUntil:\n" +
      "    visible:\n" +
      `        id: ${id}\n` +
      `    timeout: ${maxWait ?? 5000}\n`
    )
  },
  waitUntilNotVisible: (id, maxWait) => {
    return (
      "- extendedWaitUntil:\n" +
      "    notVisible:\n" +
      `        id: ${id}\n` +
      `    timeout: ${maxWait ?? 5000}\n`
    )
  },
  wait: (ms) => {
    return (
      "- swipe\n" +
      "    start: -1,-1\n" +
      "    e d: -1,-100\n" +
      `    duration: ${ms}\n`
    )
  },
  hideKeyboard: () => {
    return "- hideKeyboard\n"
  },
  screenshot: (fileName) => {
    return `- takeScreenshot: ${fileName}\n`
  },
  pressEnter: () => {
    return "- pressKey: Enter\n"
  },
  pressHomeButton: () => {
    return "- pressKey: Home\n"
  },
  pressLockButton: () => {
    return "- pressKey: Lock\n"
  },
  back: () => {
    return "- pressKey: back\n"
  },
  volumeDown: () => {
    return "- pressKey: volume down"
  },
  volumeUp: () => {
    return "- pressKey: volume up"
  },
  stopApp: (appId) => {
    if (appId) return `- stopApp: ${appId}\n`
    return "- stopApp\n"
  },
  repeat: (times, func) => {
    const out = func() as unknown as string
    return `- repeat:
    times:${times}
    commands:
        ${out.replace(/\n(?=.*[\n])/g, "\n        ")}`
  },
  repeatWhileVisible: (id, func) => {
    const out = func() as unknown as string
    return `- repeat:
    while:
        visible:
            id: ${id}
    commands:
        ${out.replace(/\n(?=.*[\n])/g, "\n        ")}`
  },
  repeatWhileNotVisible: (id, func) => {
    const out = func() as unknown as string
    return `- repeat:
    while:
        notVisible:
            id: ${id}
    commands:
        ${out.replace(/\n(?=.*[\n])/g, "\n        ")}`
  },
  yaml: (yaml: string) => `${yaml}\n`,
  assertTrue: (condition: string) => {
    return `- assertTrue: ${condition}\n`
  },
  evalScript: (script: string) => {
    return `- evalScript: ${script}\n`
  },
}
