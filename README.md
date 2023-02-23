# Maestro-ts

An executable compiler for creating maestro's yaml-flows from typescript files.

## What it is

Maestro is a new and amazing e2e testing tool for mobile apps. It's incredibly easy to set up and easy to use. Usually, you would write test flows in yaml. That however, can be a hassle to write since there is no easy way to set up autocomplete for yaml and the syntax can be fairly verbose at times. Additionally, there are still some instabilities with maestro, such as with the inputText-directive, which can be fixed using hacky workarounds. Maestro-ts introduces a parsing-layer which takes in a test flow written in typescript and generates the yaml for you.
If you enjoy trying out or using maestro-ts or even if you just like the idea, I'd be happy if you give the repo a star ⭐️ - Thanks!

**Advantages over writing flows in yaml:**

- Discoverable and documented Api
- Autocomplete and typechecking out of the box
- Simpler, less verbose and less fragile syntax compared to yaml
- auto-applied fixes to common problems with maestro, such as inputting text

**Disadvantages:**

- Special use cases and complex commands are not supported atm
- Loops are not supported atm
- You'll have to have typescript set up

> 💡 **_NOTE:_** Note, that this tool is a work in progress. Currently, it's just a proof of concept and neither complete nor polished. Plenty of Maestro's functionalities are not supported and the functionality of this tool might be unstable at times.

## Usage

> 💡 **_NOTE:_** First off, make sure you've set up [maestro](https://maestro.mobile.dev/) correctly.

In your React Native app, create a folder your tests will live in.
We recommend `my-app/test/e2e`.

### Setting up types

To set up types, run

```sh
yarn add maestro-ts --dev # or npm i maestro --save-dev
```

### Create your first flow

Create a file called `my-first-flow.maestro.ts` and add the following content:

```ts
import * as M from "maestro-ts"

M.initApp("com.myTeam.myApp")
M.tapOn("someTestId")
// Add more commands here 😎
```

### Compiling and running your flows

Now, from your e2e test folder, generate the yaml flows and run them.

```sh
cd test/e2e && npx maestro-ts
maestro test my-first-flow.yaml
```

### Advanced Usage

By adding a config file to your project, you can take advantage of some extra features and save a bit of work while writing flows:

```js
// create test/e2e/maestro-ts.config.cjs

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

If that's the case - congrats! Maybe you've even enhanced your yaml-writing-workflow using vscode-snippets for specific maestro-commands?

### You've hit a wall using maestro-ts and need a functionality it doesn't provide.

Nothing stops you from initially creating your flows using maestro-ts and then manually extending them in the yaml file. Just make sure you don't overwrite your manually edited flow next time you run `npx maestro-ts`.

> 💡 **_NOTE:_** In the future, maestro-ts will introduce custom compiler-blocks, so you can extend the functionality as you please - stay tuned for that 🚀.

### You're writing your app with RN+JS, Flutter or in native iOS and Android

<details>
  <summary>...Nothing can help you anymore, sorry my friend...</summary>
  
Just kidding - Don't get mad! 🥸

I get you might not want to set up maestro-ts in a non-React-Native app, so possibly you just want to write yaml yourself. However, if you still want to try maestro-ts, why not set up a separate project, just to create flows with?

```bash
mkdir maestro-flow-gen && cd maestro-flow-gen
yarn init -y
yarn add maestro-ts typescript --dev
npx tsc --init
touch myflow.maestro.ts # create your flow in here
# creates myflow.yaml which you can just drop into your flutter, iOS or Android app.
npx maestro-ts
```

</details>

## ToDos / RoadMap

- [ ] Support custom compiler-blocks for extending maestro-ts.
- [ ] Optional testID-autocomplete. In the future, we might provide a tool which crawls your codebase for testIDS and let's you use autoComplete in your flows.
- [ ] Support nested maestro commands, such as loops.

## Issues and Contribution

Please file an issue or issue a PR.
