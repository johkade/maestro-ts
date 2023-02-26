export const MaestroTranslators = {
    initFlow: (config) => {
        const { appId, ...env } = config;
        if (!env)
            return `appId: ${appId ?? process.env["appId"]}\n---\n`;
        let variableLines = "";
        Object.entries(env).forEach(([key, value]) => {
            variableLines += `    ${key}: ${value}\n`;
        });
        return `appId: ${appId ?? process.env["appId"]}\nenv:\n${variableLines}---\n`;
    },
    launchApp: (id, clear) => {
        return ("- launchApp:\n" +
            `    appId: "${id ?? process.env["appId"]}"\n` +
            (clear ? "    clearState: true\n" : ""));
    },
    clearState: () => {
        return "- clearState\n";
    },
    tapOn: (id) => {
        return `- tapOn:\n    id: "${id}"\n`;
    },
    tapOnText: (text) => {
        return `- tapOn: ${text}`;
    },
    tapOnPoint: ({ x, y }) => {
        return `- tapOn:\n    point: ${x}, ${y}"\n`;
    },
    longPressOn: (id) => {
        return `- longPressOn:\n    id: "${id}"\n`;
    },
    longPressOnPoint: ({ x, y }) => {
        return `- longPressOn:\n    point: ${x}, ${y}"\n`;
    },
    swipeLeft: () => {
        return "- swipe: " + "    direction: LEFT" + "    duration: 400";
    },
    swipeRight: () => {
        return "- swipe: " + "    direction: RIGHT" + "    duration: 400";
    },
    inputText: (text, id) => {
        if (!id)
            return `- inputText: ${text}\n`;
        return `- tapOn:\n    id: "${id}"\n- inputText: ${text}\n`;
    },
    inputRandomName: (id) => {
        if (!id)
            return `- inputRandomPersonName\n`;
        return `- tapOn:\n    id: "${id}"\n- inputRandomPersonName\n`;
    },
    inputRandomNumber: (id) => {
        if (!id)
            return `- inputRandomNumber\n`;
        return `- tapOn:\n    id: "${id}"\n- inputRandomNumber\n`;
    },
    inputRandomEmail: (id) => {
        if (!id)
            return `- inputRandomEmail\n`;
        return `- tapOn:\n    id: "${id}"\n- inputRandomEmail\n`;
    },
    inputRandomText: (id) => {
        if (!id)
            return `- inputRandomText\n`;
        return `- tapOn:\n    id: "${id}"\n- inputRandomText\n`;
    },
    eraseText: (chars, id) => {
        if (!id)
            return `- eraseText: ${chars ?? 50}\n`;
        return `- tapOn:\n    id: "${id}"\n- eraseText: ${chars ?? 50}\n`;
    },
    openLink: (url) => {
        return `- openLink: ${url}\n`;
    },
    navigate: (path) => {
        return `- openLink: ${process.env["deepLinkBase"]}${path}\n`;
    },
    runFlow: (path, env) => {
        if (!env)
            return `runFlow: ${path}\n---\n`;
        let variableLines = "";
        Object.entries(env).forEach(([key, value]) => {
            variableLines += `    ${key}: ${value}\n`;
        });
        return `appId: ${path}\nenv:\n${variableLines}`;
    },
    assertVisible: (id) => {
        return `- assertVisible:\n    id: "${id}"\n`;
    },
    assertNotVisible: (id) => {
        return `- assertNotVisible:\n    id: "${id}"\n`;
    },
    scroll: () => {
        return `- scroll\n`;
    },
    scrollUntilVisible: (id) => {
        return `- scrollUntilVisible:\n    element:\n        id: "${id}"\n    direction: DOWN`;
    },
    waitForAnimationEnd: (continueAfter) => {
        if (!continueAfter) {
            return "- waitForAnimationToEnd\n";
        }
        return `- waitForAnimationToEnd:\n    timeout: ${continueAfter}\n`;
    },
    waitUntilVisible: (id, maxWait) => {
        return ("- extendedWaitUntil:\n" +
            "    visible:\n" +
            `        id: ${id}\n` +
            `    timeout: ${maxWait ?? 5000}\n`);
    },
    waitUntilNotVisible: (id, maxWait) => {
        return ("- extendedWaitUntil:\n" +
            "    notVisible:\n" +
            `        id: ${id}\n` +
            `    timeout: ${maxWait ?? 5000}\n`);
    },
    wait: (ms) => {
        return ("- swipe\n" +
            "    start: -1,-1\n" +
            "    e d: -1,-100\n" +
            `    duration: ${ms}\n`);
    },
    dismissKeyboard: () => {
        return "- hideKeyboard\n";
    },
    screenshot: (fileName) => {
        return `- takeScreenshot: ${fileName}\n`;
    },
    pressEnter: () => {
        return "- pressKey: Enter\n";
    },
    stopApp: () => {
        return "- stopApp\n";
    },
    // Nested commands
    repeat: (times, func) => {
        const out = func();
        return `- repeat:
    times:${times}
    commands:
        ${out.replace(/\n(?=.*[\n])/g, "\n        ")}`;
    },
    repeatWhileVisible: (id, func) => {
        const out = func();
        return `- repeat:
    while:
        visible:
            id: ${id}
    commands:
        ${out.replace(/\n(?=.*[\n])/g, "\n        ")}`;
    },
    repeatWhileNotVisible: (id, func) => {
        const out = func();
        return `- repeat:
    while:
        notVisible:
            id: ${id}
    commands:
        ${out.replace(/\n(?=.*[\n])/g, "\n        ")}`;
    },
};
// /[.](?=.*[.])/g
//# sourceMappingURL=commands.js.map