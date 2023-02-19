Object.defineProperty(exports, "__esModule", { value: true });
exports.MaestroTranslators = void 0;
exports.MaestroTranslators = {
    initFlow: (appId, env) => {
        if (!env)
            return `appId: ${appId !== null && appId !== void 0 ? appId : process.env["appId"]}\n---\n`;
        let variableLines = "";
        Object.entries(env).forEach(([key, value]) => {
            variableLines += `    ${key}: ${value}\n`;
        });
        return `appId: ${appId !== null && appId !== void 0 ? appId : process.env["appId"]}\nenv:\n${variableLines}`;
    },
    launchApp: (id, clear) => {
        return ("- launchApp:\n" +
            `    appId: "${id !== null && id !== void 0 ? id : process.env["appId"]}"\n` +
            (clear ? "    clearState: true\n" : ""));
    },
    clearState: () => {
        return "- clearState\n";
    },
    tapOn: (id) => {
        return `- tapOn:\n    id: "${id}"\n`;
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
    inputText: (id, text) => {
        return `- tapOn:\n    id: "${id}"\n- inputText: ${text}\n`;
    },
    inputRandomName: (id) => {
        return `- tapOn:\n    id: "${id}"\n- inputRandomPersonName\n`;
    },
    inputRandomNumber: (id) => {
        return `- tapOn:\n    id: "${id}"\n- inputRandomNumber\n`;
    },
    inputRandomEmail: (id) => {
        return `- tapOn:\n    id: "${id}"\n- inputRandomEmail\n`;
    },
    inputRandomText: (id) => {
        return `- tapOn:\n    id: "${id}"\n- inputRandomText\n`;
    },
    eraseText: (chars) => {
        return `- eraseText: ${chars !== null && chars !== void 0 ? chars : 50}\n`;
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
    // nested actions
    repeat: () => { },
    repeatWhileVisible: () => { },
    repeatWhileNotVisible: () => { },
};
