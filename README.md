# Maestro-ts (WIP)

An executable compiler for creating yaml-flows from typescript files.

> 💡 **_NOTE:_** Note, that this tool is work in progress. Currently, it's just a proof of concept and not complete nor polished. Plenty of Maestro's functionalities are not supported and the functionality of this tool might be unstable at times.

## What it is

Maestro is a new and amazing e2e testing tool for mobile apps. It's incredibly easy to set up and easy to use. Usually, you would write test flows in yaml, which however, can be a hassle to write, since there is no easy way to set up autocomplete for yaml and the syntax can be fairly verbose at times. Additionally, there are still some instabilities with maestro, such as with the inputText-directive, which can be fixed using hacky workarounds. Maestro-ts introduces an intelligent parsing-layer which takes in a simplistic typescript script and generates the yaml for you.

**Advantages over writing flows in yaml:**

- Discoverable and documented Api
- Autocomplete and typechecking out of the box
- Simpler, less verbose and less fragile syntax compared to yaml
- auto-applied fixes to common problems with maestro, such as inputting text

**Disadvantages:**

- Special use cases and complex commands are not supported atm
- Loops are not supported atm
- You'll have to have typescript set up

## Usage

> 💡 **_NOTE:_** First off, make sure you've set up [maestro](https://maestro.mobile.dev/) correctly.

In your React Native app, create a folder your tests will live in.
We recommend `my-app/test/e2e`.

### Setting up types

To set up types, run

```sh
yarn add maestro-ts --dev # or npm i maestro --save-dev
```

### Creating your first flow

Create a file called `my-first-flow.maestro.ts` and add the following content:

```ts
import * as M from "maestro-ts"

M.initApp("com.myTeam.myApp")
M.tapOn("someTestId")
```

### Compiling and running your flows

Now, from your e2e test folder, generate the yaml flows and run them.

```sh
cd test/e2e && npx maestro-ts
maestro test my-first-flow.yaml
```

#### Advanced Usage

By adding a config file to the project, you can take advantage of some extra features and save a bit of work while writing flows:

```js
// test/e2e/maestro-ts.config.js

module.exports = {
  // default for commands like launchApp
  appId: "com.some.app",
  // used for M.navigate("/profile"). Only works if you've properly set up deep linking for the desired uris.
  deepLinkBase: "com.some.app://",
}
```

## When not to use maestro-ts

Maestro-ts certainly isn't the solution for everyone, so here are a few cases where you most likely wouldn't use or stop using maestro-ts:

### You've got plenty of experience writing yaml flows for maestro and don't mind writing it.

If that's the case - congrats! Maybe you've even enhanced your yaml-writing-workflow using vscode-snippets?

### You've hit a wall using maestro-ts and need a functionality it doesn't provide.

Nothing stops you from initially creating your flows using maestro-ts and then manually extending them. Just make sure you don't overwrite your manually edited flow next time you run `npx maestro-ts`.

### You're not writing a React Native app, but instead are using Flutter or native iOS and Android

... Nothing can help you anymore, sorry my friend...
You might not want to set up maestro-ts in a non-React-Native app, so possibly you just want to write yaml yourself. However, if you still want to try maestro-ts, why not set up a separate project, just to create flows with?

```bash
mkdir maestro-flow-gen && cd maestro-flow-gen
yarn init -y
yarn add maestro-ts typescript --dev
npx tsc --init
touch myflow.maestro.ts # create your flow in here
# creates myflow.yaml which you can just drop into your flutter, iOS or Android app.
npx maestro-ts
```
